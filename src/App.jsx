import React, { useEffect, useMemo, useState } from "react";
import { Mail, Link as LinkIcon, ArrowUpRight, Download, Laptop, Smartphone, Wrench, Moon, Sun } from "lucide-react";

const CONTACT = {
  name: "Charlie Dolphin",
  role: "Software Engineering Student @ Iowa State (May 2026)",
  location: "Ames, IA",
  email: "charlie.dolphin9@example.com",
  github: "https://github.com/jesuisdolfin",
  linkedin: "https://www.linkedin.com/in/charliedolphin/",

};
const RESUME_PATH = "/resume.pdf";

const PROJECTS = [
  {
    title: "Fitness Log — React + Go on AWS",
    summary:
      "Flagship full‑stack project: React frontend, Go API, Docker, MongoDB Atlas, CI/CD with GitHub Actions, EC2 deployment. Tracks lifting sessions, goals, and rewards.",
    tags: ["React", "Go", "Docker", "AWS EC2", "MongoDB", "CI/CD"],
    links: {
      github: "https://github.com/jesuisdolfin/fitness-log",
      demo: "https://example.com/fitness",
    },
    icon: <Laptop className="h-5 w-5" />,
  },
  {
    title: "Pantry Inventory (Expo/React Native)",
    summary:
      "Mobile app with barcode scan (expo-camera), Open Food Facts lookup, Zustand state + AsyncStorage, qty auto‑increment, dark theme, polished UX.",
    tags: ["React Native", "Expo", "Zustand", "Mobile"],
    links: { github: "https://github.com/jesuisdolfin/ePantry" },
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    title: "LiteCart OSS Contributions",
    summary:
      "Open‑source contributions: improved image handling and DDD‑style code reviews across an unfamiliar PHP codebase. Added tests and docs.",
    tags: ["Open Source", "PHP", "Testing", "Docs"],
    links: { github: "https://github.com/jesuisdolfin/litecart-contrib" },
    icon: <Wrench className="h-5 w-5" />,
  },
];

const SKILLS = [
  { group: "Languages", items: ["JavaScript/TypeScript", "Go", "Java", "SQL"] },
  { group: "Frameworks & Libraries", items: ["React", "React Native (Expo)", "Node", "Tailwind"] },
  { group: "Cloud & DevOps", items: ["AWS EC2", "Docker", "GitHub Actions", "MongoDB Atlas"] },
  { group: "OS & Tools", items: ["Linux (Bazzite, CachyOS, Mint)", "VS Code", "Git"] },
];

function clsx(...args) {
  return args.filter(Boolean).join(" ");
}

// Dark mode
function useDarkMode() {
  const getPreferred = () => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (stored === "dark") return true;
    if (stored === "light") return false;
    // No explicit choice — use system preference
    if (typeof window !== "undefined") {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  };

  const [isDark, setIsDark] = useState(getPreferred);
  const [userSet, setUserSet] = useState(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    return stored === "dark" || stored === "light"; // whether user explicitly chose
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
  }, [isDark]);

  // Persist to localStorage on explicit user toggles
  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      if (!userSet) setUserSet(true);
      return next;
    });
  };

  // React to system changes only if user hasn't explicitly chosen
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      if (!userSet) {
        setIsDark(e.matches);
      }
    };
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange);
    };
  }, [userSet]);

  return { isDark, toggle };
}

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
        <a
          href={CONTACT.github}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 text-sm hover:underline"
        >
          <Github className="h-4 w-4" /> GitHub
        </a>
        <a
          href={`mailto:${CONTACT.email}`}
          className="inline-flex items-center gap-1 text-sm hover:underline"
        >
          <Mail className="h-4 w-4" /> Email
        </a>
        <button
          type="button"
          onClick={onToggleTheme}
          className="rounded-2xl border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="mt-10">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{CONTACT.role}</h1>
      <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
        I build pragmatic, production‑ready apps across web, mobile, and cloud. I love clean architecture, fast feedback loops, and delightful UX.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={RESUME_PATH} className="inline-flex items-center gap-2">
          <button className="rounded-2xl bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 px-4 py-2 text-sm font-medium">
            <Download className="h-4 w-4" /> Resume
          </button>
        </a>
        <a
          href={CONTACT.github}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2"
        >
          <button className="rounded-2xl bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 px-4 py-2 text-sm font-medium">
            <Github className="h-4 w-4" /> GitHub
          </button>
        </a>
        <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2">
          <button className="rounded-2xl border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium">
            <Mail className="h-4 w-4" /> Contact
          </button>
        </a>
      </div>
    </section>
  );
}

function Projects() {
  const [activeTag, setActiveTag] = useState("All");
  const tags = useMemo(() => {
    const set = new Set();
    PROJECTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, []);
  const filtered = useMemo(
    () => (activeTag === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(activeTag))),
    [activeTag]
  );

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Featured Projects</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={clsx(
                "rounded-2xl px-3 py-1.5 text-sm border",
                t === activeTag
                  ? "bg-zinc-900 text-zinc-50 border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100"
                  : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <div key={p.title} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
            <div className="flex items-center gap-2 text-zinc-500 mb-2">
              {p.icon}
              <span className="sr-only">icon</span>
            </div>
            <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{p.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span key={tag} className="rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 px-2 py-0.5 text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              {p.links?.github && (
                <a href={p.links.github} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 text-sm hover:underline">
                  <Github className="h-4 w-4" /> Code <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
              {p.links?.demo && (
                <a href={p.links.demo} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 text-sm hover:underline">
                  <LinkIcon className="h-4 w-4" /> Demo <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
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
          <div key={group.group} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
            <div className="font-medium mb-2">{group.group}</div>
            <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
              {group.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
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
          <button className="rounded-2xl bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 px-4 py-2 text-sm font-medium">
            <Mail className="h-4 w-4" /> Email me
          </button>
        </a>
        <a href={CONTACT.github} target="_blank" rel="noreferrer noopener">
          <button className="rounded-2xl bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 px-4 py-2 text-sm font-medium">
            <Github className="h-4 w-4" /> GitHub
          </button>
        </a>
        <a href={CONTACT.linkedin} target="_blank" rel="noreferrer noopener">
          <button className="rounded-2xl border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium">
            LinkedIn
          </button>
        </a>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const { isDark, toggle } = useDarkMode();
  return (
    <Shell>
      <Nav isDark={isDark} onToggleTheme={toggle} />
      <Hero />
      <Projects />
      <Skills />
      <Contact />
    </Shell>
  );
}
