import React, { useState, useEffect } from 'react';
import type { DocumentItem, Language } from '../types';
import * as StorageService from '../services/storageService';

interface Props {
  language: Language;
  isAdmin: boolean;
}

const DocumentManager: React.FC<Props> = ({ language, isAdmin }) => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [expandedHistory, setExpandedHistory] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    setDocuments(StorageService.getDocuments());
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, docId: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const updatedDocs = StorageService.uploadNewVersion(docId, file);
      setDocuments([...updatedDocs]);
      alert(language === 'en' ? "New version uploaded successfully!" : "新版本上传成功！");
    }
  };

  const toggleHistory = (id: string) => {
    setExpandedHistory(expandedHistory === id ? null : id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => {
        const currentVersion = doc.versions.find(v => v.isCurrent);
        const history = doc.versions.filter(v => !v.isCurrent);

        return (
          <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-corporate-50 rounded-lg">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 border border-slate-200 px-2 py-1 rounded">
                {doc.type}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-1">{doc.title[language]}</h3>
            
            {currentVersion && (
              <div className="mb-4">
                <p className="text-sm text-slate-500 mb-2 flex items-center">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full mr-2">
                    v{currentVersion.version}
                  </span>
                  {currentVersion.date}
                </p>
                <div className="flex items-center space-x-2 text-sm text-corporate-500">
                  <span>{currentVersion.name}</span>
                  <span className="text-slate-400">• {currentVersion.size}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col space-y-2 mt-4">
              {currentVersion && (
                <div className="flex space-x-2">
                  <a
                    href={`/${currentVersion.name}`}
                    download
                    className="flex-1 py-2 px-4 bg-corporate-800 hover:bg-corporate-900 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>{language === 'en' ? 'Download Current' : '下载当前版本'}</span>
                  </a>

                  <button
                    onClick={() => setPreviewUrl(`/${currentVersion.name}`)}
                    className="py-2 px-4 border border-accent-500 text-accent-600 rounded-lg hover:bg-accent-50 transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14v-4zM3 6v12a2 2 0 002 2h8l6-6V6a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <span>{language === 'en' ? 'Preview' : '在线预览'}</span>
                  </button>
                </div>
              )}

              {isAdmin && (
                <div className="relative group">
                  <input 
                    type="file" 
                    onChange={(e) => handleFileUpload(e, doc.id)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".pdf,.doc,.docx"
                  />
                  <button className="w-full py-2 px-4 border-2 border-dashed border-accent-500 text-accent-600 rounded-lg hover:bg-accent-50 transition-colors flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span>{language === 'en' ? 'Upload New Version' : '上传新版本'}</span>
                  </button>
                </div>
              )}
            </div>

            {history.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <button 
                  onClick={() => toggleHistory(doc.id)}
                  className="text-xs text-slate-500 hover:text-accent-600 flex items-center transition-colors"
                >
                  <svg className={`w-3 h-3 mr-1 transform transition-transform ${expandedHistory === doc.id ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {language === 'en' ? 'Version History' : '历史版本记录'}
                </button>
                
                {expandedHistory === doc.id && (
                  <ul className="mt-2 space-y-2">
                        {history.map(h => (
                          <li key={h.version} className="flex justify-between items-center text-xs text-slate-400 bg-slate-50 p-2 rounded">
                            <span>v{h.version} - {h.date}</span>
                            <a href={`/${h.name}`} target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:underline">{language === 'en' ? 'View' : '查看'}</a>
                          </li>
                        ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        );
      })}
          {previewUrl && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="w-11/12 md:w-3/4 lg:w-2/3 h-4/5 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex items-center justify-between p-3 border-b">
                  <div className="text-sm font-semibold">{language === 'en' ? 'Preview' : '在线预览'}</div>
                  <button onClick={() => setPreviewUrl(null)} className="text-slate-500 hover:text-slate-800">✕</button>
                </div>
                <iframe src={previewUrl} className="w-full h-full" title="Document Preview" />
              </div>
            </div>
          )}
    </div>
  );
};

export default DocumentManager;