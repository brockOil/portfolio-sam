export const profile = {
  name: "Sameer P Bhandiwad",
  tagline: "Software Developer | AI/ML & Fullstack",
  education: "B.E. in Electronics and Telecommunication Engineering, M.S. Ramaiah Institute of Technology, Bengaluru (2022-2026).",
  github: "github.com/brockOil"
};

export const experience = [
  {
    company: "IIFL Samasta Private Limited",
    role: "AI/ML Intern",
    duration: "April 2026 - Current",
    details: "Building FullStack Web-Applications for internal tools: Customer Retention Dashboards, Meetings Transcriber with diarization, Automated Document Verifier Web-Application."
  },
  {
    company: "K12 Techno Services Pvt Ltd",
    role: "Fullstack Web Development Intern",
    duration: "Feb 2026 - Apr 2026",
    details: "Developed multiple fullstack websites using MERN stack, FastAPI. Worked on a project using WebSockets."
  },
  {
    company: "U R Rao Satellite Centre - ISRO",
    role: "Robotics Intern",
    duration: "Aug 2025 - Sept 2025",
    details: "Developed fault-tolerant control architecture for a 12-DOF quadruped robot swarm using MQTT. Achieved 92% mission completion under induced actuator faults."
  },
  {
    company: "M.S. Ramaiah Institute of Technology",
    role: "Machine Learning Intern",
    duration: "Oct 2024 - Jun 2025",
    details: "Developed and deployed ML models on embedded devices. Collaborated cross-functionally to translate engineering requirements into working prototypes."
  },
  {
    company: "Central Manufacturing Technology Institute",
    role: "Intern",
    duration: "Sept 2024 - Oct 2024",
    details: "Gained practical experience in PLC and HMI programming through an industrial PLC project."
  }
];

export const projects = [
  {
    name: "RAG Process Chatbot — Enterprise Document Q&A System",
    tech: "Python, FastAPI, ChromaDB, Sentence-Transformers, Groq API, SAML SSO",
    description: "Production RAG chatbot enabling employees to query enterprise documents (PDF, DOCX, XLSX, CSV, PPTX) via natural language, with role-based access control. SAML SSO integrated with Entra ID and Zoho HR for authentication and automated role provisioning. Hybrid retrieval pipeline combines GPU-accelerated semantic search (ChromaDB + Sentence-Transformers) with keyword search, served through Groq Cloud for low-latency responses. Includes an internal eval framework (recall@k, precision@k, MRR, LLM-as-judge) and an admin dashboard for ingestion, system health, and audit logs.",
    github: ""
  },
  {
    name: "Combat Sports Motion Intelligence",
    tech: "nRF52832, BLE, BiLSTM, React, WebSocket",
    description: "Wearable IMU nodes (nRF52832 + BMI270) with BLE wireless. BiLSTM + Multi-Head Attention classifier for 14 MMA movements. React/WebSocket dashboard with Flask/Unity backend.",
    github: ""
  },
  {
    name: "Sapien — RAG Chatbot",
    tech: "FastAPI, React, Mistral AI, pgvector, SSE",
    description: "Full-stack retrieval-augmented generation chatbot with document ingestion, pgvector-based retrieval, and Mistral AI inference. JWT auth, SSE streaming for real-time responses, persistent chat history.",
    github: "https://github.com/brockOil/sapien-rag"
  },
  {
    name: "AI Secure Data Intelligence Platform",
    tech: "FastAPI, Mistral AI, React, Docker, Nginx",
    description: "PII and credential detection via regex + Shannon Entropy, Mistral AI threat analysis, Docker + Nginx deployment. Built for a hackathon; full-stack React/Tailwind frontend with live scan results.",
    github: "https://github.com/brockOil/AI-Secure-Platform"
  },
  {
    name: "Autonomous Research Agent",
    tech: "FastAPI, Mistral AI, ReAct, SSE, SQLite",
    description: "Agentic AI system using a ReAct (Reason + Act) loop with DuckDuckGo search integration. Streams live reasoning steps to the client via SSE, enabling transparent multi-step research and synthesis.",
    github: "https://github.com/brockOil/research-agent"
  },
  {
    name: "Moodify — AI Spotify Recommender",
    tech: "Next.js 14, FastAPI, Cohere, Spotify API, Vercel",
    description: "Users describe mood in plain English; Cohere LLM maps it to audio feature vectors and Spotify's Recommendations API returns 12 matched tracks with a 30s preview player.",
    github: "https://github.com/Moodify-friends/moodify-web-interface"
  },
  {
    name: "StockPulse — AI Inventory & Dynamic Pricing Engine",
    tech: "Java 21, Spring Boot 3, React, Spring Data JPA, Gemini/Groq/Ollama",
    description: "Reactive commerce advisor: an agentic loop watches inventory and demand velocity, then generates AI or rule-based pricing and reorder suggestions for a merchandiser to approve. Runtime-switchable AI/rule-based strategies with automatic fallback, SSE streaming of AI reasoning, and full integration test coverage of the suggest → accept → price-update loop.",
    github: "https://github.com/brockOil/Stock-Pulse"
  },
  {
    name: "TaskMind — Task & Knowledge Management System",
    tech: "FastAPI, React, Mistral AI, FAISS, SQLAlchemy, JWT",
    description: "Full-stack task manager with a built-in RAG knowledge base: admins assign tasks and upload PDFs/text docs, users get grounded natural-language answers over them via a FAISS-backed retrieval pipeline (512-word chunking, cosine similarity) and Mistral embeddings/chat. Role-based access control plus an analytics dashboard for task and document metrics.",
    github: "https://github.com/brockOil/AI-task-manager-and-planner"
  },
  {
    name: "Dynamic Cropping with ML (ADAS)",
    tech: "Python, CAN-bus, Regression, MATLAB",
    description: "Regression model trained on CAN-bus data (speed, steering, yaw rate) to adjust camera crops dynamically in an ADAS context. Reduced frame-processing load 18%; improved scene relevance 26%.",
    github: ""
  },
  {
    name: "Finance Tracker — SaaS MVP",
    tech: "Spring Boot, React, PostgreSQL, Docker, Chart.js",
    description: "Full-stack personal finance SaaS with JWT auth, transaction management, monthly dashboard with pie and bar charts, user data isolation, and Docker Compose deployment.",
    github: "https://github.com/brockOil/Personal_Finance_Tracker"
  },
  {
    name: "Fault-Tolerant Quadruped Swarm",
    tech: "ROS 2, Jetson AGX Orin, MQTT, FreeRTOS, C++",
    description: "12-DOF six-unit robot swarm with MQTT communication and three-tier control architecture. 92% mission completion under induced actuator faults; 35% faster recovery via autonomous fault-handling routines.",
    github: ""
  },
  {
    name: "Death Certificate Authentication",
    tech: "FastAPI, PyMuPDF, Gemini 2.0, React, pyzbar",
    description: "FastAPI + PyMuPDF + pyzbar + Gemini 2.0 Flash pipeline for QR-based document verification. React/Vite frontend with two-step manual verification fallback.",
    github: ""
  }
];

export const skills = {
  stacks: ["MERN Stack", "FastAPI + React", "Spring Boot + React", "Next.js + FastAPI"],
  languages: ["Python", "Java", "JavaScript", "C++", "C", "SQL", "LaTeX", "Verilog HDL"],
  frameworks: ["FastAPI", "React", "React Native", "Spring Boot", "Next.js", "Node.js", "Express"],
  tools: ["Docker", "PostgreSQL", "MongoDB", "MATLAB", "FreeRTOS", "Vite", "WebSockets", "Git", "Nginx"],
  ai_ml: ["GenAI", "Machine Learning", "Deep Learning", "Agentic workflows", "RAG", "LLM fine-tuning"]
};
