import { About } from "../models/About.js";
import { Experience } from "../models/Experience.js";
import { Project } from "../models/Project.js";
import { Certification } from "../models/Certification.js";
import { Recommendation } from "../models/Recommendation.js";

const aboutData = {
    name: "Gabriel Ludwig Rivera",
    location: "Calamba, Philippines",
    roles: ["Software Developer", "IT Student", "Systems Builder"],
    tagline:
        "Designing resilient systems with Gen-Z polish, AI-first workflows, and production discipline.",
    paragraphs: [
        "I am a full-stack software developer and BS Information Technology student with a strong foundation in web development, database management, and software engineering. My work focuses on designing and building reliable, high-performance systems using modern technologies across the frontend and backend. I have delivered end-to-end solutions such as the K-WISE PC Builder Kiosk and Attendance and Payroll Management System, applying structured system architecture, relational database design, and scalable API development to real operational environments.",
        "In addition to development, I bring experience in quality assurance and process validation from my work with Shopee Philippines, where I supported logistics and third-party operations through strict verification standards, barcode audits, and structured reporting. I also hold a leadership role in the City College of Calamba Information Technology Society, contributing to system-driven improvements for large student populations. Recently, I have been expanding into AI and machine-learning–assisted development, integrating LLM workflows to enhance recommendation systems, optimize engineering processes, and improve overall software delivery. I am continuously refining my skills to build dependable, production-ready systems that deliver measurable impact."
    ],
    highlights: [
        "BS Information Technology, City College of Calamba (2022–Present)",
        "Membership & Election Committee Head, CCC IT Society (2024–2025)",
        "Project Lead, K-WISE PC Builder Kiosk (2025)",
        "Shopee Philippines — QA, Failed Deliveries (2022)",
    ],
};

const experienceData = [
    {
        title: "Membership & Election Committee Head",
        organization: "Infomation Technology Society",
        timeframe: "2024 – Present",
        description:
            "Leading campus-wide student initiatives, election systems, and process automation for the IT student community.",
        order: 1,
    },
    {
        title: "Project Lead",
        organization: "K-WISE PC Builder Kiosk",
        timeframe: "2025",
        description:
            "Designed and deployed a self-service PC builder kiosk with an AI engine (Ollama DeepSeek R1) and 3,200+ compatibility rules, real-time build validation, and recommendation workflows informed by 32,240 historical compatibility checks.",
        order: 2,
    },
    {
        title: "Quality Assurance — Failed Deliveries",
        organization: "Shopee Philippines",
        timeframe: "Apr – Oct 2022",
        description:
            "Led end-to-end quality assurance for failed deliveries from key 3PL partners, performing barcode and item audits, parcel damage categorization, and QA compliance reporting to support return logistics and warehouse control.",
        order: 4,
    },
    {
        title: "Freelance Software Developer",
        organization: "Independent",
        timeframe: "2023 – Present",
        description:
            "Delivering bespoke web platforms, APIs, and automation scripts for MSMEs and campus partners.",
        order: 5,
    },
    {
        title: "BS Information Technology",
        organization: "City College of Calamba",
        timeframe: "2022 – Present",
        description:
            "Focusing on systems development, AI experimentation, and community-driven tech advocacy.",
        order: 6,
    },
];

const projectData = [
    {
        name: "K-WISE PC Builder Kiosk",
        description:
            "Self-service PC builder kiosk integrating Ollama DeepSeek R1 with 3,200+ compatibility rules and real-time validation; audited 32,240 historical checks achieving ~99.87% build-level pass rate, ~93.14% rule-level agreement, sub-2s AI responses, 3.80/4.0 user satisfaction, and an estimated 1062% ROI with a 9.2‑month payback.",
        stack: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Ollama DeepSeek R1"],
        year: "2025",
        image: "/images/kwise.svg",
        link: "#kwise",
        highlight: "Self-service campus operations with QR identity",
        order: 1,
    },
    {
        name: "QR Attendance Tracker",
        description:
            "Windows desktop application built with C# / WinForms that processes student QR codes and syncs activity logs.",
        stack: ["C#", ".NET", "SQL Server"],
        year: "2025",
        image: "/images/qr-tracker.svg",
        link: "#qr",
        highlight: "Offline-first record keeping",
        order: 2,
    },
    {
        name: "PC Build Optimizer",
        description:
            "AI guided builder that blends component databases with conversational recommendations for budget-aware rigs.",
        stack: ["Next.js", "OpenAI", "Supabase"],
        year: "2024",
        image: "/images/pc-optimizer.svg",
        link: "#pc-build",
        highlight: "LLM reasoning for hardware planning",
        order: 3,
    },
    {
        name: "E-Commerce Structure Clone",
        description:
            "A modern React storefront backed by a C# API, mirroring enterprise-grade checkout flows for MSME demos.",
        stack: ["React", "C#", "PostgreSQL"],
        year: "2024",
        image: "/images/ecommerce.svg",
        link: "#commerce",
        highlight: "Composable cart + loyalty engine",
        order: 4,
    },
];

const certificationData = [
    {
        title: "Huawei Developer Expert",
        issuer: "Huawei",
        year: "2025",
    },
    {
        title: "Generative AI Leader",
        issuer: "Google",
        year: "2025",
    },
    {
        title: "Software Engineering",
        issuer: "TestDome",
        year: "2024",
    },
    {
        title: "Generative AI Professional",
        issuer: "Oracle",
        year: "2024",
    },
];

const recommendationData = [
    {
        quote:
            "Gabriel is a good student and software developer who shows professionalism and dedication in whatever he does. His software projects during his academic years are up to standard and is being used by our department for some of its operations. Gabriel also demonstrated social awareness and leadership skills through his involvement as an officer in the CCC IT Society.",
        author: "Jasper Garcia, MIT",
        role: "Professor, Former Adviser of CCC ITS, City College of Calamba",
    },
    {
        quote:
            "Gabriel has shown remarkable growth from his freshman year in Introduction to Programming to now leading the development of the K-WISE PC Builder Kiosk. His foundational logic and problem-solving skills have evolved impressively. As their Research Adviser, I've witnessed how he guides his team through systematic development and rigorous mock defenses.",
        author: "Regina Almonte, PhD",
        role: "Research Adviser & Professor, City College of Calamba",
    },
    {
        quote:
            "Gabriel demonstrated exceptional technical competence during our Capstone Defense panels. His ability to articulate system architecture and handle complex questions shows his deep understanding of software development. He's dependable and consistently delivers quality work for dashboards and automation systems.",
        author: "Arlou Fernando, MIT",
        role: "Dean, DCI & Lead Capstone Panel, City College of Calamba",
    },
    {
        quote:
            "Working with Gabriel on the K-WISE PC Builder Kiosk has been an incredible experience. As a full-stack developer, he seamlessly connected my UI/UX designs with the backend, guided our workflow, and ensured smooth deployment. His technical leadership and dedication made our capstone project a success.",
        author: "Kent Cyrem Patasin",
        role: "Former CCC ITS President & UI/UX Designer, City College of Calamba",
    },
    {
        quote:
            "Gabriel's expertise in backend development and system integration was crucial for our capstone project. He patiently guided me through the development workflow and helped connect my frontend work with the backend seamlessly. His mentorship accelerated my growth as a developer.",
        author: "Jake Mesina",
        role: "Frontend Developer & Colleague, City College of Calamba",
    },
];

const resetAndSeed = async (Model, data) => {
    // Replace the entire collection with the provided data so that
    // only the latest records from this file exist in the database.
    await Model.deleteMany({});
    if (Array.isArray(data)) {
        if (data.length > 0) {
            await Model.insertMany(data);
        }
    } else if (data) {
        await Model.create(data);
    }
};

export const seedContent = async () => {
    await resetAndSeed(About, aboutData);
    await resetAndSeed(Experience, experienceData);
    await resetAndSeed(Project, projectData);
    await resetAndSeed(Certification, certificationData);
    await resetAndSeed(Recommendation, recommendationData);
};

