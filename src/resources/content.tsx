import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Column, Line, Row, Text } from "@once-ui-system/core";
import { TypingPill } from "@/components/TypingPill";

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
      Product Manager.
      <br />
      AI Agent Builder.
      <br />
      Game Dev Teacher.
    </>
  ),
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">AMD</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Now building AI agents
        </Text>
      </Row>
    ),
    href: "/work/amd-aippt-ai-agents",
  },
  subline: (
    <>
      I'm {person.firstName}, a Computer Science student at Wilfrid Laurier and a product
      management intern at AMD. I've shipped AI agents at AMD, Microsoft and IBM, and I co-founded a
      camp that teaches kids to make their own games.
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
    display: true,
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
        <TypingPill />
        <Text>
          I'm a Computer Science student at Wilfrid Laurier University and a product manager who
          likes to build. At AMD and Microsoft I've owned AI tools end to end, from figuring out
          what people actually need to shipping agents that save them hours.
        </Text>
        <Text>
          I got into tech through games. In 2023 I co-founded GameCraft Camp to teach kids aged 8 to
          12 how to make their own games in C++, and more than 1,500 students have been through it
          since. Outside work you'll find me rock climbing, watching movies or gaming.
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
        caseStudy: "amd-aippt-ai-agents",
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
        caseStudy: "ibm-pro-bono-ai-agent",
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
        company: "Picnic Game Labs",
        timeframe: "Mar 2025 – May 2025",
        role: "Project Management Intern",
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
        company: "thinkrr.ai",
        timeframe: "May 2024 – Nov 2024",
        role: "Web Developer & Marketing Associate",
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
        achievements: [
          <>
            Co-founded and led a hands-on C++ game development program that has taught 1,500+
            students aged 8 to 12.
          </>,
          <>
            Secured funding from Canada Service Corps and built partnerships with Achēv and
            Brampton Library to expand the program's reach.
          </>,
        ],
        images: [],
      },
    ],
    earlier: [
      {
        company: "United Community Services of Peel",
        role: "Software Engineering Intern",
        timeframe: "Sep 2024 – Dec 2024",
      },
      {
        company: "Knorket.AI",
        role: "Marketing Consultant Intern",
        timeframe: "Jan 2024 – Mar 2024",
        logo: "/images/logos/knorket.png",
      },
      {
        company: "Achēv",
        role: "Coding Camp Coordinator",
        timeframe: "Jun 2023 – Sep 2023",
        logo: "/images/logos/achev.png",
      },
      {
        company: "Carabram",
        role: "Marketing Assistant (Freelance)",
        timeframe: "Jun 2023 – Jul 2023",
      },
      {
        company: "Helping Our People Community Projects",
        role: "Executive Assistant",
        timeframe: "Nov 2022 – Aug 2023",
        logo: "/images/logos/hopcp.png",
      },
      {
        company: "Achēv",
        role: "Digital Marketing Assistant (Freelance)",
        timeframe: "Apr 2023",
        logo: "/images/logos/achev.png",
      },
      {
        company: "Achēv",
        role: "Digital Workshop Instructor (Freelance)",
        timeframe: "Feb 2023",
        logo: "/images/logos/achev.png",
      },
      {
        company: "T4T",
        role: "Marketing Assistant",
        timeframe: "Aug 2022 – Oct 2022",
        logo: "/images/logos/t4t.png",
      },
      {
        company: "Z KICKS",
        role: "Independent Sneaker Reseller",
        timeframe: "Mar 2020 – Mar 2022",
        logo: "/images/logos/zkicks.png",
      },
      {
        company: "Dollarama",
        role: "Sales Associate",
        timeframe: "Mar 2021 – Nov 2021",
        logo: "/images/logos/dollarama.png",
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Wilfrid Laurier University",
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
        images: [{ src: "/images/certs/bdo.png", alt: "BDO Future Leaders Challenge certificate", width: 16, height: 9 }],
      },
      {
        title: "Google: Crash Course on Python",
        description: <>Certificate</>,
        images: [{ src: "/images/certs/google-python.png", alt: "Google Crash Course on Python certificate", width: 16, height: 9 }],
      },
      {
        title: "Google: Fundamentals of Digital Marketing",
        description: <>Certificate</>,
        images: [{ src: "/images/certs/google-marketing.png", alt: "Google Fundamentals of Digital Marketing certificate", width: 16, height: 9 }],
      },
      {
        title: "IBM: Enterprise Design Thinking",
        description: <>Badge</>,
        images: [{ src: "/images/certs/ibm-design-thinking.png", alt: "IBM Enterprise Design Thinking badge", width: 16, height: 9 }],
      },
      {
        title: "KPMG: Audit & Assurance Job Simulation",
        description: <>Certificate</>,
        images: [{ src: "/images/certs/kpmg.png", alt: "KPMG Audit and Assurance job simulation certificate", width: 16, height: 9 }],
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
  label: "Work",
  title: `Case studies – ${person.name}`,
  description: `Product and AI agent case studies by ${person.name}`,
  // Each .mdx file in src/app/work/projects becomes a case study page
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photos – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
