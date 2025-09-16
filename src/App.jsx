import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Mail,
  Link as LinkIcon,
  ArrowUpRight,
  Download,
  Laptop,
  Smartphone,
  Database,
  Cloud,
  Wrench,
  Moon,
  Sun,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import "./index.css";
// ------------------------------
// 🔧 Content you can edit easily
// ------------------------------
const CONTACT = {
  name: "Charlie Dolphin",
  role: "Software Engineering Student @ Iowa State (May 2026)",
  location: "Ames, IA",
  email: "charlie@example.com", // ← replace
  github: "https://github.com/jesuisdolfin",
  linkedin: "https://www.linkedin.com/in/charliedolphin/",
  resumeUrl: "/resume.pdf", // place a file named resume.pdf in the public folder
};

const PROJECTS = [
  {
    title: "Fitness Log — React + Go on AWS",
    summary:
      "Flagship full‑stack project: React frontend, Go API, Docker, MongoDB Atlas, CI/CD with GitHub Actions, EC2 deployment. Tracks lifting sessions, goals, and rewards.",
    tags: ["React", "Go", "Docker", "AWS EC2", "MongoDB", "CI/CD"],
    links: {
      github: "https://github.com/<you>/fitness-log",
      demo: "https://example.com/fitness",
    },
    icon: <Laptop className="h-5 w-5" />,
  },
  {
    title: "Pantry Inventory (Expo/React Native)",
    summary:
      "Mobile app with barcode scan (expo-camera), Open Food Facts lookup, Zustand state + AsyncStorage, qty auto‑increment, dark theme, polished UX.",
    tags: ["React Native", "Expo", "Zustand", "Mobile"],
    links: {
      github: "https://github.com/<you>/pantry-app",
    },
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    title: "LiteCart OSS Contributions",
    summary:
      "Open‑source contributions: improved image handling and DDD‑style code reviews across an unfamiliar PHP codebase. Added tests and docs.",
    tags: ["Open Source", "PHP", "Testing", "Docs"],
    links: {
      github: "https://github.com/<org-or-you>/litecart-contrib",
    },
    icon: <Wrench className="h-5 w-5" />,
  }
];

const SKILLS = [
  {
    group: "Languages",
    items: ["JavaScript/TypeScript", "Go", "Java", "SQL"],
  },
  {
    group: "Frameworks & Libraries",
    items: ["React", "React Native (Expo)", "Node", "Tailwind", "Framer Motion"],
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS EC2", "Docker", "GitHub Actions", "MongoDB Atlas"],
  },
  {
    group: "OS & Tools",
    items: ["Linux (Bazzite, CachyOS, Mint)", "VS Code", "Git"],
  },
];

// ------------------------------
// ⚙️ Utilities
// ------------------------------
function clsx(...args) {
  return args.filter(Boolean).join(" ");
}

function useDarkMode() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);
  return { isDark, setIsDark };
}

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// ------------------------------
// 🧩 Components
// ------------------------------
function Shell({ children }) {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">{children}</div>
      <footer className="py-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} {CONTACT.name}
      </footer>
    </div>
  );
}

function Nav({ isDark, onToggleTheme }) {
  return (
    <div className="flex items-center justify-between">
      <div className="font-semibold tracking-tight">{CONTACT.name}</div>
      <div className="flex items-center gap-3">
        <a href={CONTACT.github} target="_blank" className="inline-flex items-center gap-1 text-sm hover:underline">
          <Github className="h-4 w-4" /> GitHub
        </a>
        <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-1 text-sm hover:underline">
          <Mail className="h-4 w-4" /> Email
        </a>
        <Button variant="outline" size="sm" onClick={onToggleTheme} className="rounded-2xl">
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="mt-10">
      <motion.div {...fadeIn}>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {CONTACT.role}
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          I build pragmatic, production‑ready apps across web, mobile, and cloud.
          I love clean architecture, fast feedback loops, and delightful UX.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={CONTACT.resumeUrl} className="inline-flex items-center gap-2">
            <Button className="rounded-2xl"><Download className="h-4 w-4" /> Resume</Button>
          </a>
          <a href={CONTACT.github} target="_blank" className="inline-flex items-center gap-2">
            <Button variant="secondary" className="rounded-2xl"><Github className="h-4 w-4" /> GitHub</Button>
          </a>
          <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2">
            <Button variant="outline" className="rounded-2xl"><Mail className="h-4 w-4" /> Contact</Button>
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Projects() {
  const [activeTag, setActiveTag] = useState("All");
  const tags = useMemo(() => {
    const set = new Set();
    PROJECTS.forEach(p => p.tags.forEach(t => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, []);
  const filtered = useMemo(
    () => (activeTag === "All" ? PROJECTS : PROJECTS.filter(p => p.tags.includes(activeTag))),
    [activeTag]
  );

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Featured Projects</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map(t => (
            <Button
              key={t}
              size="sm"
              variant={t === activeTag ? "default" : "outline"}
              className="rounded-2xl"
              onClick={() => setActiveTag(t)}
            >
              {t}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
            <Card className="rounded-2xl border-zinc-200 dark:border-zinc-800">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-zinc-500 mb-2">{p.icon}<span className="sr-only">icon</span></div>
                <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{p.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="rounded-xl">{tag}</Badge>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  {p.links?.github && (
                    <a href={p.links.github} target="_blank" className="inline-flex items-center gap-1 text-sm hover:underline">
                      <Github className="h-4 w-4" /> Code <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                  {p.links?.demo && (
                    <a href={p.links.demo} target="_blank" className="inline-flex items-center gap-1 text-sm hover:underline">
                      <LinkIcon className="h-4 w-4" /> Demo <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold">Skills</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SKILLS.map((group) => (
          <Card key={group.group} className="rounded-2xl border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-5">
              <div className="font-medium mb-2">{group.group}</div>
              <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                {group.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  const items = [
    {
      title: "Tutor Specialist • Community College",
      period: "2024–2025",
      blurb: "Tutored CS/SE students; reinforced data structures, algorithms, and debugging practices.",
    },
    {
      title: "UTA • University",
      period: "2024–2025",
      blurb: "Supported course delivery; created examples and office‑hour help.",
    },
  ];
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold">Experience</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((x) => (
          <Card key={x.title} className="rounded-2xl border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="font-medium">{x.title}</div>
                <div className="text-sm text-zinc-500">{x.period}</div>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{x.blurb}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold">Get in touch</h2>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a href={`mailto:${CONTACT.email}`}>
          <Button className="rounded-2xl"><Mail className="h-4 w-4" /> Email me</Button>
        </a>
        <a href={CONTACT.github} target="_blank">
          <Button variant="secondary" className="rounded-2xl"><Github className="h-4 w-4" /> GitHub</Button>
        </a>
        <a href={CONTACT.linkedin} target="_blank">
          <Button variant="outline" className="rounded-2xl">LinkedIn</Button>
        </a>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const { isDark, setIsDark } = useDarkMode();
  return (
    <Shell>
      <Nav isDark={isDark} onToggleTheme={() => setIsDark((v) => !v)} />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </Shell>
  );
}
