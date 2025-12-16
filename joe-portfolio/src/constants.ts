import type { AppContent, DocumentItem } from './types';

export const CONTENT_EN: AppContent = {
  nav: {
    home: "Home",
    experience: "Experience",
    skills: "Analytics & Skills",
    portfolio: "Portfolio",
    contact: "Contact",
    downloadResume: "Download CV"
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

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    title: { en: "Resume / CV", zh: "个人简历" },
    type: "resume",
    versions: [
      { version: 2, date: "2023-10-15", name: "Joe_Zhou_Resume_v2.pdf", size: "1.2 MB", isCurrent: true },
      { version: 1, date: "2022-05-20", name: "Joe_Zhou_Resume_v1.pdf", size: "1.1 MB", isCurrent: false }
    ]
  },
  {
    id: 'doc-2',
    title: { en: "Portfolio Presentation", zh: "作品集演示" },
    type: "portfolio",
    versions: [
      { version: 2, date: "2025-12-16", name: "Coursera_Certificate_ZYX.pdf", size: "0.6 MB", isCurrent: true },
      { version: 1, date: "2023-09-01", name: "Portfolio_Highlights.pdf", size: "4.5 MB", isCurrent: false }
    ]
  },
  {
    id: 'doc-3',
    title: { en: "OSU Degree Certificate", zh: "OSU 学位证书" },
    type: "certificate",
    versions: [
      { version: 1, date: "2021-06-01", name: "Degree_Cert.pdf", size: "0.8 MB", isCurrent: true }
    ]
  }
  ,
  {
    id: 'doc-4',
    title: { en: "Coursera Certificate", zh: "Coursera 证书" },
    type: "certificate",
    versions: [
      { version: 1, date: "2025-12-16", name: "Coursera_Certificate_ZYX.pdf", size: "0.6 MB", isCurrent: true }
    ]
  }
];