import pandas as pd
import os

# Define file paths
base_dir = r"c:\Users\Admin\Desktop\copy website\folklore-fc\keyword"
files = [
    "サッカーユニフォーム_all-keywords_jp_2026-02-15.csv",
    "デザインTシャツ_all-keywords_jp_2026-02-15.csv",
    "サッカー-_-ファッション_all-keywords_jp_2026-02-15.csv"
]

output_file = r"c:\Users\Admin\Desktop\copy website\folklore-fc\keyword_analysis_results.md"

def analyze_keywords():
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# Keyword Analysis Results\n\n")
        f.write("Criteria:\n")
        f.write("- Keyword Difficulty (KD) < 29\n")
        f.write("- Intent includes 'Commercial' or 'Transactional'\n")
        f.write("- Sorted by Search Volume (High to Low)\n\n")

        for file_name in files:
            file_path = os.path.join(base_dir, file_name)
            if not os.path.exists(file_path):
                print(f"File not found: {file_path}")
                continue
            
            try:
                df = pd.read_csv(file_path)
            except Exception as e:
                print(f"Error reading {file_name}: {e}")
                continue

            # Standardize columns (remove potential extra spaces)
            df.columns = [c.strip() for c in df.columns]
            
            # Filter by Keyword Difficulty
            # Ensure KD is numeric, coercing errors to NaN and then dropping them or handling suitably
            df['Keyword Difficulty'] = pd.to_numeric(df['Keyword Difficulty'], errors='coerce')
            df_filtered = df[df['Keyword Difficulty'] < 29]

            # Filter by Intent
            # Intent can be "Commercial", "Transactional", "Navigational, Commercial", etc.
            # We want rows where Intent contains "Commercial" or "Transactional"
            df_filtered = df_filtered[df_filtered['Intent'].astype(str).str.contains('Commercial|Transactional', case=False, na=False)]

            # Filter by Volume (ensure it's numeric)
            df_filtered['Volume'] = pd.to_numeric(df_filtered['Volume'], errors='coerce')
            # Let's verify we have "good" volume. 
            # We will filter out very low volumes (e.g. < 50) and sort descending.
            df_filtered = df_filtered[df_filtered['Volume'] >= 50]
            
            # Sort by Volume descending
            df_filtered = df_filtered.sort_values(by='Volume', ascending=False)

            # Write header for this file
            f.write(f"## {file_name}\n\n")
            f.write(f"Top 50 Keywords (Filtered from {len(df)} total):\n\n")
            f.write("| Keyword | Volume | KD | Intent |\n")
            f.write("|---|---|---|---|\n")

            # Write top 50 rows
            for _, row in df_filtered.head(50).iterrows():
                f.write(f"| {row['Keyword']} | {row['Volume']} | {row['Keyword Difficulty']} | {row['Intent']} |\n")
            
            f.write("\n")
            print(f"Processed file {files.index(file_name) + 1}: Found {len(df_filtered)} matching keywords.")

    print(f"Analysis complete. Results written to {output_file}")

if __name__ == "__main__":
    analyze_keywords()
