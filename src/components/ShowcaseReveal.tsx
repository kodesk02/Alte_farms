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
      // Reduce vertical travel distance on mobile/stacked modes to keep text visible during scroll
      const travel = isStacked ? dimensions.height * 0.45 : dimensions.height * 0.7;

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

      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 18,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [dimensions, isStacked]);

  const fontSize = isStacked
    ? Math.min(Math.max(dimensions.width * 0.22, 48), 140)
    : Math.min(Math.max(dimensions.width * 0.15, 80), 220);

  // Absolute Y-center positions for multi-line layout
  const lineSpacing = fontSize * 0.45;
  const centerY = dimensions.height / 2;

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden hidden md:block"
    >
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

        <foreignObject width="100%" height="100%">
          <video
            width="100%"
            height="100%"
            className="h-full w-full object-cover"
            style={{ filter: "blur(3px)" }}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/mofarms.mp4" type="video/mp4" />
          </video>
        </foreignObject>

        <text
          ref={textRef}
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fill="#459336"
          fontSize={fontSize}
          fontWeight={900}
          letterSpacing={isStacked ? "-1" : "-4"}
          className="font-headline uppercase"
        >
          {isStacked ? (
            <>
              <tspan x="50%" y={centerY - lineSpacing} dominantBaseline="central">
                MOFA
              </tspan>
              <tspan x="50%" y={centerY + lineSpacing} dominantBaseline="central">
                RMS
              </tspan>
            </>
          ) : (
            <tspan x="50%" y="50%" dominantBaseline="central">
              MOFARMS
            </tspan>
          )}
        </text>
      </svg>
    </section>
  );
}