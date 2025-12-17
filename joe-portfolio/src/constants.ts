import type { AppContent, DocumentCategory } from './types';

export const CONTENT_EN: AppContent = {
  nav: {
    home: "Home",
    experience: "Experience",
    skills: "Analytics & Skills",
    portfolio: "Portfolio",
    contact: "Contact",
    downloadResume: "Documents"
  },
  hero: {
    greeting: "Hello, I'm Joe Zhou",
    role: "Business Analyst & Financial Data Specialist",
    summary: "OSU Finance Graduate with 3 years of experience in Requirements Analysis at China Telecom Fujian. Expert in bridging the gap between complex financial data and technical implementation. Aspiring to leverage financial engineering and data analytics to drive business value.",
    cta: "View My Work"
  },
  sectionTitles: {
    experience: "Professional Experience",
    education: "Education",
    skills: "Technical & Professional Competency",
    portfolio: "Project Highlights",
    documents: "Document Management"
  },
  experience: [
    {
      company: "China Telecom Fujian Fufu Technology Co., Ltd.",
      title: "Requirements Analysis Engineer",
      period: "2021 - Present",
      location: "Fuzhou, China",
      description: [
        "Led requirements gathering and analysis for large-scale enterprise systems.",
        "Acted as the primary liaison between business stakeholders and development teams.",
        "Conducted data auditing and anomaly detection for critical operational data."
      ],
      projects: [
        {
          name: "Capital Project Management System",
          role: "Lead Analyst",
          description: [
            "Designed workflows for capital expenditure tracking.",
            "Reduced reporting latency by 30% through optimized data structures."
          ],
          technologies: ["Visio", "SQL", "Axure"]
        },
        {
          name: "Field Management APP",
          role: "Product Owner",
          description: [
            "Managed the lifecycle of a mobile app for field engineers.",
            "Oversaw interface integration and joint debugging."
          ],
          technologies: ["Mobile UI/UX", "API Testing"]
        },
        {
          name: "Construction Professional Dashboard",
          role: "Data Analyst",
          description: [
            "Defined KPIs and visualized construction progress data.",
            "Ensured data accuracy through rigorous verification processes."
          ],
          technologies: ["Tableau", "Excel", "Data Visualization"]
        }
      ]
    }
  ],
  education: [
    {
      school: "The Ohio State University (OSU)",
      degree: "Bachelor of Science",
      major: "Finance",
      period: "Graduated",
      details: [
        "Core Coursework: Options & Futures, Corporate Finance, Financial Data Analysis.",
        "Dean's List / Academic honors.",
        "Developed strong foundation in quantitative analysis and financial modeling."
      ]
    }
  ],
  skills: {
    hard: [
      { category: "Business Analysis", items: ["Requirement Gathering", "UML/Visio", "Axure RP", "Agile/Scrum"] },
      { category: "Data & Finance", items: ["SQL", "Excel (Advanced)", "Financial Modeling", "Data Auditing"] },
      { category: "Development", items: ["API Integration", "Basic Python", "System Testing"] }
    ],
    soft: ["Cross-functional Communication", "Stakeholder Management", "Problem Solving", "Team Leadership"],
    languages: ["English (Professional/Academic)", "Mandarin (Native)"]
  }
};

export const CONTENT_ZH: AppContent = {
  nav: {
    home: "首页",
    experience: "工作经历",
    skills: "技能分析",
    portfolio: "作品集",
    contact: "联系我",
    downloadResume: "下载简历"
  },
  hero: {
    greeting: "你好，我是周永祥 (Joe Zhou)",
    role: "需求分析师 / 商业分析师",
    summary: "毕业于美国俄亥俄州立大学(OSU)金融专业。在中国电信福富科技拥有3年需求分析经验。擅长将复杂的业务需求转化为技术落地方案。致力于从事商业分析(BA)、金融工程或数据分析领域的工作。",
    cta: "查看详细履历"
  },
  sectionTitles: {
    experience: "职业经历",
    education: "教育背景",
    skills: "核心竞争力",
    portfolio: "项目亮点",
    documents: "文档与证书管理"
  },
  experience: [
    {
      company: "中国电信福富科技有限公司",
      title: "需求分析工程师",
      period: "2021 - 至今",
      location: "中国 福州",
      description: [
        "负责大型企业级系统的需求调研、分析与文档编写。",
        "作为业务部门与开发团队的核心桥梁，确保需求准确落地。",
        "负责机房搬迁验证、数据稽核及异常数据处理工作。"
      ],
      projects: [
        {
          name: "资本性项目管理系统",
          role: "主分析师",
          description: [
            "梳理并设计资本开支全流程管理功能。",
            "通过优化数据流转逻辑，提升了报表生成效率。"
          ],
          technologies: ["Visio", "SQL", "Axure"]
        },
        {
          name: "现场管理 APP",
          role: "需求负责人",
          description: [
            "负责外勤人员管理应用的功能迭代与设计。",
            "主导接口联调测试，确保前后端数据一致性。"
          ],
          technologies: ["移动端交互设计", "接口测试"]
        },
        {
          name: "建设专业 Dashboard",
          role: "数据分析",
          description: [
            "定义关键绩效指标(KPI)，设计可视化大屏。",
            "处理海量建设数据，进行清洗与稽核，确保数据质量。"
          ],
          technologies: ["数据可视化", "Excel", "数据清洗"]
        }
      ]
    }
  ],
  education: [
    {
      school: "美国俄亥俄州立大学 (OSU)",
      degree: "本科学士",
      major: "金融学",
      period: "毕业",
      details: [
        "核心课程：期权与期货、公司金融、金融数据分析。",
        "留学生背景，具备优秀的跨文化交流能力与英语学术能力。",
        "具备扎实的量化分析与金融建模理论基础。"
      ]
    }
  ],
  skills: {
    hard: [
      { category: "商业分析", items: ["需求调研", "流程图/UML", "Axure 原型", "敏捷开发"] },
      { category: "数据与金融", items: ["SQL 查询", "Excel (高级)", "金融建模", "数据稽核"] },
      { category: "技术能力", items: ["API 接口联调", "Python 基础", "系统测试"] }
    ],
    soft: ["团队协作", "跨部门沟通", "逻辑思维", "英语沟通"],
    languages: ["英语 (专业流利)", "中文 (母语)"]
  }
};

// Using high-quality placeholder images from Unsplash source
export const INITIAL_DOCUMENTS: DocumentCategory[] = [
  {
    id: 'cat-resume',
    title: { en: "Professional Resume", zh: "个人简历" },
    coverImage: "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1200&auto=format&fit=crop",
    items: [
      {
        id: 'doc-resume-en',
        title: { en: "Joe Zhou - English Resume", zh: "周永祥 - 英文简历" },
        subtitle: { en: "Professional CV", zh: "专业版" },
        type: "resume",
        thumbnailUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop",
        versions: [
          { version: 3, date: "2023-11-01", name: "Joe_Zhou_Resume_En_v3.pdf", size: "1.2 MB", isCurrent: true },
          { version: 2, date: "2023-05-20", name: "Joe_Zhou_Resume_En_v2.pdf", size: "1.2 MB", isCurrent: false }
        ]
      },
      {
        id: 'doc-resume-zh',
        title: { en: "Joe Zhou - Chinese Resume", zh: "周永祥 - 中文简历" },
        subtitle: { en: "Professional CV", zh: "专业版" },
        type: "resume",
        thumbnailUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop",
        versions: [
          { version: 2, date: "2023-10-15", name: "Joe_Zhou_Resume_Zh_v2.pdf", size: "1.3 MB", isCurrent: true }
        ]
      }
    ]
  },
  {
    id: 'cat-portfolio',
    title: { en: "Portfolio Presentation", zh: "作品集演示" },
    coverImage: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=600&auto=format&fit=crop",
    items: [
      {
        id: 'port-1',
        title: { en: "Options Strategy Report", zh: "期权策略分析报告" },
        subtitle: { en: "FIN 4221 - Investments", zh: "课程: 投资学" },
        type: "portfolio",
        thumbnailUrl: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2021-04-10", name: "Options_Analysis.pdf", size: "3.5 MB", isCurrent: true }]
      },
      {
        id: 'port-2',
        title: { en: "DCF Valuation Model", zh: "DCF 现金流折现模型" },
        subtitle: { en: "FIN 4211 - Corp Finance", zh: "课程: 公司金融" },
        type: "portfolio",
        thumbnailUrl: "https://images.unsplash.com/photo-1543286386-713df548e9cc?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2020-11-20", name: "Valuation_Model.xlsx", size: "1.8 MB", isCurrent: true }]
      },
      {
        id: 'port-3',
        title: { en: "Business Requirements Spec", zh: "商业需求规格说明书(BRD)" },
        subtitle: { en: "China Telecom Project", zh: "中国电信项目" },
        type: "portfolio",
        thumbnailUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2022-03-15", name: "Project_BRD_Sample.pdf", size: "2.1 MB", isCurrent: true }]
      },
      {
        id: 'port-4',
        title: { en: "Data Visualization Dashboard", zh: "数据可视化仪表盘" },
        subtitle: { en: "Tableau Sample", zh: "Tableau 案例" },
        type: "portfolio",
        thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2023-01-10", name: "Dashboard_Screenshot.png", size: "1.5 MB", isCurrent: true }]
      },
      {
        id: 'port-5',
        title: { en: "Market Research Slides", zh: "市场调研 PPT" },
        subtitle: { en: "BUS 3200", zh: "课程: 商业分析" },
        type: "portfolio",
        thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2021-02-15", name: "Market_Research.pptx", size: "5.2 MB", isCurrent: true }]
      },
      {
        id: 'port-6',
        title: { en: "Python Trading Algo", zh: "Python 交易算法演示" },
        subtitle: { en: "Personal Project", zh: "个人项目" },
        type: "portfolio",
        thumbnailUrl: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2023-08-01", name: "Algo_Snippet.py", size: "0.2 MB", isCurrent: true }]
      },
      {
        id: 'port-7',
        title: { en: "SQL Audit Scripts", zh: "SQL 审计脚本合集" },
        subtitle: { en: "Data Auditing", zh: "数据稽核" },
        type: "portfolio",
        thumbnailUrl: "https://images.unsplash.com/photo-1569396116180-210c182bedb8?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2022-11-20", name: "Audit_Queries.sql", size: "0.5 MB", isCurrent: true }]
      }
    ]
  },
  {
    id: 'cat-degree',
    title: { en: "OSU Degree Certificate", zh: "OSU 学位证书" },
    coverImage: "/osu-logo.svg",
    items: [
      {
        id: 'doc-degree-osu',
        title: { en: "Bachelor of Science", zh: "理学学士学位" },
        subtitle: { en: "The Ohio State University", zh: "颁发机构：OSU" },
        type: "certificate",
        thumbnailUrl: "/osu-logo.svg",
        versions: [
          { version: 1, date: "2021-06-01", name: "OSU_Diploma.pdf", size: "0.8 MB", isCurrent: true }
        ]
      },
      {
        id: 'doc-trans-osu',
        title: { en: "Official Transcript", zh: "官方成绩单" },
        subtitle: { en: "The Ohio State University", zh: "颁发机构：OSU" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=400&auto=format&fit=crop",
        versions: [
          { version: 1, date: "2021-06-15", name: "OSU_Transcript.pdf", size: "1.1 MB", isCurrent: true }
        ]
      }
    ]
  },
  {
    id: 'cat-coursera',
    title: { en: "Coursera Certificates", zh: "Coursera 职业证书" },
    coverImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=600&auto=format&fit=crop",
    items: [
      {
        id: 'cert-google-data',
        title: { en: "Google Data Analytics", zh: "Google 数据分析师认证" },
        subtitle: { en: "Google / Coursera", zh: "机构: Google" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
        versions: [
          { version: 1, date: "2023-08-15", name: "Google_Data_Cert.pdf", size: "1.5 MB", isCurrent: true }
        ]
      },
      {
        id: 'cert-python-finance',
        title: { en: "Python for Finance", zh: "Python 金融应用" },
        subtitle: { en: "Yale University", zh: "机构: 耶鲁大学" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=400&auto=format&fit=crop",
        versions: [
          { version: 1, date: "2022-12-01", name: "Python_Finance_Cert.pdf", size: "1.1 MB", isCurrent: true }
        ]
      },
      {
        id: 'cert-fin-markets',
        title: { en: "Financial Markets", zh: "金融市场基础" },
        subtitle: { en: "Yale University", zh: "机构: 耶鲁大学" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=400&auto=format&fit=crop",
        versions: [
          { version: 1, date: "2022-10-01", name: "Fin_Markets_Cert.pdf", size: "0.9 MB", isCurrent: true }
        ]
      },
      {
        id: 'cert-business-stats',
        title: { en: "Business Statistics", zh: "商业统计学" },
        subtitle: { en: "Rice University", zh: "机构: 莱斯大学" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1543286386-713df548e9cc?q=80&w=400&auto=format&fit=crop",
        versions: [
          { version: 1, date: "2023-01-20", name: "Business_Stats.pdf", size: "1.0 MB", isCurrent: true }
        ]
      },
       {
        id: 'cert-excel-advanced',
        title: { en: "Excel Skills for Business", zh: "商务 Excel 高级技能" },
        subtitle: { en: "Macquarie University", zh: "机构: 麦考瑞大学" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
        versions: [
          { version: 1, date: "2021-09-10", name: "Excel_Expert.pdf", size: "1.2 MB", isCurrent: true }
        ]
      },
       {
        id: 'cert-tableau',
        title: { en: "Data Visualization with Tableau", zh: "Tableau 数据可视化" },
        subtitle: { en: "UC Davis", zh: "机构: 加州大学戴维斯分校" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
        versions: [
          { version: 1, date: "2022-04-15", name: "Tableau_Cert.pdf", size: "1.4 MB", isCurrent: true }
        ]
      },
       {
        id: 'cert-sql',
        title: { en: "SQL for Data Science", zh: "数据科学 SQL 基础" },
        subtitle: { en: "UC Davis", zh: "机构: 加州大学戴维斯分校" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1569396116180-210c182bedb8?q=80&w=400&auto=format&fit=crop",
        versions: [
          { version: 1, date: "2022-06-01", name: "SQL_Cert.pdf", size: "1.0 MB", isCurrent: true }
        ]
      }
    ]
  }
];