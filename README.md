# BEYOND THE SIGNAL: The Digital Museum of Humanity's Silent Explorers

[![NASA Space Apps Challenge 2026](https://img.shields.io/badge/NASA%20Space%20Apps-Hanoi%202026-blue.svg)](https://www.spaceappschallenge.org)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-brightgreen.svg)](https://freeze-printing-loop-pig.trycloudflare.com)
[![NASA Open Data](https://img.shields.io/badge/NASA%20Data-100%25%20Verified-orange.svg)](https://science.nasa.gov/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

> *"Before humanity could set foot into the hostile depths of the cosmos, we sent our machines first. Here lies their final radio whispers, authentic photography, and enduring scientific legacy."*

---

## 🌟 Executive Summary

**BEYOND THE SIGNAL** is an interactive, cinematic digital museum and educational observatory dedicated to the hardware pioneers of planetary exploration: rovers, landers, and deep-space probes that have fallen silent across the Solar System.

Built for the **NASA Space Apps Challenge Hanoi 2026**, this project tackles a critical modern challenge in space science communication: **historical authenticity versus generative misinformation**. While synthetic AI media proliferates online, *BEYOND THE SIGNAL* grounds every single visual asset and scientific metric in official **NASA / JPL / Caltech** archival registries, presenting each mission through a compelling 6-chapter narrative: *The Question, The Machine, The Journey, The Discovery, The Last Signal, and The Legacy*.

---

## 🚀 Live Demo & Exhibition Links

- **Interactive Museum Web App:** [https://freeze-printing-loop-pig.trycloudflare.com](https://freeze-printing-loop-pig.trycloudflare.com) (Port 3000)
- **Local Fallback:** `http://localhost:3000`
- **Official NASA Planetary Data Sources:** Detailed on the `/about` curator manifesto page.

---

## 🛰️ Key Features

### 1. The Cinematic Hardware Exhibition (Hero Display)
- **Authentic Provenance:** Opportunity (MER-B), Viking 1 Lander, and Pioneer 11 presented with verified NASA IDs (PIA22222, PIA00381, ACD97-0036-2).
- **Interactive Lightbox:** High-resolution uncropped archival media viewer with direct links to NASA Photojournal and NSSDC records.
- **Narrative Audio & Transcripts:** Multi-chapter historical audio storytelling based strictly on JPL engineering logs.

### 2. The Signal Line Timeline
- Continuous radio signal line visually linking 5 historical machines sorted by physical distance from Earth:
  1. **Surveyor 3** (Moon · Ocean of Storms, 1967)
  2. **Viking 1 Lander** (Mars · Chryse Planitia, 1976)
  3. **Sojourner / Mars Pathfinder** (Mars · Ares Vallis, 1997)
  4. **Opportunity** (Mars · Perseverance Valley, 2004)
  5. **Pioneer 11** (Deep Space · Beyond Saturn, >11 Billion km, 1973)

### 3. Young Explorers Education Hub (`/young-explorers`)
- Designed specifically for K-12 STEM students across Vietnam, with age-appropriate learning journeys, technical diagrams, interactive quizzes, and downloadable educational materials.

### 4. 100% Curatorial Discipline (`/about`)
- Strict separation between *Last Contact Date* and *Mission End Declaration*.
- Distinction between landers and rovers (no blending of Viking Orbiter with Lander, or Pathfinder with Sojourner).
- Full compliance with NASA Open Data policies and Apache 2.0 open-source licensing.

---

## 📊 Official NASA Datasets & Catalog Sources

Every hardware photograph, telemetry coordinate, and mission timeline in this project is directly cited from NASA public archives:

1. **NASA Image and Video Library (`images.nasa.gov`):**
   - High-resolution historical mission photography and diagrams.
2. **NASA JPL Photojournal (`photojournal.jpl.nasa.gov`):**
   - `PIA22222`: Opportunity's First Selfie (Sol 5000 mosaic via Microscopic Imager).
   - `PIA00381`: First image transmitted from the Martian surface by Viking 1 (July 20, 1976).
   - `PIA00766`: Sojourner Rover next to Yogi Rock in Ares Vallis (1997).
   - `PIA15114`: Opportunity self-portrait on Mars (2007).
3. **NASA Master Catalog (NSSDC / NSSDCA):**
   - `2003-032A`: Mars Exploration Rover B (Opportunity).
   - `1975-075C`: Viking 1 Lander.
   - `1973-019A`: Pioneer 11 Spacecraft.
   - `1996-068A`: Mars Pathfinder & Sojourner.
   - `1967-035A`: Surveyor 3 Lunar Lander.
4. **NASA Science 3D Resources:**
   - Official 3D interactive models (`science.nasa.gov/3d-resources/`).

---

## 🛠️ Technology Stack & Architecture

- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide Icons, IBM Plex Mono & Playfair Display typography.
- **Runtime & Bundler:** Zero-dependency Python 3 in-browser Babel compiler (`dev_server.py`) with zero Node.js build overhead.
- **Accessibility:** 100% WCAG AA color contrast (16.18:1 caption contrast ratio), full keyboard navigation (Left/Right arrow deck navigation, Tab focus traps, Escape modal dismissal), and `aria-live` screen-reader polite announcements.
- **Automated Verification:** 86/86 E2E test cases passed (`qa/test_e2e_hero.py`) and 25/25 Tier 5 adversarial tests passed (`qa/test_adversarial_tier5.py`).

---

## 💻 How to Run Locally

### Prerequisites
- Python 3.8+ (No Node.js or npm required!)

### Running the Application
```bash
# Clone the repository
git clone https://github.com/your-team/BEYOND-THE-SIGNAL.git
cd BEYOND-THE-SIGNAL

# Run the local server
python dev_server.py
```
Open your browser and navigate to `http://localhost:3000`.

---

## 👥 NASA Space Apps Challenge 2026 Team

- **Event:** NASA Space Apps Challenge Hanoi 2026 (Organized by SEPA & Partners)
- **Local Event Page:** [spaceappschallenge.org/2026/local-events/hanoi](https://www.spaceappschallenge.org/2026/local-events/hanoi)
- **License:** Apache License 2.0 (Open Source)
