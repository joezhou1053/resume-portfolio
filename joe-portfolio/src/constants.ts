import type { AppContent, DocumentCategory } from './types';

export const CONTENT_EN: AppContent = {
  nav: {
    home: "Home",
    experience: "Experience",
    skills: "Analytics & Skills",
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
    documents: "Documents & Certifications",
    life: "Life & Interests"
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
      gpa : "3.88/4.00",
      duration: "2018.08-2022.05",
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
      { category: "Business Analysis", items: ["Requirement Gathering", "Visio", "Axure RP", "XMind"] },
      { category: "Data & Finance", items: ["SQL", "Excel VBA", 'Tableau', "Financial Modeling", "Data Auditing"] },
      { category: "Development", items: ["API Integration Testing", "Intermediate Python", "System Integration Testing", "Vibe Coding"] }
    ],
    soft: ["Cross-functional Communication", "Stakeholder Management", "Problem Solving", "English Communication", "Team Leadership"],
    languages: ["English (Professional/Academic)", "Mandarin (Native)"]
  },
  life: {
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    quote: "I can do all this through him who gives me strength. (Philippians 4:13)",
    items: [
      { title: "Continuous Learning", description: "Exploring financial technology trends and AI applications.", icon: 'graduation-cap' },
      { title: "Reading Enthusiast", description: "Systematic reading to expand knowledge boundaries and enhance thinking depth.", icon: 'book' },
      { title: "Global Mindset", description: "Listen to CNBC financial news and podcasts related to AI applications every day", icon: 'globe' },
      { title: "Active Lifestyle", description: "YOLO Believer & Fitness enthusiast.", icon: 'activity' }
    ]
  }
};

export const CONTENT_ZH: AppContent = {
  nav: {
    home: "首页",
    experience: "工作经历",
    skills: "技能分析",
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
    documents: "文档与证书管理",
    life: "生活与兴趣"
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
      gpa: "3.88/4.00",
      duration: "2018.08-2022.05",
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
      { category: "商业分析", items: ["需求调研", "Visio流程图", "Axure 原型", "XMind 思维导图"] },
      { category: "数据与金融", items: ["SQL 查询", "Excel VBA", "Tableau 数据可视化", "金融建模", "数据稽核"] },
      { category: "技术能力", items: ["API 接口联调", "Python 熟练", "系统集成测试", "氛围编程"] }
    ],
    soft: ["团队协作", "跨部门沟通", "逻辑思维", "英语沟通", "团队领导力"],
    languages: ["英语 (专业流利)", "中文 (母语)"]
  },
  life: {
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    quote: "我靠着那加给我力量的，凡事都能做。 (腓立比书 4:13)",
    items: [
      { title: "终身学习", description: "热衷学习探索金融科技趋势和AI应用。", icon: 'graduation-cap' },
      { title: "热衷阅读", description: "热衷系统性阅读，持续拓展知识边界与思维深度。", icon: 'book' },
      { title: "全球视野", description: "每日收听CNBC财经新闻及AI应用相关播客分享。", icon: 'globe' },
      { title: "积极生活", description: "YOLO主义信仰者，健身爱好者。", icon: 'activity' }
    ]
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
        id: 'port-wsd-property-management',
        title: { en: "Watershed Property Management Analytics", zh: "物业管理数据分析项目" },
        subtitle: { en: "Data-Driven Profit Optimization", zh: "数据驱动的利润优化策略" },
        type: "portfolio",
        thumbnailUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop",
        projectSummary: {
          en: "Full-stack data analysis project presenting a low-risk pilot opportunity assessment and implementation plan for Watershed to enter the short-term rental market.",
          zh: "全栈数据分析项目，呈现 Watershed 进入短期租赁市场的低风险试点机会评估与实施计划。"
        },
        highlights: {
          en: [
            "Built analytics pipeline: MySQL → Excel modeling → Tableau dashboard with sensitivity analysis for pricing scenarios",
            "Developed interactive dashboard enabling property managers to simulate pricing strategies and optimize revenue while managing risk",
            "Delivered White Paper documenting analysis methodology and recommendations, plus executive presentation securing stakeholder buy-in"
          ],
          zh: [
            "构建数据分析管道：MySQL → Excel 建模 → Tableau 仪表板，配备敏感性分析用于定价情景模拟",
            "开发交互式仪表板，使物业经理能够模拟定价策略并优化收入，同时管理风险敞口",
            "交付记录分析方法论和建议的白皮书，以及获得利益相关者认可的高管演示文稿"
          ]
        },
        assets: [
          { id: 'wsd1', name: { en: "Live Presentation Recording", zh: "在线演示录制" }, type: "video", size: "Link", description: { en: "Complete presentation showcasing data-driven profit optimization strategy recommendations for Watershed Property Management executives.", zh: "向 Watershed Property Management 高管展示数据驱动的利润优化战略建议的完整演示。" }, url: "https://app.screencast.com/CruSBGtVhcFIS" },
          { id: 'wsd2', name: { en: "Tableau Interactive Dashboard", zh: "Tableau 交互式仪表板" }, type: "tableau-url", size: "Link", description: { en: "Interactive dashboard with sensitivity analysis, property metrics, and profit optimization scenarios.", zh: "包含敏感性分析、物业绩效指标和利润优化情景的交互式仪表板。" }, url: "https://public.tableau.com/views/FinalProject_V1_9/WSDashboard?:language=zh-CN&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link" },
          { id: 'wsd3', name: { en: "White Paper", zh: "白皮书" }, type: "pdf", size: "338 KB", description: { en: "Complete analysis methodology, data extraction process, and strategic recommendations for increasing property management profits.", zh: "完整分析方法论、数据提取流程及提高物业管理利润的战略建议。" }, url: "/portfolio/tableau-wsd-project/White_Paper.pdf" },
          { id: 'wsd4', name: { en: "Executive Presentation", zh: "高管演示文稿" }, type: "pptx", size: "1.8 MB", description: { en: "Professional deck with data visualizations, sensitivity analysis results, and implementation roadmap.", zh: "包含数据可视化、敏感性分析结果和实施路线图的专业演示文稿。" }, url: "/portfolio/tableau-wsd-project/Final_Presentation.pptx" }
        ],
        versions: [{ version: 1, date: "2025-01-13", name: "watershed_property_management_capstone.zip", size: "8.3 MB", isCurrent: true }]
      },
      {
        id: 'port-dognition-analytics',
        title: { en: "Dognition User Behavior Analysis", zh: "Dognition 用户行为数据分析" },
        subtitle: { en: "Data-Driven Business Process Change", zh: "数据驱动的业务流程改进" },
        type: "portfolio",
        thumbnailUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop",
        projectSummary: {
          en: "Data visualization and business analysis for Dognition: delivering data-driven marketing recommendations via business proposal presentation to improve test completion rates.",
          zh: "为Dognition公司进行数据可视化和商业分析。通过商业提案演示提供数据驱动的营销建议，提高测试完成率。"
        },
        highlights: {
          en: [
            "Analyzed 9 personality dimensions using Tableau Story, discovering Socialite and Charmer types show 1.3-1.86x higher completion rates",
            "Identified market opportunity through breed analysis revealing mixed breeds represent 48% of users but lower completion rates, presenting potential for targeted campaigns",
            "Delivered 5-minute business proposal with interactive Tableau Story, providing breed-specific personalization strategies to drive engagement improvement by 15-20%"
          ],
          zh: [
            "使用 Tableau Story 分析 9 个狗狗性格维度的数据，发现社交型和魅力型性格类型展现出显著更高的参与度，完成率高出 1.3-1.86 倍",
            "通过品种分析识别关键市场机会，揭示混种狗占用户基础 48% 但完成率较低，为有针对性的营销活动呈现巨大的未开发潜力",
            "通过交互式 Tableau Story 可视化支持，提供引人入胜的 5 分钟在线商业提案演示，提供可执行的特定品种内容个性化策略，以推动 15-20% 的参与度提升"
          ]
        },
        assets: [
          { id: 'da1', name: { en: "Live Presentation Recording", zh: "在线演示录制" }, type: "video", size: "Link", description: { en: "5-minute business proposal presentation to Dognition management team with data analysis and recommendations.", zh: "向 Dognition 管理层进行的 5 分钟商业提案演示，包含数据分析和建议。" }, url: "https://app.screencast.com/G3UHjWv7nx0G1" },
          { id: 'da2', name: { en: "Tableau Interactive Story", zh: "Tableau 交互式故事板" }, type: "tableau-url", size: "Link", description: { en: "Interactive visualization with bar charts, pie charts, bubble charts supporting business recommendations.", zh: "包含条形图、饼图、气泡图的交互式可视化，支持商业建议。" }, url: "https://public.tableau.com/views/doginition_17681907474040/Story?:language=zh-CN&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link" },
          { id: 'da3', name: { en: "Project Requirements", zh: "项目需求文档" }, type: "markdown", size: "12 KB", description: { en: "Complete project requirements including objectives, company background, and evaluation criteria.", zh: "完整的项目需求，包括目标、公司背景和评估标准。" }, url: "/portfolio/dognition/项目需求.md" },
          { id: 'da4', name: { en: "Analytics Methodology", zh: "数据分析方法论" }, type: "markdown", size: "15 KB", description: { en: "7-step data analysis framework covering requirement analysis, data cleaning, Tableau implementation, and storytelling.", zh: "7步数据分析框架，涵盖需求分析、数据清洗、Tableau 实施和叙事方法。" }, url: "/portfolio/dognition/数据分析方法论.md" }
        ],
        versions: [{ version: 1, date: "2025-01-12", name: "dognition_analytics_project.zip", size: "0.1 MB", isCurrent: true }]
      },
      {
        id: 'port-financial-data-analysis',
        title: { en: "Financial Data Analysis with LSTM", zh: "金融数据分析与LSTM应用" },
        subtitle: { en: "Deep Learning & Quantitative Trading", zh: "深度学习与量化交易" },
        type: "portfolio",
        thumbnailUrl: "/portfolio/financial-data-analysis/Image1.png",
        projectSummary: {
          en: "Applied deep learning LSTM networks to financial time series forecasting, using the historical price data from the previous 60 days, predict the price on the 61st day. Developed ML workflow from data preprocessing to model evaluation, implementing quantitative trading strategy with backtested returns.",
          zh: "运用深度学习LSTM网络进行金融时间序列预测，用前60天的历史价格数据，去预测第61天的价格。开发从数据预处理到模型评估的ML工作流程，实现带回测的量化交易策略。"
        },
        highlights: {
          en: [
            "Achieved 93.7% prediction accuracy using 10 years of gold price data through optimized LSTM architecture for financial forecasting",
            "Implemented end-to-end ML workflow with data preprocessing notebook, model training notebook, and performance visualization"
          ],
          zh: [
            "使用 10 年黄金价格数据通过优化的 LSTM 架构达到 93.7% 的预测准确率",
            "实现端到端 ML 工作流程，包括数据预处理 notebook、模型训练 notebook 和性能可视化"
          ]
        },
        assets: [
          { id: 'fda1', name: { en: "LSTM Gold Price Model", zh: "LSTM黄金价格预测模型" }, type: "notebook", size: "5.1 MB", description: { en: "Complete implementation with data preprocessing, LSTM architecture, training, and visualization.", zh: "完整实现，包含数据预处理、LSTM架构、训练和可视化。" }, url: "/portfolio/financial-data-analysis/LSTM_Gold_Price_Prediction_Joe.ipynb" },
          { id: 'fda2', name: { en: "Data Munging", zh: "数据清洗" }, type: "notebook", size: "95 KB", description: { en: "Data quality assessment, missing value handling, and feature engineering for financial time series.", zh: "金融时间序列数据质量评估、缺失值处理和特征工程。" }, url: "/portfolio/financial-data-analysis/Data_Cleaning.ipynb" }
        ],
        versions: [{ version: 1, date: "2025-01-05", name: "financial_data_analysis_bundle.zip", size: "5.8 MB", isCurrent: true }]
      },
      {
        id: 'port-tableau-superstore',
        title: { en: "Tableau Superstore Data Visualization", zh: "Tableau 超市数据可视化分析" },
        subtitle: { en: "Interactive Business Analytics Dashboard", zh: "交互式商业分析仪表板" },
        type: "portfolio",
        thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
        projectSummary: {
          en: "Data visualization project using Tableau to analyze Superstore sales performance across multiple business dimensions. Implemented user-centered design creating detailed personas, delivering interactive Story with connected dashboards and complete design documentation.",
          zh: "使用 Tableau 对超市销售业绩进行多维度数据可视化分析。实施以用户为中心的设计创建详细用户画像，交付包含关联仪表板的交互式故事板和完整设计文档。"
        },
        highlights: {
          en: [
            "Interactive Tableau story with profit distribution, discount profit ratio, and category sales performance",
            "Applied user-centered design creating personas including Terrence (Operations Manager) and Sylvia (VP of Sales) to guide visualization decisions",
            "Delivered Design Checklist documenting visualization process and best practices, plus persona documentation ensuring reproducible workflows"
          ],
          zh: [
            "构建交互式 Tableau 故事板，包含关联仪表板分析利润状态分布，折扣利润比率，和产品类别的销售绩效",
            "应用以用户为中心的设计，创建 Terrence（运营经理）和 Sylvia（销售副总裁）用户画像以指导可视化决策",
            "交付设计检查清单记录可视化流程和最佳实践，以及用户画像文档确保可复用的工作流程"
          ]
        },
        assets: [
          { id: 'ts1', name: { en: "Tableau Interactive Story", zh: "Tableau 交互式故事板" }, type: "tableau-url", size: "Link", description: { en: "Interactive Story with dashboards analyzing how discounts impact profit and how to optimize category/subcategory discounts.", zh: "包含折扣如何影响利润以及如何优化类别/子类别折扣的交互式故事板。" }, url: "https://public.tableau.com/app/profile/joe.zhou4877/viz/superstore_project_JoeZhou/Story" },
          { id: 'ts2', name: { en: "Design Checklist", zh: "设计检查清单" }, type: "pdf", size: "450 KB", description: { en: "From business problem decomposition to data selection, audience definition, and display form definition, providing a clear design framework for dashboards. ", zh: "从业务问题拆解、数据选型到受众与展示形式定义，为仪表盘提供清晰的设计框架。" }, url: "/portfolio/tableau-superstore/Design Checklist_JoeZhou.pdf" },
          { id: 'ts3', name: { en: "User Persona: Terrence", zh: "用户画像：Terrence" }, type: "pdf", size: "320 KB", description: { en: "Persona for operations stakeholders focusing on operational efficiency and financial stability.", zh: "面向运营利益相关者的画像，聚焦以运营效率与财务稳健为核心的决策诉求。" }, url: "/portfolio/tableau-superstore/Persona 2 Terrence.pdf" },
          { id: 'ts4', name: { en: "User Persona: Sylvia", zh: "用户画像：Sylvia" }, type: "pdf", size: "290 KB", description: { en: "Persona for executive management focusing on sales data-driven agile inventory decisions and trend predictions", zh: "面向高层管理的画像，聚焦用销售数据驱动敏捷库存决策与趋势预测的决策诉求。" }, url: "/portfolio/tableau-superstore/Sylvia-Persona.pdf" }
        ],
        versions: [{ version: 1, date: "2025-01-09", name: "tableau_superstore_project.zip", size: "2.2 MB", isCurrent: true }]
      },
      {
        id: 'port-bl-backtest',
        title: { en: "Black-Litterman Model Backtest System", zh: "Black-Litterman模型回测系统" },
        subtitle: { en: "Quantitative Portfolio Optimization", zh: "量化投资组合优化平台" },
        type: "portfolio",
        thumbnailUrl: "/portfolio/bl-business-model-canvas/Image1.png",
        projectSummary: {
          en: "Interactive web application implementing Black-Litterman asset allocation model combining market equilibrium returns with investor views through Bayesian methods. Used forportfolio optimization.",
          zh: "实现 Black-Litterman 资产配置模型的交互式 Web 应用，通过贝叶斯方法将市场均衡收益与投资者观点结合。用于投资组合优化。"
        },
        highlights: {
          en: [
            "Implemented parameter configuration enabling real-time adjustment of risk aversion coefficient (δ: 1-5) and uncertainty scalar (τ: 0.01-0.1) for adaptive portfolio optimization",
            "Developed view builder supporting absolute and relative return views with dual uncertainty quantification (confidence level or He-Litterman multiplier) incorporating market insights",
            "Delivered performance dashboard analyzing 13 metrics including Sharpe ratio, maximum drawdown, VaR, CVaR, and etc."
          ],
          zh: [
            "实现参数配置系统，支持风险厌恶系数（δ: 1-5）和不确定性标量（τ: 0.01-0.1）的实时调整，用于动态投资组合优化",
            "开发观点构建器，支持绝对收益和相对表现观点，提供双重不确定性量化方法（信心水平或 He-Litterman 乘数）",
            "交付绩效仪表板，分析 13 项关键指标包括夏普比率、最大回撤、VaR、CVaR、Calmar 比率、信息比率、换手率和累计收益"
          ]
        },
        assets: [
          { id: 'bl1', name: { en: "Strategy Introduction", zh: "策略介绍" }, type: "image", size: "450 KB", description: { en: "Black-Litterman model theory, comparing with Markowitz optimization and Bayesian approach.", zh: "Black-Litterman模型理论，对比Markowitz优化和贝叶斯方法。" }, url: "/portfolio/bl-business-model-canvas/Image1.png" },
          { id: 'bl2', name: { en: "Parameter Configuration", zh: "参数配置" }, type: "image", size: "420 KB", description: { en: "Interactive parameter tuning for risk aversion (δ: 1-5) and uncertainty (τ: 0.01-0.1).", zh: "交互式参数调优，配置风险厌恶系数(δ: 1-5)和不确定性标量(τ: 0.01-0.1)。" }, url: "/portfolio/bl-business-model-canvas/Image2.png" },
          { id: 'bl3', name: { en: "View Construction", zh: "观点构建" }, type: "image", size: "380 KB", description: { en: "Advanced view builder with absolute and relative views, dual uncertainty quantification methods.", zh: "高级观点构建器，支持绝对/相对观点和双重不确定性量化。" }, url: "/portfolio/bl-business-model-canvas/Image3.png" },
          { id: 'bl4', name: { en: "Results Analysis", zh: "结果分析" }, type: "image", size: "400 KB", description: { en: "Performance dashboard with cumulative returns, weight distribution, and 13 key metrics.", zh: "综合绩效仪表盘，包含累计收益、权重分布及13项关键指标。" }, url: "/portfolio/bl-business-model-canvas/Image4.png" }
        ],
        versions: [{ version: 1, date: "2025-01-05", name: "black_litterman_backtest_system.zip", size: "2.1 MB", isCurrent: true }]
      },
      {
        id: 'port-diamond-hands',
        title: { en: "Diamond Hands Protocol - GameFi Application MVP", zh: "钻石手协议 - GameFi 储蓄游戏 MVP" },
        subtitle: { en: "Solana Blockchain Game", zh: "Solana 区块链游戏" },
        type: "portfolio",
        thumbnailUrl: "/portfolio/diamond-hands/Image1.png",
        projectSummary: {
          en: "Gamified savings application built on the Solana blockchain, demonstrating the principles of game theory in the context of GameFi. Support connecting to the Phantom wallet and obtaining test SOL.",
          zh: "基于 Solana 区块链构建的游戏化储蓄应用，在 GameFi 语境中展示博弈论原理。支持连接 Phantom 钱包并获取测试SOL币"
        },
        highlights: {
          en: [
            "Implemented prisoner's dilemma mechanics with 60-second SOL lockup featuring dynamic panic-sell penalties (20% normal, 40% avalanche) creating strategic decision-making under time pressure",
            "Developed three-phase game system including normal period, panic peak, and avalanche with visual effects, real-time activity feed, and dynamic reward pool calculations",
            "Created player strategy guide documenting game mechanics, ROI calculation comparing panic-sell versus hold scenarios, and optimal tactics for different risk profiles demonstrating game theory"
          ],
          zh: [
            "实现囚徒困境游戏机制，60 秒 SOL 锁定期内具备动态恐慌卖出惩罚（正常期 20%，雪崩期 40%），在时间压力下创造战略决策情景",
            "开发三阶段游戏系统，含正常期、恐慌高峰期、雪崩期，配备视觉效果，实时活动流和动态奖池计算",
            "创建玩家策略指南，记录游戏机制、比较恐慌卖出与持有情景的 ROI 计算，以及针对不同风险偏好的最优战术，展示博弈论应用"
          ]
        },
        assets: [
          { id: 'dh1', name: { en: "Game Interface", zh: "游戏界面总览" }, type: "image", size: "947 KB", description: { en: "Main interface with current balance, Phantom wallet, reward pool,  real-time player activities.", zh: "游戏主界面，展示当前余额、 Phantom 钱包、奖池、实时玩家活动。" }, url: "/portfolio/diamond-hands/Image1.png" },
          { id: 'dh2', name: { en: "Avalanche Period", zh: "雪崩期视觉效果" }, type: "image", size: "531 KB", description: { en: "Red border with dual pulse effects during avalanche period (20-30s) showing panic-sell penalties.", zh: "雪崩期（20-30秒）红色边框和双重脉冲效果，显示恐慌卖出惩罚。" }, url: "/portfolio/diamond-hands/Image2.png" },
          { id: 'dh3', name: { en: "Join the Game", zh: "参与协议游戏" }, type: "image", size: "707 KB", description: { en: "The pledge operation interface supports 'panic selling' and 'successful collection'. It is equipped with user-friendly operation instructions.", zh: "质押操作界面，支持 ‘恐慌卖出’ 和 ‘成功领取’。 配有 用户友好的 操作指引。" }, url: "/portfolio/diamond-hands/Image3.png" },
          { id: 'dh4', name: { en: "Strategy Guide", zh: "玩家策略指南" }, type: "markdown", size: "5 KB", description: { en: "Comprehensive guide covering game mechanics, three-phase system, ROI examples, and strategies.", zh: "完整玩家指南，涵盖游戏机制、三阶段系统、收益示例和策略。" }, url: "/portfolio/diamond-hands/玩家指南.md" }
        ],
        versions: [{ version: 1, date: "2025-01-08", name: "diamond_hands_protocol.zip", size: "2.2 MB", isCurrent: true }]
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
      },
      {
        id: 'cert-data-viz-tableau',
        title: { en: "Data Visualization and Communication with Tableau", zh: "Tableau数据可视化与沟通" },
        subtitle: { en: "Duke University / Coursera", zh: "机构: Duke University" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2025-01-13", name: "Data_Visualization_and_Communication_with_Tableau.pdf", size: "1.5 MB", isCurrent: true }]
      },
      {
        id: 'cert-real-estate-analytics-duke',
        title: { en: "Increasing Real Estate Management Profits: Harnessing Data Analytics", zh: "房地产管理利润提升：数据分析应用" },
        subtitle: { en: "Duke University / Coursera", zh: "机构: Duke University" },
        type: "certificate",
        thumbnailUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=400&auto=format&fit=crop",
        versions: [{ version: 1, date: "2025-01-14", name: "Increasing_Real_Estate_Management_Profits_Harnessing_Data_Analytics.pdf", size: "311 KB", isCurrent: true }]
      }
    ]
  }
];
