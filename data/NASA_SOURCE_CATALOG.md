# NASA SOURCE CATALOG

**Checked:** 10 November 2026, by opening/searching NASA pages with a web research browser. This confirms that the pages were retrievable at preparation time; it does not guarantee future availability. The application must validate links and media again when importing/publishing.

Use official NASA / JPL pages as canonical references. Keep a source link beside each fact and each media asset. Do not treat a general image search as source verification.

## Opportunity

- Mission record: https://science.nasa.gov/mission/mer-opportunity/
- Final panorama: https://science.nasa.gov/resource/opportunity-rovers-final-mars-images/
- Last images before silence: https://science.nasa.gov/resource/last-images-opportunity-took/
- JPL image collection: https://www.jpl.nasa.gov/news/images-from-opportunity/
- NASA NSSDC image archive: https://nssdc.gsfc.nasa.gov/planetary/mars/mars_exploration_rovers/merb_images.html

## Pioneer 11

- Mission record: https://science.nasa.gov/mission/pioneer-11/
- Mission stories: https://science.nasa.gov/mission/pioneer-11/stories/
- Pioneer 11 at Saturn: https://science.nasa.gov/resource/pioneer-11-at-saturn/
- Pioneer Plaque: https://science.nasa.gov/resource/pioneer-plaque/

## Surveyor 3

- Mission record: https://science.nasa.gov/mission/surveyor-3/
- Apollo 12 and Surveyor 3: https://science.nasa.gov/resource/apollo-12-and-surveyor-3/

## Viking 1

- Mission record: https://science.nasa.gov/mission/viking-1/
- JPL mission overview: https://www.jpl.nasa.gov/missions/viking-1/
- The NASA mission page contains the first surface photograph and key mission dates. Use that page as the primary source rather than guessing an alternate image URL.

## Sojourner / Mars Pathfinder

- Mars Pathfinder mission: https://science.nasa.gov/mission/mars-pathfinder/
- Pathfinder rover, airbags and terrain: https://science.nasa.gov/resource/pathfinders-rover-airbags-martian-terrain/
- Sojourner's first images: https://science.nasa.gov/resource/sojourners-first-images-from-mars/
- Sojourner and Yogi: https://science.nasa.gov/resource/sojourner-yogi/
- Sojourner's view of Yogi: https://science.nasa.gov/resource/sojourners-view-of-yogi/

## NASA Image and Video Library

- Web interface: https://images.nasa.gov/
- Official API root: https://images-api.nasa.gov
- Official API guide (PDF): https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf
- NASA Open APIs index also documents the Image and Video Library API: https://api.nasa.gov/

API routes:

```text
GET https://images-api.nasa.gov/search?q=Opportunity%20Mars%20rover&media_type=image
GET https://images-api.nasa.gov/search?q=Pioneer%2011%20spacecraft&media_type=image
GET https://images-api.nasa.gov/search?q=Surveyor%203%20Apollo%2012&media_type=image
GET https://images-api.nasa.gov/search?q=Viking%201%20Mars%20lander&media_type=image
GET https://images-api.nasa.gov/search?q=Sojourner%20Mars%20Pathfinder&media_type=image
GET https://images-api.nasa.gov/asset/{nasa_id}
```

API responses contain item metadata and links. Use the returned NASA ID to retrieve the asset manifest; select and validate the actual media file from the manifest. Do not invent `images-assets.nasa.gov` file paths.

## Image credit and reuse notes

NASA media often has credit lines such as NASA/JPL-Caltech, NASA/Ames or partner/institution credits. Preserve the exact credit text exposed on the source resource or asset metadata. Check for third-party material, logos, identifiable people and other exceptions before reuse. Keep source attribution visible in the museum. Never imply NASA sponsors or endorses this student project.
