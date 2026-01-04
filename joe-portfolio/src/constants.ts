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
    documents: "Documents & Certifications"
  },
  experience: [
    {
      company: "China Telecom Fujian Fufu Technology Co., Ltd.",
      title: "Requirements Analysis Engineer",
      period: "2023.01 - Present",
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
    downloadResume: "文档中心"
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
      period: "2023.01 - 至今",
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

export const INITIAL_DOCUMENTS: DocumentCategory[] = [
  {
    id: 'cat-resume',
    title: { en: "Professional Resume", zh: "个人简历" },
    coverImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=600&auto=format&fit=crop",
    items: [
      {
        id: 'doc-resume-en',
        title: { en: "Joe Zhou - English Resume", zh: "周永祥 - 英文简历" },
        subtitle: { en: "Professional CV", zh: "专业版" },
        type: "resume",
        thumbnailUrl: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 3, date: "2023-11-01", name: "Joe_Zhou_Resume_En_v3.pdf", size: "1.2 MB", isCurrent: true }]
      },
      {
        id: 'doc-resume-zh',
        title: { en: "Joe Zhou - Chinese Resume", zh: "周永祥 - 中文简历" },
        subtitle: { en: "Professional CV", zh: "专业版" },
        type: "resume",
        thumbnailUrl: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 2, date: "2023-10-15", name: "Joe_Zhou_Resume_Zh_v2.pdf", size: "1.3 MB", isCurrent: true }]
      }
    ]
  },
  {
    id: 'cat-portfolio',
    title: { en: "Portfolio Presentation", zh: "作品集演示" },
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    items: [
      {
        id: 'port-brd-telecom',
        title: { en: "Business Requirements Spec (BRD)", zh: "商业需求规格说明书 (BRD)" },
        subtitle: { en: "China Telecom Project", zh: "项目：中国电信" },
        type: "portfolio",
        thumbnailUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=400&auto=format&fit=crop",
        projectSummary: {
          en: "Comprehensive digital transformation for China Telecom's capital expenditure tracking system.",
          zh: "针对中国电信资本开支跟踪系统的全面数字化转型方案，涵盖全流程需求闭环管理。"
        },
        highlights: {
          en: ["Streamlined 12+ complex approval workflows", "Reduced reporting latency by 30%", "Ensured 100% requirements traceability"],
          zh: ["梳理并优化12个以上的复杂审批流程", "报表生成延迟降低30%", "实现100%需求可追溯性"]
        },
        assets: [
          { id: 'a1', name: { en: "Main BRD Document", zh: "核心 BRD 文档" }, type: "pdf", size: "2.5 MB", description: { en: "The complete requirements specification.", zh: "完整的需求规格说明书。" } },
          { id: 'a2', name: { en: "Workflow Visio Diagrams", zh: "业务流程 Visio 图集" }, type: "visio", size: "1.8 MB", description: { en: "End-to-end business process models.", zh: "端到端的业务流程模型。" } },
          { id: 'a3', name: { en: "User Manual Draft", zh: "用户操作手册草案" }, type: "word", size: "4.2 MB", description: { en: "Instructional guide for system end-users.", zh: "针对系统最终用户的操作指南。" } },
          { id: 'a4', name: { en: "Traceability Matrix", zh: "需求跟踪矩阵" }, type: "excel", size: "0.8 MB", description: { en: "Excel-based RTM for QA and Dev tracking.", zh: "基于 Excel 的 RTM 跟踪表。" } }
        ],
        versions: [{ version: 2, date: "2023-03-15", name: "Telecom_Project_Bundle.zip", size: "9.3 MB", isCurrent: true }]
      },
      {
        id: 'port-tableau-dash',
        title: { en: "Data Visualization Dashboard", zh: "数据可视化仪表盘" },
        subtitle: { en: "Tableau Sample", zh: "项目：Tableau 案例" },
        type: "portfolio",
        thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
        projectSummary: {
          en: "Advanced monitoring dashboard for construction progress and safety management.",
          zh: "用于施工进度监控和安全管理的综合数据可视化面板，支持多维度实时穿透。"
        },
        highlights: {
          en: ["Interactive KPI tracking", "Automated data cleaning with Python", "Real-time construction site monitoring"],
          zh: ["交互式 KPI 跟踪", "利用 Python 实现自动化数据清洗", "实时施工现场监控分析"]
        },
        assets: [
          { id: 't1', name: { en: "Tableau Workbook (.twbx)", zh: "Tableau 工作簿 (.twbx)" }, type: "tableau", size: "12.4 MB", description: { en: "The interactive visualization source file.", zh: "交互式可视化源文件。" } },
          { id: 't2', name: { en: "Data Cleaning Script", zh: "数据清洗 Python 脚本" }, type: "python", size: "0.2 MB", description: { en: "Automated ETL process for raw datasets.", zh: "针对原始数据集的自动化 ETL 流程。" } },
          { id: 't3', name: { en: "Exploratory Analysis", zh: "探索性数据分析 (EDA)" }, type: "notebook", size: "3.5 MB", description: { en: "Jupyter Notebook showing data logic.", zh: "展示数据逻辑的 Jupyter Notebook。" } },
          { id: 't4', name: { en: "Data Dictionary", zh: "数据字典说明" }, type: "excel", size: "0.5 MB", description: { en: "Definitions for all data fields used.", zh: "所用数据字段的详细定义说明。" } }
        ],
        versions: [{ version: 1, date: "2023-01-10", name: "Tableau_Case_Study.zip", size: "16.6 MB", isCurrent: true }]
      },
      {
        id: 'port-asset-transfer',
        title: { en: "Asset Transfer App Prototype Design", zh: "交资转固应用原型设计" },
        subtitle: { en: "Mobile Approval Function Design.", zh: "项目：移动端审批功能设计" },
        type: "portfolio",
        thumbnailUrl: "/portfolio/asset-transfer-app/Image1.png",
        projectSummary: {
          en: "Mobile-first prototype for enterprise asset transfer workflow management with real-time approval tracking and automated SAP integration.",
          zh: "面向企业交资转固流程管理的移动优先原型设计，支持实时审批跟踪与 SAP 系统自动化集成。"
        },
        highlights: {
          en: [
            "Streamlined asset transfer approval workflow with 4-section collapsible design",
            "Real-time SAP status synchronization (Transfer posting/status tracking)",
            "Financial data precision with masked sensitive fields (rates, amounts, fees)",
            "Dual-mode interface: View mode for stakeholders, Edit mode for administrators"
          ],
          zh: [
            "优化交资转固审批工作流，采用四段式可折叠设计",
            "实时同步 SAP 系统状态（转固过账/状态跟踪）",
            "财务数据精准管理，敏感字段脱敏处理（费率、金额、费用）",
            "双模式界面：查看模式供利益相关者使用，编辑模式供管理员操作"
          ]
        },
        assets: [
          { id: 'at1', name: { en: "Main Interface Design", zh: "主界面设计" }, type: "image", size: "0.5 MB", description: { en: "Basic Information tab with collapsible sections for workflow efficiency.", zh: "基本信息选项卡，采用可折叠分段设计提升工作流效率。" }, url: "/portfolio/asset-transfer-app/Image1.png" },
          { id: 'at2', name: { en: "Financial Information Module", zh: "财务信息模块" }, type: "image", size: "0.6 MB", description: { en: "Financial data display with masked sensitive information for security.", zh: "财务数据展示，敏感信息脱敏处理保障数据安全。" }, url: "/portfolio/asset-transfer-app/Image2.png" },
          { id: 'at3', name: { en: "Edit Mode & Process Tracking", zh: "编辑模式与流程跟踪" }, type: "image", size: "0.5 MB", description: { en: "Edit mode indicator and Process Record tab for audit trail.", zh: "编辑模式指示器与流程记录选项卡，支持审计追踪。" }, url: "/portfolio/asset-transfer-app/Image3.png" },
          { id: 'at4', name: { en: "React Prototype Source Code", zh: "React 原型源代码" }, type: "code", size: "0.1 MB", description: { en: "Functional React component with state management and Lucide icons.", zh: "功能完整的 React 组件，包含状态管理与 Lucide 图标库。" }, url: "/portfolio//asset_transfer_prototype.tsx" }
        ],
        versions: [{ version: 1, date: "2025-01-04", name: "asset_transfer_prototype.tsx", size: "0.1 MB", isCurrent: true }]
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
        versions: [{ version: 1, date: "2021-06-01", name: "OSU_Diploma.pdf", size: "0.8 MB", isCurrent: true }]
      },
      {
        id: 'doc-trans-osu',
        title: { en: "Official Transcript", zh: "官方成绩单" },
        subtitle: { en: "The Ohio State University", zh: "颁发机构：OSU" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2021-06-15", name: "OSU_Transcript.pdf", size: "1.1 MB", isCurrent: true }]
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
        versions: [{ version: 1, date: "2023-08-15", name: "Google_Data_Cert.pdf", size: "1.5 MB", isCurrent: true }]
      }
    ]
  }
];
