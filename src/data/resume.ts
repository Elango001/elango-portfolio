export interface ResumeData {
  name: string;
  role: string;
  title: string;
  location: string;
  phone?: string;
  email: string;
  github: string;
  githubUrl: string;
  resumePdfUrl: string;
  summary: string;
  highlights: string[];
  technicalSkills: {
    languages: string[];
    backend: string[];
    mlAndAi: string[];
    frontend: string[];
    databases: string[];
    devopsAndTools: string[];
  };
  internships: Array<{
    role: string;
    company: string;
    period: string;
    summary: string;
    bullets: string[];
    metrics?: Array<{ label: string; value: string }>;
    technologies: string[];
  }>;
  projects: Array<{
    title: string;
    repoName: string;
    repoUrl: string;
    category: "AI & Multi-Agent" | "Machine Learning" | "Real-Time Systems";
    description: string;
    stack: string[];
    highlights: string[];
    metric?: string;
  }>;
  certifications: Array<{
    title: string;
    issuer: string;
    badge?: string;
    highlight?: boolean;
  }>;
}

export const resumeData: ResumeData = {
  name: "Elangovan S",
  role: "AI & Backend Engineer",
  title: "Building Scalable Backend Services, Autonomous Multi-Agent Systems & Deep Learning Architectures",
  location: "Salem, Tamil Nadu",
  email: "elangos195@gmail.com",
  github: "github.com/Elango001",
  githubUrl: "https://github.com/Elango001",
  resumePdfUrl: "/Elangovan-S-Resume.pdf",
  summary:
    "AI & Backend Engineer with hands-on experience designing high-throughput REST APIs, multi-agent LLM orchestration loops, and production-ready machine learning pipelines. Experienced in FastAPI, Flask, PyTorch, LangGraph, and full-stack system architecture with a focus on reliability, performance, and explainability.",
  highlights: [
    "Architected multi-agent execution graphs with LangGraph, sandboxed code execution & multi-LLM routing.",
    "Engineered production ML regression pipelines achieving R² 0.98, MAE 0.63, and RMSE 0.99 with serialized deployment.",
    "Designed and hardened Flask & FastAPI REST APIs with dual MySQL and MongoDB data tiers.",
    "Built real-time 25 FPS skeletal landmark tracking and 3D WebGL kinematics pipelines.",
  ],
  technicalSkills: {
    languages: ["Python", "Java", "SQL", "TypeScript / JavaScript"],
    backend: ["FastAPI", "Flask", "REST APIs", "Microservices", "API Authentication", "CRUD Architecture"],
    mlAndAi: [
      "PyTorch",
      "LangGraph",
      "LangChain",
      "TensorFlow",
      "Scikit-learn",
      "HuggingFace",
      "Explainable AI (XAI)",
    ],
    frontend: ["React", "Three.js", "Vite", "Tailwind CSS"],
    databases: ["MySQL", "MongoDB", "Database Indexing", "Data Normalization"],
    devopsAndTools: ["Git", "GitHub", "Linux / Bash", "Pickle Pipeline Serialization", "RESTful Architecture"],
  },
  internships: [
    {
      role: "Machine Learning Engineer Intern",
      company: "Infosys Springboard",
      period: "Nov 2025 – Jan 2026",
      summary:
        "Engineered end-to-end regression pipelines on Algerian Forest Fire data for Fire Weather Index (FWI) prediction with production serialization.",
      bullets: [
        "Conducted comprehensive Exploratory Data Analysis (EDA) uncovering key predictive weather indices.",
        "Built Linear and Ridge Regression pipelines achieving R² of 0.98, MAE of 0.63, and RMSE of 0.99.",
        "Tuned Ridge regularization hyperparameter (alpha) via cross-validated RMSE curves to prevent overfitting.",
        "Serialized and exported complete deployment-ready preprocessing and inference pipelines using Pickle.",
      ],
      metrics: [
        { label: "R² Score", value: "0.98" },
        { label: "MAE", value: "0.63" },
        { label: "RMSE", value: "0.99" },
      ],
      technologies: ["Python", "Scikit-learn", "Ridge Regression", "Feature Engineering", "Pickle", "EDA"],
    },
    {
      role: "Backend Development Intern",
      company: "Platfware",
      period: "Oct 2024 – Jan 2025",
      summary:
        "Architected and deployed secure Flask REST APIs for authentication and CRUD workflows with MySQL and MongoDB.",
      bullets: [
        "Engineered secure token-based authentication and role-based access control (RBAC) REST endpoints.",
        "Integrated dual-database architecture: MySQL for structured transactions and MongoDB for dynamic document models.",
        "Enhanced production API reliability, response validation, and status code consistency across core services.",
        "Collaborated with founding engineers to refactor endpoints for lower latency and consistent JSON payloads.",
      ],
      technologies: ["Flask", "Python", "MySQL", "MongoDB", "REST APIs", "Authentication", "CRUD"],
    },
  ],
  projects: [
    {
      title: "Multi-Agent Data Analysis System",
      repoName: "Elango001/data-analyst-agent",
      repoUrl: "https://github.com/Elango001/data-analyst-agent",
      category: "AI & Multi-Agent",
      description:
        "Autonomous dataset cleaning, analysis, visualization, and sandboxed code execution pipeline orchestrated via LangGraph with multi-provider LLM support.",
      stack: ["FastAPI", "React", "LangGraph", "Python", "Gemini", "OpenAI", "Claude"],
      highlights: [
        "Dynamic multi-agent coordination loop with stateful graph transitions for iterative dataset refinement.",
        "Automated statistical profiling, correlation discovery, and algorithmic visualization synthesis.",
        "Sandboxed Python REPL execution environment for safe real-time computational graphs.",
        "Pluggable LLM provider abstraction supporting Gemini, GPT-4, and Claude with fallback routing.",
      ],
      metric: "Multi-LLM LangGraph Loop",
    },
    {
      title: "Explainable Polar Coordinate Classifier (CIFAR-10)",
      repoName: "Elango001/polar-embedding-classifier",
      repoUrl: "https://github.com/Elango001/polar-embedding-classifier",
      category: "Machine Learning",
      description:
        "Custom PyTorch classifier projecting deep representations into interpretable 2D polar space with centroid-based angular separation and OOD detection.",
      stack: ["PyTorch", "Python", "Scikit-learn", "XAI", "CIFAR-10"],
      highlights: [
        "Trained custom neural network mapping high-dimensional feature embeddings to 2D polar coordinates (r, θ).",
        "Enforced angular loss formulation to guarantee geometric separation of class centroids.",
        "Implemented radial deviation metrics for transparent Out-of-Distribution (OOD) uncertainty quantification.",
        "Attained 91% classification test accuracy on the CIFAR-10 benchmark.",
      ],
      metric: "91% Test Accuracy",
    },
    {
      title: "Human Motion to VRM Avatar Animation Pipeline",
      repoName: "Elango001/Human-Motion-to-VRM-Avatar-Animation-System",
      repoUrl: "https://github.com/Elango001/Human-Motion-to-VRM-Avatar-Animation-System",
      category: "Real-Time Systems",
      description:
        "Real-time 3D avatar animation system utilizing MediaPipe, Kalidokit, and Three.js with temporal landmark smoothing at 25 FPS.",
      stack: ["Three.js", "MediaPipe", "Kalidokit", "React", "WebGL", "VRM"],
      highlights: [
        "Extracted 33 full-body anatomical landmark keypoints in real time via MediaPipe Holistic.",
        "Solved inverse kinematics and bone joint rotation matrices with Kalidokit.",
        "Rendered rigged 3D VRM models via Three.js with hardware-accelerated WebGL shaders.",
        "Engineered video-to-JSON landmark recording and temporal interpolation yielding fluid 25 FPS playback.",
      ],
      metric: "25 FPS Real-Time",
    },
  ],
  certifications: [
    {
      title: "IoT - Internet of Things",
      issuer: "NPTEL",
      badge: "Top 1% Nationwide Merit",
      highlight: true,
    },
    {
      title: "Java Programming",
      issuer: "NPTEL",
      badge: "Elite Certification",
      highlight: false,
    },
    {
      title: "Design Thinking",
      issuer: "NPTEL",
      badge: "Professional Certification",
      highlight: false,
    },
    {
      title: "Python & AI Foundation",
      issuer: "Infosys Springboard",
      badge: "Foundation Honors",
      highlight: true,
    },
    {
      title: "Data Analysis",
      issuer: "Accenture",
      badge: "Industry Simulation",
      highlight: false,
    },
  ],
};
