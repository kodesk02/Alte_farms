"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger);

type Enclosure = {
  name: string;
  description: string;
  tag: string;
  image: string;
};

const enclosures: Enclosure[] = [
  {
    name: "Architectural Walk-In Aviary",
    description:
      "Non-toxic powder coated steel · Custom dimensions · Integrated natural flora biome",
    tag: "Indoor Biotope",
    image: "/images/1.jpg",
  },
  {
    name: "Panoramic Flight Enclosure",
    description:
      "High-gauge matte black carbon steel · Full-aperture flight clearance · Retractable roof",
    tag: "Flight Cage",
    image: "/images/2.jpg",
  },
  {
    name: "Modular Luxury Sanctuary Enclosure",
    description:
      "Tempered clear glass inserts · Dark walnut timber framing · Dual-level climatic zoning",
    tag: "Small Mammal & Avian",
    image: "/images/3.jpg",
  },
  {
    name: "Artisan Wrought-Iron Caster Aviary",
    description:
      "Reinforced wrought iron · Acoustic soft-roll industrial casters · Vaulted dome perch ceiling",
    tag: "Artisan Mobile",
    image: "/images/4.jpg",
  },
  {
    name: "Custom Conservation Biotope",
    description:
      "Full atmospheric misting integration · Multi-species branch matrix · Microclimate control",
    tag: "Living Conservatory",
    image: "/images/5.jpg",
  },
  {
    name: "Curated Heavy-Gauge Studio Aviary",
    description:
      "Aircraft-grade alloy structural frame · Precision-spaced bar grid · Dual access points",
    tag: "Studio Series",
    image: "/images/6.jpg",
  },
];

export default function HabitatsPage() {
  const gridRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".enclosure-heading", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
      });

      gsap.from(".enclosure-card", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-neutral-950">
      {/* Hero banner */}
      <section className="relative flex h-[30vh] min-h-120 flex-col overflow-hidden">
        <Image
          src="/images/8.jpg"
          alt=""
          fill
          priority
          className="object-cover "
        />
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/40 backdrop-blur-sm to-black/30" />
        <div className="relative z-20">
          <Navbar />
        </div>
        <div className="relative z-10 mx-auto mt-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
          <h1 className="font-headline text-5xl font-extrabold uppercase tracking-tight text-neutral-50 lg:text-6xl">
            Habitats <span className="text-primary-400">&</span> Cages
          </h1>
          <p className="font-body mt-4 max-w-2xl text-neutral-300">
            Architectural Enclosures & Custom Flight Habitats designed for
            ethical sanctuary environments, offering high-gauge steel
            craftsmanship and organic bio-climatic flow.
          </p>
        </div>
      </section>

      {/* Catalog */}
      <section ref={gridRef} className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="enclosure-heading mb-14 text-center">
          <span className="font-label text-sm tracking-widest text-primary-400">
            CURATED CATALOG
          </span>
          <h2 className="font-headline mt-3 text-4xl font-extrabold text-neutral-50 lg:text-5xl">
            Fauna Sanctuary Enclosures
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {enclosures.map((enclosure) => (
            <EnclosureCard key={enclosure.name} enclosure={enclosure} />
          ))}
        </div>
      </section>
    </main>
  );
}

function EnclosureCard({ enclosure }: { enclosure: Enclosure }) {
  return (
    <div className="enclosure-card group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
      {/* Image */}
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={enclosure.image}
          alt={enclosure.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Tag badge */}
        <span className="font-label absolute left-4 top-4 rounded-full border border-primary-500/40 bg-neutral-950/70 px-3 py-1 text-[10px] uppercase tracking-widest text-primary-300 backdrop-blur-sm">
          {enclosure.tag}
        </span>
      </div>

      {/* Text content below the image */}
      <div className="p-6">
        <h3 className="font-headline text-xl font-bold text-neutral-50">
          {enclosure.name}
        </h3>
        <p className="font-body mt-2 text-sm leading-relaxed text-neutral-400">
          {enclosure.description}
        </p>
      </div>
    </div>
  );
}
