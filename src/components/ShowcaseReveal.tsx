"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ShowcaseReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const isStacked = dimensions.width < 640 || dimensions.height > dimensions.width;

  // Measure the actual rendered section size, so the SVG viewBox always
  // matches the real aspect ratio — no cropping/overflow on any screen.
  useEffect(() => {
    const updateSize = () => {
      if (!sectionRef.current) return;
      const { width, height } = sectionRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Travel distance scales with section height instead of a fixed 300px
      const travel = dimensions.height * 0.9;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(textRef.current, { y: travel }, { y: -travel, ease: "none" }, 0).fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", transformOrigin: "left" },
        0
      );

      gsap.to(marqueeRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 18,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [dimensions]);

  // Font size scales relative to actual width; clamped so it's never
  // too small on tiny phones or absurdly huge on ultrawide desktops.
  const fontSize = isStacked
    ? Math.min(Math.max(dimensions.width * 0.22, 48), 160)
    : Math.min(Math.max(dimensions.width * 0.15, 80), 220);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-neutral-950"
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 z-20 h-[3px] w-full bg-neutral-800">
        <div ref={progressRef} className="h-full w-full origin-left bg-primary-400" />
      </div>

      {/* Marquee + info bar */}
      <div className="absolute top-4 left-0 right-0 z-20 flex items-center justify-between gap-4 overflow-hidden px-4 sm:px-6 lg:px-10">
        <div className="w-full overflow-hidden sm:w-1/2">
          <div ref={marqueeRef} className="flex w-max whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, i) => (
              <span
                key={i}
                className="font-label mr-4 text-[10px] tracking-wide text-neutral-400 sm:text-sm"
              >
                MOFARMS&nbsp;|&nbsp;Exotic Animal Showcase&nbsp;&nbsp;•&nbsp;&nbsp;
                MOFARMS&nbsp;|&nbsp;Exotic Animal Showcase&nbsp;&nbsp;•&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SVG viewport masking container — viewBox tracks real section size */}
      <svg
        className="h-full w-full select-none"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <mask id="text-reveal-mask">
            {/* White parts of the mask reveal the image; black parts hide it */}
            <rect width="100%" height="100%" fill="black" />
            <text
              ref={textRef}
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="white"
              fontSize={fontSize}
              fontWeight={900}
              letterSpacing={isStacked ? "-1" : "-4"}
              className="font-headline uppercase"
            >
              {isStacked ? (
                <>
                  <tspan x="50%" dy="-0.55em">
                    MOFA
                  </tspan>
                  <tspan x="50%" dy="1.1em">
                    RMS
                  </tspan>
                </>
              ) : (
                "MOFARMS"
              )}
            </text>
          </mask>
        </defs>

        {/* Completely static image pinned to the SVG stage */}
        <image
          href="/images/macaw2.png"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#text-reveal-mask)"
        />
      </svg>
    </section>
  );
}