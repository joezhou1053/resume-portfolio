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
          name: "CapEx Project Management System",
          role: "Lead Analyst",
          description: [
            "Designed workflows for capital expenditure tracking.",
            "Reduced reporting latency by 30% through optimized data structures."
          ],
          technologies: ["Visio", "SQL", "Axure", "XMind"]
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
          technologies: ["Tableau Date Visualization", "Excel", "Data Cleaning"]
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
      { category: "Development", items: ["API Integration", "Intermediate Python", "System Testing", "Vibe Coding"] }
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
          name: "资本性支出项目管理系统",
          role: "主分析师",
          description: [
            "梳理并设计资本开支全流程管理功能。",
            "通过优化数据流转逻辑，提升了报表生成效率。"
          ],
          technologies: ["Visio", "SQL", "Axure", "XMind"]
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
          technologies: ["Tableau数据可视化", "Excel", "数据清洗"]
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
      { category: "技术能力", items: ["API 接口联调", "Python 熟练", "系统测试", "氛围编程"] }
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
      },
      {
        id: 'port-financial-data-analysis',
        title: { en: "Financial Data Analysis with LSTM", zh: "金融数据分析与LSTM应用" },
        subtitle: { en: "Deep Learning & Quantitative Trading", zh: "项目：深度学习与量化交易" },
        type: "portfolio",
        thumbnailUrl: "/portfolio/financial-data-analysis/Image1.png",
        projectSummary: {
          en: "Applied deep learning techniques to financial time series forecasting using LSTM neural networks, achieving 93.7% prediction accuracy and developing a quantitative trading strategy with backtested returns.",
          zh: "运用LSTM深度神经网络进行金融时间序列预测，准确率达93.7%，并基于预测结果开发量化交易策略进行回测验证。"
        },
        highlights: {
          en: [
            "LSTM model achieved 93.7% accuracy in gold price prediction using 10 years of historical data",
            "Implemented complete ML workflow: data preprocessing, feature engineering, model training, and evaluation",
            "Developed and backtested trading strategy with cumulative returns of $11,612",
            "Mastered TensorFlow/Keras framework for time series forecasting in financial markets"
          ],
          zh: [
            "使用10年历史数据训练LSTM模型，黄金价格预测准确率达93.7%",
            "实现完整机器学习工作流：数据预处理、特征工程、模型训练与评估",
            "开发并回测交易策略，累计收益达11,612美元",
            "掌握TensorFlow/Keras框架在金融市场时间序列预测中的应用"
          ]
        },
        assets: [
          { id: 'fda1', name: { en: "LSTM Gold Price Prediction Model", zh: "LSTM黄金价格预测模型" }, type: "notebook", size: "5.1 MB", description: { en: "Complete implementation with data preprocessing, LSTM architecture design, training process, and performance visualization.", zh: "完整实现，包含数据预处理、LSTM架构设计、训练过程和性能可视化。" }, url: "/portfolio/financial-data-analysis/LSTM_Gold_Price_Prediction_Joe.ipynb" },
          { id: 'fda2', name: { en: "Financial Data Cleaning Pipeline", zh: "金融数据清洗流程" }, type: "notebook", size: "95 KB", description: { en: "Data quality assessment, missing value handling, and feature engineering for financial time series.", zh: "金融时间序列数据质量评估、缺失值处理和特征工程。" }, url: "/portfolio/financial-data-analysis/Data_Cleaning.ipynb" },
          { id: 'fda3', name: { en: "Model Performance Visualization", zh: "模型性能可视化结果" }, type: "image", size: "299 KB", description: { en: "Visual comparison showing actual vs predicted gold prices with 93.7% accuracy.", zh: "预测值与实际值的可视化对比，展示93.7%的预测准确率。" }, url: "/portfolio/financial-data-analysis/Image1.png" },
          { id: 'fda4', name: { en: "Prediction Results Chart", zh: "预测结果图表" }, type: "image", size: "338 KB", description: { en: "Training and testing data split with model prediction trends over time.", zh: "训练测试集划分及模型预测趋势的时间序列展示。" }, url: "/portfolio/financial-data-analysis/Image2.png" }
        ],
        versions: [{ version: 1, date: "2025-01-05", name: "financial_data_analysis_bundle.zip", size: "5.8 MB", isCurrent: true }]
      },
      {
        id: 'port-bl-backtest',
        title: { en: "Black-Litterman Model Backtest System", zh: "Black-Litterman模型回测系统" },
        subtitle: { en: "Quantitative Portfolio Optimization Platform", zh: "项目：量化投资组合优化平台" },
        type: "portfolio",
        thumbnailUrl: "/portfolio/bl-business-model-canvas/Image1.png",
        projectSummary: {
          en: "An interactive web application implementing the Black-Litterman asset allocation model for portfolio optimization. Combines market equilibrium returns with investor views through Bayesian methods, providing comprehensive backtesting capabilities with advanced performance metrics and visual analytics.",
          zh: "实现Black-Litterman资产配置模型的交互式Web应用，通过贝叶斯方法将市场均衡收益与投资者观点相结合，提供全面的回测功能、高级绩效指标和可视化分析。"
        },
        highlights: {
          en: [
            "Full-featured parameter configuration: Risk aversion coefficient (δ) and prior uncertainty (τ) with real-time adjustment",
            "Flexible view builder supporting both absolute return views and relative performance views with confidence levels",
            "Comprehensive backtest metrics: Sharpe ratio, max drawdown, VaR, CVaR, information ratio, and 10+ advanced indicators",
            "Interactive visualizations: Cumulative return charts, portfolio weight evolution, and performance comparison with benchmarks"
          ],
          zh: [
            "完整参数配置系统：风险厌恶系数(δ)和先验不确定性(τ)实时调整，支持多种市场环境",
            "灵活观点构建器：支持绝对收益观点和相对表现观点，可设置信心水平和不确定性矩阵",
            "全面回测指标：夏普比率、最大回撤、VaR、CVaR、信息比率等10+项高级绩效评估指标",
            "交互式可视化：累计收益曲线、投资组合权重演变、与基准策略对比分析图表"
          ]
        },
        assets: [
          { id: 'bl1', name: { en: "Strategy Introduction", zh: "策略介绍" }, type: "image", size: "450 KB", description: { en: "Comprehensive overview of Black-Litterman model theory, comparing with traditional Markowitz optimization and explaining the Bayesian approach to combining market equilibrium with investor views.", zh: "Black-Litterman模型理论完整介绍，对比传统Markowitz优化方法，阐述如何通过贝叶斯方法将市场均衡与投资者观点结合。" }, url: "/portfolio/bl-business-model-canvas/Image1.png" },
          { id: 'bl2', name: { en: "Parameter Configuration", zh: "参数配置" }, type: "image", size: "420 KB", description: { en: "Interactive parameter tuning interface for risk aversion coefficient (δ: 1-5) and uncertainty scalar (τ: 0.01-0.1) with contextual guidance and typical value recommendations.", zh: "交互式参数调优界面，配置风险厌恶系数(δ: 1-5)和不确定性标量(τ: 0.01-0.1)，提供上下文指导和典型值推荐。" }, url: "/portfolio/bl-business-model-canvas/Image2.png" },
          { id: 'bl3', name: { en: "View Construction", zh: "观点构建" }, type: "image", size: "380 KB", description: { en: "Advanced view builder enabling absolute and relative views with dual uncertainty quantification methods: confidence level (0-100%) or He-Litterman multiplier (0.1x-5x).", zh: "高级观点构建器，支持绝对观点和相对观点，提供双重不确定性量化方法：信心水平(0-100%)或He-Litterman乘数(0.1x-5x)。" }, url: "/portfolio/bl-business-model-canvas/Image3.png" },
          { id: 'bl4', name: { en: "Results Analysis", zh: "结果分析" }, type: "image", size: "400 KB", description: { en: "Comprehensive performance dashboard with cumulative return charts, weight distribution analysis, and 13 key metrics including Sharpe ratio, max drawdown, VaR, CVaR, Calmar ratio, and turnover rate.", zh: "综合绩效仪表盘，包含累计收益曲线、权重分布分析以及13项关键指标：夏普比率、最大回撤、VaR、CVaR、Calmar比率和换手率等。" }, url: "/portfolio/bl-business-model-canvas/Image4.png" }
        ],
        versions: [{ version: 1, date: "2025-01-05", name: "black_litterman_backtest_system.zip", size: "2.1 MB", isCurrent: true }]
      },
      {
        id: 'port-diamond-hands',
        title: { en: "Diamond Hands Protocol - GameFi Application", zh: "钻石手协议 - GameFi 储蓄游戏" },
        subtitle: { en: "Solana Blockchain Game", zh: "项目：Solana 区块链游戏" },
        type: "portfolio",
        thumbnailUrl: "/portfolio/diamond-hands/Image1.png",
        projectSummary: {
          en: "A gamified savings application built on Solana blockchain featuring a prisoner's dilemma-style challenge. Players lock SOL for 60 seconds while deciding whether to panic-sell with penalties or hold as 'Diamond Hands' to share pool rewards. Includes real-time panic events, avalanche periods, and dynamic reward mechanisms.",
          zh: "基于 Solana 区块链的游戏化储蓄应用，采用囚徒困境式挑战机制。玩家锁定 SOL 60秒，期间可选择恐慌卖出（支付惩罚）或坚持作为'钻石手'（分享奖池奖励）。包含实时恐慌事件、雪崩期机制和动态奖励分配系统。"
        },
        highlights: {
          en: [
            "Prisoner's dilemma game mechanics: 60-second lockup with panic-sell options (20% normal / 40% avalanche penalty)",
            "Three-phase system: Normal period (0-60s), Panic Peak (15-25s, 30% panic rate), Avalanche period (20-30s, 75% panic rate)",
            "Real-time activity feed and dynamic reward pool with visual feedback (color changes, pulse effects, vibration)",
            "User manual documenting game theory mechanics, ROI calculations, and strategy guides for different player levels"
          ],
          zh: [
            "囚徒困境游戏机制：60秒锁定期，提供恐慌卖出选项（正常期20%惩罚 / 雪崩期40%惩罚）",
            "三阶段系统：正常期（0-60秒）、恐慌高峰期（15-25秒，30%恐慌率）、雪崩期（20-30秒，75%恐慌率）",
            "实时活动流和动态奖池，配备视觉反馈系统（颜色变化、脉冲效果、震动提醒）",
            "完整的玩家指南文档，涵盖博弈论机制、ROI计算公式和不同玩家级别的策略建议"
          ]
        },
        assets: [
          { id: 'dh1', name: { en: "Game Interface Overview", zh: "游戏界面总览" }, type: "image", size: "947 KB", description: { en: "Main interface showing the countdown timer, reward pool, panic indicator, and real-time activity feed with player actions.", zh: "游戏主界面，展示倒计时器、奖池金额、恐慌指标和实时玩家活动流。" }, url: "/portfolio/diamond-hands/Image1.png" },
          { id: 'dh2', name: { en: "Avalanche Period Visualization", zh: "雪崩期视觉效果" }, type: "image", size: "531 KB", description: { en: "Red border with dual pulse effects during avalanche period (20-30s), showing panic-sell penalties and 'per second loss' indicators.", zh: "雪崩期（20-30秒）的红色边框和双重脉冲效果，显示恐慌卖出惩罚和'每秒损失'指标。" }, url: "/portfolio/diamond-hands/Image2.png" },
          { id: 'dh3', name: { en: "ROI Calculation Card", zh: "收益计算卡片" }, type: "image", size: "707 KB", description: { en: "Real-time comparison card showing 'Panic Now' vs. 'Hold 60s' scenarios with dynamic reward projections.", zh: "实时对比卡片，展示'现在恐慌'与'坚持60秒'两种情景的收益预测。" }, url: "/portfolio/diamond-hands/Image3.png" },
          { id: 'dh4', name: { en: "Player Strategy Guide", zh: "玩家策略指南" }, type: "markdown", size: "5 KB", description: { en: "Comprehensive guide covering game mechanics, three-phase system, ROI examples, and beginner/advanced strategies.", zh: "完整玩家指南，涵盖游戏机制、三阶段系统、收益计算示例和初级/进阶策略建议。" }, url: "/portfolio/diamond-hands/玩家指南.md" }
        ],
        versions: [{ version: 1, date: "2025-01-08", name: "diamond_hands_protocol.zip", size: "2.2 MB", isCurrent: true }]
      },
      {
        id: 'port-tableau-superstore',
        title: { en: "Tableau Superstore Data Visualization", zh: "Tableau 超市数据可视化分析" },
        subtitle: { en: "Interactive Business Analytics Dashboard", zh: "项目：交互式商业分析仪表板" },
        type: "portfolio",
        thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
        projectSummary: {
          en: "Comprehensive data visualization project using Tableau to analyze Superstore sales performance. Features an interactive Story format with multiple dashboards showing sales trends, regional performance, product category analysis, and customer segmentation. Includes user persona research and data-driven design process documentation.",
          zh: "使用Tableau对超市销售业绩进行全面数据可视化分析的项目。采用交互式故事格式，包含多个仪表板，展示销售趋势、区域表现、产品类别分析和客户细分。包含用户画像研究和数据驱动设计流程文档。"
        },
        highlights: {
          en: [
            "Interactive Tableau Story with 5+ connected dashboards for multi-dimensional business analysis",
            "User-centered design: Created detailed personas (Terrence & Sylvia) to guide visualization strategy",
            "Comprehensive data exploration covering sales, profit, customer segments, and geographical performance",
            "Design checklist and best practices documentation for reproducible analytics workflows"
          ],
          zh: [
            "交互式Tableau故事板，包含5+个关联仪表板，支持多维度商业分析",
            "以用户为中心的设计：创建详细用户画像（Terrence & Sylvia）指导可视化策略",
            "全面的数据探索，涵盖销售、利润、客户细分和地理绩效分析",
            "完整的设计检查清单和最佳实践文档，支持可复用的分析工作流"
          ]
        },
        assets: [
          { id: 'ts1', name: { en: "Tableau Public Interactive Story", zh: "Tableau Public 交互式故事板" }, type: "tableau-url", size: "Link", description: { en: "Interactive Tableau Story with 5+ connected dashboards for sales, profit, customer segments, and geographical performance analysis.", zh: "交互式 Tableau 故事板，包含5+个关联仪表板，展示销售、利润、客户细分和地理绩效分析。" }, url: "https://public.tableau.com/app/profile/joe.zhou4877/viz/superstore_project_JoeZhou/Story" },
          { id: 'ts2', name: { en: "Design Checklist & Documentation", zh: "设计检查清单与文档" }, type: "pdf", size: "450 KB", description: { en: "Complete design checklist documenting the visualization design process, best practices, and quality assurance criteria.", zh: "完整的设计检查清单，记录可视化设计流程、最佳实践和质量保证标准。" }, url: "/portfolio/tableau-superstore/Design Checklist_JoeZhou.pdf" },
          { id: 'ts3', name: { en: "User Persona 1: Terrence", zh: "用户画像1：Terrence" }, type: "pdf", size: "320 KB", description: { en: "Detailed persona for operations-focused stakeholders. Defines information needs for inventory, logistics, and operational efficiency.", zh: "面向运营利益相关者的详细画像。定义了库存、物流和运营效率的信息需求。" }, url: "/portfolio/tableau-superstore/Persona 2 Terrence.pdf" },
          { id: 'ts4', name: { en: "User Persona 2: Sylvia", zh: "用户画像2：Sylvia" }, type: "pdf", size: "290 KB", description: { en: "Detailed persona for executive management. Defines strategic information needs for high-level business decision making.", zh: "面向高层管理的详细画像。定义了高层业务决策的战略信息需求。" }, url: "/portfolio/tableau-superstore/Sylvia-Persona.pdf" }
        ],
        versions: [{ version: 1, date: "2025-01-09", name: "tableau_superstore_project.zip", size: "2.2 MB", isCurrent: true }]
      },
      {
        id: 'port-dognition-analytics',
        title: { en: "Dognition User Behavior Analysis", zh: "Dognition 用户行为数据分析" },
        subtitle: { en: "Data-Driven Business Process Change Proposal", zh: "项目：数据驱动的业务流程改进提案" },
        type: "portfolio",
        thumbnailUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop",
        projectSummary: {
          en: "Data visualization and business analysis project for Dognition, a company that provides dog personality assessments. Used Tableau Story to analyze user test completion patterns, breed type distributions, and personality dimension correlations. Delivered data-driven recommendations to increase user engagement and test completion rates through targeted marketing and content personalization.",
          zh: "为 Dognition（一家提供狗狗性格评估的公司）进行的数据可视化和商业分析项目。使用 Tableau Story 分析用户测试完成模式、品种类型分布和性格维度相关性。通过有针对性的营销和内容个性化，提出数据驱动的建议以提高用户参与度和测试完成率。"
        },
        highlights: {
          en: [
            "Identified key engagement patterns: Socialite/Charmer personality types show 1.3-1.86x higher test completion rates",
            "Breed analysis revealed purebred dogs dominate completed tests (52%), but mixed breeds represent 48% untapped potential",
            "Developed data-driven recommendations for targeted marketing and breed-specific content strategies",
            "Presented compelling 5-minute business proposal with supporting Tableau Story visualization"
          ],
          zh: [
            "识别关键参与模式：社交型/魅力型性格的测试完成率高出 1.3-1.86 倍",
            "品种分析显示纯种狗主导已完成测试（52%），但混种狗代表 48% 的未开发潜力",
            "开发有针对性的营销和特定品种内容策略的数据驱动建议",
            "通过 Tableau Story 可视化支持，进行了 5 分钟的引人入胜的商业提案演示"
          ]
        },
        assets: [
          { id: 'da1', name: { en: "Live Presentation Recording", zh: "在线演示录制" }, type: "tableau-url", size: "Link", description: { en: "Screen recording of the 5-minute business proposal presentation to Dognition management team, including data analysis and recommendations.", zh: "向 Dognition 管理层进行 5 分钟商业提案演示的屏幕录制，包含数据分析和建议。" }, url: "https://app.screencast.com/G3UHjWv7nx0G1" },
          { id: 'da2', name: { en: "Tableau Public Interactive Story", zh: "Tableau Public 交互式故事板" }, type: "tableau-url", size: "Link", description: { en: "Interactive Tableau Story featuring bar charts, pie charts, bubble charts, and horizontal bar graphs supporting the business recommendations.", zh: "交互式 Tableau 故事板，包含支持商业建议的条形图、饼图、气泡图和水平条形图。" }, url: "https://public.tableau.com/views/doginition_17681907474040/Story?:language=zh-CN&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link" },
          { id: 'da3', name: { en: "Project Requirements Document", zh: "项目需求文档" }, type: "markdown", size: "12 KB", description: { en: "Complete project requirements including objectives, Dognition company background, presentation format guidelines, and evaluation criteria.", zh: "完整的项目需求，包括目标、Dognition 公司背景、演示格式指南和评估标准。" }, url: "/portfolio/dognition/项目需求.md" },
          { id: 'da4', name: { en: "Data Analytics Methodology", zh: "数据分析方法论" }, type: "markdown", size: "15 KB", description: { en: "Comprehensive 7-step data analysis framework covering requirement analysis, data cleaning, Tableau implementation, visualization design, and the 3C storytelling methodology.", zh: "完整的7步数据分析框架，涵盖需求分析、数据清洗、Tableau 实施、可视化设计和 3C 叙事方法论。" }, url: "/portfolio/dognition/数据分析方法论.md" }
        ],
        versions: [{ version: 1, date: "2025-01-12", name: "dognition_analytics_project.zip", size: "0.1 MB", isCurrent: true }]
      }
    ]
  },
  {
    id: 'cat-degree',
    title: { en: "OSU Degrees & Honors", zh: "OSU 学位与荣誉" },
    coverImage: "/osu-logo.svg",
    items: [
      {
        id: 'doc-degree-osu',
        title: { en: "OSU Diploma", zh: "OSU 毕业证书" },
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
      },
      {
        id: 'doc-degree-verification',
        title: { en: "Degree Verification", zh: "学历认证" },
        subtitle: { en: "Chinese Service Center for Scholarly Exchange", zh: "颁发机构：教育部留学服务中心" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2021-06-20", name: "OSU_Degree_Verification.pdf", size: "0.5 MB", isCurrent: true }]
      },
      {
        id: 'doc-dean-2019',
        title: { en: "Dean's List 2019", zh: "院长嘉许名单 2019" },
        subtitle: { en: "The Ohio State University", zh: "颁发机构：OSU" },
        type: "certificate",
        thumbnailUrl: "/osu-logo.svg",
        versions: [{ version: 1, date: "2019-12-20", name: "OSU_Deans_List_2019.pdf", size: "0.3 MB", isCurrent: true }]
      },
      {
        id: 'doc-dean-2020',
        title: { en: "Dean's List 2020", zh: "院长嘉许名单 2020" },
        subtitle: { en: "The Ohio State University", zh: "颁发机构：OSU" },
        type: "certificate",
        thumbnailUrl: "/osu-logo.svg",
        versions: [{ version: 1, date: "2020-12-20", name: "OSU_Deans_List_2020.pdf", size: "0.3 MB", isCurrent: true }]
      },
      {
        id: 'doc-dean-2021',
        title: { en: "Dean's List 2021", zh: "院长嘉许名单 2021" },
        subtitle: { en: "The Ohio State University", zh: "颁发机构：OSU" },
        type: "certificate",
        thumbnailUrl: "/osu-logo.svg",
        versions: [{ version: 1, date: "2021-12-20", name: "OSU_Deans_List_2021.pdf", size: "0.3 MB", isCurrent: true }]
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
      },
      {
        id: 'cert-lstm-deep-learning',
        title: { en: "LSTM Deep Learning Specialization", zh: "LSTM深度学习专业证书" },
        subtitle: { en: "Simplilearn / Coursera", zh: "机构: Simplilearn" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2025-01-05", name: "coursera-lstm-certificate.pdf", size: "2.3 MB", isCurrent: true }]
      },
      {
        id: 'cert-data-science-ml',
        title: { en: "Data Science and Machine Learning", zh: "数据科学与机器学习" },
        subtitle: { en: "Packt / Coursera", zh: "机构: Packt" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2025-01-05", name: "coursera-data-science-ml-certificate.pdf", size: "2.5 MB", isCurrent: true }]
      },
      {
        id: 'cert-python-statistics-financial',
        title: { en: "Python and Statistics for Financial Analysis", zh: "Python与统计学在金融分析中的应用" },
        subtitle: { en: "The Hong Kong University of Science and Technology / Coursera", zh: "机构: 香港科技大学" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2025-01-05", name: "coursera-python-statistics-financial-analysis-certificate.pdf", size: "1.8 MB", isCurrent: true }]
      },
      {
        id: 'cert-tableau-fundamentals',
        title: { en: "Fundamentals of Visualization with Tableau", zh: "Tableau数据可视化基础" },
        subtitle: { en: "UC Davis / Coursera", zh: "机构: UC Davis" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2025-01-07", name: "Fundamentals_of_Visualization_with_Tableau.pdf", size: "1.2 MB", isCurrent: true }]
      },
      {
        id: 'cert-tableau-essential-design',
        title: { en: "Essential Design Principles for Tableau", zh: "Tableau核心设计原则" },
        subtitle: { en: "UC Davis / Coursera", zh: "机构: UC Davis" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2025-01-07", name: "Essential_Design_Principles_for_Tableau.pdf", size: "1.1 MB", isCurrent: true }]
      },
      {
        id: 'cert-tableau-visual-analytics',
        title: { en: "Visual Analytics with Tableau", zh: "Tableau可视化分析" },
        subtitle: { en: "UC Davis / Coursera", zh: "机构: UC Davis" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2025-01-07", name: "Visual_Analytics_with_Tableau.pdf", size: "1.3 MB", isCurrent: true }]
      },
      {
        id: 'cert-tableau-dashboards',
        title: { en: "Creating Dashboards and Storytelling with Tableau", zh: "Tableau仪表板与数据叙事" },
        subtitle: { en: "UC Davis / Coursera", zh: "机构: UC Davis" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2025-01-07", name: "Creating_Dashboards_and_Storytelling_with_Tableau.pdf", size: "1.4 MB", isCurrent: true }]
      },
      {
        id: 'cert-python-finance-edhec',
        title: { en: "Python & Finance Specialization", zh: "Python & Finance 专业化认证" },
        subtitle: { en: "EDHEC Business School / Coursera", zh: "机构: EDHEC 商学院" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2025-01-07", name: "Coursera_Python_Finance_Specialization_EDHEC.pdf", size: "2.0 MB", isCurrent: true }]
      },
      {
        id: 'cert-business-metrics-duke',
        title: { en: "Business Metrics for Data-Driven Companies", zh: "数据驱动企业的商业指标" },
        subtitle: { en: "Duke University / Coursera", zh: "机构: Duke University" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2025-01-12", name: "Business_Metrics_for_Data-Driven_Companies.pdf", size: "1.5 MB", isCurrent: true }]
      },
      {
        id: 'cert-managing-big-data-mysql',
        title: { en: "Managing Big Data with MySQL", zh: "使用MySQL管理大数据" },
        subtitle: { en: "Duke University / Coursera", zh: "机构: Duke University" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2025-01-12", name: "Managing_Big_Data_with_MySQL.pdf", size: "1.6 MB", isCurrent: true }]
      }
    ]
  }
];
