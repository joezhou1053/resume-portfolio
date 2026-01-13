import React, { useState, useEffect } from 'react';
import type { Language, AppContent } from './types';
import { CONTENT_EN, CONTENT_ZH } from './constants';
import * as StorageService from './services/storageService';
import { useMemo } from 'react';
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
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => scrollToSection('experience')} className="text-sm font-medium hover:text-accent-600 transition-colors">{content.nav.experience}</button>
              <button onClick={() => scrollToSection('skills')} className="text-sm font-medium hover:text-accent-600 transition-colors">{content.nav.skills}</button>
              <button onClick={() => scrollToSection('documents')} className="text-sm font-medium hover:text-accent-600 transition-colors">{content.nav.downloadResume}</button>

              <div className="flex items-center border-l border-slate-200 pl-6 ml-2">
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-1.5 text-sm font-bold border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
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
              <div className="border-t border-slate-200 pt-2 mt-2">
                <button onClick={toggleLanguage} className="block w-full text-left px-3 py-2 text-base font-bold text-accent-600 bg-slate-50">
                   {lang === 'en' ? '切换到中文' : 'Switch to English'}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <header className="relative bg-corporate-900 text-white overflow-hidden min-h-[680px] flex items-center">
        {/* Rich Background Layers */}
        <div className="absolute inset-0 z-0">
            {/* Deep Professional Base */}
            <div className="absolute inset-0 bg-gradient-to-br from-corporate-900 via-[#0a1525] to-[#05101a]"></div>

            {/* Technical Grid Blueprint */}
            <div className="absolute inset-0 opacity-10"
                 style={{
                   backgroundImage: `linear-gradient(#4f7a9e 1px, transparent 1px), linear-gradient(90deg, #4f7a9e 1px, transparent 1px)`,
                   backgroundSize: '40px 40px'
                 }}>
            </div>

            {/* Abstract Data Waves - Bottom */}
            <svg className="absolute bottom-0 w-full h-[300px] text-accent-900/20" viewBox="0 0 1440 320" preserveAspectRatio="none">
               <path fill="currentColor" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>

            {/* Glowing Accent Orbs - Depth */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-accent-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-12 pb-20">
          <div className="grid lg:grid-cols-12 gap-16 items-center">

            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 space-y-8 relative">
              <div className="space-y-4">
                {/* Status Badge - User likes this, keeping it */}
                <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 shadow-lg">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-semibold tracking-wide text-green-300 uppercase">
                    {lang === 'en' ? 'Open to Work' : '积极求职中'}
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                  <span className="block text-white mb-2">{content.hero.greeting.split('(')[0]}</span>
                  <span className="block text-3xl md:text-4xl lg:text-5xl font-light text-slate-400">
                     (Joe Zhou)
                  </span>
                </h1>

                <div className="flex items-center space-x-3 text-xl md:text-2xl text-accent-400 font-medium">
                  <span className="h-0.5 w-12 bg-accent-500 rounded-full"></span>
                  <p className="tracking-wide">{content.hero.role}</p>
                </div>
              </div>

              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed border-l-2 border-slate-600/50 pl-6">
                {content.hero.summary}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button onClick={() => scrollToSection('portfolio')} className="group relative px-8 py-4 bg-accent-600 hover:bg-accent-500 text-white font-bold rounded-xl shadow-xl shadow-accent-600/20 transition-all hover:-translate-y-0.5">
                  <span className="flex items-center">
                    {content.hero.cta}
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </span>
                </button>
                <button onClick={() => scrollToSection('documents')} className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl border border-white/10 transition-all hover:border-white/20 hover:shadow-lg">
                  {content.nav.downloadResume}
                </button>
              </div>
            </div>

            {/* Right Column: "Holographic Workspace" Composition */}
            <div className="hidden lg:block lg:col-span-5 relative h-full min-h-[500px] perspective-1000">
               <div className="relative w-full h-full flex items-center justify-center">

                  {/* Background Decoration: Abstract Ring */}
                  <div className="absolute inset-0 border-2 border-white/5 rounded-full w-[450px] h-[450px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite]"></div>
                  <div className="absolute inset-0 border border-white/5 rounded-full w-[350px] h-[350px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed opacity-50"></div>

                  {/* Main Profile Card (Center) */}
                  <div className="relative z-20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-2xl w-80 transform transition-transform hover:scale-[1.02]">
                    <div className="flex items-center space-x-4 mb-6 border-b border-white/10 pb-4">
                      <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-slate-200 to-slate-400 p-[2px]">
                        <div className="h-full w-full rounded-[10px] bg-slate-800 flex items-center justify-center">
                          <span className="text-xl font-bold text-white">JZ</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-base">Joe Zhou</h3>
                        <p className="text-accent-300 text-xs font-mono">{lang === 'en' ? 'FINANCE & DATA' : '金融 & 数据'}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                       <div className="bg-black/20 rounded-lg p-3 flex justify-between items-center">
                          <div>
                             <p className="text-[10px] text-slate-400 uppercase">{lang === 'en' ? 'Education' : '教育'}</p>
                             <p className="text-sm font-semibold text-white">OSU</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] text-slate-400 uppercase">{lang === 'en' ? 'Major' : '专业'}</p>
                             <p className="text-sm font-semibold text-white">{lang === 'en' ? 'Finance' : '金融'}</p>
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white/5 rounded-lg p-3 text-center">
                             <p className="text-xl font-bold text-white">3<span className="text-xs text-accent-400">+</span></p>
                             <p className="text-[10px] text-slate-400">{lang === 'en' ? 'Years Exp' : '工作年限'}</p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-3 text-center">
                             <p className="text-xl font-bold text-white">12<span className="text-xs text-accent-400">+</span></p>
                             <p className="text-[10px] text-slate-400">{lang === 'en' ? 'Projects' : '项目经验'}</p>
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Floating Widget 1: Efficiency Metric (Top Right) */}
                  <div className="absolute top-10 -right-4 z-30 animate-[bounce_4s_infinite]">
                     <div className="bg-white/90 backdrop-blur text-slate-800 p-4 rounded-xl shadow-xl border border-white/40 w-40">
                        <div className="flex items-center justify-between mb-2">
                           <div className="p-1.5 bg-green-100 rounded text-green-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                           </div>
                           <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">+30%</span>
                        </div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{lang === 'en' ? 'Efficiency' : '效率提升'}</p>
                        <p className="text-sm font-bold leading-tight mt-0.5">{lang === 'en' ? 'Report Latency Reduced' : '报表延迟降低'}</p>
                     </div>
                  </div>

                  {/* Floating Widget 2: Tech Stack Badges (Bottom Left) */}
                  <div className="absolute bottom-16 -left-8 z-30 animate-[bounce_5s_infinite]">
                     <div className="bg-corporate-800/90 backdrop-blur border border-white/10 p-4 rounded-xl shadow-2xl">
                        <p className="text-[10px] text-slate-400 uppercase font-bold mb-3 border-b border-white/10 pb-2">{lang === 'en' ? 'Core Toolkit' : '核心工具'}</p>
                        <div className="flex flex-col space-y-2">
                           {lang === 'en' ? ['Python', 'SQL', 'Tableau', 'Axure'] : ['Python', 'SQL', 'Tableau', 'Axure'].map((tool, i) => {
                              const cnNames = ['Python', 'SQL', 'Tableau', 'Axure'];
                              return (
                                <div key={i} className="flex items-center space-x-2">
                                   <span className={`w-2 h-2 rounded-full ${i===0 ? 'bg-yellow-400' : i===1 ? 'bg-blue-400' : 'bg-slate-400'}`}></span>
                                   <span className="text-xs font-mono text-slate-200">{lang === 'en' ? tool : cnNames[i]}</span>
                                </div>
                              );
                           })}
                        </div>
                     </div>
                  </div>

                  {/* Connecting Lines (Decor) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 10 }}>
                     <path d="M150 250 L 100 350" stroke="white" strokeDasharray="4 4" fill="none" />
                     <path d="M350 250 L 400 150" stroke="white" strokeDasharray="4 4" fill="none" />
                  </svg>
               </div>
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

        {/* Education & Skills Dashboard - Final Optimized Compact Layout */}
        <section id="skills" className="py-16 bg-slate-50 relative">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-6">

              {/* Left Column (Identity & Foundation) */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {/* Unified Foundation Card */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col h-full hover:shadow-md transition-shadow">
                  <h2 className="text-2xl md:text-3xl font-bold text-corporate-900 mb-8 flex items-center border-b border-slate-100 pb-6">
                    <span className="w-1.5 h-8 bg-corporate-800 mr-4 rounded-full shadow-sm"></span>
                    {content.sectionTitles.education}
                  </h2>

                  {content.education.map((edu, idx) => (
                    <div key={idx} className="mb-8">
                      <div className="flex items-center mb-6">
                        <div className="w-14 h-14 bg-red-50 text-red-700 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-2xl mr-5 border border-red-100 shadow-sm">
                          O
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1">{edu.school}</h3>
                          <p className="text-sm text-slate-500 font-medium">{edu.degree} • {edu.major}</p>
                        </div>
                      </div>
                      <ul className="space-y-3 text-sm text-slate-600 bg-slate-50/50 p-4 rounded-xl border border-slate-100/80">
                        {edu.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="w-4 h-4 mr-3 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            <span className="flex-1 leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div className="mt-auto pt-8 border-t border-slate-100">
                    <h3 className="font-bold text-sm text-slate-900 mb-5 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-corporate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                      {lang === 'en' ? 'Language Proficiency' : '语言能力'}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {content.skills.languages.map((l, i) => (
                        <div key={i} className="flex items-center justify-between text-sm bg-white px-4 py-3 rounded-lg border border-slate-200 shadow-sm hover:border-accent-200 transition-colors">
                          <span className="font-medium text-slate-700">{l.split('(')[0]}</span>
                          <span className="font-bold text-xs bg-corporate-50 text-corporate-700 px-3 py-1 rounded-full uppercase tracking-wide">
                            {l.split('(')[1]?.replace(')', '') || 'Native'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (Core Competency Dashboard) */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col h-full hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
                    <h2 className="text-2xl md:text-3xl font-bold text-corporate-900 flex items-center">
                      <span className="w-1.5 h-8 bg-accent-600 mr-4 rounded-full shadow-sm"></span>
                      {content.sectionTitles.skills}
                    </h2>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-100 hidden sm:block">Analytics & Tech</span>
                  </div>

                  {/* Skills Tag Grid - Fixed Hard Skill Rendering */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                    {content.skills.hard.map((skillGroup, idx) => (
                      <div key={idx} className="bg-slate-50/80 p-5 rounded-xl border border-slate-100 flex flex-col h-full">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                          <span className="w-2 h-2 bg-accent-400 rounded-full mr-2"></span>
                          {skillGroup.category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.items.map((item, i) => (
                            <span key={i} className="text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm hover:text-accent-600 hover:border-accent-200 transition-colors cursor-default">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dynamic Visualizations - Compact View */}
                  <div className="bg-white rounded-xl mb-6 flex-grow">
                    <SkillsChart language={lang} />
                  </div>

                  {/* Soft Skills & Leadership - Tightly integrated at the bottom */}
                  <div className="pt-8 border-t border-slate-100 mt-auto">
                     <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                      {lang === 'en' ? 'SOFT SKILLS & LEADERSHIP' : '核心软技能'}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {content.skills.soft.map((skill, i) => (
                        <span key={i} className="px-4 py-2 bg-gradient-to-br from-accent-50 to-white text-accent-700 text-xs font-bold rounded-lg border border-accent-100/60 hover:shadow-md transition-all cursor-default flex items-center">
                          <svg className="w-4 h-4 mr-2 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          {skill}
                        </span>
                      ))}
                    </div>
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
                <a href="mailto:645286918@qq.com" className="hover:text-white transition-colors">Email</a>
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