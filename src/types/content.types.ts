import { IconName } from "@/resources/icons";
import { zones } from "tzdata";

/**
 * IANA time zone string (e.g., 'Asia/Calcutta', 'Europe/Vienna').
 * See: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export type IANATimeZone = Extract<keyof typeof zones, string>; // Narrow to string keys for React usage

/**
 * Represents a person featured in the portfolio.
 */
export type Person = {
  /** First name of the person */
  firstName: string;
  /** Last name of the person */
  lastName: string;
  /** The name you want to display, allows variations like nicknames */
  name: string;
  /** Role or job title */
  role: string;
  /** Path to avatar image */
  avatar: string;
  /** Email address */
  email: string;
  /** IANA time zone location */
  location: IANATimeZone;
  /** Friendly location text shown in the header and on the about page (falls back to `location`) */
  locationLabel?: string;
  /** Languages spoken */
  languages?: string[];
  /**
   * BCP 47 language tag for the HTML lang attribute (e.g., 'en', 'ja', 'zh-TW').
   * Defaults to 'en' if not set.
   * See: https://www.iana.org/assignments/language-subtag-registry
   */
  locale?: string;
};

/**
 * Newsletter Section
 * @description The below information will be displayed on the Home page in Newsletter block
 */
export type Newsletter = {
  /** Whether to display the newsletter section */
  display: boolean;
  /** Title of the newsletter   */
  title: React.ReactNode;
  /** Description of the newsletter */
  description: React.ReactNode;
};

/**
 * Social link configuration.
 */
export type Social = Array<{
  /** Name of the social platform */
  name: string;
  /** Icon for the social platform
   * The icons are a part of "src/resources/icons.ts" file.
   * If you need a different icon, import it there and reference it everywhere else
   */
  icon: IconName;
  /**
   * The link to the social platform
   *
   * The link is not validated by code, make sure it's correct
   */
  link: string;
  /** Whether this social link is essential and should be displayed on the about page */
  essential?: boolean;
}>;

/**
 * Base interface for page configuration with common properties.
 */
export interface BasePageConfig {
  /** Path to the page
   *
   * The path should be relative to the public directory
   */
  path: `/${string}` | string;
  /** Label for navigation or display */
  label: string;
  /** Title of the page */
  title: string;
  /** Description for SEO and metadata */
  description: string;
  /** OG Image should be put inside `public/images` folder */
  image?: `/images/${string}` | string;
}

/**
 * Home page configuration.
 */
export interface Home extends BasePageConfig {
  /** The image to be displayed in metadata
   *
   * The image needs to be put inside `/public/images/` directory
   */
  image: `/images/${string}` | string;
  /** The headline of the home page */
  headline: React.ReactNode;
  /** Featured badge, which appears above the headline */
  featured: {
    display: boolean;
    title: React.ReactNode;
    href: string;
  };
  /** The sub text which appears below the headline */
  subline: React.ReactNode;
  /** Headline numbers shown in a strip under the hero */
  metrics?: Array<{
    value: string;
    label: string;
  }>;
}

/**
 * About page configuration.
 * @description Configuration for the About page, including sections for table of contents, avatar, calendar, introduction, work experience, studies, and technical skills.
 */
export interface About extends BasePageConfig {
  /** Table of contents configuration */
  tableOfContent: {
    /** Whether to display the table of contents */
    display: boolean;
    /** Whether to show sub-items in the table of contents */
    subItems: boolean;
  };
  /** Avatar section configuration */
  avatar: {
    /** Whether to display the avatar */
    display: boolean;
  };
  /** Calendar section configuration */
  calendar: {
    /** Whether to display the calendar */
    display: boolean;
    /** Link to the calendar */
    link: string;
  };
  /** Introduction section */
  intro: {
    /** Whether to display the introduction */
    display: boolean;
    /** Title of the introduction section */
    title: string;
    /** Description of the introduction section */
    description: React.ReactNode;
  };
  /** Work experience section */
  work: {
    /** Whether to display work experience */
    display: boolean;
    /** Title for the work experience section */
    title: string;
    /** List of work experiences */
    experiences: Array<{
      /** Company name */
      company: string;
      /** Timeframe of employment */
      timeframe: string;
      /** Role or job title */
      role: string;
      /** Company logo path (shown beside the entry) */
      logo?: string;
      /** Brand icon / wordmark + tile colour, used when there is no logo image */
      logoIcon?: IconName;
      logoText?: string;
      logoColor?: string;
      /** Slug of a related case study in /work */
      caseStudy?: string;
      /** The role's result, written as a sentence (same style as project headlines) */
      headline?: string;
      /** Leave this role out of production builds (e.g. until its details are written) */
      hiddenInProduction?: boolean;
      /** Tools / skills used in this role */
      tags?: string[];
      /** Shows a pulsing "Current" badge */
      current?: boolean;
      /** Show the bullet points by default (others start collapsed) */
      expanded?: boolean;
      /** Achievements at the company */
      achievements: React.ReactNode[];
      /** Images related to the experience */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
    /** Older roles, shown collapsed in a compact list */
    earlier?: Array<{
      company: string;
      role: string;
      timeframe: string;
      logo?: string;
      /** Group heading in the earlier-roles list */
      group: string;
      /** Shown when the role is expanded */
      achievements?: string[];
    }>;
  };
  /** Studies/education section */
  studies: {
    /** Whether to display studies section */
    display: boolean;
    /** Title for the studies section */
    title: string;
    /** List of institutions attended */
    institutions: Array<{
      /** Institution name */
      name: string;
      /** Logo path */
      logo?: string;
      /** Description of studies */
      description: React.ReactNode;
    }>;
  };
  /** Technical skills section */
  technical: {
    /** Whether to display technical skills section */
    display: boolean;
    /** Title for the technical skills section */
    title: string;
    /** List of technical skills */
    skills: Array<{
      /** Skill title */
      title: string;
      /** Skill description */
      description?: React.ReactNode;
      /** Skill tags */
      tags?: Array<{
        name: string;
        icon?: IconName;
      }>;
      /** Images related to the skill */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
  };
}

/**
 * Extra About page sections (character sheet, now, principles, loadout, achievements, side quests).
 */
export interface AboutExtras {
  /** One line in the header: what's happening right now */
  now: string;
  /** Short facts in the header (plain labels) */
  stats: Array<{ label: string; value: string }>;
  /** "How I work" principles, each backed by a real result */
  principles: Array<{
    title: string;
    description: string;
    /** Word in the title shown in the accent colour */
    highlight?: string;
    /** Slug in src/app/work/projects, with the link text */
    caseStudy?: { slug: string; label: string };
  }>;
  /** Tools not already shown on a role in the timeline */
  otherTools: string[];
  /** The real wins, shown prominently; `image` opens the certificate */
  wins: Array<{ title: string; detail: string; date: string; image?: string }>;
  /** Certificates, shown as one quiet line; each opens its scan */
  certificates: Array<{ title: string; issuer: string; image: string }>;
}

/**
 * Blog page configuration.
 * @description Configuration for the Blog page, including metadata and navigation label.
 */
export interface Blog extends BasePageConfig {}

/**
 * Work/projects page configuration.
 * @description Configuration for the Work/Projects page, including metadata and navigation label.
 */
/** A project on the Projects page: something people can open, like a repo or a Figma file. */
export interface Project {
  name: string;
  /** Where it lives, shown above the name, e.g. "amd-tme/AIPPT" or "Figma" */
  source: string;
  kind: "github" | "figma";
  /** Short sentence shown big on the card (falls back to the name) */
  headline?: string;
  /** One or two sentences: what it is */
  summary: string;
  /** My part in it */
  role: string;
  tags: string[];
  links: {
    code?: string;
    live?: string;
    figma?: string;
    /** Slug of a case study in src/app/work/projects */
    caseStudy?: string;
  };
  /** Real numbers about my contribution, e.g. from GitHub Insights */
  stats?: Array<{ value: string; label: string }>;
  /** Where and when the stats came from, e.g. "From GitHub, Nov 2026" */
  statsSource?: string;
  /** Not ready yet: shown in dev only */
  draft?: boolean;
}

export interface Work extends BasePageConfig {
  /** Repos and design files shown on the Projects page (case studies live on as /work/[slug]) */
  projects: Project[];
}

/**
 * Gallery page configuration.
 * @description Configuration for the Gallery page, including metadata, navigation label, and image list.
 */
export interface Gallery extends BasePageConfig {
  /** List of images in the gallery */
  images: Array<{
    /** Image source path */
    src: string;
    /** Image alt text */
    alt: string;
    /** Image orientation (horizontal/vertical) */
    orientation: string;
  }>;
}
