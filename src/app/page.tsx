import { FeaturedFauna } from "@/components/FeaturedFauna";
import { Hero } from "@/components/Hero";
import { ShowcaseReveal } from "@/components/ShowcaseReveal";
import { Spotlight } from "@/components/Spotlight";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedFauna/>
      <Spotlight/>
      <ShowcaseReveal />
    </main>
  );
}