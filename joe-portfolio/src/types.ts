export type Language = 'en' | 'zh';

export interface ProjectAsset {
  id: string;
  name: { en: string; zh: string };
  type: 'pdf' | 'excel' | 'word' | 'tableau' | 'python' | 'notebook' | 'visio' | 'image' | 'code';
  size: string;
  description: { en: string; zh: string };
  url?: string; // Optional URL for image/code assets
}

export interface DocumentItem {
  id: string;
  title: { en: string; zh: string };
  subtitle: { en: string; zh: string };
  type: 'resume' | 'certificate' | 'portfolio' | 'coursework';
  thumbnailUrl: string;
  projectSummary?: { en: string; zh: string }; // For portfolio items
  highlights?: { en: string[]; zh: string[] }; // Key achievements for HR
  assets?: ProjectAsset[]; // Sub-files for portfolio
  versions: FileVersion[];
}

export interface FileVersion {
  version: number;
  date: string;
  name: string;
  size: string;
  isCurrent: boolean;
}

export interface DocumentCategory {
  id: string;
  title: { en: string; zh: string };
  coverImage: string;
  items: DocumentItem[];
}

// Rest of the existing interfaces (Project, Experience, etc.) remain same
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
