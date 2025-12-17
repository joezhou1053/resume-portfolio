import type { DocumentCategory, FileVersion } from '../types';
import { INITIAL_DOCUMENTS } from '../constants';

const STORAGE_KEY = 'joe_zhou_portfolio_v4_categories'; // Versioned key to prevent data conflict

export const getDocuments = (): DocumentCategory[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DOCUMENTS));
    return INITIAL_DOCUMENTS;
  }
  
  try {
    const parsed = JSON.parse(stored);
    // Validation to ensure we have the new Category structure (check for 'items' array in first element)
    if (Array.isArray(parsed) && parsed.length > 0 && !('items' in parsed[0])) {
        // Detected old or invalid format, reset
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DOCUMENTS));
        return INITIAL_DOCUMENTS;
    }
    return parsed;
  } catch (e) {
    return INITIAL_DOCUMENTS;
  }
};

export const uploadNewVersion = (docId: string, file: File): DocumentCategory[] => {
  const categories = getDocuments();
  let updated = false;

  // Find the category and the document
  const newCategories = categories.map(cat => {
    const docIndex = cat.items.findIndex(d => d.id === docId);
    if (docIndex !== -1) {
      const currentDoc = cat.items[docIndex];
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
      cat.items[docIndex] = currentDoc;
      updated = true;
    }
    return cat;
  });

  if (updated) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCategories));
  }
  
  return newCategories;
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