"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { FloralBottomRight, FloralTopLeft } from "./FloralOrnament";
import CountdownItem from "./CountdownItem";

interface Leaf {
  id: number;
  size: number;
  xStart: number;
  xEnd: number;
  duration: number;
  delay: number;
  type: string;
  blur: boolean;
}

export default function Cover() {
  const [isOpen, setIsOpen] = useState(false);
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Tamu Undangan";

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const targetDate = new Date("February 8, 2026 10:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.log("Autoplay blocked:", err));
    }
  };

  useEffect(() => {
    const generate = () => {
      const generatedLeaves = [...Array(5)].map((_, i) => ({
        id: i,
        size: Math.random() * 20 + 10,
        xStart: Math.random() * 100,
        xEnd: Math.random() * 100 - 15,
        duration: 10 + Math.random() * 15,
        delay: i * 0.5,
        type: i % 2 === 0 ? "🍃" : "🌿",
        blur: i % 4 === 0,
      }));

      // Bungkus dalam requestAnimationFrame biar dieksekusi di frame berikutnya
      requestAnimationFrame(() => {
        setLeaves(generatedLeaves);
      });
    };

    generate();
  }, []);

  //  Scroll Lock
  useEffect(() => {
    document.body.style.overflow = !isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/music/wedding-song.mp3" type="audio/mpeg" />
      </audio>

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-[#F4F7F5] text-[#4A5D4E] overflow-hidden"
          >
            {/* BINGKAI POJOK & FLORAL LAYER 🌿 */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Garis Bingkai Tipis */}
              <div className="absolute inset-6 border border-[#4A5D4E]/10 pointer-events-none" />

              {/* Floral Kiri Atas */}
              <motion.div
                animate={{ rotate: [0, 3, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -top-10 -left-10 w-[80vw] md:w-150 opacity-50"
              >
                <FloralTopLeft />
              </motion.div>

              {/* Floral Kanan Bawah */}
              <motion.div
                animate={{ rotate: [0, -3, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute -bottom-10 -right-10 w-[90vw] md:w-175 opacity-50"
              >
                <FloralBottomRight />
              </motion.div>
            </div>

            {/*  RIUH HUJAN DAUN 🍃 */}
            <div className="absolute inset-0 pointer-events-none z-10">
              {leaves.map((leaf) => (
                <motion.div
                  key={leaf.id}
                  className="absolute text-[#8BA88E] opacity-20 select-none"
                  style={{
                    fontSize: `${leaf.size}px`,
                    filter: leaf.blur ? "blur(1.5px)" : "none",
                  }}
                  initial={{ y: "110vh", x: `${leaf.xStart}vw`, rotate: 0 }}
                  animate={{ y: "-20vh", rotate: 360, x: `${leaf.xEnd}vw` }}
                  transition={{
                    duration: leaf.duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: leaf.delay,
                  }}
                >
                  {leaf.type}
                </motion.div>
              ))}
            </div>

            {/* ✉️ MAIN CONTENT (CENTER) ✉️ */}
            <div className="relative z-20 text-center px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <p className="uppercase text-[10px] tracking-[0.6em] text-[#8BA88E] mb-8 font-light">
                  The Wedding of
                </p>

                <div className="mb-12">
                  <h1 className="text-6xl md:text-8xl font-serif italic leading-tight mb-2">
                    Yayan
                  </h1>
                  <span className="font-signature text-6xl md:text-8xl block text-[#8BA88E] my-2">
                    &
                  </span>
                  <h1 className="text-6xl md:text-8xl font-serif italic leading-tight">
                    Ilan
                  </h1>
                </div>

                <div className="h-px w-24 bg-[#4A5D4E]/20 mx-auto mb-12" />

                <div className="mb-14">
                  <p className="text-[11px] uppercase tracking-[0.4em] mb-3 opacity-60">
                    Dear,
                  </p>
                  <h2 className="text-3xl md:text-4xl font-serif tracking-widest text-[#4A5D4E]">
                    {guestName}
                  </h2>
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    letterSpacing: "0.3em",
                    backgroundColor: "#4A5D4E",
                    color: "#F4F7F5",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpen}
                  className="border border-[#4A5D4E] text-[#4A5D4E] px-14 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase transition-all duration-700 font-medium bg-transparent"
                >
                  Buka Undangan
                </motion.button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex justify-center gap-4 md:gap-8 mb-12 mt-20"
            >
              <CountdownItem value={timeLeft.days} label="Days" />
              <CountdownItem value={timeLeft.hours} label="Hours" />
              <CountdownItem value={timeLeft.minutes} label="Mins" />
              <CountdownItem value={timeLeft.seconds} label="Secs" />
            </motion.div>

            {/* Overlay Sejuk */}
            <div className="absolute inset-0 bg-linear-to-b from-[#F4F7F5]/50 via-transparent to-[#F4F7F5]/50 opacity-40 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
