"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Link, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

export function Hero() {
  const router = useRouter();

  const handleWhatsAppRedirect = () => {
    window.open ("https://wa.me/2348136208714", "_blank", "noopener,noreferrer");
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950">
      {/* Full-bleed background image, blurred + darkened */}

      <div className="absolute inset-0">
        <Image
          src="/images/macaw2.png"
          alt=""
          fill
          priority
          className="object-cover blur-[2px] scale-110"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Foreground content */}
      <div className="relative z-20 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <motion.span
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="font-label mb-6 inline-block rounded-full border border-primary-500/40 bg-primary-500/10 px-4 py-1.5 text-xs tracking-wide text-primary-300"
        >
          LIVE SANCTUARY EXPERIENCE
        </motion.span>

        <motion.h1
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="font-headline text-6xl font-extrabold leading-[1.05] text-neutral-50 lg:text-7xl"
        >
          Experience
          <br />
          the <span className="text-primary-400">Exotic</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
          className="font-body mt-6 max-w-xl text-lg text-neutral-300"
        >
          Discover our curated collection of majestic creatures. A premium
          sanctuary dedicated to preservation, natural habitat recreation, and
          breathtaking beauty.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            onClick={() => router.push("/gallery")}
            className="group h-14 rounded-full bg-secondary-500 px-8 text-base hover:bg-secondary-600"
          >
            Explore Collection
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button
            variant="outline"
            className="h-14 rounded-full border-neutral-700 bg-neutral-900/60 px-8 text-base text-neutral-100 backdrop-blur-md hover:bg-neutral-800"
            onClick={handleWhatsAppRedirect}
          >
              <MessageCircle className="mr-2 h-5 w-5 text-primary-400" />
              Chat via WhatsApp
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
