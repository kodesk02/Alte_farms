import { Categories } from "@/components/Categories";
import { FeaturedFauna } from "@/components/FeaturedFauna";
import { Hero } from "@/components/Hero";
import { RecentlyAdded } from "@/components/RecentlyAdded";
import { ShowcaseReveal } from "@/components/ShowcaseReveal";
import { Spotlight } from "@/components/Spotlight";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedFauna/>
      {/* <Categories/>  */}
      {/* <RecentlyAdded /> */}
      <Spotlight/>
      <ShowcaseReveal />
    </main>
  );
}