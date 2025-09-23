import React, { useMemo, useState } from "react";
import { Github, Mail, Link as LinkIcon, ArrowUpRight, Download, Laptop, Smartphone, Wrench } from "lucide-react";

const CONTACT = {
  name: "Charlie Dolphin",
  role: "Software Engineering @ Iowa State (May 2026)",
  location: "Ames, IA",
  email: "charlie.dolphin9@example.com",
  github: "https://github.com/jesuisdolfin",
  linkedin: "https://www.linkedin.com/in/charliedolphin/",
};

const BASE_URL = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.BASE_URL) || "/";
const RESUME_PATH = `${BASE_URL}resume.pdf`;

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
    links: { github: "https://github.com/jesuisdolfin/pantry-app" },
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

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f5f5f5]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">{children}</div>
      <footer className="py-8 text-center text-sm text-[#a1a1aa]">
        © {new Date().getFullYear()} {CONTACT.name}
      </footer>
    </div>
  );
}

function Nav() {
  return (
    <div className="flex items-center justify-between">
      <div className="font-semibold tracking-tight text-6xl">{CONTACT.name}</div>
    </div>
  );
}

function Hero() {
  return (
    <section className="mt-10">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{CONTACT.role}</h1>
      <p className="mt-3 max-w-2xl text-[#a1a1aa]">
        I build pragmatic, production‑ready apps across web, mobile, and cloud. I love clean architecture, fast feedback loops, and delightful UX.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={RESUME_PATH} className="inline-flex items-center gap-2">
          <button className="rounded-2xl bg-[#9333ea] text-white px-4 py-2 text-sm font-medium hover:bg-[#7e22ce]">
            <Download className="h-4 w-4" /> Resume
          </button>
        </a>
        <a
          href={CONTACT.github}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2"
        >
          <button className="rounded-2xl border border-[#9333ea] text-[#9333ea] px-4 py-2 text-sm font-medium hover:bg-[#7e22ce] hover:text-white">
            <Github className="h-4 w-4" /> GitHub
          </button>
        </a>
        <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2">
          <button className="rounded-2xl border border-[#3f3f46] text-white px-4 py-2 text-sm font-medium hover:bg-[#151515]">
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
                  ? "bg-[#9333ea] text-white border-[#9333ea]"
                  : "border-[#3f3f46] text-[#f5f5f5] hover:bg-[#151515]"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <div key={p.title} className="rounded-2xl border border-[#27272a] p-5 bg-[#111111]">
            <div className="flex items-center gap-2 text-[#a1a1aa] mb-2">
              {p.icon}
              <span className="sr-only">icon</span>
            </div>
            <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
            <p className="mt-2 text-sm text-[#a1a1aa]">{p.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span key={tag} className="rounded-xl bg-[#9333ea]/20 text-[#c084fc] px-2 py-0.5 text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              {p.links?.github && (
                <a href={p.links.github} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 text-sm hover:underline text-[#c084fc] hover:text-white">
                  <Github className="h-4 w-4" /> Code <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
              {p.links?.demo && (
                <a href={p.links.demo} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 text-sm hover:underline text-[#c084fc] hover:text-white">
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
          <div key={group.group} className="rounded-2xl border border-[#27272a] p-5 bg-[#111111]">
            <div className="font-medium mb-2">{group.group}</div>
            <ul className="text-sm text-[#a1a1aa] space-y-1">
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
          <button className="rounded-2xl bg-[#9333ea] text-white px-4 py-2 text-sm font-medium hover:bg-[#7e22ce]">
            <Mail className="h-4 w-4" /> Email me
          </button>
        </a>
        <a href={CONTACT.github} target="_blank" rel="noreferrer noopener">
          <button className="rounded-2xl border border-[#9333ea] text-[#9333ea] px-4 py-2 text-sm font-medium hover:bg-[#7e22ce] hover:text-white">
            <Github className="h-4 w-4" /> GitHub
          </button>
        </a>
        <a href={CONTACT.linkedin} target="_blank" rel="noreferrer noopener">
          <button className="rounded-2xl border border-[#3f3f46] text-white px-4 py-2 text-sm font-medium hover:bg-[#151515]">
            LinkedIn
          </button>
        </a>
      </div>
    </section>
  );
}

export default function Portfolio() {
  return (
    <Shell>
      <Nav />
      <Hero />
      <Projects />
      <Skills />
      <Contact />
    </Shell>
  );
}
