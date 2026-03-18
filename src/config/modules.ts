export interface ResumeModule {
  id: string;
  titleKey: string;
  icon: string;
}

export const STANDARD_MODULES: Record<string, ResumeModule> = {
  skills: { id: "skills", titleKey: "skills", icon: "Zap" },
  experience: { id: "experience", titleKey: "experience", icon: "Briefcase" },
  projects: { id: "projects", titleKey: "projects", icon: "Rocket" },
  education: { id: "education", titleKey: "education", icon: "GraduationCap" },
  selfEvaluation: {
    id: "selfEvaluation",
    titleKey: "selfEvaluation",
    icon: "MessageSquare",
  },
  certificates: { id: "certificates", titleKey: "certificates", icon: "Award" },
};
