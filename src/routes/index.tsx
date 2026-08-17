import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/home/Hero";
import {
  Statement,
  Trust,
  Solutions,
  Engineering,
  Projects,
  Savings,
  Process,
  Testimonial,
} from "@/components/home/Sections";
import { FinalCTA, Footer, MobileQuoteBar } from "@/components/home/Closing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SuryaGrid — Solar Installation for Homes & Businesses in India" },
      {
        name: "description",
        content:
          "High-performance solar systems designed, installed and supported for homes and businesses across Rajasthan. Residential, commercial and industrial solar by SuryaGrid.",
      },
      { property: "og:title", content: "SuryaGrid — Power your property. Own your energy." },
      {
        property: "og:description",
        content:
          "Premium residential, commercial and industrial solar design and installation in India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-softwhite">
      <Nav />
      <Hero />
      <Statement />
      <Trust />
      <Solutions />
      <Engineering />
      <Projects />
      <Savings />
      <Process />
      <Testimonial />
      <FinalCTA />
      <Footer />
      <MobileQuoteBar />
    </main>
  );
}
