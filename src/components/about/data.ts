import { about, aboutExtras, work } from "@/resources";

/** Copy and data for the About page. Facts only. */

export const isProduction = process.env.NODE_ENV === "production";

export const hook = "I'm a product manager who builds agentic products.";

export const shortBio =
  "Software PM intern at AMD, previously Microsoft and IBM. Computer Science at Wilfrid Laurier, graduating 2027. I also co-founded a camp that teaches kids to build games in C++.";

// TODO(Zohair): confirm this is what you want to say publicly
export const lookingFor = "Looking for new-grad PM and AI PM roles for 2027.";

export const longBio = [
  "I'm a Computer Science student at Wilfrid Laurier University and a product manager who likes to build. At AMD and Microsoft I've owned AI tools end to end, from figuring out what people actually need to shipping agents that save them hours.",
  "I got into tech through games. In 2023 I co-founded GameCraft Camp to teach kids aged 8 to 12 how to make their own games in C++, and more than 1,500 students have been through it since.",
  "Outside work you'll find me watching movies or gaming.",
];


export const principles = aboutExtras.principles;
export const wins = aboutExtras.wins;
export const certificates = aboutExtras.certificates;
export const nowLine = aboutExtras.now;

/** Main roles, minus any hidden in production. */
export const roles = about.work.experiences
  .filter((role) => !(isProduction && role.hiddenInProduction))
  .map((role) => ({
    company: role.company,
    role: role.role,
    timeframe: role.timeframe,
    headline: role.headline,
    tags: role.tags ?? [],
    current: Boolean(role.current),
    caseStudyHref: role.caseStudy ? `${work.path}/${role.caseStudy}` : undefined,
  }));

export const earlierRoles = about.work.earlier ?? [];

/** Every tool mentioned on a role, plus the extras, de-duplicated. */
export const toolkit = Array.from(
  new Set([...roles.flatMap((role) => role.tags), ...aboutExtras.otherTools]),
);
