
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { DocumentCategory, DocumentItem, ProjectAsset, Language } from '../types';
import * as StorageService from '../services/storageService';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import NotebookViewer from './NotebookViewer';

interface Props {
  language: Language;
  isAdmin: boolean;
}

const ITEMS_PER_PAGE = 6;
const PORTFOLIO_ITEMS_PER_PAGE = 3;

const DocumentManager: React.FC<Props> = ({ language, isAdmin }) => {
  const [categories, setCategories] = useState<DocumentCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<DocumentCategory | null>(null);
  const [activeDocument, setActiveDocument] = useState<DocumentItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [portfolioPage, setPortfolioPage] = useState(1);
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [previewAsset, setPreviewAsset] = useState<ProjectAsset | null>(null);
  const [currentProject, setCurrentProject] = useState<DocumentItem | null>(null);
  const [currentAssetIndex, setCurrentAssetIndex] = useState<number>(-1);
  const [currentAssetList, setCurrentAssetList] = useState<ProjectAsset[]>([]);
  const [notebookContent, setNotebookContent] = useState<string>('');
  const [loadingNotebook, setLoadingNotebook] = useState(false);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loadingMarkdown, setLoadingMarkdown] = useState(false);
  const scrollPositionRef = useRef<number>(0);
  const isModalOpenRef = useRef<boolean>(false);

  useEffect(() => {
    setCategories(StorageService.getDocuments());
  }, []);

  // Store scroll position when preview opens and restore when closes
  useEffect(() => {
    if (previewAsset || previewDoc) {
      // Mark modal as open and save scroll position if not already saved
      isModalOpenRef.current = true;
      if (scrollPositionRef.current === 0) {
        scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
      }
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Modal is closing
      const wasModalOpen = isModalOpenRef.current;
      isModalOpenRef.current = false;

      // Restore body scroll when modal closes
      document.body.style.overflow = '';

      // Only restore scroll position if modal was actually open
      if (wasModalOpen && scrollPositionRef.current > 0) {
        // Use multiple strategies to ensure scroll position is restored
        setTimeout(() => {
          window.scrollTo(0, scrollPositionRef.current);
          // Fallback: try again in next frame
          requestAnimationFrame(() => {
            window.scrollTo(0, scrollPositionRef.current);
          });
        }, 10);
      }
    }
  }, [previewAsset, previewDoc]);

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

  // Load markdown content when previewing a markdown asset
  useEffect(() => {
    if (previewAsset?.type === 'markdown' && previewAsset.url) {
      setLoadingMarkdown(true);
      fetch(previewAsset.url)
        .then(res => res.text())
        .then(content => {
          setMarkdownContent(content);
          setLoadingMarkdown(false);
        })
        .catch(err => {
          console.error('Failed to load markdown:', err);
          setLoadingMarkdown(false);
        });
    } else {
      setMarkdownContent('');
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

  const closePreview = () => {
    setPreviewAsset(null);
    setPreviewDoc(null);
    setCurrentProject(null);
    setCurrentAssetIndex(-1);
    setCurrentAssetList([]);
  };

  const openPreviewAsset = (asset: ProjectAsset, project?: DocumentItem, assetList?: ProjectAsset[]) => {
    // Save scroll position BEFORE opening preview
    scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
    setPreviewAsset(asset);

    // Store project and asset list for navigation
    if (project && assetList) {
      setCurrentProject(project);
      setCurrentAssetList(assetList);
      const index = assetList.findIndex(a => a.id === asset.id);
      setCurrentAssetIndex(index);
    }
  };

  const openPreviewDoc = (doc: DocumentItem) => {
    // Save scroll position BEFORE opening preview
    scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
    setPreviewDoc(doc);
  };

  const navigateAsset = (direction: 'prev' | 'next') => {
    if (currentAssetList.length === 0) return;

    let newIndex = currentAssetIndex;
    if (direction === 'prev') {
      if (currentAssetIndex > 0) {
        newIndex = currentAssetIndex - 1;
      } else {
        return; // Already at first, don't wrap
      }
    } else {
      if (currentAssetIndex < currentAssetList.length - 1) {
        newIndex = currentAssetIndex + 1;
      } else {
        return; // Already at last, don't wrap
      }
    }

    const nextAsset = currentAssetList[newIndex];
    if (nextAsset) {
      setPreviewAsset(nextAsset);
      setCurrentAssetIndex(newIndex);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!previewAsset || !currentProject || currentAssetList.length === 0) return;

      if (e.key === 'ArrowLeft') {
        if (currentAssetIndex > 0) {
          const prevAsset = currentAssetList[currentAssetIndex - 1];
          if (prevAsset) {
            setPreviewAsset(prevAsset);
            setCurrentAssetIndex(currentAssetIndex - 1);
          }
        }
      } else if (e.key === 'ArrowRight') {
        if (currentAssetIndex < currentAssetList.length - 1) {
          const nextAsset = currentAssetList[currentAssetIndex + 1];
          if (nextAsset) {
            setPreviewAsset(nextAsset);
            setCurrentAssetIndex(currentAssetIndex + 1);
          }
        }
      } else if (e.key === 'Escape') {
        closePreview();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [previewAsset, currentProject, currentAssetIndex, currentAssetList]);

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
              case 'pptx': extension = '.pptx'; break;
              case 'python': extension = '.py'; break;
              case 'notebook': extension = '.ipynb'; break;
              case 'tableau': extension = '.twbx'; break;
              case 'markdown': extension = '.md'; break;
              case 'video': extension = '.mp4'; break;
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
      case 'pptx': return <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>;
      case 'python':
      case 'notebook':
      case 'code': return <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
      case 'markdown': return <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4zm1 3v6h1V7l2 3 2-3v6h1V7h-1l-2 3-2-3H7z" clipRule="evenodd" /></svg>;
      case 'tableau': return <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" /></svg>;
      case 'tableau-url': return <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>;
      case 'video': return <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" /></svg>;
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

    // Check if it's a Markdown preview
    const getMarkdownUrl = () => {
      if (previewAsset?.type === 'markdown' && previewAsset.url) {
        return previewAsset.url;
      }
      return '';
    };
    const markdownUrl = getMarkdownUrl();
    const isMarkdownPreview = !!markdownUrl;

    // Check if it's a PowerPoint preview
    const getPptxUrl = () => {
      if (previewAsset?.type === 'pptx' && previewAsset.url) {
        return previewAsset.url;
      }
      return '';
    };
    const pptxUrl = getPptxUrl();
    const isPptxPreview = !!pptxUrl;

    // Check if we can use online preview (requires public URL)
    const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const canUseOnlinePreview = !isLocalDev && window.location.protocol === 'https:';

    return (
      <div className="fixed inset-0 z-[60] bg-slate-900/95 flex flex-col animate-fade-in p-4 md:p-8">
        <div className="flex justify-between items-start mb-4 text-white">
          <div className="flex items-start space-x-3">
             <div className="bg-white/10 p-2 rounded">
                {previewAsset ? getAssetIcon(previewAsset.type) : <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
             </div>
             <div>
               <h3 className="text-xl font-bold leading-tight">{title}</h3>
               <p className="text-xs text-slate-400">{filename}</p>
               {currentProject && currentAssetList.length > 1 && (
                 <div className="mt-2 flex items-center space-x-2">
                   <span className="px-2 py-1 bg-indigo-500/30 border border-indigo-400/50 rounded text-xs font-medium text-indigo-200">
                     {currentProject.title[language]}
                   </span>
                   <span className="text-xs text-blue-400">
                     {currentAssetIndex + 1} / {currentAssetList.length}
                   </span>
                 </div>
               )}
             </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Navigation buttons - only show for assets in portfolio projects, but NOT for Tableau or video files */}
            {currentProject && currentAssetList.length > 1 && previewAsset?.type !== 'tableau' && previewAsset?.type !== 'tableau-url' && previewAsset?.type !== 'video' && (
              <>
                {/* Previous button - hide if previous asset is Tableau or video */}
                {currentAssetIndex > 0 && !['tableau', 'tableau-url', 'video'].includes(currentAssetList[currentAssetIndex - 1]?.type) && (
                  <button
                    onClick={() => navigateAsset('prev')}
                    className="p-2 rounded-full transition-all group relative text-slate-300 hover:bg-white/10 hover:scale-110"
                    title={language === 'en' ? 'Previous in this project (←)' : '本项目内上一个 (←)'}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs bg-black/80 px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                      {language === 'en' ? 'Previous in project' : '项目内上一个'}
                    </span>
                  </button>
                )}
                {/* Next button - hide if next asset is Tableau or video */}
                {currentAssetIndex < currentAssetList.length - 1 && !['tableau', 'tableau-url', 'video'].includes(currentAssetList[currentAssetIndex + 1]?.type) && (
                  <button
                    onClick={() => navigateAsset('next')}
                    className="p-2 rounded-full transition-all group relative text-slate-300 hover:bg-white/10 hover:scale-110"
                    title={language === 'en' ? 'Next in this project (→)' : '本项目内下一个 (→)'}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs bg-black/80 px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                      {language === 'en' ? 'Next in project' : '项目内下一个'}
                    </span>
                  </button>
                )}
              </>
            )}
            <button onClick={closePreview} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300 hover:scale-110" title={language === 'en' ? 'Close (Esc)' : '关闭 (Esc)'}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        {/* Image Preview */}
        {isImagePreview ? (
          <div className="flex-grow flex items-center justify-center bg-white rounded-xl shadow-2xl overflow-hidden">
            <img
              src={previewAsset.url}
              alt={title}
              className="w-auto h-auto max-w-full max-h-[calc(100vh-180px)] object-contain p-4 md:p-8"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop';
              }}
            />
          </div>
        ) : isPdfPreview ? (
          /* PDF Preview with iframe - toolbar disabled to prevent download */
          <div className="flex-grow bg-white rounded-xl shadow-2xl overflow-hidden">
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full border-0"
              style={{ height: 'calc(100vh - 180px)' }}
              title={title}
            />
          </div>
        ) : isPptxPreview ? (
          /* PowerPoint Preview */
          <div className="flex-grow flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden">
            {canUseOnlinePreview ? (
              /* Online Preview with Microsoft Office Online Viewer */
              <>
                <div className="flex-grow overflow-hidden" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                  <iframe
                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(window.location.origin + pptxUrl)}`}
                    className="w-full h-full border-0"
                    title={title}
                  />
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center flex-shrink-0">
                  <p className="text-sm text-slate-500">
                    {language === 'en'
                      ? '🔒 Powered by Microsoft Office Online Viewer'
                      : '🔒 由 Microsoft Office Online Viewer 提供支持'}
                  </p>
                  <button
                    className="px-6 py-3 bg-corporate-800 text-white rounded-lg hover:bg-corporate-900 transition-all font-semibold shadow-lg"
                    onClick={() => handleDownload(pptxUrl, filename)}
                  >
                    {language === 'en' ? 'Download PowerPoint' : '下载 PowerPoint'}
                  </button>
                </div>
              </>
            ) : (
              /* Local Development - Show download prompt */
              <div className="flex-grow overflow-auto p-8" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="mb-8 w-32 h-32 bg-orange-50 rounded-3xl flex items-center justify-center">
                    <svg className="w-16 h-16 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">
                    {language === 'en' ? 'PowerPoint Presentation' : 'PowerPoint 演示文稿'}
                  </h3>
                  <div className="max-w-md space-y-4 mb-8">
                    <p className="text-slate-600 leading-relaxed">
                      {language === 'en'
                        ? 'Online preview requires the website to be deployed to a public HTTPS server. In local development, please download the file to view it.'
                        : '在线预览需要网站部署到公网 HTTPS 服务器。在本地开发环境中，请下载文件后查看。'}
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left">
                      <p className="text-sm font-semibold text-blue-900 mb-2">
                        {language === 'en' ? '💡 Viewing Options:' : '💡 查看方式：'}
                      </p>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Microsoft PowerPoint / PowerPoint Online</li>
                        <li>• Apple Keynote</li>
                        <li>• Google Slides (免费/Free)</li>
                        <li>• LibreOffice Impress</li>
                      </ul>
                    </div>
                    <p className="text-xs text-slate-400">
                      {language === 'en'
                        ? '📢 After deploying to production (e.g., Vercel, Netlify), online preview will be enabled automatically.'
                        : '📢 部署到生产环境（如 Vercel、Netlify）后，在线预览将自动启用。'}
                    </p>
                  </div>
                  <button
                    className="px-8 py-4 bg-corporate-800 text-white rounded-xl hover:bg-corporate-900 transition-all font-semibold shadow-lg flex items-center space-x-3"
                    onClick={() => handleDownload(pptxUrl, filename)}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>{language === 'en' ? 'Download PowerPoint File' : '下载 PowerPoint 文件'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : isNotebookPreview ? (
          /* Jupyter Notebook Preview with rendered content */
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
                  <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <h4 className="text-sm font-bold text-slate-700 mb-1 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {language === 'en' ? '📓 Interactive Notebook Preview' : '📓 交互式笔记本预览'}
                    </h4>
                    <p className="text-xs text-slate-600 mb-2">
                      {language === 'en'
                        ? 'Rendered notebook with syntax highlighting and formatted outputs. Code cells and outputs are displayed below.'
                        : '带有语法高亮和格式化输出的渲染笔记本。代码单元格和输出显示在下方。'}
                    </p>
                    <div className="flex items-center space-x-3 text-xs text-slate-600">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        {language === 'en' ? 'Syntax Highlighted' : '语法高亮'}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {language === 'en' ? 'Formatted Output' : '格式化输出'}
                      </span>
                    </div>
                  </div>
                  <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                    <NotebookViewer content={notebookContent} />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-red-500">{language === 'en' ? 'Failed to load notebook' : '加载笔记本失败'}</p>
                </div>
              )}
            </div>
          </div>
        ) : isMarkdownPreview ? (
          /* Markdown Preview with formatted content */
          <div className="flex-grow flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex-grow overflow-auto p-8" style={{ maxHeight: 'calc(100vh - 180px)' }}>
              {loadingMarkdown ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-corporate-800 mx-auto mb-4"></div>
                    <p className="text-slate-600">{language === 'en' ? 'Loading markdown...' : '正在加载 Markdown...'}</p>
                  </div>
                </div>
              ) : markdownContent ? (
                <div className="h-full">
                  <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h4 className="text-lg font-bold text-slate-700 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {language === 'en' ? '📝 Markdown Document' : '📝 Markdown 文档'}
                    </h4>
                    <div className="flex items-center space-x-4 text-xs text-slate-600">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                        {markdownContent.split('\n').length} {language === 'en' ? 'lines' : '行'}
                      </span>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
                        Markdown Format
                      </span>
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        table: ({ node, ...props }) => (
                          <div className="overflow-x-auto my-4">
                            <table className="min-w-full divide-y divide-slate-200 border border-slate-300" {...props} />
                          </div>
                        ),
                        thead: ({ node, ...props }) => (
                          <thead className="bg-slate-50" {...props} />
                        ),
                        tbody: ({ node, ...props }) => (
                          <tbody className="bg-white divide-y divide-slate-200" {...props} />
                        ),
                        tr: ({ node, ...props }) => (
                          <tr className="hover:bg-slate-50" {...props} />
                        ),
                        th: ({ node, ...props }) => (
                          <th className="px-4 py-2 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300 bg-slate-50" {...props} />
                        ),
                        td: ({ node, ...props }) => (
                          <td className="px-4 py-2 text-sm text-slate-700 border border-slate-200" {...props} />
                        ),
                      }}
                    >
                      {markdownContent}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-red-500">{language === 'en' ? 'Failed to load markdown' : '加载 Markdown 失败'}</p>
                </div>
              )}
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
                  {previewAsset?.type === 'pptx'
                    ? (language === 'en' ? 'PowerPoint Presentation' : 'PowerPoint 演示文稿')
                    : (language === 'en' ? 'Interactive Preview Engine' : '交互式预览引擎')
                  }
               </h4>
               <p className="text-slate-500 mb-4 leading-relaxed">
                  {previewAsset?.type === 'pptx'
                    ? (language === 'en'
                        ? "This PowerPoint presentation requires Microsoft PowerPoint, PowerPoint Online, or Keynote to view. Please download the file to your device for the best viewing experience."
                        : "此 PowerPoint 演示文稿需要 Microsoft PowerPoint、PowerPoint Online 或 Keynote 才能查看。请下载文件到本地设备以获得最佳查看体验。")
                    : (language === 'en'
                        ? "We are preparing a secure sandbox environment to display this file's contents while protecting intellectual property."
                        : "正在准备安全沙箱环境以展示文件内容，同时确保相关知识产权受到保护。")
                  }
               </p>
               {previewAsset?.type === 'pptx' && (
                 <p className="text-sm text-slate-400 mb-8">
                   {language === 'en'
                     ? "💡 Tip: You can also open .pptx files in Google Slides or PowerPoint Online (free) directly in your browser."
                     : "💡 提示：您也可以在浏览器中直接使用 Google Slides 或 PowerPoint Online（免费）打开 .pptx 文件。"}
                 </p>
               )}
               <div className="flex justify-center space-x-4">
                  <button
                    className="px-6 py-3 bg-corporate-800 text-white rounded-lg hover:bg-corporate-900 transition-all font-semibold shadow-lg"
                    onClick={() => {
                      const downloadUrl = previewAsset?.url || (previewDoc ? `/${previewDoc.versions.find(v => v.isCurrent)?.name}` : '');
                      if (downloadUrl) handleDownload(downloadUrl, filename);
                    }}
                  >
                    {previewAsset?.type === 'pptx'
                      ? (language === 'en' ? 'Download PowerPoint File' : '下载 PowerPoint 文件')
                      : (language === 'en' ? 'Download for Offline View' : '下载到本地查看')
                    }
                  </button>
                  <button
                    className="px-6 py-3 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all"
                    onClick={closePreview}
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

    const totalPages = Math.ceil(filteredItems.length / PORTFOLIO_ITEMS_PER_PAGE);
    const startIndex = (portfolioPage - 1) * PORTFOLIO_ITEMS_PER_PAGE;
    const endIndex = startIndex + PORTFOLIO_ITEMS_PER_PAGE;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);

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
               value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPortfolioPage(1); }}
               className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500 outline-none text-sm"
             />
             <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>

        <div className="space-y-12">
          {paginatedItems.map(project => (
            <div key={project.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row">
              {/* Left Column: Context (HR Attention) */}
              <div className="lg:w-1/3 p-8 bg-slate-50 border-r border-slate-100 flex flex-col">
                 <div>
                   <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4">{project.title[language]}</h3>
                   <p className={`text-slate-600 text-sm mb-8 ${language === 'zh' ? 'leading-loose' : 'leading-relaxed'}`}>
                     {project.projectSummary?.[language]}
                   </p>

                   {/* Live Demo Link */}
                   {project.liveUrl && (
                     <a
                       href={project.liveUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="mb-8 flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-semibold text-sm"
                     >
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                       </svg>
                       <span>{language === 'en' ? 'Live Demo: ' : '在线演示： '}Tableau Public</span>
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                       </svg>
                     </a>
                   )}

                   <div className="space-y-5">
                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                       {language === 'en' ? 'Core Impact' : '核心价值/产出'}
                     </h4>
                     <ul className={language === 'zh' ? "space-y-5" : "space-y-3"}>
                       {project.highlights?.[language].map((h, i) => (
                         <li key={i} className={`flex items-start text-sm text-slate-700 font-medium ${language === 'zh' ? 'leading-loose' : ''}`}>
                           <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                           {h}
                         </li>
                       ))}
                     </ul>
                   </div>
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
                    <div key={asset.id} className={`group rounded-2xl p-4 transition-all flex flex-col justify-between ${asset.type === 'tableau-url' || asset.type === 'video' ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 hover:shadow-lg hover:border-indigo-400' : 'bg-white border border-slate-100 hover:border-accent-200 hover:shadow-md'}`}>
                       <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-xl transition-colors ${asset.type === 'tableau-url' || asset.type === 'video' ? 'bg-indigo-100 group-hover:bg-indigo-200' : 'bg-slate-50 group-hover:bg-accent-50'}`}>
                             {getAssetIcon(asset.type)}
                          </div>
                          <div className="flex space-x-1">
                            {asset.type === 'tableau-url' || asset.type === 'video' ? (
                              <a
                                href={asset.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all flex items-center space-x-1 font-semibold text-xs shadow-md"
                                title={language === 'en' ? (asset.type === 'video' ? 'Watch Video' : 'Open Interactive Dashboard') : (asset.type === 'video' ? '观看视频' : '打开交互式仪表板')}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                <span>{language === 'en' ? 'Open' : '打开'}</span>
                              </a>
                            ) : (
                              <button
                                onClick={() => openPreviewAsset(asset, project, project.assets || [])}
                                className="p-2 text-slate-400 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-all"
                                title={language === 'en' ? 'Quick Look' : '快速预览'}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              </button>
                            )}
                          </div>
                       </div>
                       <div>
                         <h5 className={`font-bold text-sm mb-2 transition-colors ${asset.type === 'tableau-url' || asset.type === 'video' ? 'text-indigo-900 group-hover:text-indigo-700' : 'text-slate-800 group-hover:text-accent-700'}`}>{asset.name[language]}</h5>
                         <p className={`line-clamp-3 leading-relaxed ${asset.type === 'tableau-url' || asset.type === 'video' ? 'text-sm text-indigo-700 font-medium' : 'text-sm text-slate-600'}`}>{asset.description[language]}</p>
                       </div>
                       <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center">
                         <span className={`font-bold uppercase ${asset.type === 'tableau-url' || asset.type === 'video' ? 'text-xs text-indigo-600' : 'text-xs text-slate-400'}`}>{asset.type}</span>
                         <span className={`font-medium ${asset.type === 'tableau-url' || asset.type === 'video' ? 'text-xs text-indigo-600' : 'text-xs text-slate-400'}`}>{asset.size}</span>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {filteredItems.length > PORTFOLIO_ITEMS_PER_PAGE && (
          <div className="flex justify-center items-center mt-12 space-x-4">
            <button
              onClick={() => setPortfolioPage(prev => Math.max(1, prev - 1))}
              disabled={portfolioPage === 1}
              className="px-6 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-semibold shadow-sm"
            >
              {language === 'en' ? '← Previous' : '← 上一页'}
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-slate-700">
                {language === 'en' ? 'Page' : '第'}
              </span>
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setPortfolioPage(page)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                      portfolioPage === page
                        ? 'bg-corporate-800 text-white shadow-lg'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <span className="text-sm font-medium text-slate-700">
                {language === 'en' ? `of ${totalPages}` : `页 / 共 ${totalPages} 页`}
              </span>
            </div>
            <button
              onClick={() => setPortfolioPage(prev => Math.min(totalPages, prev + 1))}
              disabled={portfolioPage === totalPages}
              className="px-6 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-semibold shadow-sm"
            >
              {language === 'en' ? 'Next →' : '下一页 →'}
            </button>
          </div>
        )}
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
                            onClick={() => openPreviewAsset(asset, activeDocument, activeDocument.assets || [])}
                            className="p-2 text-slate-400 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-all"
                            title={language === 'en' ? 'Quick Look' : '快速预览'}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
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
                  <div className="mt-auto">
                    <button onClick={() => {
                      // If document has a single image asset, preview it directly
                      if (doc.assets && doc.assets.length === 1 && doc.assets[0].type === 'image') {
                        openPreviewAsset(doc.assets[0], doc, doc.assets);
                      } else if (doc.assets && doc.assets.length > 0) {
                        setActiveDocument(doc);
                      } else {
                        openPreviewDoc(doc);
                      }
                    }} className="w-full flex items-center justify-center px-3 py-2 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors text-xs font-medium border border-slate-200">
                      {language === 'en' ? (doc.assets && doc.assets.length === 1 && doc.assets[0].type === 'image' ? 'Preview' : doc.assets && doc.assets.length > 0 ? 'View Details' : 'Preview') : (doc.assets && doc.assets.length === 1 && doc.assets[0].type === 'image' ? '预览' : doc.assets && doc.assets.length > 0 ? '查看详情' : '预览')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {filteredItems.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              {language === 'en' ? '← Previous' : '← 上一页'}
            </button>
            <span className="text-sm text-slate-600">
              {language === 'en' ? `Page ${currentPage} of ${Math.ceil(filteredItems.length / ITEMS_PER_PAGE)}` : `第 ${currentPage} 页，共 ${Math.ceil(filteredItems.length / ITEMS_PER_PAGE)} 页`}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredItems.length / ITEMS_PER_PAGE), prev + 1))}
              disabled={currentPage === Math.ceil(filteredItems.length / ITEMS_PER_PAGE)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              {language === 'en' ? 'Next →' : '下一页 →'}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
      {categories.map((cat) => (
        <div key={cat.id} onClick={() => { setActiveCategory(cat); setCurrentPage(1); setPortfolioPage(1); }} className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
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
