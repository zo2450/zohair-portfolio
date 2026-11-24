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
          Building AI agents @ AMD
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
        highlight: { value: "4", label: "AI agents built, plus AIPPT owned end to end" },
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
        highlight: { value: "$30M+", label: "pipeline from agent workshops" },
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
        highlight: { value: "1st place", label: "AI strategy plan" },
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
        // TODO(Zohair): replace the placeholder with what you did and the result; add a highlight + tags
        // Placeholder shows in dev previews only
        achievements:
          process.env.NODE_ENV === "production"
            ? []
            : [
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
        highlight: { value: "+18%", label: "early engagement in beta" },
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
        company: "thinkrr.ai",
        timeframe: "May 2024 – Nov 2024",
        role: "Web Developer & Marketing Associate",
        highlight: { value: "+15%", label: "organic traffic" },
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
        highlight: { value: "1,500+", label: "kids taught C++ game dev" },
        tags: ["C++", "Partnerships", "Fundraising"],
        current: true,
        achievements: [
          <>
            Co-founded and led a hands-on C++ game development program that has taught 1,500+
            students aged 8 to 12.
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
        company: "United Community Services of Peel",
        role: "Software Engineering Intern",
        timeframe: "Sep 2024 – Dec 2024",
        achievements: [
          "Helped develop AI matchmaking algorithms on Microsoft Azure, working with datasets to improve matchmaking.",
          "Built an interactive web app with Azure and Razor Pages (ASP.NET), using HTML, CSS and Bootstrap.",
          "Designed the UX/UI with modern, responsive design principles.",
        ],
      },
      {
        company: "Knorket.AI",
        role: "Growth Intern",
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
  description: `Product and AI agent projects by ${person.name}`,
  // Each .mdx file in src/app/work/projects becomes a case study page
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photos – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [],
};

// About page extras. [Square brackets] mark placeholders for Zohair to fill in.
const aboutExtras: AboutExtras = {
  characterSheet: [
    { label: "Class", value: "AI Product Manager" },
    { label: "Base", value: "Toronto, ON" },
    { label: "Languages", value: "English · Urdu" },
    { label: "Guild", value: "Laurier CS '27" },
  ],
  now: {
    updated: "Nov 2026",
    items: [
      { label: "Building", value: "AI agents and AIPPT at AMD", icon: "build" },
      { label: "Studying", value: "Computer Science at Wilfrid Laurier", icon: "graduation" },
      { label: "Playing", value: "[What you're playing right now]", icon: "gamepad" },
    ],
  },
  // Draft principles, each backed by something on the resume. Edit freely.
  principles: [
    {
      title: "Start with the people using it",
      description:
        "Before building the IBM inbox agent, I ran usability tests with the charity's staff to see how they actually worked.",
      icon: "users",
    },
    {
      title: "Automate the boring parts",
      description:
        "If a workflow eats days, it should be an agent. At Microsoft that turned 15 days of seller prep into 2.",
      icon: "zap",
    },
    {
      title: "Ship, then measure",
      description:
        "AIPPT's AI features went to early users fast. The 1+ hour saved per deck is how I know they worked.",
      icon: "compass",
    },
    {
      title: "Teach it back",
      description:
        "Running GameCraft Camp taught me to explain complex ideas simply, to 1,500+ kids and counting.",
      icon: "teach",
    },
  ],
  loadout: [
    { title: "Code", tools: ["Python", "Java", "C/C++", "SQL", "JavaScript", "React"] },
    {
      title: "AI & automation",
      tools: ["Copilot Studio", "Power Automate", "Power BI", "Microsoft Graph API"],
    },
    { title: "Product & design", tools: ["Figma", "Jira", "Usability testing"] },
  ],
  achievements: [
    {
      title: "First place, AI strategy",
      issuer: "IBM pro bono",
      detail: "Our AI implementation plan for a charity won first place.",
      icon: "trophy",
    },
    {
      title: "Future Leaders Challenge",
      issuer: "BDO",
      detail: "Semi-finalist",
      icon: "trophy",
      image: "/images/certs/bdo.png",
    },
    {
      title: "Enterprise Design Thinking",
      issuer: "IBM",
      detail: "Badge",
      icon: "award",
      image: "/images/certs/ibm-design-thinking.png",
    },
    {
      title: "Crash Course on Python",
      issuer: "Google",
      detail: "Certificate",
      icon: "award",
      image: "/images/certs/google-python.png",
    },
    {
      title: "Fundamentals of Digital Marketing",
      issuer: "Google",
      detail: "Certificate",
      icon: "award",
      image: "/images/certs/google-marketing.png",
    },
    {
      title: "Audit & Assurance Job Simulation",
      issuer: "KPMG",
      detail: "Certificate",
      icon: "award",
      image: "/images/certs/kpmg.png",
    },
  ],
  sideQuests: [
    {
      title: "Rock climbing",
      description: "[Where you climb, or a route you're proud of]",
      icon: "mountain",
    },
    { title: "Gaming", description: "[Your all-time favourite game]", icon: "gamepad" },
    { title: "Movies", description: "[A film you'd recommend to anyone]", icon: "film" },
    {
      title: "Teaching",
      description: "Co-founded GameCraft Camp, where 1,500+ kids have learned to code games.",
      icon: "teach",
    },
  ],
};

export { person, social, newsletter, home, about, aboutExtras, blog, work, gallery };
