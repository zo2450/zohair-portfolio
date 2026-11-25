import { about, work } from "@/resources";
import { ProjectCard } from "@/components/work/ProjectCard";
import bento from "@/components/work/WorkBento.module.scss";
import { InternshipsCard } from "./InternshipsCard";
import { SkillsCard } from "./SkillsCard";

const INTERNSHIPS = ["AMD", "Microsoft", "IBM"];

/**
 * Home page bento, same look as the Projects page:
 * AIPPT (big) + Figma project | skills carousel + last three internships (big).
 */
export function HomeBento() {
  const aippt = work.projects.find((project) => project.name === "AIPPT");
  const figma = work.projects.find((project) => project.kind === "figma" && !project.draft);
  const internships = INTERNSHIPS.map((company) =>
    about.work.experiences.find((experience) => experience.company === company),
  )
    .filter((experience) => experience !== undefined)
    .map(({ company, role, timeframe, headline, logo, logoIcon, logoText, logoColor }) => ({
      company,
      role,
      timeframe,
      headline,
      logo,
      logoIcon,
      logoText,
      logoColor,
    }));

  return (
    <div className={bento.grid}>
      {aippt && <ProjectCard project={aippt} span={2} casePath={work.path} headingLevel="h3" />}
      {figma && <ProjectCard project={figma} span={1} casePath={work.path} headingLevel="h3" />}
      <SkillsCard span={1} />
      <InternshipsCard items={internships} span={2} />
    </div>
  );
}
