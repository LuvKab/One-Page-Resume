import {
  Award,
  Briefcase,
  CirclePlus,
  FileText,
  GraduationCap,
  MessageSquare,
  Rocket,
  User,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { normalizeMenuSectionIcon } from "@/utils/menuSectionIcons";

const ICON_COMPONENTS: Record<string, LucideIcon> = {
  User,
  Zap,
  Briefcase,
  Rocket,
  GraduationCap,
  MessageSquare,
  Award,
  CirclePlus,
  FileText,
};

interface MenuSectionIconProps {
  icon?: string;
  sectionId?: string;
  className?: string;
  strokeWidth?: number;
}

export function MenuSectionIcon({
  icon,
  sectionId,
  className,
  strokeWidth = 1.9,
}: MenuSectionIconProps) {
  const iconKey = normalizeMenuSectionIcon(icon, sectionId);
  const IconComponent = ICON_COMPONENTS[iconKey] ?? FileText;

  return (
    <IconComponent
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    />
  );
}

