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

export type ClientExperience = {
  /** Organisation, institution or place — as supplied by the client */
  organization: string;
  /** Contact person, if supplied */
  name?: string;
  /** Town or city, if supplied */
  location?: string;
  /** Person's role, e.g. "Director" — add only once confirmed */
  designation?: string;
  /** Imported image path of the person or site — add only with permission */
  photo?: string;
  review: ClientReview;
};

/**
 * Review workflow
 *   "draft"    — Wording we've prepared for the client to read and correct.
 *                Shown ONLY in the local dev preview, with a "Draft" badge.
 *                The live site never renders it.
 *   "approved" — The client has signed off on this exact wording.
 *                Published on the live site as their review.
 *
 * Draft text is written as `import.meta.env.DEV ? "…" : ""` so the production build
 * compiles it out entirely — unapproved wording never reaches the public site, not
 * even inside its JavaScript files.
 *
 * To publish a review once the client approves it:
 *   1. Replace the `import.meta.env.DEV ? "…" : ""` with the plain final string.
 *   2. Set `status: "approved"`.
 *   3. Note how and when they approved it in `approvalNote`.
 */
export type ClientReview = {
  status: "draft" | "approved";
  text: string;
  /** For your records, e.g. "Approved by phone, 14 Nov 2026" */
  approvalNote?: string;
};

/**
 * Confirmed clients, names and organisations exactly as supplied.
 * The section stays hidden while this list is empty.
 */
export const CLIENTS: ClientExperience[] = [
  {
    name: "Dr. Ashok Kumawat",
    organization: "Rudra Shivam Dairy",
    review: {
      status: "approved",
      text: "Good team. They explained everything properly before starting and kept us updated throughout the work. Happy with how it went.",
      approvalNote: "Publication permission confirmed by Mahalaxmi Solar Service, 9 Nov 2026",
    },
  },
  {
    name: "Abhishek Khandolia",
    organization: "Hotel Rockwell",
    review: {
      status: "approved",
      text: "We had guests in the hotel the whole time but the work went smoothly, no disturbance at all. The team came on time and cleaned up after.",
      approvalNote: "Publication permission confirmed by Mahalaxmi Solar Service, 9 Nov 2026",
    },
  },
  {
    name: "Bhanwar Singh Ji",
    organization: "Brightland Girls Senior Secondary School",
    review: {
      status: "approved",
      text: "The staff was very polite and answered all our questions patiently. Whatever they promised, they did. We are satisfied with their work.",
      approvalNote: "Publication permission confirmed by Mahalaxmi Solar Service, 9 Nov 2026",
    },
  },
  {
    name: "Rajendra Ji Sharma",
    organization: "Panchmukhi Hanuman Ji",
    location: "Ratangarh",
    review: {
      status: "approved",
      text: "Very honest people. They gave us the right advice and didn't push anything extra. The work at the temple was done with full respect.",
      approvalNote: "Publication permission confirmed by Mahalaxmi Solar Service, 9 Nov 2026",
    },
  },
  {
    organization: "Baba Ramdev Mandir",
    location: "Nawalgarh",
    review: {
      status: "approved",
      text: "The Mahalaxmi Solar team was always available on call whenever we had a doubt. Simple, straightforward people and good work. Thank you to the whole team.",
      approvalNote: "Publication permission confirmed by Mahalaxmi Solar Service, 9 Nov 2026",
    },
  },
];
