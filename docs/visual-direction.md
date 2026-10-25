# juvantia.org visual direction

Internal design record for the public site. It captures the goal, how Neon Vitrum is applied here, the decisions taken with the product lead, what was tried and rejected, and what is still open. Last updated 2026-10-17, when the redesign was built on the branch `design/site-vitrum` and merged to `main` in one deploy.

`../../style/AI_GUIDE.md` (Neon Vitrum) is the shared language. This file records only what is particular to the site.

## 1. Goal

- **UI and UX only.** The content was already right, so the redesign changes no words (the product lead, 2026-10-17). The only exception is legal: Economics' "APU dividend distribution" became "APU profit distribution", because "dividends" is a forbidden word. Strings are stored in natural case and CSS sets the capitals, so FAQ questions now read as sentences.
- **The land is the background.** RELIEF from `auth/src/components/vitrum`, taken as it is ("он идеален там"). It says Juvantia is a real place on the ground. The engineering grid, particles, glows and the full-screen photo background of the old site are gone.
- **Weight: as Auth.** Calm at rest, light where something is pressed. The Deck's hover on glass keys appears only under a mouse; CONTACT appears under a finger or pen.

## 2. Process

- Round 1 was an HTML prototype of the shell and Home: https://claude.ai/artifact/RopR9Lpd5BJgwKnQL8yW63 (versions 1–5, rounds 1 to 1e).
- The other pages were built directly in code. The lead said either way was fine, so they are reviewed on a local server.
- All work stayed on the branch `design/site-vitrum`, because `deploy.yml` runs on `main` only. The lead approved the whole site on 2026-10-17, and the branch merged to `main` in one deploy.

## 3. The language on the site

### World

- **Built once.** `MainLayout` holds the land canvas, the two light carriers, the grain and the broadcast raster, with `transition:persist="vt-world"`. The land is drawn once per window size and stays the same across pages (ClientRouter).
- **One plain.** It lies flat under the header's emblem; the emblem carries `data-plain`.
- **Motion.** The land drifts slower than the page.
- **Home's first screen** is the night scene, `public/images/hero-night.jpg` (a compressed `hero.png`). It fades into the land at its foot.

### Plates

- **Auth's plate, unchanged.** Smoked glass in the Civitas silhouette: radius 14, the title in a raised tab (step 9 px, ending 22 px after the title), the foot at 42 % of the width. A hairline frame (gain 0.55) draws in, with a rim glow at gain 1. Plates are never pressed.
- **Long titles.** A title keeps one line while its head has room. A title wider than the whole head wraps, balanced, and the tab follows it (measured with a Range).
- **One plate per row.** The lead does not want plates side by side. Short statements may stand side by side inside one plate, parted by hairlines.
- **Photos** fill a plate's right side and take its step and foot. On a phone they move under the head. Product photos (connectors) stand at their own size in a dark recess, with their name beneath.
- **A plate whose sections are its whole content** (Robulus paths, R&D tracks) raises them as its own tabs. The open tab stands in the raised part. A change is SINK & RISE: the open tab sinks for 180 ms (ease-in), the chosen one rises for 280 ms (ease-out), and the panel fades in over 260 ms. Nothing inside a panel replays its own entrance. On a phone a tab may drop its tail ("Easy path" becomes EASY).
- **Entrance.** Plates below the fold rise as they come into view, 120 ms apart. With reduced motion they are simply there.

### Keys

- **Every glass key is the Deck's `GlassButton`:** chamfered (facet 0.18 × height, between 12 and 20; radius 6), its rim glowing at rest (0.4), the raster at 0.045, and the sheen and spark under a mouse. Touch and pen get CONTACT instead.
- **Download keys** carry a platform's mark and two lines of words, as the old badges did (DOWNLOAD ON THE / APP STORE). A key with nothing to open yet (the Citizen stores) keeps its glass and loses its light: no glow, a faint rim, the words dimmed. A key that leaves the site shows a cyan ↗.
- **Small actions are flat keys:** a 1 px rim at white 0.12, radius 4, fill 0.03. These are the photo switch ‹ ›, the social marks and FAQ's # (copy link).

### Type

| Role | Face | On the site |
| --- | --- | --- |
| Wordmark | The SVG master | `public/images/wordmark.svg`, from `style/brand/juvantia-wordmark` (Cinzel 400's outlines, its kerning, 0.12em, two colours, a 0.15 px hairline). In the footer at clamp 22–31 px as the horizontal lockup with the mark; Home's big JUVANTIA is the same file at the old letters' height. The site loads no Cinzel. |
| Main menu | Barlow 600 | 20 px / 0.1em in the header, the top dock and the phone dock (rule 8 of the guide). |
| Titles | Barlow 700 | Page title clamp 44–86 px (phone 38–56 px); section title 32–48 px; plate title 24 px (phone 20 px); a panel's title 30 px. |
| Values and readouts | Barlow 600 | Readout values 30 px with labels 12 px / 0.18em above them; the timeline's durations; the € sign. |
| Keys, labels, reading | Space Grotesk | Keys 14–15 px / 0.14em; small labels 11 px / 0.16–0.2em; sentences 15–17 px, natural case. FAQ and LEGAL in the footer stay Grotesk. |

### Colour

- **Neon is light only:** rims, glows, icons, live marks. Titles and values are white, and text uses the white tiers.
- **Cyan is the way:** links (never underlined), chevrons, ↗.
- **Green is life:** Kustodia's ACTIVE mark, and OPERATIONS LIVE on the Domus timeline.
- **Red only for alarm, and the site has none.** The old yellow and red paths, the red Colosseum, the red passkey card and the red 404 are gone: a path is named by its words, and the installation and service windows are white.

## 4. The shell

- **Header on the land:** the emblem (Home) on the left, the sections in the middle, DOWNLOADS (the Deck's access key) on the right.
  - On `/downloads` the key steps aside but keeps its room, so the sections stand where they stand on every page.
  - Going back up, the header returns as a floating dock at the top.
- **The mark glows under the pointer:** green close to it, cyan wide.
- **Below 900 px:**
  - The sections move to a floating dock at the bottom. Its first item is the emblem (Home), fixed behind a hairline.
  - The sections keep 20 px and scroll sideways; the edge where more waits fades, and the open section comes into view.
  - The header then shows only DOWNLOADS.
- **The footer is black.** The land sinks into the night.
  - Emblem with the canonical wordmark, and the social marks as flat keys (Reddit is r/juvantia_org).
  - Tabularium and Forum as lines of words: an emblem-ink icon, the name, a cyan ↗ and the sentence.
  - The base row: © on the left, FAQ and LEGAL on the right.

## 5. Pages

| Page | First screen | What follows |
| --- | --- | --- |
| Home | Night scene, JUVANTIA, three paragraphs, TP.png, the readout 8 HECTARES · 24/7 · 12V GRID · BIOMETRIC | PROVING GROUND FACILITY: six plates, one per row; Junctum without figures |
| Robulus | Title, the sentence, the rover's photo | OWN YOUR ROBULUS: a plate whose tabs are EASY / MEDIUM / HARD PATH; BUY IN PARK shows chassis, body shell and hardware side by side |
| Domus | Title, the sentence, the blueprint | WHAT IS A DOMUS? (three points); SECTOR REQUIREMENTS (photo); the installation timeline (one rail, five steps; upright below 900 px); DESIGN EXPECTATIONS (photo); ELECTRICAL CONNECTION: two plates with the connectors in recesses |
| R&D | PROVING GROUND, the paragraph, TP.png | THE HARDWARE FOUNDATION (three points); INDUSTRY & ACADEMIA: a plate whose tabs are the two tracks, four points in a row (rows below 1000 px, never 2 × 2) |
| Entertainment | Title and the sentence, no photo (the old page had none) | THE COLOSSEUM and STONECRACY: a section title on the land and a photo plate each; Terra Nullius is the plate's note |
| Economics | Title, the paragraph, CITY ASSETS | TWO VALUE ENGINES (two plates, four points each); E-MONEY ONLY (€, Monerium, the wallet); PROGRAMMABLE SETTLEMENTS; ABSOLUTE ASSET PROTECTION (the fingerprint in emblem ink, not red). The page is static HTML now (it was `client:only`). |
| FAQ | One plate whose tab carries FAQ | Questions as rows parted by hairlines (`details`), every answer in the HTML. `#id` opens its answer; the # beside each question copies its link (with a mouse it waits until the row is pointed at, focused or open). |
| Legal | LEGAL INFORMATION | Two plates in a narrow column (880 px); "Last updated" stands at the plate's head |
| Downloads | DOWNLOADS | JUVANTIA CITIZEN: three unlit keys and the QR placeholder (desktop only); JUVANTIA OPERATOR DECK: macOS, Windows and one Linux key. Linux opens AppImage and Arch/Omarchy as rows on floating glass beneath the key, following Forum's account menu. No installation paragraph beneath the keys (the product lead, 2026-10-22). |
| 404 | 404, SECTOR NOT FOUND, the sentence, RETURN TO BASE | — |

## 6. Decisions by round (the product lead, 2026-10-17)

- **Round 1.** The header lies on the land and comes back as a dock on the way up (option A, not a fixed bar). The land has one plain.
- **Round 1b:**
  - Home's first screen must show `hero.png` ("это 100%"), and the big JUVANTIA stays as it was.
  - The hero's three paragraphs use one small size; TP.png is 460 px.
  - DOWNLOADS is the Deck's AUTHENTICATE key, and so is every glass key on the site.
  - JUNCTUM NETWORK and ASSET PROTECTION never stand side by side.
- **Round 1c:**
  - The main menu is Barlow ("Nav конечно же Barlow"), recorded as rule 8 of the guide.
  - The emblem glows under the pointer.
  - The footer turns black and the gateways become lines of words.
  - The "Terrain & infrastructure" label is removed.
- **Round 1d:**
  - The phone dock never shrinks the sections ("пункты могут меняться… на разных языках"); they scroll.
  - The emblem is the dock's first item ("это тоже пункт").
  - Junctum has no figures.
- **Round 1e.** The phone hero is left-aligned ("слева классно").
- **Static files are cached for a year** (`nginx.conf`: `immutable` on images, icons and fonts; Cloudflare keeps them too). A changed file takes a new name or a version in its address: the mark is served as `/images/mark.svg?v=20261020` (the old `/images/logo.svg` kept the shield in caches), and the icons carry the same version. Never request a new file's address before its deploy finishes: Cloudflare keeps a 404 for four hours.
- **The mark and the wordmark (2026-10-20).** The J on the land (`style/brand/juvantia-mark`) replaces the shield in the header, the docks and the footer, and in the favicons and home-screen icons. The wordmark is one SVG everywhere, and the lead asked for one wordmark style, so Home's old 0.18em JUVANTIA with its grey middle went; the hero keeps its stronger glow over the photo. The footer is the horizontal lockup: the word's capitals as tall as the mark's J, on its line.
- **The mark on the land (2026-10-26).** The lead saw relief over relief: the mark's own contours, about eight times denser, on the page's land. Their rule: the mark is the J inside the land, so on the land only the second land goes and the J stands inside the bigger one. The header on every page but Home, the top dock and the phone dock show `public/images/mark-on-land.svg` (the J alone, 820 of 1024, rows retuned to about 3 px at 46 px); the land still lies flat under it (`data-plain`). Home's header stands on the night photo, with no land, so it keeps the whole mark, as does the black footer. A night disc and a ring around the J were shown (board https://claude.ai/artifact/YFg6nwtkzCUbHaoGFmmEBu) and declined: no new elements.
- **Code.** The lead's instruction: "сделай просто все остальные страницы по этому же принципу". The remaining pages follow the patterns above.
- **Review of all pages** ("Уау! Просто топ"). The lead approved the site as built, with the choices put to them for review: FAQ as one plate, the engines as four points, the unlit Citizen keys, the menu's kept room on `/downloads`, the quieter Domus notes, the left-aligned 404. One change: Reddit moved to the new subreddit r/juvantia_org, so the note about the banned r/juvantia is gone.

## 7. Tried and rejected — do not reintroduce

- Tabularium and Forum as glass keys ("большие и несуразные").
- Shrinking the phone dock's words to fit the width.
- The main menu in Space Grotesk.
- A fixed header bar (option B).
- Junctum figures (proximity window, beacon payload, scan capacity).
- A canonical wordmark alone as the hero. The lead brought back the night scene (the old 0.18em JUVANTIA later gave way to the SVG master, 2026-10-20).
- Plates side by side.
- A centred phone hero.
- A thin accent line under the hero's JUVANTIA was left out on purpose: the Deck rejected a partial accent under a title. Offer it back only if the lead misses it.
- The Design-canvas artifact type for the prototype. An empty canvas exists (https://claude.ai/artifact/PHrW4WwJtC5YWNViFTZqwh); delete it only if the lead asks.

## 8. Performance

- **Live backdrop blur.** Plates use a live `backdrop-filter` over the fixed land.
- **Headless measurement (2026-10-17).** Headless Chromium has no GPU, so it composites in software.
  - At 1366 px every page scrolls at about 23 fps, Home included. The figure is the same with and without a ×4 CPU slowdown, so the limit is software compositing, not the page's scripts.
  - At 390 px with a ×4 CPU slowdown, Domus scrolls at 56 fps, Economics at 57 and Robulus at 60.
- **Next.** Check on real hardware. If the desktop drops, use the Deck's approach: a frosted copy of the world instead of a live blur.

## 9. File map

- `src/layouts/MainLayout.astro`: meta, fonts, the world, the shell.
- `src/components/site/`: header, top dock, phone dock, footer, the menu's sections (`nav.ts`).
- `src/components/vitrum/`: Plate, TabsPlate and TabPanel, DeckKey, Readout, PhotoPane, ImageSwitch, PageHead, SectionHead, Icon.
- `src/scripts/site.ts`: the lifecycle (mount on `astro:page-load`, let go on `astro:before-swap`).
- `src/scripts/vitrum/`: relief and world, plate geometry and edges, SINK & RISE, keys and CONTACT, docks, photos, entrances, FAQ.
- `src/styles/vitrum/`: the shared language.
- `src/styles/pages/`: what one page alone needs.

## 10. Open items

- **Real-device scroll check** (section 8).
- **The Citizen keys** stay unlit until the app has store links.
- **The QR on Downloads** is the old site's placeholder. It encodes nothing and was kept as content.
- **Entertainment as a game zone.** The guide's idea is that Terra Nullius may carry the Deck's weight. It is not designed yet.
