import os
import sys
import json
import csv
import argparse
from datetime import datetime, timedelta
import pandas as pd

# Attempt to import Google API client, if not found, we will try to install it or report error
try:
    from googleapiclient.discovery import build
    from google.oauth2 import service_account
    from googleapiclient.errors import HttpError
except ImportError:
    print("Error: Required libraries not found. Please run: pip install google-api-python-client google-auth google-auth-httplib2 google-auth-oauthlib pandas")
    sys.exit(1)

# Scopes required for Search Console API
SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']

def get_service(key_file):
    """Authenticates and returns the Search Console service object."""
    try:
        credentials = service_account.Credentials.from_service_account_file(
            key_file, scopes=SCOPES)
        service = build('searchconsole', 'v1', credentials=credentials)
        return service
    except Exception as e:
        print(f"Authentication Error: {e}")
        sys.exit(1)

def fetch_data(service, site_url, start_date, end_date, dimensions):
    """Fetches performance data from Google Search Console API."""
    request = {
        'startDate': start_date,
        'endDate': end_date,
        'dimensions': dimensions,
        'rowLimit': 1000
    }
    try:
        response = service.searchanalytics().query(siteUrl=site_url, body=request).execute()
        return response.get('rows', [])
    except HttpError as e:
        error_details = json.loads(e.content.decode('utf-8'))
        print(f"API Error ({e.resp.status}): {error_details.get('error', {}).get('message', str(e))}")
        return []
    except Exception as e:
        print(f"Unexpected Error: {e}")
        return []

def format_row(row, dimensions):
    """Formats a row from the API response."""
    data = {
        'clicks': row['clicks'],
        'impressions': row['impressions'],
        'ctr': row['ctr'],
        'position': row['position']
    }
    for i, dim in enumerate(dimensions):
        data[dim] = row['keys'][i]
    return data

def main():
    parser = argparse.ArgumentParser(description='Google Search Console Performance Reporter')
    parser.add_argument('--site_url', required=True, help='Site URL as registered in GSC (e.g., https://example.com/ or sc-domain:example.com)')
    parser.add_argument('--key_file', required=True, help='Path to the Service Account JSON key file')
    parser.add_argument('--days', type=int, default=30, help='Number of days for the report (default: 30)')
    parser.add_argument('--output_dir', default='.', help='Directory to save output files')
    
    args = parser.parse_args()

    # Calculate dates
    # GSC data usually has a 2-3 day lag
    end_date = (datetime.now() - timedelta(days=3)).strftime('%Y-%m-%d')
    start_date = (datetime.now() - timedelta(days=args.days + 3)).strftime('%Y-%m-%d')

    print(f"Fetching report for {args.site_url}")
    print(f"Period: {start_date} to {end_date} ({args.days} days)")
    print("-" * 50)

    service = get_service(args.key_file)

    # 1. Overall Performance (No dimensions)
    overall_rows = fetch_data(service, args.site_url, start_date, end_date, [])
    if overall_rows:
        overall = overall_rows[0]
        print("OVERALL PERFORMANCE")
        print(f"Clicks:       {overall['clicks']:,}")
        print(f"Impressions:  {overall['impressions']:,}")
        print(f"Avg CTR:      {overall['ctr']:.2%}")
        print(f"Avg Position: {overall['position']:.2f}")
    else:
        print("No overall performance data found or access denied.")
        return

    print("-" * 50)

    results = {'overall': overall}

    # Helper for summarizing and printing
    def process_dimension(name, dimensions, label):
        data_rows = fetch_data(service, args.site_url, start_date, end_date, dimensions)
        formatted = [format_row(r, dimensions) for r in data_rows]
        df = pd.DataFrame(formatted)
        
        print(f"TOP {label}")
        if not df.empty:
            # Show top 10
            print(df.head(10).to_string(index=False, columns=[dimensions[0], 'clicks', 'impressions', 'position']))
            results[name] = formatted
        else:
            print(f"No data for {label}.")
        print("-" * 50)

    # 2. Queries
    process_dimension('queries', ['query'], 'KEYWORDS (QUERIES)')

    # 3. Pages
    process_dimension('pages', ['page'], 'PAGES')

    # 4. Countries
    process_dimension('countries', ['country'], 'COUNTRIES')

    # 5. Devices
    process_dimension('devices', ['device'], 'DEVICES')

    # Save to files
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    json_path = os.path.join(args.output_dir, f"gsc_report_{timestamp}.json")
    csv_path = os.path.join(args.output_dir, f"gsc_report_{timestamp}.csv")

    try:
        # Save JSON
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        
        # Save CSV (Flattened queries for simple review)
        if 'queries' in results:
            df_queries = pd.DataFrame(results['queries'])
            df_queries.to_csv(csv_path, index=False, encoding='utf-8-sig')
            
        print(f"Report saved to:\nJSON: {json_path}\nCSV (Queries): {csv_path}")
    except Exception as e:
        print(f"Error saving files: {e}")

if __name__ == "__main__":
    main()
