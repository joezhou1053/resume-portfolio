
import React, { useState, useEffect } from 'react';
import type { DocumentCategory, DocumentItem, ProjectAsset, Language } from '../types';
import * as StorageService from '../services/storageService';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface Props {
  language: Language;
  isAdmin: boolean;
}

const ITEMS_PER_PAGE = 6;

const DocumentManager: React.FC<Props> = ({ language, isAdmin }) => {
  const [categories, setCategories] = useState<DocumentCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<DocumentCategory | null>(null);
  const [activeDocument, setActiveDocument] = useState<DocumentItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [previewAsset, setPreviewAsset] = useState<ProjectAsset | null>(null);
  const [notebookContent, setNotebookContent] = useState<string>('');
  const [loadingNotebook, setLoadingNotebook] = useState(false);

  useEffect(() => {
    setCategories(StorageService.getDocuments());
  }, []);

  // Load notebook content when previewing a notebook asset
  useEffect(() => {
    if (previewAsset?.type === 'notebook' && previewAsset.url) {
      setLoadingNotebook(true);
      fetch(previewAsset.url)
        .then(res => res.text())
        .then(content => {
          setNotebookContent(content);
          setLoadingNotebook(false);
        })
        .catch(err => {
          console.error('Failed to load notebook:', err);
          setLoadingNotebook(false);
        });
    } else {
      setNotebookContent('');
    }
  }, [previewAsset]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, docId: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const updatedCats = StorageService.uploadNewVersion(docId, file);
      setCategories([...updatedCats]);
      if (activeCategory) {
        const updatedActive = updatedCats.find(c => c.id === activeCategory.id) || null;
        setActiveCategory(updatedActive);
      }
      alert(language === 'en' ? "New version uploaded successfully!" : "新版本上传成功！");
    }
  };

  const handleDownload = (url: string | undefined, filename: string) => {
    if (!url) return;
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBundleDownload = async (project: DocumentItem, projectName: string) => {
    if (!project.assets || project.assets.length === 0) {
      alert(language === 'en' ? 'No assets to download' : '没有可下载的资源');
      return;
    }

    try {
      // Create a new ZIP file
      const zip = new JSZip();

      // Fetch and add all assets to the ZIP
      const promises = project.assets.map(async (asset) => {
        if (asset.url) {
          try {
            const response = await fetch(asset.url);
            if (!response.ok) throw new Error(`Failed to fetch ${asset.name[language]}`);

            const blob = await response.blob();

            // Determine file extension
            let extension = '';
            switch (asset.type) {
              case 'image': extension = '.png'; break;
              case 'code': extension = '.tsx'; break;
              case 'pdf': extension = '.pdf'; break;
              case 'excel': extension = '.xlsx'; break;
              case 'python': extension = '.py'; break;
              case 'notebook': extension = '.ipynb'; break;
              case 'tableau': extension = '.twbx'; break;
              default: extension = '.bin';
            }

            // Add to ZIP with a clean filename
            const fileName = `${asset.id}_${asset.name[language].replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_')}${extension}`;
            zip.file(fileName, blob);
          } catch (error) {
            console.error(`Failed to add ${asset.name[language]} to zip:`, error);
          }
        }
      });

      // Wait for all files to be added
      await Promise.all(promises);

      // Generate ZIP file and trigger download
      const zipFileName = `${projectName.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_')}_bundle.zip`;
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, zipFileName);

    } catch (error) {
      console.error('Bundle download failed:', error);
      alert(language === 'en' ? 'Failed to create bundle' : '创建压缩包失败');
    }
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>;
      case 'excel': return <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>;
      case 'python':
      case 'notebook':
      case 'code': return <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
      case 'tableau': return <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" /></svg>;
      default: return <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>;
    }
  };

  // 1. Asset Preview Modal
  if (previewAsset || previewDoc) {
    const title = previewAsset ? previewAsset.name[language] : (previewDoc ? previewDoc.title[language] : "");
    const filename = previewAsset ? `asset_${previewAsset.id}.${previewAsset.type}` : (previewDoc?.versions.find(v => v.isCurrent)?.name || "");
    const isImagePreview = previewAsset?.type === 'image' && previewAsset.url;

    // Check if it's a PDF preview
    const getPdfUrl = () => {
      if (previewAsset?.type === 'pdf' && previewAsset.url) {
        return previewAsset.url;
      }
      if (previewDoc) {
        const currentVersion = previewDoc.versions.find(v => v.isCurrent);
        if (currentVersion?.name.endsWith('.pdf')) {
          return `/${currentVersion.name}`;
        }
      }
      return '';
    };
    const pdfUrl = getPdfUrl();
    const isPdfPreview = !!pdfUrl;

    // Check if it's a Notebook preview
    const getNotebookUrl = () => {
      if (previewAsset?.type === 'notebook' && previewAsset.url) {
        return previewAsset.url;
      }
      return '';
    };
    const notebookUrl = getNotebookUrl();
    const isNotebookPreview = !!notebookUrl;

    return (
      <div className="fixed inset-0 z-[60] bg-slate-900/95 flex flex-col animate-fade-in p-4 md:p-8">
        <div className="flex justify-between items-center mb-4 text-white">
          <div className="flex items-center space-x-3">
             <div className="bg-white/10 p-2 rounded">
                {previewAsset ? getAssetIcon(previewAsset.type) : <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
             </div>
             <div>
               <h3 className="text-xl font-bold leading-tight">{title}</h3>
               <p className="text-xs text-slate-400">{filename}</p>
             </div>
          </div>
          <button onClick={() => { setPreviewAsset(null); setPreviewDoc(null); }} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Image Preview */}
        {isImagePreview ? (
          <div className="flex-grow flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex-grow flex items-center justify-center p-4 md:p-8 overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              <img
                src={previewAsset.url}
                alt={title}
                className="w-auto h-auto max-w-full object-contain"
                style={{ maxHeight: '100%' }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop';
                }}
              />
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-center flex-shrink-0">
              <button
                className="px-6 py-3 bg-corporate-800 text-white rounded-lg hover:bg-corporate-900 transition-all font-semibold shadow-lg"
                onClick={() => handleDownload(previewAsset.url!, filename)}
              >
                {language === 'en' ? 'Download Image' : '下载图片'}
              </button>
            </div>
          </div>
        ) : isPdfPreview ? (
          /* PDF Preview with iframe */
          <div className="flex-grow flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex-grow overflow-hidden" style={{ maxHeight: 'calc(100vh - 180px)' }}>
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0"
                title={title}
              />
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-center flex-shrink-0">
              <button
                className="px-6 py-3 bg-corporate-800 text-white rounded-lg hover:bg-corporate-900 transition-all font-semibold shadow-lg"
                onClick={() => handleDownload(pdfUrl, filename)}
              >
                {language === 'en' ? 'Download PDF' : '下载 PDF'}
              </button>
            </div>
          </div>
        ) : isNotebookPreview ? (
          /* Jupyter Notebook Preview with code viewer */
          <div className="flex-grow flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex-grow overflow-auto p-6" style={{ maxHeight: 'calc(100vh - 180px)' }}>
              {loadingNotebook ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-corporate-800 mx-auto mb-4"></div>
                    <p className="text-slate-600">{language === 'en' ? 'Loading notebook...' : '正在加载笔记本...'}</p>
                  </div>
                </div>
              ) : notebookContent ? (
                <div className="h-full">
                  <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <h4 className="text-sm font-bold text-slate-700 mb-2">
                      {language === 'en' ? '📓 Jupyter Notebook Preview' : '📓 Jupyter Notebook 预览'}
                    </h4>
                    <p className="text-xs text-slate-500 mb-2">
                      {language === 'en'
                        ? 'This is the raw JSON content of the notebook. For the best viewing experience, please download and open in Jupyter or VS Code.'
                        : '这是笔记本的原始JSON内容。为了获得最佳查看体验，请下载后在Jupyter或VS Code中打开。'}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-slate-600">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {notebookContent.split('\n').length} {language === 'en' ? 'lines' : '行'}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                        JSON Format
                      </span>
                    </div>
                  </div>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-auto text-xs leading-relaxed font-mono" style={{ maxHeight: 'calc(100vh - 350px)' }}>
                    <code>{notebookContent}</code>
                  </pre>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-red-500">{language === 'en' ? 'Failed to load notebook' : '加载笔记本失败'}</p>
                </div>
              )}
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end flex-shrink-0">
              <button
                className="px-6 py-3 bg-corporate-800 text-white rounded-lg hover:bg-corporate-900 transition-all font-semibold shadow-lg"
                onClick={() => {
                  const extension = 'ipynb';
                  handleDownload(notebookUrl, `${previewAsset?.name[language]}.${extension}`);
                }}
              >
                {language === 'en' ? 'Download .ipynb File' : '下载 .ipynb 文件'}
              </button>
            </div>
          </div>
        ) : (
          /* Non-image Preview Placeholder */
          <div className="flex-grow bg-white rounded-xl shadow-2xl overflow-hidden flex items-center justify-center relative">
            <div className="text-center p-12 max-w-lg">
               <div className="mb-8 mx-auto w-24 h-24 bg-accent-50 rounded-2xl flex items-center justify-center text-accent-500 animate-pulse">
                 {previewAsset ? getAssetIcon(previewAsset.type) : <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
               </div>
               <h4 className="text-2xl font-bold text-slate-800 mb-4">
                  {language === 'en' ? 'Interactive Preview Engine' : '交互式预览引擎'}
               </h4>
               <p className="text-slate-500 mb-8 leading-relaxed">
                  {language === 'en'
                    ? "We are preparing a secure sandbox environment to display this file's contents while protecting intellectual property."
                    : "正在准备安全沙箱环境以展示文件内容，同时确保相关知识产权受到保护。"}
               </p>
               <div className="flex justify-center space-x-4">
                  <button
                    className="px-6 py-3 bg-corporate-800 text-white rounded-lg hover:bg-corporate-900 transition-all font-semibold shadow-lg"
                    onClick={() => {
                      const downloadUrl = previewAsset?.url || (previewDoc ? `/${previewDoc.versions.find(v => v.isCurrent)?.name}` : '');
                      if (downloadUrl) handleDownload(downloadUrl, filename);
                    }}
                  >
                    {language === 'en' ? 'Download for Offline View' : '下载到本地查看'}
                  </button>
                  <button
                    className="px-6 py-3 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all"
                    onClick={() => { setPreviewAsset(null); setPreviewDoc(null); }}
                  >
                    {language === 'en' ? 'Back' : '返回'}
                  </button>
               </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. Portfolio Detail View (Project Explorer)
  if (activeCategory && activeCategory.id === 'cat-portfolio') {
    const filteredItems = activeCategory.items.filter(item => {
      const q = searchQuery.toLowerCase();
      return item.title[language].toLowerCase().includes(q) || item.subtitle[language].toLowerCase().includes(q);
    });

    return (
      <div className="animate-fade-in min-h-[600px]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <button onClick={() => setActiveCategory(null)} className="flex items-center text-slate-500 hover:text-corporate-800 transition-colors font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {language === 'en' ? 'Case Studies' : '返回案例库'}
          </button>
          <div className="relative w-full md:w-64">
             <input
               type="text" placeholder={language === 'en' ? "Search projects..." : "搜索项目案例..."}
               value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500 outline-none text-sm"
             />
             <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>

        <div className="space-y-12">
          {filteredItems.map(project => (
            <div key={project.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row">
              {/* Left Column: Context (HR Attention) */}
              <div className="lg:w-1/3 p-8 bg-slate-50 border-r border-slate-100 flex flex-col">
                 <div className="mb-6">
                   <div className="flex items-center space-x-2 text-accent-600 font-bold text-xs uppercase tracking-widest mb-2">
                     <span className="w-2 h-2 rounded-full bg-accent-600"></span>
                     <span>{project.subtitle[language]}</span>
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4">{project.title[language]}</h3>
                   <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                     "{project.projectSummary?.[language]}"
                   </p>

                   <div className="space-y-4">
                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                       {language === 'en' ? 'Core Impact' : '核心价值/产出'}
                     </h4>
                     <ul className="space-y-3">
                       {project.highlights?.[language].map((h, i) => (
                         <li key={i} className="flex items-start text-sm text-slate-700 font-medium">
                           <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                           {h}
                         </li>
                       ))}
                     </ul>
                   </div>
                 </div>

                 <div className="mt-auto pt-6 border-t border-slate-200">
                    <button
                      onClick={() => {
                        handleBundleDownload(project, project.title[language]);
                      }}
                      className="w-full py-4 bg-corporate-800 text-white rounded-2xl hover:bg-corporate-900 transition-all flex items-center justify-center space-x-3 shadow-lg shadow-corporate-800/20 font-bold"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      <span>{language === 'en' ? 'Download Full Project Bundle' : '下载项目全套附件包'}</span>
                    </button>
                    <p className="text-center text-[10px] text-slate-400 mt-2">
                      {language === 'en' ? 'Includes all documentation, scripts & source files' : '包含所有相关文档、脚本及原始文件'}
                    </p>
                 </div>
              </div>

              {/* Right Column: File Explorer (Technical Proof) */}
              <div className="lg:w-2/3 p-8 bg-white">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                    {language === 'en' ? 'Project Resource Explorer' : '项目资源库'}
                  </h4>
                  <span className="text-xs text-slate-400">{project.assets?.length} {language === 'en' ? 'Files' : '个资源'}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.assets?.map(asset => (
                    <div key={asset.id} className="group bg-white border border-slate-100 rounded-2xl p-4 hover:border-accent-200 hover:shadow-md transition-all flex flex-col justify-between">
                       <div className="flex items-start justify-between mb-4">
                          <div className="bg-slate-50 p-3 rounded-xl group-hover:bg-accent-50 transition-colors">
                             {getAssetIcon(asset.type)}
                          </div>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => setPreviewAsset(asset)}
                              className="p-2 text-slate-400 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-all"
                              title={language === 'en' ? 'Quick Look' : '快速预览'}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </button>
                            <button
                              onClick={() => {
                                if (asset.url) {
                                  // Determine file extension based on type
                                  let extension = '';
                                  switch (asset.type) {
                                    case 'image': extension = 'png'; break;
                                    case 'code': extension = 'tsx'; break;
                                    case 'notebook': extension = 'ipynb'; break;
                                    case 'pdf': extension = 'pdf'; break;
                                    case 'excel': extension = 'xlsx'; break;
                                    case 'python': extension = 'py'; break;
                                    case 'tableau': extension = 'twbx'; break;
                                    default: extension = asset.type;
                                  }
                                  handleDownload(asset.url, `${asset.name[language]}.${extension}`);
                                }
                              }}
                              className="p-2 text-slate-400 hover:text-corporate-800 hover:bg-slate-100 rounded-lg transition-all"
                              title={language === 'en' ? 'Download File' : '下载文件'}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            </button>
                          </div>
                       </div>
                       <div>
                         <h5 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-accent-700 transition-colors">{asset.name[language]}</h5>
                         <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{asset.description[language]}</p>
                       </div>
                       <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center">
                         <span className="text-[10px] font-bold text-slate-300 uppercase">{asset.type}</span>
                         <span className="text-[10px] font-medium text-slate-400">{asset.size}</span>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. Certificate/Document Detail View (with assets)
  if (activeDocument) {
    return (
      <div className="animate-fade-in min-h-[600px]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <button onClick={() => setActiveDocument(null)} className="flex items-center text-slate-500 hover:text-corporate-800 transition-colors font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {language === 'en' ? 'Back to List' : '返回列表'}
          </button>
          <h2 className="text-2xl font-bold text-corporate-900">{activeDocument.title[language]}</h2>
          <div className="w-64"></div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Document Header */}
          <div className="p-8 bg-gradient-to-r from-corporate-800 to-corporate-900 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold">{activeDocument.title[language]}</h3>
                <p className="text-slate-300">{activeDocument.subtitle[language]}</p>
              </div>
            </div>
          </div>

          {/* Assets Section */}
          <div className="p-8">
            <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
              {language === 'en' ? 'Document Assets' : '文档资源'}
            </h4>

            {activeDocument.assets && activeDocument.assets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeDocument.assets.map(asset => (
                  <div key={asset.id} className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-accent-200 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-slate-50 p-3 rounded-xl group-hover:bg-accent-50 transition-colors">
                        {getAssetIcon(asset.type)}
                      </div>
                      <div className="flex space-x-1">
                        {asset.url && asset.type === 'image' && (
                          <button
                            onClick={() => setPreviewAsset(asset)}
                            className="p-2 text-slate-400 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-all"
                            title={language === 'en' ? 'Quick Look' : '快速预览'}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </button>
                        )}
                        {asset.url && (
                          <button
                            onClick={() => {
                              const extension = asset.type === 'image' ? 'jpg' :
                                              asset.type === 'code' ? 'tsx' : asset.type;
                              handleDownload(asset.url, `${asset.name[language] || 'file'}.${extension}`);
                            }}
                            className="p-2 text-slate-400 hover:text-corporate-800 hover:bg-slate-100 rounded-lg transition-all"
                            title={language === 'en' ? 'Download' : '下载'}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 mb-1 group-hover:text-accent-700 transition-colors">{asset.name[language]}</h5>
                      <p className="text-sm text-slate-500 mb-3">{asset.description[language]}</p>
                      <div className="flex justify-between items-center text-xs text-slate-400">
                        <span className="font-bold uppercase">{asset.type}</span>
                        <span className="font-medium">{asset.size}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-2xl">
                <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                <p className="text-slate-500">{language === 'en' ? 'No additional assets available' : '暂无额外资源'}</p>
              </div>
            )}
          </div>

          {/* Download Current Version */}
          {activeDocument.versions.length > 0 && (
            <div className="px-8 pb-8">
              <div className="bg-corporate-50 rounded-xl p-6 border border-corporate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-corporate-900 mb-1">{language === 'en' ? 'Current Version' : '当前版本'}</h5>
                    <p className="text-sm text-slate-500">v{activeDocument.versions.find(v => v.isCurrent)?.version} - {activeDocument.versions.find(v => v.isCurrent)?.date}</p>
                  </div>
                  <button
                    onClick={() => {
                      const currentVersion = activeDocument.versions.find(v => v.isCurrent);
                      if (currentVersion) {
                        const fileUrl = `/${currentVersion.name}`;
                        handleDownload(fileUrl, currentVersion.name);
                      }
                    }}
                    className="px-6 py-3 bg-corporate-800 text-white rounded-xl hover:bg-corporate-900 transition-all font-semibold shadow-lg flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    <span>{language === 'en' ? 'Download Document' : '下载文档'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Fallback to Category View or General Detail View
  if (activeCategory) {
    const filteredItems = activeCategory.items.filter(item => {
      const q = searchQuery.toLowerCase();
      return item.title[language].toLowerCase().includes(q) || item.subtitle[language].toLowerCase().includes(q);
    });

    return (
      <div className="animate-fade-in min-h-[500px]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <button onClick={() => setActiveCategory(null)} className="flex items-center text-slate-500 hover:text-corporate-800 transition-colors self-start md:self-auto">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {language === 'en' ? 'Back to Categories' : '返回分类'}
          </button>
          <h2 className="text-2xl font-bold text-corporate-900">{activeCategory.title[language]}</h2>
          <div className="relative w-full md:w-64">
             <input
               type="text" placeholder={language === 'en' ? "Search..." : "搜索..."}
               value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none text-sm"
             />
             <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map(doc => {
            const currentVersion = doc.versions.find(v => v.isCurrent);
            return (
              <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all group flex flex-col h-full">
                <div className="h-40 bg-slate-100 relative overflow-hidden">
                  <img src={doc.thumbnailUrl} alt="" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-corporate-800 shadow-sm">
                    v{currentVersion?.version}
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <p className="text-xs font-semibold text-accent-600 uppercase tracking-wider mb-1">{doc.subtitle[language]}</p>
                  <h3 className="font-bold text-slate-800 mb-4 line-clamp-2">{doc.title[language]}</h3>
                  <div className="mt-auto grid grid-cols-2 gap-2">
                    <button onClick={() => {
                      // If document has a single image asset, preview it directly
                      if (doc.assets && doc.assets.length === 1 && doc.assets[0].type === 'image') {
                        setPreviewAsset(doc.assets[0]);
                      } else if (doc.assets && doc.assets.length > 0) {
                        setActiveDocument(doc);
                      } else {
                        setPreviewDoc(doc);
                      }
                    }} className="flex items-center justify-center px-3 py-2 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors text-xs font-medium border border-slate-200">
                      {language === 'en' ? (doc.assets && doc.assets.length === 1 && doc.assets[0].type === 'image' ? 'Preview' : doc.assets && doc.assets.length > 0 ? 'View Details' : 'Preview') : (doc.assets && doc.assets.length === 1 && doc.assets[0].type === 'image' ? '预览' : doc.assets && doc.assets.length > 0 ? '查看详情' : '预览')}
                    </button>
                    <button
                      onClick={() => {
                        const fileUrl = `/${currentVersion?.name}`;
                        handleDownload(fileUrl, currentVersion?.name || 'document');
                      }}
                      className="flex items-center justify-center px-3 py-2 bg-corporate-800 text-white rounded-lg hover:bg-corporate-900 transition-colors text-xs font-medium"
                    >
                      {language === 'en' ? 'Download' : '下载'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
      {categories.map((cat) => (
        <div key={cat.id} onClick={() => setActiveCategory(cat)} className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="absolute inset-0">
            <img src={cat.coverImage} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-corporate-900/90 to-corporate-900/30 group-hover:to-corporate-900/50 transition-colors" />
          </div>
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">{cat.title[language]}</h3>
            <div className="flex justify-between items-center">
              <span className="text-slate-300 text-sm font-medium">{cat.items.length} {language === 'en' ? 'Items' : '个文件'}</span>
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
