import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/home/Hero";
import { Prelude } from "@/components/home/Prelude";
import { Solutions } from "@/components/home/Solutions";
import { SuryaGhar } from "@/components/home/SuryaGhar";
import { Services } from "@/components/home/Services";
import { Journey } from "@/components/home/Journey";
import { About } from "@/components/home/About";
import { Brands } from "@/components/home/Brands";
import { Projects } from "@/components/home/Projects";
import { Testimonials } from "@/components/home/Testimonials";
import { Contact, Footer, MobileQuoteBar } from "@/components/home/Closing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mahalaxmi Solar Service | Residential, Commercial & Industrial Solar in Jaipur" },
      {
        name: "description",
        content:
          "Solar installation in Jaipur since 2011 for homes, businesses and industry. Solar EPC, rooftop and ground-mounted, on-grid and hybrid systems, PM Surya Ghar subsidy assistance, electricity-board work and 1 year free AMC.",
      },
      { property: "og:title", content: "Mahalaxmi Solar Service | Complete Solar Solutions" },
      {
        property: "og:description",
        content: "Residential, commercial and industrial solar installation in Jaipur since 2011.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Prelude />
        <Solutions />
        <SuryaGhar />
        <Services />
        <Journey />
        <About />
        <Brands />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <MobileQuoteBar />
    </>
  );
}
