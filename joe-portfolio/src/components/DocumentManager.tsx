import React, { useState, useEffect } from 'react';
import type { DocumentCategory, DocumentItem, Language } from '../types';
import * as StorageService from '../services/storageService';

interface Props {
  language: Language;
  isAdmin: boolean;
}

const ITEMS_PER_PAGE = 6;

const DocumentManager: React.FC<Props> = ({ language, isAdmin }) => {
  const [categories, setCategories] = useState<DocumentCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<DocumentCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  useEffect(() => {
    setCategories(StorageService.getDocuments());
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, docId: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const updatedCats = StorageService.uploadNewVersion(docId, file);
      setCategories([...updatedCats]);
      // Update active category ref as well to reflect changes immediately in UI
      if (activeCategory) {
        const updatedActive = updatedCats.find(c => c.id === activeCategory.id) || null;
        setActiveCategory(updatedActive);
      }
      alert(language === 'en' ? "New version uploaded successfully!" : "新版本上传成功！");
    }
  };

  const enterCategory = (cat: DocumentCategory) => {
    setActiveCategory(cat);
    setCurrentPage(1);
    setSearchQuery('');
  };

  const goBack = () => {
    setActiveCategory(null);
    setPreviewDoc(null);
  };

  // -- Render Logic --

  // 1. Online Preview Modal
  if (previewDoc) {
    return (
      <div className="fixed inset-0 z-[60] bg-slate-900/90 flex flex-col animate-fade-in p-4 md:p-8">
        <div className="flex justify-between items-center mb-4 text-white">
          <h3 className="text-xl font-bold">{previewDoc.title[language]} - {language === 'en' ? 'Preview' : '在线预览'}</h3>
          <button onClick={() => setPreviewDoc(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-grow bg-white rounded-lg shadow-2xl overflow-hidden flex items-center justify-center relative">
          {/* Mock Preview Content */}
          <div className="text-center p-8">
             <div className="mb-6 mx-auto w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
               <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
             </div>
             <p className="text-slate-500 mb-2">{language === 'en' ? 'This is a preview simulation for:' : '此为模拟预览界面：'}</p>
             <h2 className="text-2xl font-bold text-slate-800 mb-4">{previewDoc.title[language]}</h2>
             <p className="text-sm text-slate-400">File: {previewDoc.versions.find(v => v.isCurrent)?.name}</p>
             <button className="mt-8 px-6 py-2 bg-accent-600 text-white rounded hover:bg-accent-700 transition-colors" onClick={() => setPreviewDoc(null)}>
                {language === 'en' ? 'Close Preview' : '关闭预览'}
             </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Detail View (Inside a Category)
  if (activeCategory) {
    const filteredItems = activeCategory.items.filter(item => {
      const q = searchQuery.toLowerCase();
      return (
        item.title[language].toLowerCase().includes(q) ||
        item.subtitle[language].toLowerCase().includes(q)
      );
    });

    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const paginatedItems = filteredItems.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    return (
      <div className="animate-fade-in min-h-[500px]">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <button onClick={goBack} className="flex items-center text-slate-500 hover:text-corporate-800 transition-colors self-start md:self-auto">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {language === 'en' ? 'Back to Categories' : '返回分类'}
          </button>
          
          <h2 className="text-2xl font-bold text-corporate-900 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:z-10">
            {activeCategory.title[language]}
          </h2>
          
          {(() => {
            // Hide search box for categories that don't need search (resume / degree)
            const noSearchCategories = ['cat-resume', 'cat-degree'];
            const showSearch = !noSearchCategories.includes(activeCategory.id);
            if (!showSearch) return null;

            return (
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder={language === 'en' ? "Search by course or title..." : "搜索课程或标题..."}
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none text-sm"
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            );
          })()}
        </div>

        {/* Grid */}
        {paginatedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedItems.map(doc => {
              const currentVersion = doc.versions.find(v => v.isCurrent);
              return (
                <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all group flex flex-col h-full">
                  {/* Thumbnail Area */}
                  <div className="h-40 bg-slate-100 relative overflow-hidden">
                    {doc.thumbnailUrl ? (
                      <img
                        src={doc.thumbnailUrl}
                        alt={doc.title[language]}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=400&auto=format&fit=crop'; }}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-corporate-800 shadow-sm">
                      v{currentVersion?.version}
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-5 flex-grow flex flex-col">
                    <p className="text-xs font-semibold text-accent-600 uppercase tracking-wider mb-1">
                      {doc.subtitle[language]}
                    </p>
                    <h3 className="font-bold text-slate-800 mb-2 line-clamp-2" title={doc.title[language]}>
                      {doc.title[language]}
                    </h3>
                    
                    <div className="mt-auto pt-4 space-y-2">
                       <div className="grid grid-cols-2 gap-2">
                         <button 
                            onClick={() => setPreviewDoc(doc)}
                            className="flex items-center justify-center px-3 py-2 bg-slate-50 text-slate-700 rounded hover:bg-slate-100 transition-colors text-xs font-medium border border-slate-200"
                         >
                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                           {language === 'en' ? 'Preview' : '预览'}
                         </button>
                         <button 
                            className="flex items-center justify-center px-3 py-2 bg-corporate-800 text-white rounded hover:bg-corporate-900 transition-colors text-xs font-medium"
                            onClick={() => alert(language === 'en' ? `Downloading ${currentVersion?.name}...` : `正在下载 ${currentVersion?.name}...`)}
                         >
                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                           {language === 'en' ? 'Download' : '下载'}
                         </button>
                       </div>

                       {isAdmin && (
                         <div className="relative overflow-hidden group/upload mt-2 text-center">
                            <input type="file" onChange={(e) => handleFileUpload(e, doc.id)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <span className="text-xs text-slate-400 hover:text-accent-500 cursor-pointer underline decoration-dotted">
                              {language === 'en' ? 'Update Version' : '更新版本'}
                            </span>
                         </div>
                       )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400">
             <p>{language === 'en' ? 'No documents found matching your search.' : '未找到匹配的文档。'}</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 space-x-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              &larr;
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                  currentPage === i + 1 
                  ? 'bg-corporate-800 text-white' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              &rarr;
            </button>
          </div>
        )}
      </div>
    );
  }

  // 3. Category View (Default)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
      {categories.map((cat) => (
        <div 
          key={cat.id} 
          onClick={() => enterCategory(cat)}
          className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={cat.coverImage}
              alt=""
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200&auto=format&fit=crop'; }}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-corporate-900/90 to-corporate-900/40 group-hover:to-corporate-900/50 transition-colors" />
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">
              {cat.title[language]}
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-slate-300 text-sm font-medium">
                {cat.items.length} {language === 'en' ? 'Items' : '个文件'}
              </span>
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent-600 transition-colors text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentManager;