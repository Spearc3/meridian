import santorini from "./assets/dest-santorini.jpg";
import iceland from "./assets/dest-iceland.jpg";
import japan from "./assets/dest-japan.jpg";
import norway from "./assets/dest-norway.jpg";
import maldives from "./assets/story-maldives.jpg";
import sahara from "./assets/story-sahara.jpg";
import patagonia from "./assets/story-patagonia.jpg";

// Stays — each depicts the actual room being offered, not just the region.
import stayCaveVilla from "./assets/stay-cave-villa.jpg";
import stayGlacierCabin from "./assets/stay-glacier-cabin.jpg";
import stayRyokan from "./assets/stay-ryokan.jpg";
import stayFjordFarmhouse from "./assets/stay-fjord-farmhouse.jpg";
import stayOverwater from "./assets/stay-overwater-bungalow.jpg";
import stayDesertCamp from "./assets/stay-desert-camp.jpg";
import stayPatagoniaLodge from "./assets/stay-patagonia-lodge.jpg";
import stayBeachFale from "./assets/stay-beach-fale.jpg";

// Experiences.
import expManta from "./assets/exp-manta.jpg";
import expCamel from "./assets/exp-camel.jpg";
import expTowersDawn from "./assets/exp-towers-dawn.jpg";
import expToriiDawn from "./assets/exp-torii-dawn.jpg";
import expIceCave from "./assets/exp-ice-cave.jpg";
import expFjordKayak from "./assets/exp-fjord-kayak.jpg";
import expCalderaSail from "./assets/exp-caldera-sail.jpg";
import expHumpback from "./assets/exp-humpback.jpg";

// Second frame for each destination page.
import galSantorini from "./assets/gal-santorini.jpg";
import galIceland from "./assets/gal-iceland.jpg";
import galJapan from "./assets/gal-japan.jpg";
import galNorway from "./assets/gal-norway.jpg";
import galMaldives from "./assets/gal-maldives.jpg";
import galSahara from "./assets/gal-sahara.jpg";
import galPatagonia from "./assets/gal-patagonia.jpg";
import galTonga from "./assets/gal-tonga.jpg";

export type Destination = {
  slug: string;
  name: string;
  region: string;
  category: string;
  issue: string;
  image: string;
  /** Standfirst on the destination page, under the title. */
  standfirst: string;
  coordinates: string;
  season: string;
  duration: string;
  body: string[];
  notes: { label: string; value: string }[];
  /** A second frame, shown on the destination page. */
  gallery: string;
};

export const destinations: Destination[] = [
  {
    slug: "santorini",
    gallery: galSantorini,
    name: "Santorini",
    region: "Cyclades, Greece",
    category: "Coastal",
    issue: "N° 042",
    image: santorini,
    standfirst:
      "A drowned volcano with a village balanced on its rim, and a light that has ruined painters for three centuries.",
    coordinates: "36.3932° N, 25.4615° E",
    season: "Late April – early June",
    duration: "Six to nine days",
    body: [
      "The caldera is not a view; it is a wound. Three and a half thousand years ago the island tore itself open and the sea rushed in, and what remains is a crescent of cliff standing over nine hundred feet of blue. The villages cling to the lip of it the way barnacles cling to a hull — white, stubborn, indifferent to the drop.",
      "We take the island out of season, when the cruise tenders have thinned and the donkeys rest. Mornings belong to Pyrgos, where the lanes coil upward and nobody is selling anything. Afternoons are for the vineyards inland, where the vines are woven into low baskets on the ash — a defence against a wind that has never once relented.",
      "And in the evening you will do what everyone does, because it cannot be helped: you will sit on a wall facing west and watch the light go. It is a cliché. It is also, unarguably, one of the great sights of the inhabited world.",
    ],
    notes: [
      { label: "Sleep", value: "A cave house cut into the rock at Oia" },
      { label: "Eat", value: "Fava and caper leaves, at a table on the ash" },
      { label: "Bring", value: "Flat shoes. Every street is a staircase." },
    ],
  },
  {
    slug: "jokulsarlon",
    gallery: galIceland,
    name: "Jökulsárlón",
    region: "South Iceland",
    category: "Arctic",
    issue: "N° 041",
    image: iceland,
    standfirst:
      "A lagoon of drifting ice at the foot of a dying glacier, calving its cargo one slow berg at a time.",
    coordinates: "64.0784° N, 16.2306° W",
    season: "February – March, for the blue ice",
    duration: "Five days, based in Höfn",
    body: [
      "The lagoon did not exist a century ago. It is the glacier's own retreat made visible — a bowl of meltwater that widens every year, floating the ice it has shed toward a narrow channel and out to the Atlantic. To stand at the edge is to watch a landscape leave.",
      "The bergs are extravagant. Some are the flat, chalky white of a winter sky; others are shot through with the compressed blue of ice a thousand years old, and a few carry black seams of volcanic ash — a record of eruptions laid down in a glacier's slow diary.",
      "Cross the road to Diamond Beach at first light. The tide returns the smaller bergs to the black volcanic sand, where they sit like broken glass, catching the low sun until they are gone by afternoon. Nothing here is permanent, and the place knows it.",
    ],
    notes: [
      { label: "Sleep", value: "A guesthouse at Höfn, an hour east" },
      { label: "Watch", value: "Seals working the channel on the outgoing tide" },
      { label: "Bring", value: "Crampons, and more layers than you think" },
    ],
  },
  {
    slug: "itsukushima",
    gallery: galJapan,
    name: "Itsukushima",
    region: "Hiroshima, Japan",
    category: "Ritual",
    issue: "N° 040",
    image: japan,
    standfirst:
      "An island so sacred that for centuries no one was permitted to be born or to die on it — with a gate that stands in the sea.",
    coordinates: "34.2958° N, 132.3197° E",
    season: "November, for the maples",
    duration: "Three days, staying on the island",
    body: [
      "Almost everyone comes for the day. The ferries dock, the crowds photograph the great vermilion torii standing in the shallows, and by six in the evening they are gone. Stay the night. The island you are left with is a different island entirely.",
      "At high tide the shrine appears to float, its boardwalks running out over the water on stilts, and the gate stands offshore as though it were the entrance to the sea itself. At low tide you can walk out across the flats and put your hand on it — the pillars are camphor, vast, worn smooth, packed at the base with coins pressed into the grain by pilgrims.",
      "Climb Misen at dawn, before the ropeway starts. Deer will follow you partway up and then lose interest. At the summit there is a hall where a flame is said to have burned without interruption for twelve hundred years, and on a clear morning the whole Inland Sea lies below, islanded and silver.",
    ],
    notes: [
      { label: "Sleep", value: "A ryokan on the island; leave when the crowds do" },
      { label: "Eat", value: "Oysters, grilled at the roadside in their shells" },
      { label: "Time it", value: "Check the tide tables — they change everything" },
    ],
  },
  {
    slug: "naeroyfjord",
    gallery: galNorway,
    name: "Nærøyfjord",
    region: "Western Norway",
    category: "Fjord",
    issue: "N° 039",
    image: norway,
    standfirst:
      "The narrowest fjord in the world: a corridor of black water a quarter-mile wide, with four thousand feet of rock on either side.",
    coordinates: "60.8710° N, 6.9000° E",
    season: "June, when the meltwater runs hardest",
    duration: "Four days, Flåm to Gudvangen",
    body: [
      "The scale refuses to resolve. You look up at a wall of rock and find a farm on a ledge halfway to the sky — a red house, a green field, a fence — and only then does the cliff acquire a size, and the size is appalling.",
      "Go by water, and go slowly. The tourist boats run the fjord in ninety minutes; take two days instead, in something small and quiet, and put in at Undredal, where eighty people and four hundred goats make a white cheese that leaves the valley only rarely.",
      "In June the snowmelt is at its most violent. Waterfalls arrive from nowhere, drop the full height of the wall, and are shredded to vapour before they reach the water. The fjord takes them without a sound. It is the quietest loud place we know.",
    ],
    notes: [
      { label: "Sleep", value: "A farmhouse at Undredal, above the goats" },
      { label: "Eat", value: "Brown goat's cheese, on bread, with nothing else" },
      { label: "Bring", value: "A waterproof shell. It will rain; it is Norway." },
    ],
  },
  {
    slug: "baa-atoll",
    gallery: galMaldives,
    name: "Baa Atoll",
    region: "The Maldives",
    category: "Reef",
    issue: "N° 038",
    image: maldives,
    standfirst:
      "A biosphere reserve where the currents gather plankton into a bay, and the manta rays come in their hundreds to feed.",
    coordinates: "5.1667° N, 73.0500° E",
    season: "June – November, on the southwest monsoon",
    duration: "Eight days, live-aboard",
    body: [
      "Hanifaru Bay is a small thing — a pocket of reef you could swim across in a few minutes. But when the monsoon current runs against the tide, it traps a soup of plankton in the bay, and the mantas arrive to hang in it, wheeling, mouths agape, sometimes two hundred at once.",
      "You are permitted to snorkel and nothing more. No tanks, no bubbles, no touching, and a ranger counts you in and out. The restraint is the point: the bay is fragile enough that a decade of carelessness would empty it.",
      "The rest of the atoll is quieter and, in its way, better. Long reef walls, a wreck at forty metres, and islands so low that the horizon seems to bend around them. At night the water off the boat lights up with bioluminescence, and you can drag a hand through it and watch it burn.",
    ],
    notes: [
      { label: "Sleep", value: "A live-aboard dhoni; the reefs are the address" },
      { label: "Rule", value: "Snorkel only in Hanifaru. No exceptions, ever." },
      { label: "Bring", value: "Reef-safe sunscreen, or none at all" },
    ],
  },
  {
    slug: "erg-chebbi",
    gallery: galSahara,
    name: "Erg Chebbi",
    region: "Moroccan Sahara",
    category: "Desert",
    issue: "N° 037",
    image: sahara,
    standfirst:
      "A sea of dunes rising five hundred feet from flat stone desert, for no reason anyone has satisfactorily explained.",
    coordinates: "31.1500° N, 3.9833° W",
    season: "October – March",
    duration: "Five days, from Merzouga",
    body: [
      "The erg begins without warning. One moment you are on hard black hammada, the kind of ground that takes a tyre well, and then the sand starts and does not stop for thirty kilometres. The dunes stand higher than any building you have slept in.",
      "Walk in, do not ride. A camel will carry your water and your bedding; you should carry yourself, because the only way to understand the scale of a dune is to climb one, badly, on foot, in the heat, and arrive at the crest with your lungs burning.",
      "Sleep out. Not in a camp with a generator — out, on a groundsheet, on the lee slope. The sand gives back its heat for an hour after dark and then turns cold, and the sky fills with more stars than seems reasonable, and at some point in the night the dune will make a low sound as it moves, and you will lie awake listening to it.",
    ],
    notes: [
      { label: "Sleep", value: "Under the sky, on the lee slope of the erg" },
      { label: "Eat", value: "Bread baked in the sand, under the fire" },
      { label: "Bring", value: "A chèche. It is not costume; it is equipment." },
    ],
  },
  {
    slug: "torres-del-paine",
    gallery: galPatagonia,
    name: "Torres del Paine",
    region: "Patagonia",
    category: "Alpine",
    issue: "N° 036",
    image: patagonia,
    standfirst:
      "Three granite towers at the end of the Americas, with a wind that has crossed an ocean to reach them.",
    coordinates: "50.9423° S, 73.4068° W",
    season: "November – March",
    duration: "Ten days, the full circuit",
    body: [
      "The wind is the first thing and the last thing. It comes off the Southern Ocean with nothing to slow it, and on the exposed passes it will take you off your feet if you are careless. The guanacos stand in it, chewing, unbothered, having made their peace.",
      "The towers themselves are best at dawn, from the moraine below the lake, when the first light hits the granite and for perhaps four minutes they burn a colour that photographs never quite hold. Then the cloud comes over and they are gone, and you walk back down.",
      "Do the full circuit if you have the days. The back side is emptier, harder, and better: the John Gardner pass, and then the Grey Glacier laid out below you, a river of blue ice running to a lake that has icebergs on it in the middle of summer.",
    ],
    notes: [
      { label: "Sleep", value: "Refugios on the W; a tent on the back side" },
      { label: "Watch", value: "Puma tracks near Laguna Amarga, at first light" },
      { label: "Bring", value: "Poles, and a jacket that means it" },
    ],
  },
  {
    slug: "haapai",
    gallery: galTonga,
    name: "Ha'apai",
    region: "Kingdom of Tonga",
    category: "Remote",
    issue: "N° 035",
    image: maldives,
    standfirst:
      "Sixty-two islands, most of them uninhabited, where the humpbacks come to calve in water clear enough to count their scars.",
    coordinates: "19.7500° S, 174.3600° W",
    season: "July – October, for the whales",
    duration: "Twelve days",
    body: [
      "Tonga is one of the very few places on earth where you may enter the water with humpback whales, and the encounter rearranges you. A cow the length of a bus hangs beneath you, motionless, one eye open, while her calf — new, curious, uncoordinated — comes up to look at the strange thing at the surface.",
      "Ha'apai is the middle group and the least visited: low coral islands, a few hundred people, one road on the main island and not much traffic on it. The pace is not slow so much as unhurried, which is a different quality entirely.",
      "In the evening the men come back through the pass in open boats, and the light goes green, and someone will offer you a cup of kava and expect nothing from you in return but that you sit down and drink it.",
    ],
    notes: [
      { label: "Sleep", value: "A beach fale on Uoleva; no key, no lock" },
      { label: "Rule", value: "Swim with the whales only with a licensed guide" },
      { label: "Bring", value: "Cash. There is one bank, and it is often shut." },
    ],
  },
];

export const categories = [
  "All",
  "Coastal",
  "Arctic",
  "Desert",
  "Alpine",
  "Ritual",
  "Reef",
  "Fjord",
];

/* ── Where you sleep ──────────────────────────────────────────────────────── */

export type StayKind =
  | "Hotel"
  | "Villa"
  | "Bungalow"
  | "Cabana"
  | "Ryokan"
  | "Camp";

export type Stay = {
  slug: string;
  name: string;
  kind: StayKind;
  /** Slug of the destination this stay belongs to. */
  destination: string;
  region: string;
  image: string;
  standfirst: string;
  rooms: string;
  from: string;
  detail: string[];
  amenities: string[];
};

export const stayKinds: (StayKind | "All")[] = [
  "All",
  "Hotel",
  "Villa",
  "Bungalow",
  "Cabana",
  "Ryokan",
  "Camp",
];

export const stays: Stay[] = [
  {
    slug: "kalderi-cave-house",
    name: "Kalderi Cave House",
    kind: "Villa",
    destination: "santorini",
    region: "Oia, Santorini",
    image: stayCaveVilla,
    standfirst:
      "Five vaulted rooms cut into the volcanic rock, with a plunge pool hanging over nine hundred feet of blue.",
    rooms: "5 suites",
    from: "LKR 253,000 / night",
    detail: [
      "The house is a skaftá — a cave dwelling carved into the pumice by hand, cool in August without any machine's help. The vaults have been left as they were found: whitewashed, uneven, holding the marks of the adze.",
      "Breakfast is set on the terrace at whatever hour you appear. Nobody will suggest an excursion. The point of this house is that you do not leave it.",
    ],
    amenities: [
      "Cliff-edge plunge pool",
      "Cellar of Assyrtiko, poured by the owner",
      "A cook, on request, who does not use a menu",
    ],
  },
  {
    slug: "the-glacier-cabin",
    name: "The Glacier Cabin",
    kind: "Cabana",
    destination: "jokulsarlon",
    region: "Höfn, South Iceland",
    image: stayGlacierCabin,
    standfirst:
      "A black timber cabin on the moraine, with a glass gable pointed at the aurora and nothing else for eleven miles.",
    rooms: "1 cabin, 2 guests",
    from: "LKR 175,000 / night",
    detail: [
      "It is a small, serious building: turf roof, triple glazing, a stove that will run you out of the room if you overfeed it. The gable end is glass from floor to ridge, and it faces north.",
      "There is no restaurant, no reception, and no other cabin in sight. A hamper arrives each afternoon by truck, and the driver does not linger.",
    ],
    amenities: [
      "Geothermal hot pot on the deck",
      "Aurora alarm — the housekeeper will wake you",
      "Crampons and poles in the porch, in your size",
    ],
  },
  {
    slug: "ryokan-shirakumo",
    name: "Ryokan Shirakumo",
    kind: "Ryokan",
    destination: "itsukushima",
    region: "Miyajima, Japan",
    image: stayRyokan,
    standfirst:
      "Eight tatami rooms behind the shrine, run by the same family since 1911, where dinner is fourteen courses and no one speaks above a murmur.",
    rooms: "8 rooms",
    from: "LKR 124,000 / night",
    detail: [
      "You will be given a yukata, and you will be expected to wear it. The bath is drawn from a spring below the hill, and it is taken before dinner, not after.",
      "The great pleasure of staying on the island is the evening: the day-trippers are gone by six, and the shrine, floodlit and empty, belongs to about forty people.",
    ],
    amenities: [
      "Kaiseki dinner, fourteen courses, served in-room",
      "Cypress-wood ofuro, drawn at your hour",
      "A private hour at the shrine before dawn",
    ],
  },
  {
    slug: "undredal-farmhouse",
    name: "Undredal Farmhouse",
    kind: "Cabana",
    destination: "naeroyfjord",
    region: "Undredal, Norway",
    image: stayFjordFarmhouse,
    standfirst:
      "A red goat-farm cottage on a ledge above the fjord, reachable only by boat, with four hundred goats for neighbours.",
    rooms: "1 farmhouse, 4 guests",
    from: "LKR 137,000 / night",
    detail: [
      "The farm has made brown goat's cheese for two centuries and still does, in a shed thirty metres from your door. You are welcome at the milking, at half past five, if you can face it.",
      "There is no road. The boat comes twice a day, and if you miss the second one you are staying, which is rather the idea.",
    ],
    amenities: [
      "Wood-fired sauna on the water's edge",
      "A rowing boat, and the whole fjord",
      "Cheese from the shed, still warm",
    ],
  },
  {
    slug: "hanifaru-overwater",
    name: "Hanifaru Overwater",
    kind: "Bungalow",
    destination: "baa-atoll",
    region: "Baa Atoll, Maldives",
    image: stayOverwater,
    standfirst:
      "Twelve bungalows on stilts above a house reef, each with a hatch in the floor and a ladder into four metres of lagoon.",
    rooms: "12 bungalows",
    from: "LKR 435,000 / night",
    detail: [
      "The bungalows stand far enough apart that you will not see your neighbour, and they are built of timber that has been left to grey rather than varnished into a brochure.",
      "The reef begins directly beneath you. Most guests never once use the boat.",
    ],
    amenities: [
      "Glass floor hatch and ladder to the reef",
      "Marine biologist in residence",
      "Manta briefings through the June–November season",
    ],
  },
  {
    slug: "camp-erg",
    name: "Camp Erg",
    kind: "Camp",
    destination: "erg-chebbi",
    region: "Merzouga, Morocco",
    image: stayDesertCamp,
    standfirst:
      "Six wool tents struck on the lee slope of the dunes and dismantled without trace when you leave.",
    rooms: "6 tents",
    from: "LKR 127,000 / night",
    detail: [
      "This is not a permanent camp. It is raised where the dunes and the wind suggest, carried in on camels, and taken out again. There is no generator; light is fire and lamps.",
      "Dinner is cooked in the sand under the coals, and afterwards someone will play, badly and beautifully, until it is late enough to lie down and look up.",
    ],
    amenities: [
      "Beds on the open sand, by request",
      "A guide who navigates by dune, not compass",
      "Bread baked in the fire, at your feet",
    ],
  },
  {
    slug: "hotel-del-viento",
    name: "Hotel del Viento",
    kind: "Hotel",
    destination: "torres-del-paine",
    region: "Torres del Paine, Chile",
    image: stayPatagoniaLodge,
    standfirst:
      "A low stone hotel built into the lee of a ridge, with every window turned toward the towers and a bar that stays open for late walkers.",
    rooms: "22 rooms",
    from: "LKR 207,000 / night",
    detail: [
      "The building is designed around the wind: long, low, its back to the Southern Ocean, its glass facing the granite. In a full gale the whole place hums, faintly, like a held note.",
      "Guides eat with guests. Breakfast is at five if the weather window is at six, and nobody complains about it.",
    ],
    amenities: [
      "Guided departures at first light",
      "Drying room that actually works",
      "A bar that waits up for you",
    ],
  },
  {
    slug: "uoleva-fale",
    name: "Uoleva Beach Fale",
    kind: "Bungalow",
    destination: "haapai",
    region: "Uoleva, Tonga",
    image: stayBeachFale,
    standfirst:
      "A thatched fale on an empty island — no key, no lock, no road, and humpbacks passing the reef at breakfast.",
    rooms: "4 fales",
    from: "LKR 63,000 / night",
    detail: [
      "The fale is woven, open to the trade wind, and stands about twenty paces from the water. There is no lock on the door because there is no need for one.",
      "In season the whales pass close enough to hear from the veranda — a long exhalation, then nothing, then another.",
    ],
    amenities: [
      "Licensed whale-swim guide on the island",
      "Kava at dusk, with whoever is about",
      "Solar power, and it does go off",
    ],
  },
];

/* ── What you do ──────────────────────────────────────────────────────────── */

export type Experience = {
  slug: string;
  title: string;
  destination: string;
  region: string;
  image: string;
  duration: string;
  intensity: "Gentle" | "Moderate" | "Demanding";
  summary: string;
};

export const experiences: Experience[] = [
  {
    slug: "manta-ballet-hanifaru",
    title: "The Manta Ballet at Hanifaru",
    destination: "baa-atoll",
    region: "Baa Atoll, Maldives",
    image: expManta,
    duration: "Half day, on the tide",
    intensity: "Gentle",
    summary:
      "Snorkel — never tanks — above a bay where the current gathers plankton and the mantas wheel by the hundred, mouths agape, close enough to touch and never touched.",
  },
  {
    slug: "walking-the-erg",
    title: "Walking the Erg, on Foot",
    destination: "erg-chebbi",
    region: "Moroccan Sahara",
    image: expCamel,
    duration: "Three days, two nights out",
    intensity: "Demanding",
    summary:
      "Cross thirty kilometres of dune with a camel for your water and nothing for your pride. Sleep on the sand. Wake to a dune that has moved in the night.",
  },
  {
    slug: "towers-at-first-light",
    title: "The Towers at First Light",
    destination: "torres-del-paine",
    region: "Patagonia, Chile",
    image: expTowersDawn,
    duration: "Pre-dawn, eight hours",
    intensity: "Demanding",
    summary:
      "Leave at three, climb the moraine in the dark, and be on the lake shore when the sun hits the granite. You have perhaps four minutes. They are worth the other four hours.",
  },
  {
    slug: "misen-before-the-ropeway",
    title: "Misen, Before the Ropeway",
    destination: "itsukushima",
    region: "Hiroshima, Japan",
    image: expToriiDawn,
    duration: "Half day, from 04:30",
    intensity: "Moderate",
    summary:
      "Climb the sacred mountain at dawn with only the deer for company, to a hall where a flame is said to have burned for twelve hundred years, and the Inland Sea lying silver below.",
  },
  {
    slug: "the-blue-ice-walk",
    title: "Into the Blue Ice",
    destination: "jokulsarlon",
    region: "South Iceland",
    image: expIceCave,
    duration: "Full day, roped",
    intensity: "Moderate",
    summary:
      "Rope up and walk out onto the glacier itself, down into a moulin where the ice is a thousand years old, has no air left in it, and burns an impossible blue.",
  },
  {
    slug: "the-fjord-by-oar",
    title: "The Fjord, by Oar",
    destination: "naeroyfjord",
    region: "Western Norway",
    image: expFjordKayak,
    duration: "Two days",
    intensity: "Moderate",
    summary:
      "Row the narrowest fjord on earth in something small and silent, put in at a goat farm for lunch, and let the waterfalls arrive without warning from four thousand feet above.",
  },
  {
    slug: "caldera-at-dusk",
    title: "The Caldera at Dusk",
    destination: "santorini",
    region: "Cyclades, Greece",
    image: expCalderaSail,
    duration: "An evening",
    intensity: "Gentle",
    summary:
      "Sail the drowned volcano in a wooden kaiki, drop anchor off the hot springs, and be on the water — not on the wall with everyone else — when the light finally goes.",
  },
  {
    slug: "swimming-with-humpbacks",
    title: "Swimming with Humpbacks",
    destination: "haapai",
    region: "Kingdom of Tonga",
    image: expHumpback,
    duration: "Full day, in season",
    intensity: "Moderate",
    summary:
      "Enter the water with a cow and her calf in one of the few places on earth where it is permitted. She will hang beneath you, one eye open, and rearrange what you think you are.",
  },
];

/* ── How you travel ───────────────────────────────────────────────────────── */

export type Package = {
  slug: string;
  name: string;
  style: string;
  image: string;
  tagline: string;
  duration: string;
  from: string;
  bestFor: string;
  includes: string[];
  itinerary: { day: string; note: string }[];
};

export const packages: Package[] = [
  {
    slug: "the-family-atlas",
    name: "The Family Atlas",
    style: "Family",
    image: maldives,
    tagline:
      "A voyage that works for a nine-year-old and a grandmother on the same afternoon — which is harder than it sounds, and the whole art of it.",
    duration: "10 days",
    from: "LKR 2,820,000 per family",
    bestFor: "Two adults, two children, one grandparent",
    includes: [
      "Adjoining overwater bungalows with a shared deck",
      "A marine biologist who is very good with children",
      "Reef snorkelling graded by confidence, not age",
      "One evening a week where the children eat early and you don't",
    ],
    itinerary: [
      { day: "Days 1–3", note: "Baa Atoll — the house reef, and learning to breathe" },
      { day: "Days 4–7", note: "Hanifaru on the tide; mantas, if the plankton comes" },
      { day: "Days 8–10", note: "A slow sail through the outer islands, nowhere to be" },
    ],
  },
  {
    slug: "the-quiet-retreat",
    name: "The Quiet Retreat",
    style: "Quiet retreat",
    image: japan,
    tagline:
      "No itinerary, no guide waiting in a lobby, no one asking whether everything is to your satisfaction. A room, a mountain, and the tide table.",
    duration: "7 days",
    from: "LKR 960,000 per person",
    bestFor: "One traveller, or two who don't need to talk",
    includes: [
      "A ryokan room facing the water, taken for the week",
      "Kaiseki dinner served in-room, at your hour",
      "One private hour at the shrine before dawn",
      "Absolutely nothing else, deliberately",
    ],
    itinerary: [
      { day: "Days 1–2", note: "Arrive. Sleep. The island empties at six." },
      { day: "Days 3–5", note: "Misen at dawn; the flats at low tide; a long nothing" },
      { day: "Days 6–7", note: "Hiroshima, if you want it. Many don't." },
    ],
  },
  {
    slug: "the-long-way-round",
    name: "The Long Way Round",
    style: "Adventurous",
    image: patagonia,
    tagline:
      "Ten days on foot at the end of the Americas, carrying your own weight, with a wind that has crossed an ocean to meet you.",
    duration: "12 days",
    from: "LKR 2,340,000 per person",
    bestFor: "Walkers who have done this before, and know what they're asking for",
    includes: [
      "The full Paine circuit, guided, with the back side included",
      "Refugios on the W; tents where there are none",
      "A drying room, a bar that waits up, and a guide who eats with you",
      "Weather windows respected over schedules, always",
    ],
    itinerary: [
      { day: "Days 1–4", note: "The W: Grey, the French valley, and the towers at dawn" },
      { day: "Days 5–9", note: "The back side — John Gardner, and the glacier below" },
      { day: "Days 10–12", note: "Down, slowly, with an unreasonable amount of red wine" },
    ],
  },
  {
    slug: "the-still-water",
    name: "The Still Water",
    style: "Relaxation",
    image: santorini,
    tagline:
      "A cave house, a plunge pool over a caldera, and a firm instruction to cancel everything you were planning to see.",
    duration: "8 days",
    from: "LKR 2,015,000 per person",
    bestFor: "Anyone who has been working too hard and knows it",
    includes: [
      "A cave house at Oia, entire, for the week",
      "A cook who arrives when summoned and not otherwise",
      "One evening sail into the caldera, at dusk",
      "A standing arrangement that no one will call you",
    ],
    itinerary: [
      { day: "Days 1–3", note: "Do not leave the house. This is not a joke." },
      { day: "Days 4–6", note: "Pyrgos in the morning; the vineyards on the ash" },
      { day: "Days 7–8", note: "The caldera by kaiki, and the last of the light" },
    ],
  },
  {
    slug: "the-boardroom-at-altitude",
    name: "The Boardroom at Altitude",
    style: "Business",
    image: norway,
    tagline:
      "An off-site for people who are tired of off-sites: a fjord farmhouse with no road, no signal to speak of, and a boat twice a day.",
    duration: "4 days",
    from: "LKR 3,740,000 for twelve",
    bestFor: "A team of eight to fourteen, and one difficult decision",
    includes: [
      "The farmhouse and its ledge, exclusively, for four days",
      "A working room with a long table and a very large window",
      "Satellite line for the hour a day you actually need it",
      "A sauna on the water, and a rule about laptops in it",
    ],
    itinerary: [
      { day: "Day 1", note: "Boat in. Nobody works. This is intentional." },
      { day: "Days 2–3", note: "Mornings at the table; afternoons on the water" },
      { day: "Day 4", note: "The decision, made on the boat out" },
    ],
  },
  {
    slug: "the-empty-quarter",
    name: "The Empty Quarter",
    style: "Adventurous",
    image: sahara,
    tagline:
      "Walk into the erg with a camel and a guide who reads dunes the way a sailor reads swell. Sleep on the sand. Come back different.",
    duration: "6 days",
    from: "LKR 1,332,000 per person",
    bestFor: "Two to six, reasonably fit, entirely unfussy",
    includes: [
      "Three nights out on the open sand, camp struck without trace",
      "A guide who has crossed this erg since he was eleven",
      "Bread baked in the fire, tea made unhurriedly, at length",
      "No generator, no vehicle support, no music",
    ],
    itinerary: [
      { day: "Days 1–2", note: "Merzouga, and into the erg on foot" },
      { day: "Days 3–5", note: "Deep sand. The high crest at dusk. Sleeping out." },
      { day: "Day 6", note: "Out, by the black hammada, into an unbearable amount of noise" },
    ],
  },
];

export const packageStyles = [
  "All",
  "Family",
  "Business",
  "Relaxation",
  "Quiet retreat",
  "Adventurous",
];
