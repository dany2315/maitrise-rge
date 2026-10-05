import { Approach } from "@/components/home/approach";
import { ArticlesPreview } from "@/components/home/articles-preview";
import { Contact } from "@/components/home/contact";
import { Faq } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { SimulatorCta } from "@/components/home/simulator-cta";
import { Trust } from "@/components/home/trust";
import { articles } from "@/content/articles";
import { services } from "@/content/services";
import { isReviewMode } from "@/lib/env";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services services={services} />
      <Approach />
      <Trust reviewMode={isReviewMode()} />
      <SimulatorCta />
      <ArticlesPreview articles={articles} />
      <Faq />
      <Contact />
    </>
  );
}
