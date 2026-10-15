import ServicePage from "../components/ServicePage";
import { usePageMeta } from "../usePageMeta";

export default function Corporate() {
  usePageMeta(
    "Corporate & Business Travel — MICE & Incentive Tours | Travel Port Leisure",
    "Corporate travel management, MICE (Meetings, Incentives, Conferences & Exhibitions) and corporate incentive tours — complex logistics handled, so your people arrive ready.",
  );
  return <ServicePage corporate />;
}
