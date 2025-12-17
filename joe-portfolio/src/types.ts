export type Language = 'en' | 'zh';

export interface Project {
  name: string;
  role: string;
  description: string[];
  technologies: string[];
}

export interface Experience {
  company: string;
  title: string;
  period: string;
  location: string;
  description: string[];
  projects: Project[];
}

export interface Education {
  school: string;
  degree: string;
  major: string;
  period: string;
  details: string[];
}

export interface SkillSet {
  category: string;
  items: string[];
}

export interface AppContent {
  nav: {
    home: string;
    experience: string;
    skills: string;
    portfolio: string;
    contact: string;
    downloadResume: string;
  };
  hero: {
    greeting: string;
    role: string;
    summary: string;
    cta: string;
  };
  sectionTitles: {
    experience: string;
    education: string;
    skills: string;
    portfolio: string;
    documents: string;
  };
  experience: Experience[];
  education: Education[];
  skills: {
    hard: SkillSet[];
    soft: string[];
    languages: string[];
  };
}

export interface FileVersion {
  version: number;
  date: string;
  name: string;
  size: string;
  isCurrent: boolean;
}

export interface DocumentItem {
  id: string;
  title: { en: string; zh: string };
  subtitle: { en: string; zh: string }; // New: Course Name or Issuer
  type: 'resume' | 'certificate' | 'portfolio' | 'coursework';
  thumbnailUrl: string; // New: For visuals
  previewUrl?: string; // New: For online preview
  versions: FileVersion[];
}

export interface DocumentCategory {
  id: string;
  title: { en: string; zh: string };
  coverImage: string;
  items: DocumentItem[];
}