"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, X } from "lucide-react";
import Link from "next/link";

const WHATSAPP_NUMBER = "2348136208714"; 
const EMAIL_ADDRESS = "mofarms.ng@gmail.com";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col items-end gap-3"
          >
            {/* Email */}
            <Link
              href={`mailto:${EMAIL_ADDRESS}`}
              className="group flex items-center gap-3 rounded-full border border-primary-500/40 bg-primary-500/10 py-3 pl-5 pr-3 backdrop-blur-md transition-colors hover:bg-primary-500/20"
            >
              <span className="font-body text-sm text-neutral-100 transition-opacity opacity-100">
                Email Us
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white">
                <Mail className="h-5 w-5" />
              </span>
            </Link>

            {/* WhatsApp */}
            <Link
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-full border border-primary-500/40 bg-primary-500/10 py-3 pl-5 pr-3 backdrop-blur-md transition-colors hover:bg-primary-500/20"
            >
              <span className="font-body text-sm text-neutral-100 transition-opacity opacity-100">
                WhatsApp
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                <MessageCircle className="h-5 w-5" />
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileTap={{ scale: 0.92 }}
        aria-label={isOpen ? "Close contact options" : "Open contact options"}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-primary-500/40 bg-primary-500 text-white shadow-lg shadow-primary-950/40 transition-colors hover:bg-primary-600"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}