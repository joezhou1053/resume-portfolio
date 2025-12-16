import type { DocumentItem, FileVersion } from '../types';
import { INITIAL_DOCUMENTS } from '../constants';

const STORAGE_KEY = 'joe_zhou_portfolio_docs';

export const getDocuments = (): DocumentItem[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DOCUMENTS));
    return INITIAL_DOCUMENTS;
  }

  try {
    const parsed: DocumentItem[] = JSON.parse(stored);

    // Merge any new initial documents or updates from code into stored data
    let updated = false;
    INITIAL_DOCUMENTS.forEach(initDoc => {
      const idx = parsed.findIndex(d => d.id === initDoc.id);
      if (idx === -1) {
        parsed.push(initDoc);
        updated = true;
      } else {
        const storedCurrent = parsed[idx].versions.find(v => v.isCurrent)?.name;
        const initCurrent = initDoc.versions.find(v => v.isCurrent)?.name;
        if (initCurrent && storedCurrent !== initCurrent) {
          // replace versions for this doc with the initial definition (keeps intended demo files)
          parsed[idx].versions = initDoc.versions;
          updated = true;
        }
      }
    });

    if (updated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }

    return parsed;
  } catch (e) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DOCUMENTS));
    return INITIAL_DOCUMENTS;
  }
};

export const uploadNewVersion = (docId: string, file: File): DocumentItem[] => {
  const docs = getDocuments();
  const docIndex = docs.findIndex(d => d.id === docId);
  
  if (docIndex === -1) return docs;

  const currentDoc = docs[docIndex];
  const maxVersion = Math.max(...currentDoc.versions.map(v => v.version), 0);
  
  // Set all existing to not current
  currentDoc.versions.forEach(v => v.isCurrent = false);

  const newVersion: FileVersion = {
    version: maxVersion + 1,
    date: new Date().toISOString().split('T')[0],
    name: file.name,
    size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    isCurrent: true
  };

  // Add new version to the top
  currentDoc.versions.unshift(newVersion);
  
  // Update storage
  docs[docIndex] = currentDoc;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  
  return docs;
};

// Simulate admin check (client-side only for demo)
export const checkAdmin = (): boolean => {
  return localStorage.getItem('is_admin') === 'true';
};

export const toggleAdmin = (): boolean => {
  const current = checkAdmin();
  if (current) {
    localStorage.removeItem('is_admin');
    return false;
  } else {
    localStorage.setItem('is_admin', 'true');
    return true;
  }
};