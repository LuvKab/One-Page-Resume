import { MenuSection } from "@/types/resume";

export const FALLBACK_SECTION_ICON_KEY = "FileText";
export const CUSTOM_SECTION_ICON_KEY = "CirclePlus";

export const SECTION_ICON_BY_ID: Record<string, string> = {
  basic: "User",
  skills: "Zap",
  experience: "Briefcase",
  projects: "Rocket",
  education: "GraduationCap",
  selfEvaluation: "MessageSquare",
  certificates: "Award",
};

const LEGACY_ICON_ALIASES: Record<string, string> = {
  "👤": "User",
  "⚡": "Zap",
  "💼": "Briefcase",
  "🚀": "Rocket",
  "🎓": "GraduationCap",
  "💬": "MessageSquare",
  "🏆": "Award",
  "➕": CUSTOM_SECTION_ICON_KEY,
};

const ICON_KEY_ALIASES: Record<string, string> = {
  user: "User",
  zap: "Zap",
  briefcase: "Briefcase",
  rocket: "Rocket",
  graduationcap: "GraduationCap",
  messagesquare: "MessageSquare",
  award: "Award",
  circleplus: CUSTOM_SECTION_ICON_KEY,
  plus: CUSTOM_SECTION_ICON_KEY,
  filetext: FALLBACK_SECTION_ICON_KEY,
};

const KNOWN_ICON_KEYS = new Set<string>([
  ...Object.values(SECTION_ICON_BY_ID),
  CUSTOM_SECTION_ICON_KEY,
  FALLBACK_SECTION_ICON_KEY,
]);

const getDefaultSectionIcon = (sectionId?: string) => {
  if (sectionId?.startsWith("custom")) {
    return CUSTOM_SECTION_ICON_KEY;
  }
  if (!sectionId) {
    return FALLBACK_SECTION_ICON_KEY;
  }
  return SECTION_ICON_BY_ID[sectionId] || FALLBACK_SECTION_ICON_KEY;
};

export const normalizeMenuSectionIcon = (
  icon: string | undefined,
  sectionId?: string
) => {
  const normalizedIcon = icon?.trim();

  if (normalizedIcon) {
    if (LEGACY_ICON_ALIASES[normalizedIcon]) {
      return LEGACY_ICON_ALIASES[normalizedIcon];
    }

    if (KNOWN_ICON_KEYS.has(normalizedIcon)) {
      return normalizedIcon;
    }

    const lowerIcon = normalizedIcon.toLowerCase();
    if (ICON_KEY_ALIASES[lowerIcon]) {
      return ICON_KEY_ALIASES[lowerIcon];
    }
  }

  return getDefaultSectionIcon(sectionId);
};

export const normalizeMenuSections = (sections: MenuSection[] = []) =>
  sections.map((section) => ({
    ...section,
    icon: normalizeMenuSectionIcon(section.icon, section.id),
  }));

