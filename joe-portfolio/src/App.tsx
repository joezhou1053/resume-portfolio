import React, { useState, useEffect } from 'react';
import type { Language, AppContent } from './types';
import { CONTENT_EN, CONTENT_ZH } from './constants';
import * as StorageService from './services/storageService';
import SkillsChart from './components/SkillsChart';
import DocumentManager from './components/DocumentManager';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('zh');
  const [content, setContent] = useState<AppContent>(CONTENT_ZH);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setContent(lang === 'en' ? CONTENT_EN : CONTENT_ZH);
    setIsAdmin(StorageService.checkAdmin());
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  };

  const handleAdminToggle = () => {
    const newState = StorageService.toggleAdmin();
    setIsAdmin(newState);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-700">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-corporate-800 to-accent-600 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
                JOE ZHOU
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('experience')} className="text-sm font-medium hover:text-accent-600 transition-colors">{content.nav.experience}</button>
              <button onClick={() => scrollToSection('skills')} className="text-sm font-medium hover:text-accent-600 transition-colors">{content.nav.skills}</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-sm font-medium hover:text-accent-600 transition-colors">{content.nav.portfolio}</button>
              <button onClick={() => scrollToSection('documents')} className="text-sm font-medium hover:text-accent-600 transition-colors">{content.nav.downloadResume}</button>
              
              <div className="flex items-center border-l border-slate-200 pl-6 space-x-4">
                <button 
                  onClick={toggleLanguage}
                  className="px-3 py-1 text-sm font-bold border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
                >
                  {lang === 'en' ? '中文' : 'EN'}
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
               <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                 </svg>
               </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection('experience')} className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50">{content.nav.experience}</button>
              <button onClick={() => scrollToSection('skills')} className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50">{content.nav.skills}</button>
              <button onClick={() => scrollToSection('documents')} className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50">{content.nav.downloadResume}</button>
              <button onClick={toggleLanguage} className="block w-full text-left px-3 py-2 text-base font-bold text-accent-600 bg-slate-50">
                 {lang === 'en' ? 'Switch to Chinese' : '切换到英文'}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="bg-corporate-900 text-white pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:w-2/3">
            <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-accent-500 uppercase bg-corporate-800 rounded-full border border-corporate-500">
              {lang === 'en' ? 'Available for new opportunities' : '寻求商业分析/数据分析机会'}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
              {content.hero.greeting}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-light mb-8">
              {content.hero.role}
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed">
              {content.hero.summary}
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollToSection('portfolio')} className="px-8 py-3 bg-accent-600 hover:bg-accent-500 text-white font-semibold rounded-lg shadow-lg shadow-accent-600/30 transition-all transform hover:-translate-y-0.5">
                {content.hero.cta}
              </button>
              <button onClick={() => scrollToSection('documents')} className="px-8 py-3 bg-corporate-800 hover:bg-corporate-700 text-slate-200 font-semibold rounded-lg border border-corporate-600 transition-all">
                {content.nav.downloadResume}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        
        {/* Experience Section */}
        <section id="experience" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-corporate-900 mb-12 flex items-center">
              <span className="w-2 h-8 bg-accent-600 mr-4 rounded-full"></span>
              {content.sectionTitles.experience}
            </h2>

            <div className="space-y-12">
              {content.experience.map((job, idx) => (
                <div key={idx} className="relative border-l-2 border-slate-200 pl-8 md:pl-12 ml-4">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent-600 ring-4 ring-white"></div>
                  
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-2xl font-bold text-slate-800">{job.title}</h3>
                    <span className="text-accent-600 font-semibold bg-accent-50 px-3 py-1 rounded-full text-sm w-fit mt-2 md:mt-0">
                      {job.period}
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-xl text-corporate-500 font-medium mb-1">{job.company}</h4>
                    <p className="text-slate-400 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {job.location}
                    </p>
                  </div>

                  <ul className="list-disc list-inside space-y-2 mb-8 text-slate-600">
                    {job.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>

                  {/* Projects Grid */}
                  <div id="portfolio" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {job.projects.map((proj, pIdx) => (
                      <div key={pIdx} className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:border-accent-200 hover:shadow-lg transition-all group">
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="font-bold text-corporate-800 group-hover:text-accent-600 transition-colors">{proj.name}</h5>
                          <span className="text-xs font-semibold bg-white text-slate-500 px-2 py-1 rounded border border-slate-200">
                            {proj.role}
                          </span>
                        </div>
                        <ul className="text-sm text-slate-600 space-y-2 mb-4 min-h-[80px]">
                          {proj.description.map((d, di) => (
                            <li key={di} className="flex items-start">
                              <span className="mr-2 text-accent-500 mt-1.5">•</span>
                              <span className="flex-1">{d}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {proj.technologies.map((tech, ti) => (
                            <span key={ti} className="text-xs text-corporate-500 bg-white border border-slate-200 px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Skills Split Section */}
        <section id="skills" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Education Column */}
              <div className="lg:col-span-1">
                <h2 className="text-3xl font-bold text-corporate-900 mb-8 flex items-center">
                  <span className="w-2 h-8 bg-corporate-500 mr-4 rounded-full"></span>
                  {content.sectionTitles.education}
                </h2>
                {content.education.map((edu, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-red-100 text-red-700 rounded-lg flex items-center justify-center font-bold text-xl mr-4">
                        O
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">{edu.school}</h3>
                        <p className="text-sm text-slate-500">{edu.degree} - {edu.major}</p>
                      </div>
                    </div>
                    <ul className="space-y-3 text-sm text-slate-600">
                      {edu.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="w-4 h-4 mr-2 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                
                {/* Languages Sub-box */}
                <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                   <h3 className="font-bold text-lg text-slate-900 mb-4">{lang === 'en' ? 'Languages' : '语言能力'}</h3>
                   <div className="space-y-3">
                     {content.skills.languages.map((l, i) => (
                       <div key={i} className="flex items-center justify-between">
                         <span className="text-slate-600">{l.split('(')[0]}</span>
                         <span className="text-xs font-semibold bg-slate-100 px-2 py-1 rounded text-slate-500">{l.split('(')[1]?.replace(')', '') || 'Native'}</span>
                       </div>
                     ))}
                   </div>
                </div>
              </div>

              {/* Skills Visualizations */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-corporate-900 mb-8 flex items-center">
                   <span className="w-2 h-8 bg-corporate-500 mr-4 rounded-full"></span>
                   {content.sectionTitles.skills}
                </h2>
                <SkillsChart language={lang} />
                
                {/* Soft Skills Tags */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-corporate-800 mb-4">{lang === 'en' ? 'Interpersonal & Leadership' : '软技能与领导力'}</h3>
                  <div className="flex flex-wrap gap-3">
                    {content.skills.soft.map((skill, i) => (
                      <span key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 text-sm hover:border-accent-400 hover:text-accent-600 transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Document Management Section */}
        <section id="documents" className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
               <h2 className="text-3xl font-bold text-corporate-900 flex items-center">
                <span className="w-2 h-8 bg-accent-600 mr-4 rounded-full"></span>
                {content.sectionTitles.documents}
              </h2>
              {isAdmin && (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider animate-pulse">
                  {lang === 'en' ? 'Admin Mode' : '管理员模式'}
                </span>
              )}
            </div>

            <DocumentManager language={lang} isAdmin={isAdmin} />
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-corporate-900 text-slate-400 py-12 border-t border-corporate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-white text-lg font-bold mb-2">Joe Zhou</h3>
              <p className="text-sm">
                {lang === 'en' ? 'Business Analysis • Financial Engineering • Data Analytics' : '商业分析 • 金融工程 • 数据分析'}
              </p>
            </div>
            <div className="md:text-right text-sm">
              <p>© {new Date().getFullYear()} Joe Zhou. All rights reserved.</p>
              <div className="mt-2 space-x-4">
                <a href="mailto:joe.zhou@example.com" className="hover:text-white transition-colors">Email</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                {/* Secret Admin Toggle - Hidden from clear view, acting as the 'Only I can edit' mechanic */}
                <button 
                  onClick={handleAdminToggle} 
                  className={`opacity-20 hover:opacity-100 transition-opacity ${isAdmin ? 'text-red-500' : 'text-slate-600'}`}
                  title="Admin Toggle"
                >
                  π
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;