import { About } from "@/components/home/about";
import { Approach } from "@/components/home/approach";
import { ArticlesPreview } from "@/components/home/articles-preview";
import { BrandsMarquee } from "@/components/home/brands-marquee";
import { Commitments } from "@/components/home/commitments";
import { Contact } from "@/components/home/contact";
import { Faq } from "@/components/home/faq";
import { FreeVisit } from "@/components/home/free-visit";
import { Hero } from "@/components/home/hero";
import { ProjectScenarios } from "@/components/home/project-scenarios";
import { Services } from "@/components/home/services";
import { SimulatorCta } from "@/components/home/simulator-cta";
import { articles } from "@/content/articles";
import { services } from "@/content/services";
import { isReviewMode } from "@/lib/env";
import { getSimulatorMode } from "@/lib/simulator/mode";

export default function HomePage() {
  const reviewMode = isReviewMode();
  const simulator = getSimulatorMode();

  return (
    <>
      <Hero reviewMode={reviewMode} />
      <BrandsMarquee reviewMode={reviewMode} />
      <Services services={services} />
      <FreeVisit />
      <About />
      <Approach />
      <Commitments reviewMode={reviewMode} />
      {/* Scénarios chiffrés uniquement avec des barèmes validés (ou en revue, marqués « exemple »). */}
      {simulator.kind === "unavailable" ? (
        <div className="bg-white pt-20 sm:pt-28">
          <SimulatorCta />
        </div>
      ) : (
        <ProjectScenarios rules={simulator.rules} isExample={simulator.kind === "demo"} />
      )}
      <ArticlesPreview articles={articles} />
      <Faq />
      <Contact />
    </>
  );
}
