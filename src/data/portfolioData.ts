import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  FolderGit2,
  GraduationCap,
  Award,
  Briefcase,
  Code2,
  Cpu,
  Server,
  Layout,
  Database,
  Wrench,
} from 'lucide-react';

export const personalInfo = {
  name: 'Anuja Sawant',
  headline: 'Machine Learning & Data Science | Python | SQL',
  heroHeading: 'Turning Data into Decisions.',
  heroIntro:
    "I'm a final-year B.Tech Information Technology student with hands-on experience in Python, machine learning, SQL, data analysis, and AI application development. I enjoy building data-driven solutions, developing predictive models, and translating complex problems into practical applications.",
  about:
    "I'm a final-year Information Technology student interested in Data Science, Machine Learning, and Data Analytics. My experience includes building machine learning applications, developing AI-powered solutions, working with SQL, and creating data-driven web applications. Through academic and internship projects, I have explored predictive modeling, exploratory data analysis, demand forecasting, and AI application development. I'm looking for opportunities where I can apply my technical skills, learn from experienced teams, and solve practical problems using data.",
  email: 'anujasawant555@gmail.com',
  phone: '+91 8767544746',
  github: 'https://github.com/Anuja0505',
  linkedin: 'https://www.linkedin.com/in/anuja-sawant-600697316/',
  resumePath: '/resume.pdf',
};

export const aboutHighlights = [
  'Data Science & Machine Learning',
  'Predictive Modeling & EDA',
  'Demand Forecasting',
  'AI Application Development',
  'SQL & Data Analysis',
  'Data-Driven Web Applications',
];

export const skillCategories = [
  {
    title: 'Programming',
    icon: Code2,
    skills: ['Python', 'Java', 'JavaScript', 'SQL'],
  },
  {
    title: 'Machine Learning & Data Science',
    icon: Cpu,
    skills: [
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'Exploratory Data Analysis',
      'Machine Learning',
    ],
  },
  {
    title: 'Backend & APIs',
    icon: Server,
    skills: ['FastAPI', 'REST APIs', 'Backend Integration'],
  },
  {
    title: 'Frontend',
    icon: Layout,
    skills: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    title: 'Databases',
    icon: Database,
    skills: ['MongoDB', 'MySQL'],
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'Streamlit', 'Android Studio'],
  },
];

export const experiences = [
  {
    role: 'Project Intern – AI Domain',
    organization: 'Infosys Springboard',
    duration: 'July 2026 – September 2026',
    responsibilities: [
      'Developed a Textile Waste Intelligence Platform using Python, FastAPI, React.js, and MongoDB.',
      'Integrated fabric and defect classification with recommendation and sustainability analysis modules.',
      'Built REST APIs for AI inference, authentication, multi-image processing, data storage, and dashboard analytics.',
    ],
  },
  {
    role: 'Web Development Intern',
    organization: 'InnovateHive Tech Solutions',
    duration: 'June 2025 – November 2025',
    responsibilities: [
      'Developed responsive web pages using HTML, CSS, JavaScript, and Tailwind CSS.',
      'Integrated backend APIs and implemented dynamic web application functionality.',
      'Used Git and GitHub for version control, debugging, testing, and collaborative development.',
    ],
  },
];

export const projects = [
  {
    title: 'SmartStock – Demand Forecasting & Inventory Risk Intelligence',
    description:
      'An end-to-end retail demand forecasting and inventory intelligence system designed to support demand prediction and inventory replenishment decisions.',
    technologies: [
      'Python',
      'XGBoost',
      'Random Forest',
      'Time-series Feature Engineering',
      'Streamlit',
    ],
    features: [
      'Demand forecasting using lag and rolling-window time-series features',
      'Comparison of a rolling baseline, Random Forest, and XGBoost',
      'Model evaluation using MAE and RMSE',
      'Time-based and walk-forward validation',
      'Inventory risk analysis',
      'Safety stock and reorder-point calculations',
      'Replenishment logic',
      'Interactive Streamlit dashboard',
    ],
    liveUrl: 'https://smartstock-anuja.streamlit.app/',
    buttonLabel: 'View Live Project',
    githubUrl: null,
    featured: true,
  },
  {
    title: 'Employee Attrition Prediction System',
    description:
      'A machine learning application that predicts employee attrition using the IBM HR Analytics dataset.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Random Forest', 'Streamlit'],
    features: [
      'Data preprocessing',
      'Exploratory Data Analysis',
      'Feature selection',
      'Model evaluation',
      'Interactive employee attrition prediction dashboard',
    ],
    liveUrl: 'https://employee-attrition-prediction-anuja.streamlit.app/',
    buttonLabel: 'View Live Project',
    githubUrl: null,
    featured: true,
  },
  {
    title: 'Textile Waste Intelligence Platform',
    description:
      'An AI-powered textile waste management platform designed to support fabric and defect classification, recommendations, and sustainability analysis.',
    technologies: ['Python', 'FastAPI', 'React.js', 'MongoDB'],
    features: [
      'Fabric and defect classification integration',
      'Recommendation and sustainability analysis modules',
      'REST APIs for AI inference',
      'Multi-image processing',
      'Data storage and authentication',
      'Dashboard analytics',
    ],
    context: 'Developed during my Infosys Springboard AI-domain internship.',
    liveUrl: null,
    buttonLabel: 'Project Overview',
    githubUrl: null,
    featured: false,
  },
  {
    title: 'E-Commerce Customer Intelligence & Retention Analysis',
    description:
      'Analyzed the Brazilian E-Commerce Public Dataset by Olist using PostgreSQL to uncover insights into revenue trends, product category performance, customer retention, delivery performance, payment methods, and seller performance.',
    technologies: ['PostgreSQL', 'SQL', 'pgAdmin 4'],
    features: [
      'Analyzed 96,096 unique customers',
      'Identified a 3.12% repeat-purchase rate under the project\u2019s analysis definition',
      'Measured an 8.11% late-delivery rate among analyzed delivered orders',
      'Identified Health & Beauty as the highest-revenue product category in the analysis',
      'Applied SQL joins, aggregations, CTEs, window functions, and data validation',
    ],
    liveUrl: null,
    buttonLabel: null,
    githubUrl: 'https://github.com/Anuja0505/ecommerce-customer-intelligence-sql',
    featured: false,
  },
  {
    title: 'DARPAN: Unmasking Dark Patterns in Booking Platforms through UI Analysis',
    description:
      'An academic group research project focused on identifying potentially manipulative user interface patterns on booking and travel websites using computer vision and natural language processing.',
    technologies: [
      'Python',
      'YOLOv8n',
      'DistilBERT',
      'Tesseract OCR',
      'LabelImg',
      'Computer Vision',
      'NLP',
    ],
    features: [
      'Dataset collection and preparation of booking/travel website screenshots',
      'UI element annotation using LabelImg with defined dark pattern labeling rules',
      'Training and evaluation of YOLOv8n object-detection model for visual UI pattern identification',
      'Prediction fusion combining visual-model outputs with text-classification results',
      'Research paper, technical documentation, and experimental result reporting',
      'Project task coordination and component integration across the team workflow',
    ],
    context:
      'Academic group research project (AI, Computer Vision & NLP). Contributions listed describe my individual involvement; overall system and research outcomes reflect the team\u2019s work.',
    liveUrl: null,
    buttonLabel: null,
    githubUrl: null,
    featured: false,
  },
  {
    title: 'Task Tracker Application',
    description:
      'An Android task management application with CRUD functionality for creating, viewing, updating, and deleting tasks.',
    technologies: [],
    features: [],
    liveUrl: null,
    buttonLabel: null,
    githubUrl: null,
    featured: false,
  },
];

export const education = {
  degree: 'Bachelor of Technology in Information Technology',
  institution: 'Pillai College of Engineering, Navi Mumbai',
  duration: '2023–2027',
  cgpa: '9.37',
};

export const certifications = [
  { title: 'Deloitte Australia Technology Job Simulation', issuer: 'Forage', year: '2026' },
  { title: 'Deloitte Australia Data Analyst Job Simulation', issuer: 'Forage', year: '2026' },
  { title: 'Google Cloud Career Launchpad – Generative AI', issuer: 'Google Cloud', year: '2025' },
  { title: 'Web Development', issuer: 'Internshala', year: '2024' },
  { title: 'Java Programming', issuer: 'NPTEL', year: '2024' },
];

export const contactText = {
  heading: "Let's Connect",
  body: "I'm open to entry-level opportunities, internships, and collaborations in Data Science, Machine Learning, and Data Analytics.",
};

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

