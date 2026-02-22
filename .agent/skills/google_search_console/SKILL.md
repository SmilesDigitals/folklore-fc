---
name: google_search_console
description: Connects to Google Search Console API to fetch performance reports (Clicks, Impressions, Queries, etc.)
---

# Google Search Console Skill

This skill provides a Python script to fetch comprehensive performance reports from the Google Search Console API.

## Setup Requirements

1.  **GSC API Enabled**: Ensure the Google Search Console API is enabled in your Google Cloud Project.
2.  **Service Account**: Use the provided service account JSON file.
3.  **Permissions**: Add the service account email as a user with 'Restricted' or 'Full' permissions in GSC for your property.
    - **Email**: `antigravity-with-search-consol@linked-antigravity-with-search.iam.gserviceaccount.com`
4.  **Site URL**: Know your exact site URL as listed in GSC (e.g., `https://folklorehc.com/` or `sc-domain:folklore-fc.com`).

## Usage

Run the reporter script via Python:

```powershell
python google-search/gsc_reporter.py --site_url "YOUR_SITE_URL" --key_file "google-search/linked-antigravity-with-search-db19695abb08.json" --days 30
```

### Parameters

- `--site_url`: (Required) The URL or domain property in GSC.
- `--key_file`: (Required) Path to the service account JSON.
- `--days`: (Optional) Number of days for the report (default: 30). Supports any valid integer (e.g., 7, 90).
- `--output_dir`: (Optional) Where to save the output JSON/CSV files.

## Output

The script provides:
1.  **Terminal Summary**: A clean overview of Clicks, Impressions, CTR, and Position, plus Top 10 lists for Queries, Pages, Countries, and Devices.
2.  **JSON File**: A full data dump of the results.
3.  **CSV File**: A spreadsheet-friendly export of query performance.

## Troubleshooting

- **403 Forbidden**: Ensure the service account email has been added to the GSC property.
- **404 Not Found**: Verify the `site_url` matches exactly what is in GSC (including trailing slashes or `sc-domain:` prefix).
- **ImportError**: Run `pip install google-api-python-client google-auth google-auth-httplib2 google-auth-oauthlib pandas`.
