import type { ComponentType } from "react";
import {
  Armchair,
  Briefcase,
  Building2,
  Car,
  Gem,
  Gift,
  Globe,
  Headphones,
  IdCard,
  Ship,
  ShieldCheck,
  Users,
  Plane,
  Palmtree,
  Presentation,
} from "lucide-react";

/** Keyed by the `icon` field on the service lists in `tpl.ts`, which — being a
    plain .ts module — can't hold components itself. */
const icons: Record<string, ComponentType<{ size?: number; className?: string }>> =
  {
    gift: Gift,
    armchair: Armchair,
    users: Users,
    ship: Ship,
    building: Building2,
    id: IdCard,
    car: Car,
    shield: ShieldCheck,
    globe: Globe,
    headphones: Headphones,
    briefcase: Briefcase,
    gem: Gem,
    plane: Plane,
    palm: Palmtree,
    presentation: Presentation,
  };

export default function ServiceIcon({
  name,
  size = 20,
}: {
  name: string;
  size?: number;
}) {
  const Glyph = icons[name] ?? Globe;
  return <Glyph size={size} className="text-primary" />;
}
