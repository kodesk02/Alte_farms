"use client";

import { useRef, useLayoutEffect } from "react";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { stats } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

export function Spotlight() {
  const ringRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Slow continuous rotation on the outer ring
      gsap.to(ringRef.current, {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });

      // Gentle parallax scale-in as it enters view
      gsap.from(".spotlight-image", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
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
      className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:px-10"
    >
      {/* Left: text content */}
      <div>
        <motion.span
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="font-label mb-6 inline-block rounded-full bg-secondary-500/20 px-3 py-1 text-xs text-secondary-300 border border-secondary-500/40"
        >
          Spotlight
        </motion.span>

        <motion.h2
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="font-headline text-6xl font-extrabold leading-[1.05] text-neutral-50"
        >
          South African
          <br />
          <span className="text-primary-400">Ostrich</span>
        </motion.h2>

        <motion.p
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
          className="font-body mt-6 max-w-md text-lg text-neutral-300"
        >
          Recognized as the world&apos;s largest living bird, the South African
          Ostrich is a flightless, fast-running species native to open plains.
          Highly social and adaptable, they require extensive outdoor acreage,
          secure perimeter fencing, and specialized livestock management in a
          sanctuary setting.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeUp}
          className="mt-8 flex flex-col gap-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-start gap-3">
              <stat.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary-400" />
              <p className="font-body text-neutral-300">
                <span className="text-neutral-50">{stat.label}:</span>{" "}
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp} className="mt-10">
          <Button
            variant="outline"
            className="h-12 rounded-full border-neutral-700 px-7 text-primary-400 hover:bg-neutral-800 hover:text-primary-300"
          >
            View Care Guide
          </Button>
        </motion.div> */}
      </div>

      {/* Right: circular image with rotating ring */}
      <div className="relative mx-auto aspect-square w-full max-w-md">
        {/* Rotating dashed/thin ring */}
        <div
          ref={ringRef}
          className="absolute inset-0 rounded-full border border-neutral-700"
        />

        {/* Image */}
        <div className="spotlight-image absolute inset-6 overflow-hidden rounded-full border border-neutral-800">
          <Image
            src="/images/ostrich.jpg"
            alt="Keel-billed Toucan"
            fill
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
