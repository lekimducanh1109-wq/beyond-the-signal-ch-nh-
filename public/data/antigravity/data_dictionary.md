# Data dictionary

- `id`: stable machine identifier.
- `name`: canonical object or mission name.
- `category`: object type used for filtering.
- `target`: celestial body or orbital region.
- `status`: careful status wording; do not infer “permanently parked” unless supported.
- `nssdc_id`: NSSDCA spacecraft ID, only when verified.
- `latitude`, `longitude`: null when no verified coordinate is available; never estimate.
- `coordinate_system`: null until a source specifies datum/convention.
- `source_url`: primary NASA/NSSDCA source.
- `image_url`: direct image URL; verify license/attribution before production use.
- `story`: concise educational narrative.

Missing values use `null` in JSON and empty cells in CSV.
