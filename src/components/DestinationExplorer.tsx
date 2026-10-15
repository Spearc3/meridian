import { Component, Suspense, lazy, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button, Eyebrow } from "./ui";
import type { GlobeApi } from "./Globe";
import { openAdvisor } from "../advisor";
import { continents, destinations, home } from "../tpl";

// three.js is the bulk of the site's JavaScript and only the globe uses it:
// split it out so other pages never download it, and so the page paints
// before the WebGL scene is parsed.
const Globe = lazy(() => import("./Globe").then((m) => ({ default: m.Globe })));

const globePlaces = destinations.map((d) => ({ name: d.name, country: d.region, lat: d.lat, lng: d.lng }));
const globeHome = { ...home };

/** No WebGL (or a lost context) leaves the stage empty rather than taking the
 *  page down with it. */
class GlobeBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <div className="globe-loading" /> : this.props.children;
  }
}

/** "Where we take you": the globe, a photographed spotlight, and every
 *  destination by continent. */
export default function DestinationExplorer() {
  const [spotlight, setSpotlight] = useState(0);
  const [continentIndex, setContinentIndex] = useState(2);
  const continent = continents[continentIndex];
  const globe = useRef<GlobeApi | null>(null);
  const destination = destinations[spotlight] ?? destinations[0];

  return (
    <section className="destination-explorer" id="destinations">
      <div className="travel-shell">
        <div className="section-heading">
          <div>
            <Eyebrow>Where we take you</Eyebrow>
            <h2>
              Seven continents,
              <br />
              <em>one travel desk.</em>
            </h2>
          </div>
        </div>

        <div className="globe-landscape">
          <div className="globe-stage">
            <GlobeBoundary>
              <Suspense fallback={<div className="globe-loading" />}>
                <Globe
                  destinations={globePlaces}
                  home={globeHome}
                  className="h-full w-full"
                  onReady={(api) => {
                    globe.current = api;
                    api.flyTo(globePlaces[spotlight]);
                  }}
                />
              </Suspense>
            </GlobeBoundary>
          </div>
          <div key={destination.slug} className="destination-spotlight">
            <img
              src={destination.image}
              alt={destination.name}
              className="destination-photo"
              loading="lazy"
              width={1536}
              height={1024}
            />
            <div className="destination-label">
              <span className="eyebrow">Colombo → {destination.region}</span>
              <h3>{destination.name}</h3>
              <p className="destination-places">{destination.places.join(" · ")}</p>
              <button
                type="button"
                className="text-link"
                onClick={() => openAdvisor({ track: "personal", place: destination.name })}
              >
                Plan this journey <ArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div className="continent-list" aria-label="Continents and destinations">
          <div className="continent-tabs" role="tablist" aria-label="Continents">
            {continents.map((c, i) => (
              <Button
                key={c.name}
                variant="travelGhost"
                className="region-tab"
                role="tab"
                id={`continent-tab-${i}`}
                aria-selected={i === continentIndex}
                aria-controls="continent-panel"
                onClick={() => {
                  setContinentIndex(i);
                  // The spotlight follows when the continent has a photographed destination.
                  const match = destinations.findIndex(
                    (d) => d.region === c.name || (c.name === "North America" && d.region === "USA"),
                  );
                  if (match >= 0) setSpotlight(match);
                  globe.current?.flyTo(c);
                }}
              >
                {c.name}
              </Button>
            ))}
          </div>
          {continent && (
            <div
              key={continent.name}
              className="continent-content"
              id="continent-panel"
              role="tabpanel"
              aria-labelledby={`continent-tab-${continentIndex}`}
            >
              {continent.groups.length === 0 ? (
                <button
                  type="button"
                  className="text-link"
                  onClick={() => openAdvisor({ track: "personal", place: continent.name })}
                >
                  Enquire about {continent.name} <ArrowRight />
                </button>
              ) : (
                continent.groups.map((group) => (
                  <details key={group.name} className="subregion-entry">
                    <summary>
                      {group.name}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <div>
                      {group.countries.map((country) => (
                        <details key={country.name} className="country-entry">
                          <summary>
                            {country.name}
                            <span aria-hidden="true">+</span>
                          </summary>
                          <div className="city-links">
                            {country.cities.map((city) => (
                              <button
                                key={city}
                                type="button"
                                onClick={() => openAdvisor({ track: "personal", place: city })}
                              >
                                {city}
                                <ArrowRight size={12} />
                              </button>
                            ))}
                            <button
                              type="button"
                              onClick={() => openAdvisor({ track: "personal", place: country.name })}
                            >
                              Plan a journey to {country.name}
                              <ArrowRight size={12} />
                            </button>
                          </div>
                        </details>
                      ))}
                    </div>
                  </details>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
