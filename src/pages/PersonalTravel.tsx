import ServicePage from "../components/ServicePage";
import { usePageMeta } from "../usePageMeta";

export default function PersonalTravel() {
  usePageMeta(
    "Personal Travels — Curated Holidays & Cruises | Travel Port Leisure",
    "Curated holidays, luxury & FIT travel, group tours and cruise bookings — planned around you by veteran travel professionals in Colombo, Sri Lanka.",
  );
  return <ServicePage />;
}
