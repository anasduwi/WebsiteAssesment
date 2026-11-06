export const siteSettings = {
  title: "DMS SUPERVISOR EXAMINATION",
  subtitle: "Online Assessment – Training On Site Supervisor",
  description:
    "Selamat datang di platform evaluasi Training On Site Supervisor. Silakan lengkapi identitas dan ikuti ujian untuk mengukur pemahaman mengenai materi training dan penerapan tugas Sales Supervisor.",
  examDurationMinutes: 30,
  passingGrade: 70,
  active: true,
  certificatePolicy: "all",
};

export const expertiseAreas = [
  {
    title: "MARKETING SUPPORT",
    items: [
      "Marketing Activity Monitoring.",
      "Budget Monitoring.",
      "Program Evaluation.",
      "Marketing Documentation.",
      "Reporting & Administration.",
    ],
  },
  {
    title: "TRADE MARKETING",
    items: [
      "Brand Activation.",
      "Trade Promotion.",
      "Active Brand Distribution.",
      "Outlet Coverage.",
      "POSM Monitoring.",
    ],
  },
  {
    title: "DATA ANALYTICS",
    items: [
      "Data Cleaning.",
      "Data Transformation.",
      "Data Modeling.",
      "Sales Analysis.",
      "Business Performance Analysis.",
    ],
  },
  {
    title: "DASHBOARD DEVELOPMENT",
    items: [
      "Sales Performance Dashboard.",
      "Inventory Dashboard.",
      "Budget Monitoring Dashboard.",
      "Account Payable Dashboard.",
      "Account Receivable Dashboard.",
    ],
  },
  {
    title: "DATA MANAGEMENT",
    items: [
      "Excel Data Management.",
      "Power Query.",
      "Data Validation.",
      "SQL.",
      "Database Management.",
    ],
  },
  {
    title: "BUSINESS REPORTING",
    items: [
      "Management Reporting.",
      "KPI Monitoring.",
      "Trend Analysis.",
      "Performance Evaluation.",
      "Business Insights.",
    ],
  },
];

export const tools = [
  "Microsoft Excel",
  "Power BI",
  "Looker Studio",
  "Google Sheets",
  "Power Query",
  "DAX",
  "SQL",
  "Python",
];

export const portfolioProjects = [
  {
    slug: "sales-performance-dashboard",
    title: "PROJECT 01 — SALES PERFORMANCE DASHBOARD",
    description:
      "Monitoring of sales performance, growth, contribution, and profitability across territory coverage.",
    category: "Sales & Distribution",
    tools: ["Power BI", "Excel", "SQL"],
    metrics: [
      "Nett Sales",
      "Gross Profit",
      "Sales Achievement",
      "Sales Growth",
      "Sales Trend",
      "Sales Contribution",
    ],
    previewLabel: "DEMO DATA",
  },
  {
    slug: "inventory-management-dashboard",
    title: "PROJECT 02 — INVENTORY MANAGEMENT DASHBOARD",
    description:
      "Inventory availability, stock movement, aging, and coverage analysis to improve replenishment decisions.",
    category: "Operations",
    tools: ["Power BI", "Excel", "Power Query"],
    metrics: [
      "Total Inventory Value",
      "Ending Stock",
      "Average Sales per Week",
      "Days Inventory Outstanding",
      "Stock Cover Week",
      "Inventory Aging",
      "Outstanding PO",
    ],
    previewLabel: "DEMO DATA",
  },
  {
    slug: "account-payable-receivable-dashboard",
    title: "PROJECT 03 — ACCOUNT PAYABLE & RECEIVABLE DASHBOARD",
    description:
      "Monitoring liabilities and receivables to support cash flow optimization and credit management decisions.",
    category: "Finance",
    tools: ["Power BI", "Excel"],
    metrics: [
      "Total Liabilities",
      "Current Liabilities",
      "Aged Liabilities",
      "DPO",
      "Outstanding Receivables",
      "DSO",
      "Aging Analysis",
    ],
    previewLabel: "DEMO DATA",
  },
  {
    slug: "marketing-budget-monitoring",
    title: "PROJECT 04 — MARKETING BUDGET & ACTIVITY MONITORING",
    description:
      "Tracking promotional activity execution and budget utilization to maintain control of marketing programs.",
    category: "Marketing Analytics",
    tools: ["Excel", "Power BI", "Looker Studio"],
    metrics: [
      "Total Marketing Budget",
      "Budget Utilization",
      "Budget Remaining",
      "Total Activities",
      "Activity by Area",
      "Activity by Brand",
    ],
    previewLabel: "DEMO DATA",
  },
  {
    slug: "brand-distribution-analysis",
    title: "PROJECT 05 — BRAND DISTRIBUTION ANALYSIS",
    description:
      "Assessing outlet coverage and brand availability to monitor distribution effectiveness and contribution.",
    category: "Trade Marketing",
    tools: ["Excel", "Power BI", "SQL"],
    metrics: [
      "Active Brand Distribution",
      "Outlet Coverage",
      "Brand Availability",
      "Sales Contribution",
      "Brand Performance",
    ],
    previewLabel: "DEMO DATA",
  },
  {
    slug: "sales-route-outlet-coverage",
    title: "PROJECT 06 — SALES ROUTE & OUTLET COVERAGE",
    description:
      "Visualizing route performance, visits, and coverage that supports field sales planning and execution monitoring.",
    category: "Field Sales",
    tools: ["Excel", "Power BI"],
    metrics: [
      "Total Outlets",
      "Salesman Coverage",
      "Outlet Visits",
      "Route Performance",
      "Visit Achievement",
    ],
    previewLabel: "DEMO DATA",
  },
];

export const portfolioProfile = {
  fullName: "Your Name",
  title: "MARKETING SUPPORT & DATA ANALYST",
  tagline: "Turning Marketing Data into Actionable Business Insights.",
  summary:
    "Saya memiliki pengalaman dan ketertarikan dalam bidang Marketing Support, Trade Marketing, Business Operations, dan Data Analytics.\n\nSaya berfokus pada pengelolaan aktivitas marketing, monitoring performa penjualan dan distribusi, pengelolaan anggaran promosi, serta pengembangan dashboard analitik untuk mendukung proses monitoring dan pengambilan keputusan bisnis.\n\nSaya menggabungkan pemahaman operasional marketing dengan kemampuan analisis data untuk menghasilkan reporting yang informatif, terstruktur, dan mudah dipahami.",
  email: "your.email@example.com",
  linkedin: "linkedin.com/in/yourprofile",
  whatsapp: "+62 812-3456-7890",
  location: "Jakarta, Indonesia",
};

export const portfolioExperience = [
  {
    company: "Company Name",
    position: "Position",
    period: "2023 — Present",
    responsibilities: [
      "Marketing activity monitoring and reporting.",
      "Dashboard development for business performance tracking.",
      "Data validation, cleaning, and analysis for decision support.",
    ],
    projects: ["Dashboard analysis", "Marketing monitoring", "Cross-functional reporting"],
  },
  {
    company: "Previous Company",
    position: "Marketing Support Analyst",
    period: "2021 — 2023",
    responsibilities: [
      "Support market and promotional data management.",
      "Assist reporting and budget monitoring tasks.",
      "Maintain data quality for sales and distribution insights.",
    ],
    projects: ["Marketing budget tracking", "Coverage monitoring", "Sales review"],
  },
];
