/**
 * Site content that the client will extend over time.
 * Only confirmed facts belong here — no invented figures, clients or reviews.
 */
import groundMounted from "@/assets/project-3.jpg";
import commercialRooftop from "@/assets/project-2.jpg";
import homeRooftop from "@/assets/hero.jpg";
import tataLogo from "@/assets/brands/tata.svg";
import luminousLogo from "@/assets/brands/luminous.svg";
import microtekLogo from "@/assets/brands/microtek.svg";
import kosolLogo from "@/assets/brands/kosol.svg";
import waareeLogo from "@/assets/brands/waaree.png";
import adaniLogo from "@/assets/brands/adani.svg";
import rayzonLogo from "@/assets/brands/rayzon.png";

import vijayPath1 from "@/assets/projects/vijay-path-1.jpeg";
import vijayPath2 from "@/assets/projects/vijay-path-2.jpeg";
import vijayPath3 from "@/assets/projects/vijay-path-3.jpeg";
import swejFarm from "@/assets/projects/swej-farm.jpeg";
import jaisinghpuraKhor1 from "@/assets/projects/jaisinghpura-khor-1.jpeg";
import jaisinghpuraKhor2 from "@/assets/projects/jaisinghpura-khor-2.jpeg";
import aatishMarket1 from "@/assets/projects/aatish-market-1.jpeg";
import aatishMarket2 from "@/assets/projects/aatish-market-2.jpeg";

export type Brand = {
  /** Official brand name — used for alt text */
  name: string;
  /** Official logo file (SVG preferred). Artwork is used unmodified. */
  logo: string;
  /** Intrinsic logo size, used to keep every logo optically balanced */
  width: number;
  height: number;
  /** Optional fine-tune for logos that read heavier or lighter (1 = default) */
  optical?: number;
};

/**
 * Brands the client has confirmed they work with. This is not a claim of
 * partnership, dealership or distribution — keep the section wording neutral.
 * Logo sources: official brand websites; Tata and Adani from Wikimedia Commons.
 */
export const BRANDS: Brand[] = [
  { name: "Tata", logo: tataLogo, width: 422, height: 369, optical: 0.88 },
  { name: "Luminous", logo: luminousLogo, width: 738, height: 159, optical: 0.9 },
  { name: "Microtek", logo: microtekLogo, width: 143, height: 46 },
  { name: "Kosol", logo: kosolLogo, width: 170, height: 57 },
  { name: "Waaree", logo: waareeLogo, width: 185, height: 51 },
  { name: "Adani", logo: adaniLogo, width: 31.5, height: 10.7 },
  { name: "Rayzon Solar", logo: rayzonLogo, width: 1000, height: 265 },
];

export type Project = {
  /** Imported photo, e.g. `import site1 from "@/assets/projects/site-1.jpg"` */
  image: string;
  /** Short description of the photo for screen readers */
  alt: string;
  /** Additional photos for this project */
  gallery?: { image: string; alt: string }[];
  /** "Residential" | "Commercial" | "Industrial" */
  type?: string;
  /** Confirmed system size, written as it should appear, e.g. "10 kW" */
  capacity?: string;
  /** Area and city, written as it should appear */
  location?: string;
  /** Optional project name */
  title?: string;
};

/**
 * Real, confirmed projects only. Add one entry per project with a real
 * photograph; leave out any field that isn't confirmed and it won't be shown.
 *
 * While this list is empty, the Projects section shows uncaptioned mood
 * imagery (IMAGERY_UNTIL_PROJECTS) with a "portfolio coming soon" note.
 * As soon as one real project is added, that treatment disappears.
 */
export const PROJECTS: Project[] = [
  {
    image: vijayPath1,
    alt: "10 kW residential solar installation at Vijay Path, Mansarovar, Jaipur - View 1",
    gallery: [
      {
        image: vijayPath2,
        alt: "10 kW residential solar installation at Vijay Path, Mansarovar, Jaipur - View 2",
      },
      {
        image: vijayPath3,
        alt: "10 kW residential solar installation at Vijay Path, Mansarovar, Jaipur - View 3",
      },
    ],
    type: "Residential",
    capacity: "10 kW",
    location: "Vijay Path, Mansarovar, Jaipur",
    title: "10 kW Residential Solar Installation",
  },
  {
    image: swejFarm,
    alt: "125 kW commercial solar installation at Hotel, Swei Farm, Sodala",
    type: "Commercial",
    capacity: "125 kW",
    location: "Hotel, Swei Farm, Sodala",
    title: "125 kW Commercial Solar Installation",
  },
  {
    image: jaisinghpuraKhor1,
    alt: "5 kW residential solar installation at Jaisinghpura Khor, Jaipur - View 1",
    gallery: [
      {
        image: jaisinghpuraKhor2,
        alt: "5 kW residential solar installation at Jaisinghpura Khor, Jaipur - View 2",
      },
    ],
    type: "Residential",
    capacity: "5 kW",
    location: "Jaisinghpura Khor, Jaipur",
    title: "5 kW Residential Solar Installation",
  },
  {
    image: aatishMarket1,
    alt: "8 kW commercial solar installation at Aatish Market, Mansarovar, Jaipur",
    gallery: [
      {
        image: aatishMarket2,
        alt: "8 kW commercial solar installation at Aatish Market, Mansarovar, Jaipur - Street view",
      },
    ],
    type: "Commercial",
    capacity: "8 kW",
    location: "Aatish Market, Mansarovar, Jaipur",
    title: "Commercial Solar Installation — 8 kW",
  },
];

/** Uncaptioned imagery used only while PROJECTS is empty. Never labelled as projects. */
export const IMAGERY_UNTIL_PROJECTS: { image: string; alt: string }[] = [
  { image: groundMounted, alt: "Ground-mounted solar arrays on open land" },
  { image: commercialRooftop, alt: "Solar panels on a flat city rooftop" },
  { image: homeRooftop, alt: "Rooftop solar on a contemporary home at sunset" },
];

export type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "Homeowner" or the customer's area */
  context?: string;
  /** e.g. system size, if the customer is happy to share it */
  system?: string;
};

/** Real customer reviews only. The section stays hidden while this is empty. */
export const TESTIMONIALS: Testimonial[] = [];
