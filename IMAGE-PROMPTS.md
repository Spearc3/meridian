# Image generation prompts

Every filename below already exists in `src/assets/` as a **placeholder** (a
recycled destination photo), and is already wired into the site. Generate the
image, save it over the file with the **exact same name**, and it appears — no
code changes needed.

## House style — prepend to every prompt

> Editorial travel photography, shot on a Leica with a 35mm lens, **bright
> natural daylight, rich saturated colour, clear and airy**, high dynamic range,
> photorealistic, cinematic composition, no people looking at camera, no text,
> no logos, no watermark.

**Daylight by default.** Only three images in this list are meant to be dark —
`stay-glacier-cabin` (aurora), `exp-ice-cave` (inside a glacier), and
`exp-humpback` / `exp-manta` (underwater, but still bright turquoise). Everything
else should be **sunlit, bright and colourful — never dark, moody or gloomy.**

Layout notes:

- **Aspect ratio:** generate at the ratio noted per image (`16:9`, `4:5`, `3:2`).
- **Don't pre-darken.** The site lays its own dark gradient over these images and
  puts white type on top, so the contrast is handled in CSS. Give me a bright
  photograph and it will look right; give me a dark one and it goes muddy.

---

## Stays — the room is the subject, and it is daytime

The card sells a cave villa, so the **building or room is the subject** and the
landscape is context. All eight are bright daylight except the glacier cabin,
which is the one honest night shot.

| File | Ratio | Prompt |
|---|---|---|
| `stay-cave-villa.jpg` | 4:5 | A whitewashed cave house carved into the volcanic rock on the rim of the Santorini caldera, brilliant midday Aegean sunshine, curved vaulted white ceilings, a small private plunge pool on the terrace with sunlight sparkling on the water, the deep blue caldera and bright sea far below, vivid blue sky |
| `stay-glacier-cabin.jpg` | 4:5 | **(night — intentional)** A small black timber cabin with a turf roof alone on an Icelandic glacial moraine at night, one huge triangular glass gable wall glowing warm from inside, vivid green aurora overhead, snow and black volcanic gravel, no other buildings anywhere |
| `stay-ryokan.jpg` | 4:5 | The interior of a refined Japanese ryokan room in bright morning light, sunlit tatami floor, a low lacquer table, shoji screens slid fully open onto a green sunlit garden, a cypress-wood bath, immaculate and empty, warm airy daylight flooding in |
| `stay-fjord-farmhouse.jpg` | 4:5 | A small red-painted wooden Norwegian farmhouse on a vivid green ledge high above a sunlit fjord, blue water below, sheer cliffs behind lit by clear summer sun, a wooden sauna at the water's edge, bright crisp Nordic daylight, blue sky with white cloud |
| `stay-overwater-bungalow.jpg` | 4:5 | A weathered timber overwater bungalow on stilts above a brilliant turquoise Maldivian lagoon, a wooden ladder descending from its deck into dazzlingly clear shallow water, thatched roof, coral reef visible beneath the surface, bright tropical midday sun, vivid blue sky |
| `stay-desert-camp.jpg` | 4:5 | A small camp of woollen Berber tents pitched on the flank of an enormous golden Sahara dune in warm late-afternoon sun, bright orange sand, colourful carpets and cushions laid out, the dune crest towering behind against a clear blue sky, no vehicles |
| `stay-patagonia-lodge.jpg` | 4:5 | A low stone-and-glass lodge built into the lee of a ridge in Patagonia on a bright clear day, long horizontal windows, the granite towers of Torres del Paine sunlit behind it, vivid green wind-bent grass and turquoise lake in the foreground |
| `stay-beach-fale.jpg` | 4:5 | A simple open-sided thatched beach fale on an empty white-sand Pacific island in brilliant sunshine, woven palm walls rolled up, a hammock, a dazzling turquoise lagoon a few paces away, palms, bright blue sky, no other structures |

## Experiences — the moment, bright and colourful

| File | Ratio | Prompt |
|---|---|---|
| `exp-manta.jpg` | 4:3 | Underwater in bright sunlit turquoise water, several enormous manta rays wheeling in a slow feeding column, mouths open, a lone snorkeller silhouetted at the surface above, brilliant shafts of sunlight, clear and luminous, no scuba bubbles |
| `exp-camel.jpg` | 4:3 | A camel caravan crossing an immense golden Sahara dune field in warm morning sunlight, tiny against the scale of the sand, vivid orange dunes and crisp blue shadows, clear blue sky, a walking guide leading on foot |
| `exp-towers-dawn.jpg` | 4:3 | The three granite towers of Torres del Paine glowing brilliant orange in full sunrise light, seen across a bright turquoise glacial lake at their base, boulder moraine in the foreground, clear sky, vivid colour |
| `exp-torii-dawn.jpg` | 4:3 | The great vermilion torii gate of Itsukushima standing in the sea at high tide on a bright clear morning, vivid red against blue water and blue sky, green forested hills behind, still water, no crowds |
| `exp-ice-cave.jpg` | 4:3 | **(naturally blue — intentional)** Inside a glacial ice cave in Iceland, the ice a luminous glowing electric blue lit by daylight from the entrance, ribbed and translucent, one tiny figure for scale, bright and jewel-like rather than gloomy |
| `exp-fjord-kayak.jpg` | 4:3 | A single sea kayak on the bright blue-green water of the Nærøyfjord on a clear sunny day, vivid green cliffs rising sheer on both sides, a white waterfall dropping the full height of the wall, sunlight on the water |
| `exp-caldera-sail.jpg` | 4:3 | A small wooden sailing boat on sparkling blue water inside the Santorini caldera in bright golden late-afternoon sun, the sunlit cliff and its white villages high above, warm vivid colour, clear sky |
| `exp-humpback.jpg` | 4:3 | Underwater in brilliantly clear sunlit blue Pacific water, a humpback whale mother hanging motionless with her calf beside her, a lone snorkeller small in frame for scale, bright shafts of sunlight from the surface, luminous |

## Destination gallery frames (second image on each destination page)

| File | Ratio | Prompt |
|---|---|---|
| `gal-santorini.jpg` | 3:2 | The sunlit lanes of Pyrgos, Santorini, brilliant white walls and a vivid blue dome against a deep blue sky, bougainvillea, bright Aegean morning |
| `gal-iceland.jpg` | 3:2 | Diamond Beach on a bright clear day: chunks of glittering clear glacial ice scattered on black volcanic sand, white surf, blue sky, sunlight refracting through the ice |
| `gal-japan.jpg` | 3:2 | The view from Mount Misen on a bright clear morning, the Inland Sea below dotted with green islands, sparkling water, a wild deer in the sunlit foreground |
| `gal-norway.jpg` | 3:2 | Undredal seen from the water on a bright summer day: red and white houses, a stave church, vivid green slopes with goats, blue fjord water, sunlit cliffs |
| `gal-maldives.jpg` | 3:2 | A sunlit aerial of a Maldivian atoll: the reef wall dropping from dazzling turquoise shallows into deep blue ocean, brilliant tropical colour |
| `gal-sahara.jpg` | 3:2 | The crest of Erg Chebbi in warm morning sun, wind smoking sand off the ridge, vivid orange dunes running to the horizon under a clear blue sky |
| `gal-patagonia.jpg` | 3:2 | The Grey Glacier in bright daylight: a river of brilliant blue ice running into a lake with icebergs, sunlit, guanacos grazing on the moraine in the foreground |
| `gal-tonga.jpg` | 3:2 | A low coral island in Ha'apai, Tonga in brilliant sunshine: white sand, palms in the trade wind, an open fishing boat coming through the reef pass, vivid turquoise water |

## Optional replacements

| File | Ratio | Prompt |
|---|---|---|
| `about-portrait.jpg` | 4:5 | Environmental portrait of a man in his fifties in a bright Genoese studio above a bookshop, big window with daylight flooding in, wall of pinned maps and charts, shortwave radio on the desk, unposed, looking away from camera |
| `hero-ocean.jpg` | 16:9 | Bright aerial drone shot straight down at a brilliant turquoise ocean where surf breaks in a long diagonal line of white foam across the frame, vivid teal water on one side, pale sunlit sand on the other, no people |

**Note on the hero:** it is animated in a WebGL shader (the surf rolls up the
sand and drains back), and the wave direction is tuned to the current photo —
foam line running upper-left to lower-right, sand in the lower-left corner. If
you replace it with a different composition, tell me and I'll retune the
`SHORE` vector in `src/components/HeroWaves.tsx`.
