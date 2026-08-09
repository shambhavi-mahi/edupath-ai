# Data

This directory holds all datasets used by EduPath AI.

## Structure

| Folder | Purpose |
|---|---|
| `raw/` | Original, unmodified datasets (CSVs, JSONs, scraped data) |
| `processed/` | Cleaned, transformed, and feature-engineered datasets ready for ML |

## Guidelines

- **Never commit large binary files.** Use Git LFS or store in cloud storage (Google Drive / S3) and link here.
- **Document every dataset** added — source, date collected, license, and column descriptions.
- **Raw data is read-only.** All transformations go into `processed/`.

## Planned Datasets

- Student aptitude & assessment responses
- Stream → career → exam mapping knowledge base
- College data (fees, cutoffs, placements, location)
- Entrance exam details (JEE, NEET, CLAT, CAT, UPSC, NDA, etc.)
- Job roles and required skills per career path
