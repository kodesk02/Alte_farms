"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

type Fauna = {
  name: string;
  description: string;
  tag: string;
  tagVariant: "secondary" | "primary" | "muted";
  image: string;
  span: string; // Tailwind grid placement classes for desktop
};

const featured: Fauna[] = [
  {
    name: "Silkie Chicken",
    description: "Soft to the touch, like silk or fur.",
    tag: "Birds",
    tagVariant: "secondary",
    image: "/images/hair.jpg",
    span: "md:col-start-3 md:col-span-2 md:row-start-1 md:row-span-2",
  },
  {
    name: "Macaw",
    description: "New World parrots that are long-tailed and often colorful",
    tag: "Tropical",
    tagVariant: "primary",
    image: "/images/mali.jpg",
    span: "md:col-start-1 md:row-start-2 md:row-span-2",
  },
  {
    name: "Ostrich",
    description: "Largest living species of bird.",
    tag: "Birds",
    tagVariant: "muted",
    image: "/images/chick.jpg",
    span: "md:col-start-2 md:row-start-2",
  },
  {
    name: "White cockatoo",
    description: "Striking head crest and a loud, screeching call.",
    tag: "Tropical",
    tagVariant: "secondary",
    image: "/images/white.jpg",
    span: "md:col-start-2 md:row-start-3",
  },
  {
    name: "Indian peafowl",
    description: "Famous for brilliant blue and green fan-like trains.",
    tag: "Exotic",
    tagVariant: "muted",
    image: "/images/pea.jpg",
    span: "md:col-start-3 md:row-start-3",
  },
  {
    name: "Chinese Goose",
    description: "It belongs to the knob geese.",
    tag: "Poultry",
    tagVariant: "secondary",
    image: "/images/goose.jpg",
    span: "md:col-start-4 md:row-start-3",
  },
];

const tagStyles: Record<Fauna["tagVariant"], string> = {
  secondary:
    "bg-[#B5ACA5]/20 text-[#B5ACA5] border border-[#B5ACA5]/40",
  primary: "bg-[#7F3502]/20 text-[#7F3502] border border-[#7F3502]/40",
  muted: "bg-[#905E2E]/20 text-[#905E2E] border border-[#905E2E]/40",
};

const overlayHoverStyles: Record<Fauna["tagVariant"], string> = {
  secondary: "group-hover:from-[#090A08]/95 group-hover:via-[#090A08]/50",
  primary: "group-hover:from-[#7F3502]/15 group-hover:via-[#7F3502]/5",
  muted: "group-hover:from-[#1F1B13]/95 group-hover:via-[#1F1B13]/50",
};

export function FeaturedFauna() {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fauna-heading", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".fauna-card", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#191D17] mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-10 lg:py-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-[16rem_16rem_16rem] gap-4">
        {/* Header content inside the top cell */}
        <div className="fauna-heading col-span-1 md:col-span-2 md:row-span-1 flex flex-col justify-between pr-0 md:pr-4 pb-4 md:pb-2">
          <div>
            <h2 className="font-headline text-3xl font-extrabold text-neutral-50 sm:text-4xl lg:text-5xl">
              Our best sellers
            </h2>
            <p className="font-body mt-3 text-sm md:text-base leading-relaxed text-neutral-400">
              Our most magnificent residents, curated for visual splendor. From
              rainforest canopies to alpine slopes, each creature in our
              sanctuary is cared for with a dedicated habitat, specialized diet,
              and round-the-clock attention.
            </p>

          <Button
          onClick={() => router.push("/gallery")}
            variant="outline"
            className="group mt-10 h-11 w-fit rounded-full bg-primary-500/50 px-6 text-sm text-primary-300 hover:bg-primary-500/10"
          >
              View Complete Gallery
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          </div>

        </div>

        {/* Fauna Bento Cards */}
        {featured.map((animal) => (
          <FaunaCard key={animal.name} animal={animal} />
        ))}
      </div>
    </section>
  );
}

function FaunaCard({ animal }: { animal: Fauna }) {
  return (
    <div
      className={`fauna-card group relative h-64 md:h-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 ${animal.span}`}
    >
      {/* Image */}
      <Image
        src={animal.image}
        alt={animal.name}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

      {/* Hover wash overlay for desktop */}
      <div
        className={`absolute inset-0 bg-linear-to-t from-transparent via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${overlayHoverStyles[animal.tagVariant]}`}
      />

      {/* Content overlay */}
      <div className="absolute md:hidden group-hover:block inset-x-0 bottom-0 p-4 md:p-5">
        <span
          className={`font-label mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs ${tagStyles[animal.tagVariant]}`}
        >
          {animal.tag}
        </span>
        <h3 className="font-headline text-lg font-bold text-white lg:text-2xl">
          {animal.name}
        </h3>
        <p className="font-body mt-1 max-w-[90%] text-xs md:text-sm text-neutral-300">
          {animal.description}
        </p>
      </div>
    </div>
  );
}