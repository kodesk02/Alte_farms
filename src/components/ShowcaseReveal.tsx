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
  const isStacked =
    dimensions.width < 640 || dimensions.height > dimensions.width;

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
          end: "+=100%",
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(
        textRef.current,
        { y: travel },
        { y: -travel, ease: "none" },
        0,
      ).fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", transformOrigin: "left" },
        0,
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
      className="relative h-screen w-full overflow-hidden"
    >
      {/* SVG viewport masking container — viewBox tracks real section size */}
      <svg
        className="h-full w-full select-none"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="image-blur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        {/* Completely static image pinned to the SVG stage */}
        <foreignObject width="100%" height="100%">
          <video
            width="100%"
            height="100%"
            className="h-full w-full object-cover"
            style={{ filter: "blur(8px)" }}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/mofarms.mp4" type="video/mp4" />
          </video>
        </foreignObject>

        {/* Text sits on top of the image, no mask */}
        <text
          ref={textRef}
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#459336"
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
      </svg>
    </section>
  );
}
