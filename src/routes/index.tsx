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
import { SITE_URL } from "@/lib/contact";

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
      { property: "og:site_name", content: "Mahalaxmi Solar Service" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Mahalaxmi Solar Service — Complete solar solutions" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_URL}og-image.jpg` },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
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
