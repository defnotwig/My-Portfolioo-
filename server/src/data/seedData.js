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
        "I'm a fourth-year BS Information Technology student at the City College of Calamba (2022–Present), building a foundation across web development, database management, and software engineering while shipping real systems for students and organizations.",
        "As Membership and Election Committee Head of the CCC Information Technology Society, I help represent 1,469 BSIT and 509 BSCS students, implementing barcode-based attendance and automated event evaluation flows that cut manual processing time by roughly 70% and drastically improve reporting accuracy.",
        "Previously, I worked in Quality Assurance for Shopee Philippines (Failed Deliveries), where I led end-to-end QA for return logistics and 3PL partners—enforcing strict verification standards, running high-accuracy barcode and item audits, validating parcel integrity, and supporting interdepartmental accountability with clear reporting.",
        "I build systems like the K-WISE PC builder kiosk and QR Attendance Tracker with a focus on determinism, observability, and performance—blending rule engines, databases, and modern UIs so experiences feel both premium and dependable.",
        "Lately, I've been leaning deeper into AI-assisted development, using tools like Ollama DeepSeek R1 and LLM workflows to optimize engineering processes, recommendation engines, and developer productivity.",
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
            "Gabriel is one of those students who quietly ships solid work. His projects are clean, reliable, and easy to maintain.",
        author: "Jasper Garcia",
        role: "Professor, City College of Calamba",
    },
    {
        quote:
            "He handled our student org systems with a good balance of leadership and discipline. Processes became smoother and easier to track.",
        author: "Regina Almonte",
        role: "Research Adviser, City College of Calamba",
    },
    {
        quote:
            "Gabriel is dependable and quick to respond. When we need dashboards or automations updated, he gets them done without fuss.",
        author: "Arlou Fernando",
        role: "Dean, DCI, City College of Calamba",
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

