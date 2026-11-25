import { work } from "@/resources";
import { spansFor } from "./WorkBento";
import { ProjectCard } from "./ProjectCard";
import { RevealGrid } from "./RevealGrid";
import bento from "./WorkBento.module.scss";

const isProduction = process.env.NODE_ENV === "production";

/** Repos and design files from `work.projects`, in the same bento as the case studies. Drafts show in dev only. */
export function ProjectGrid() {
  const projects = work.projects.filter((project) => !(isProduction && project.draft));
  const spans = spansFor(projects.length);
  return (
    <RevealGrid className={bento.grid}>
      {projects.map((project, index) => (
        <ProjectCard key={project.name} project={project} span={spans[index]} casePath={work.path} />
      ))}
    </RevealGrid>
  );
}
