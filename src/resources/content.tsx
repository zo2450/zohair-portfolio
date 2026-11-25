import { About, AboutExtras, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Column, Line, Row, Text } from "@once-ui-system/core";
import { StatusDot } from "@/components/StatusDot";
import { FlipWords } from "@/components/FlipWords";

const person: Person = {
  firstName: "Zohair",
  lastName: "Syed",
  name: `Zohair Syed`,
  role: "Product Manager & AI Agent Builder",
  avatar: "/images/avatar.jpg",
  email: "zohairsyed56@gmail.com",
  location: "America/Toronto", // IANA time zone, drives the clock in the header
  locationLabel: "Born and raised in Toronto",
  languages: ["English", "Urdu"],
  locale: "en",
};

// Newsletter is turned off; kept because the template's types expect it.
const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Occasional notes on product and AI agents</>,
};

const social: Social = [
  // Links show in the footer; `essential: true` also shows them on the about page.
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/zohair-syed-87b114241/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
  {
    name: "Resume",
    icon: "document",
    link: "/resume.pdf",
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.png",
  label: "Home",
  title: `${person.name} | Product Manager & AI Agent Builder`,
  description:
    "Zohair Syed is a product manager who builds AI agents, with internships at AMD, Microsoft and IBM.",
  headline: (
    <>
      {/* Smaller lead-in line; the flip word below is the big hero text (avoids a gap beside "builds") */}
      <span
        style={{
          display: "block",
          fontSize: "0.56em",
          lineHeight: 1.25,
          fontWeight: 600,
          letterSpacing: "-0.005em", // the display heading's tight tracking looks cramped at this size
          color: "var(--neutral-on-background-medium)",
          marginBottom: "0.1em",
        }}
      >
        Product Manager who builds
      </span>
      <FlipWords
        words={[
          "AI agents.",
          "agentic workflows.",
          "agentic products.",
          "automations.",
          "UX/UI.",
          "GTM strategies.",
          "game dev camps.",
        ]}
      />
    </>
  ),
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <Row gap="8" vertical="center" className="ml-4">
          <StatusDot />
          <strong>Now</strong>
        </Row>
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Building agentic products @ AMD
        </Text>
      </Row>
    ),
    href: "/work/amd-aippt-ai-agents",
  },
  subline: (
    <>
      I'm {person.firstName}, a Computer Science student at Wilfrid Laurier and a product management
      intern at AMD. I've shipped agents at AMD, Microsoft and IBM, and co&#8209;founded a camp
      that's taught 1,500+ kids to code games.
    </>
  ),
  metrics: [
    { value: "87%", label: "less seller prep time at Microsoft" },
    { value: "$30M+", label: "pipeline from agent workshops" },
    { value: "1,500+", label: "kids taught C++ game dev" },
    { value: "1+ hr", label: "saved per deck with AIPPT" },
  ],
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, a product manager who builds AI agents, based in Toronto`,
  tableOfContent: {
    // Off: the fixed side menu overlapped the full-width timeline and carousel
    display: false,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <Column gap="m">
        <Text>
          I'm a Computer Science student at Wilfrid Laurier University and a product manager who
          likes to build. At AMD and Microsoft I've owned AI tools end to end, from figuring out
          what people actually need to shipping agents that save them hours.
        </Text>
        <Text>
          I got into tech through games. In 2023 I co-founded GameCraft Camp to teach kids aged 8 to
          12 how to make their own games in C++, and more than 1,500 students have been through it
          since. Outside work you'll find me watching movies or gaming.
        </Text>
      </Column>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "AMD",
        timeframe: "May 2026 – Present",
        role: "Software Product Management Intern",
        logoIcon: "amd",
        logoColor: "#000000",
        caseStudy: "amd-aippt-ai-agents",
        headline: "Built 4 AI agents and took AIPPT end to end",
        tags: ["Python", "Microsoft Graph API", "LLM agents"],
        current: true,
        expanded: true,
        achievements: [
          <>
            Took ownership of AIPPT, a Python-based Markdown/JS-to-PowerPoint platform, adding
            AI-powered generation and deck reviews. Early users report saving 1+ hour per
            presentation.
          </>,
          <>
            Independently built 4 AI agents for chatbot assistance, AI news ingestion, GitHub PR
            automation, and presentation analytics via the Microsoft Graph API.
          </>,
          <>
            Extended an agentic document review tool for paper ingestion, adversarial review,
            rubric-based analysis, and automated response drafting.
          </>,
        ],
        images: [],
      },
      {
        company: "Microsoft",
        timeframe: "Aug 2025 – Apr 2026",
        role: "Product Management Intern",
        logo: "/images/logos/microsoft.png",
        caseStudy: "microsoft-prospecting-agent",
        headline: "Contributed to $30M+ in pipeline revenue",
        tags: ["Copilot Studio", "Power Automate", "Power BI"],
        expanded: true,
        achievements: [
          <>
            Led the design and launch of the Prospecting Automation Agent, cutting seller and
            partner prep time 87% (15 → 2 days) with Copilot Studio, Power Automate, and Power BI.
          </>,
          <>Automated blitz coordination and reporting workflows, reducing manual effort by 70%.</>,
          <>
            Co-managed and automated the Agent Envisioning Workshops program, contributing to $30M+
            in pipeline revenue across AI Business Solutions.
          </>,
        ],
        images: [],
      },
      {
        company: "IBM",
        timeframe: "Sep 2025 – Dec 2025",
        role: "Pro Bono Consultant",
        logoText: "IBM",
        logoColor: "#0f62fe",
        caseStudy: "ibm-pro-bono-ai-agent",
        headline: "Shipped a charity's inbox agent, and won first place for the AI plan",
        tags: ["Copilot", "Usability testing", "AI strategy"],
        achievements: [
          <>
            Ran usability testing and built a Copilot-powered AI agent that answers emails, drafts
            replies, and streamlines inbox management for a charity's staff.
          </>,
          <>
            Designed a strategic AI implementation plan covering grant writing, proposal drafting,
            blog content, and workflow optimization, which won first place.
          </>,
        ],
        images: [],
      },
      {
        company: "Platuni",
        timeframe: "Jul 2025 – Aug 2025",
        role: "Product Management Intern",
        logoText: "P",
        logoColor: "#1f5aa6",
        // TODO(Zohair): add what you did + a headline and tags, then remove hiddenInProduction
        hiddenInProduction: true,
        achievements: [
          <span key="platuni" style={{ color: "#fbbf24", fontStyle: "italic" }}>
            [What you worked on at Platuni, and the result]
          </span>,
        ],
        images: [],
      },
      {
        company: "Picnic Game Labs",
        timeframe: "Mar 2025 – May 2025",
        role: "Project Management Intern",
        headline: "Helped lift early beta engagement 18%",
        tags: ["Jira", "Sprint planning", "Content strategy"],
        logo: "/images/logos/picnic.png",
        achievements: [
          <>
            Supported creative direction through IP brainstorming and content strategy, helping
            shape the game's identity and lifting early user engagement 18% in beta testing.
          </>,
          <>
            Managed sprint cycles in Jira, capturing feedback that led to a 7% improvement in
            iteration speed.
          </>,
        ],
        images: [],
      },
      {
        company: "United Community Services of Peel",
        timeframe: "Sep 2024 – Dec 2024",
        role: "Software Engineering Intern",
        headline: "Helped build AI matchmaking and a web app on Azure",
        tags: ["Microsoft Azure", "ASP.NET Razor Pages", "Bootstrap"],
        achievements: [
          <>
            Helped develop AI matchmaking algorithms on Microsoft Azure, working with datasets to
            improve matchmaking.
          </>,
          <>
            Built an interactive web app with Azure and Razor Pages (ASP.NET), using HTML, CSS and
            Bootstrap.
          </>,
          <>Designed the UX/UI with modern, responsive design principles.</>,
        ],
        images: [],
      },
      {
        company: "thinkrr.ai",
        timeframe: "May 2024 – Nov 2024",
        role: "Web Developer & Marketing Associate",
        headline: "Launched the company site and grew organic traffic 15%",
        tags: ["Framer", "React", "SEO", "Google Analytics"],
        logo: "/images/logos/thinkrr.png",
        achievements: [
          <>
            Built and launched the corporate website with Framer, React, HTML, CSS, and JavaScript.
          </>,
          <>
            Grew organic traffic 15% through SEO, social media, and analytics with Meta Business
            Suite and Google Analytics.
          </>,
        ],
        images: [],
      },
      {
        company: "GameCraft Camp",
        timeframe: "Jun 2023 – Present",
        role: "Co-Founder",
        logo: "/images/logos/gamecraftcamp.png",
        caseStudy: "gamecraft-camp",
        headline: "Taught 1,500+ kids to build their own games in C++",
        tags: ["C++", "Partnerships", "Fundraising"],
        current: true,
        achievements: [
          <>
            Co-founded and led a hands-on C++ game development program for students aged 8 to 12.
          </>,
          <>
            Secured funding from Canada Service Corps and built partnerships with Achēv and Brampton
            Library to expand the program's reach.
          </>,
        ],
        images: [],
      },
    ],
    earlier: [
      {
        company: "Knorket.AI",
        role: "Growth Intern",
        group: "Growth & marketing",
        timeframe: "Jan 2024 – Mar 2024",
        logo: "/images/logos/knorket.png",
        achievements: [
          "Ran market research on customer preferences to sharpen digital marketing targeting.",
          "Developed and executed campaigns that improved engagement and generated leads through personalized outreach.",
          "Built marketing performance reports, analyzing KPIs to find improvement areas.",
        ],
      },
      {
        company: "Achēv",
        role: "Coding Camp Coordinator",
        group: "Teaching & community",
        timeframe: "Jun 2023 – Sep 2023",
        logo: "/images/logos/achev.png",
      },
      {
        company: "Carabram",
        role: "Marketing Assistant (Freelance)",
        group: "Growth & marketing",
        timeframe: "Jun 2023 – Jul 2023",
      },
      {
        company: "Helping Our People Community Projects",
        role: "Executive Assistant",
        group: "Teaching & community",
        timeframe: "Nov 2022 – Aug 2023",
        logo: "/images/logos/hopcp.png",
        achievements: [
          "Direct assistant to the founder, supporting all project needs.",
          "Prepared monthly market research for the upcoming “Dreamers Project”.",
          "Helped build the company website and social media content.",
          "Increased workplace efficiency by 25% by reworking communication systems, documents and Google Workspace use.",
        ],
      },
      {
        company: "Achēv",
        role: "Digital Marketing Assistant (Freelance)",
        group: "Growth & marketing",
        timeframe: "Apr 2023",
        logo: "/images/logos/achev.png",
        achievements: [
          "Ran segmented email and social media campaigns that drove a 420% increase in ticket sales (1.3k+ tickets).",
          "Worked with design, content and development teams to keep the brand message consistent.",
        ],
      },
      {
        company: "Achēv",
        role: "Digital Workshop Instructor (Freelance)",
        group: "Teaching & community",
        timeframe: "Feb 2023",
        logo: "/images/logos/achev.png",
        achievements: [
          "Taught 30+ students in an interactive hybrid format.",
          "Covered web design basics: UX/UI, HTML, CSS, Wix and WordPress, plus Google Analytics and Meta Business Suite.",
          "Trained participants to build a user-friendly 2D game in C++.",
        ],
      },
      {
        company: "T4T",
        role: "Marketing Assistant",
        group: "Growth & marketing",
        timeframe: "Aug 2022 – Oct 2022",
        logo: "/images/logos/t4t.png",
        achievements: [
          "Designed digital strategies that grew Facebook engagement by 47,300% and Instagram reach by 5,000% in two months.",
          "Optimized budgets and targeting in Meta Business Suite for 130% more campaign reach.",
        ],
      },
      {
        company: "Z KICKS",
        role: "Independent Sneaker Reseller",
        group: "Sales & business",
        timeframe: "Mar 2020 – Mar 2022",
        logo: "/images/logos/zkicks.png",
        achievements: [
          "Served 350+ customers across the GTA through an online marketing campaign.",
          "Grew monthly sales by 5% by diversifying inventory to reach new audiences.",
        ],
      },
      {
        company: "Dollarama",
        role: "Sales Associate",
        group: "Sales & business",
        timeframe: "Mar 2021 – Nov 2021",
        logo: "/images/logos/dollarama.png",
        achievements: [
          "Used up-selling strategies like recommending accessories and complementary purchases.",
          "Built inventory management and customer relations skills.",
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Wilfrid Laurier University",
        logo: "/images/logos/laurier.png",
        description: <>Honours Bachelor of Computer Science · Sep 2023 – Aug 2027</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Achievements unlocked",
    skills: [
      {
        title: "Starter loadout",
        description: <>The tools I reach for most.</>,
        tags: [
          { name: "Python" },
          { name: "Java" },
          { name: "C/C++" },
          { name: "SQL" },
          { name: "JavaScript", icon: "javascript" },
          { name: "React" },
          { name: "Copilot Studio" },
          { name: "Power Automate" },
          { name: "Power BI" },
          { name: "Figma", icon: "figma" },
          { name: "Jira" },
        ],
        images: [],
      },
      {
        title: "BDO Future Leaders Challenge",
        description: <>Semi-finalist</>,
        images: [
          {
            src: "/images/certs/bdo.png",
            alt: "BDO Future Leaders Challenge certificate",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Google: Crash Course on Python",
        description: <>Certificate</>,
        images: [
          {
            src: "/images/certs/google-python.png",
            alt: "Google Crash Course on Python certificate",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Google: Fundamentals of Digital Marketing",
        description: <>Certificate</>,
        images: [
          {
            src: "/images/certs/google-marketing.png",
            alt: "Google Fundamentals of Digital Marketing certificate",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "IBM: Enterprise Design Thinking",
        description: <>Badge</>,
        images: [
          {
            src: "/images/certs/ibm-design-thinking.png",
            alt: "IBM Enterprise Design Thinking badge",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "KPMG: Audit & Assurance Job Simulation",
        description: <>Certificate</>,
        images: [
          {
            src: "/images/certs/kpmg.png",
            alt: "KPMG Audit and Assurance job simulation certificate",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

// Blog and gallery routes are turned off in once-ui.config.ts; kept for the template's types.
const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: `Projects – ${person.name}`,
  description: `Code and design projects by ${person.name}`,
  // Each .mdx file in src/app/work/projects still becomes a case study page (linked from About).
  projects: [
    {
      name: "AIPPT",
      headline: "Added AI deck generation and reviews to a PowerPoint toolkit",
      source: "amd-tme/AIPPT",
      kind: "github",
      summary:
        "Scripting and a web front-end for viewing, annotating, analyzing, tagging and remixing PowerPoint decks.",
      role: "Product owner and contributor at AMD.",
      tags: ["Python", "JavaScript", "Go"],
      // My account is zsyed-amd. Pulled 2026-11-23.
      // Commits (non-merge): 37 merged + 92 in PR #53 + 2 in PR #29 = 131.
      // Lines: net additions per PR ("Files changed" totals) across my 9 merged PRs plus #29 and #53
      // = 33,319. TODO(Zohair): once #29 and #53 merge, drop "in review".
      stats: [
        { value: "131", label: "commits" },
        { value: "33.3k", label: "lines of code" },
        { value: "11", label: "PRs merged" },
      ],
      statsSource: "My contributions on GitHub, Nov 2026, including PRs #29 and #53 (in review)",
      links: { code: "https://github.com/amd-tme/AIPPT", caseStudy: "amd-aippt-ai-agents" },
    },
    {
      name: "Inbox agent",
      headline: "An agent that sorts a shared inbox and drafts the replies",
      source: "zo2450/inbox-agent",
      kind: "github",
      summary:
        "Built on the Claude API. It checks the FAQ, sorts each email into Urgent, Answered or For a person, and drafts replies a person approves.",
      role: "Solo project, based on the agent I helped build in IBM's pro bono program.",
      tags: ["TypeScript", "Next.js", "Claude API"],
      links: { code: "https://github.com/zo2450/inbox-agent", caseStudy: "ibm-pro-bono-ai-agent" },
    },
    {
      name: "Pocket island",
      headline: "My story as a tiny 3D island you can spin",
      source: "zo2450/threejs-projects",
      kind: "github",
      summary:
        "Toronto, Laurier, GameCraft Camp, work and games on a low-poly island. Tap a place to learn more; the lighting follows the time in Toronto.",
      role: "Solo project, the first in my Three.js experiments.",
      tags: ["Three.js", "TypeScript", "Vite"],
      links: { code: "https://github.com/zo2450/threejs-projects/tree/main/pocket-island" },
    },
    {
      name: "This portfolio",
      headline: "The site you're on, mini game included",
      source: "zo2450/zohair-portfolio",
      kind: "github",
      summary: "Case studies, two embedded mini projects, and an arcade game hidden behind a cheat code.",
      role: "Designed and built it.",
      tags: ["Next.js", "TypeScript", "Once UI"],
      links: {
        code: "https://github.com/zo2450/zohair-portfolio",
        live: "https://zohair-portfolio-eta.vercel.app",
      },
    },
    {
      name: "Matchmaking web app",
      headline: "Designed the whole interface for a Muslim matchmaking web app",
      source: "Figma",
      kind: "figma",
      summary:
        "The front end and user interface for a matchmaking web app, designed to be modern and responsive, then built with Razor Pages and Bootstrap on Azure.",
      role: "Led the design as a Software Engineering Intern at United Community Services of Peel, 2024.",
      tags: ["Figma", "UX/UI", "Responsive design"],
      links: { figma: "https://www.figma.com/design/doJ6EnXVNnWpFB1oIWpogL/USCB?node-id=2-300" },
    },
  ],
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photos – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [],
};

// About page extras. Every fact here comes from the resume, old site or certificates.
const aboutExtras: AboutExtras = {
  now: "Building agentic products at AMD",
  stats: [
    { label: "Based in", value: "Toronto, ON" },
    { label: "Studying", value: "Computer Science, Wilfrid Laurier '27" },
    { label: "Languages", value: "English, Urdu" },
  ],
  // Draft principles, each backed by something on the resume. Edit freely.
  principles: [
    {
      title: "Start with the people using it",
      highlight: "people",
      caseStudy: { slug: "ibm-pro-bono-ai-agent", label: "IBM pro bono case study" },
      description:
        "Before building the IBM inbox agent, I ran usability tests with the charity's staff to see how they actually worked.",
    },
    {
      title: "Automate the boring parts",
      highlight: "boring",
      caseStudy: { slug: "microsoft-prospecting-agent", label: "Microsoft case study" },
      description:
        "If a workflow eats days, it should be an agent. At Microsoft that turned 15 days of seller prep into 2.",
    },
    {
      title: "Ship, then measure",
      highlight: "measure",
      caseStudy: { slug: "amd-aippt-ai-agents", label: "AMD case study" },
      description:
        "AIPPT's AI features went to early users fast. The hour-plus saved per deck is how I know they worked.",
    },
    {
      title: "Teach it back",
      highlight: "Teach",
      caseStudy: { slug: "gamecraft-camp", label: "GameCraft Camp case study" },
      description:
        "Running GameCraft Camp taught me to explain complex ideas simply, one 12-year-old at a time.",
    },
  ],
  otherTools: ["Java", "SQL", "JavaScript", "Figma"],
  wins: [
    {
      title: "First place for an AI implementation plan",
      detail: "IBM pro bono consulting, built for a charity",
      date: "2025",
    },
    {
      title: "Semi-finalist, BDO Future Leaders Challenge",
      detail: "One of 44 teams selected from 219",
      date: "Apr 2024",
      image: "/images/certs/bdo.png",
    },
  ],
  certificates: [
    { title: "Crash Course on Python", issuer: "Google", image: "/images/certs/google-python.png" },
    {
      title: "Fundamentals of Digital Marketing",
      issuer: "Google",
      image: "/images/certs/google-marketing.png",
    },
    {
      title: "Enterprise Design Thinking",
      issuer: "IBM",
      image: "/images/certs/ibm-design-thinking.png",
    },
    {
      title: "Audit & Assurance Job Simulation",
      issuer: "KPMG",
      image: "/images/certs/kpmg.png",
    },
  ],
};

export { person, social, newsletter, home, about, aboutExtras, blog, work, gallery };
