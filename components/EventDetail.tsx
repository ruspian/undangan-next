"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";

type EventDetailProps = {
  title: string;
  time: string;
  date: string;
  loc: string;
  linkMaps?: string;
  day?: string;
};

export default function EventDetail({
  title,
  day,
  date,
  time,
  loc,
  linkMaps,
}: EventDetailProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.1);
    y.set((e.clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className="relative group p-6 md:p-12" // Padding luar untuk area hover
    >
      {/* 🧊 SATU-SATUNYA KOTAK: ULTRA GLASS 🧊 */}
      <div className="absolute inset-0 bg-white/2 backdrop-blur-[6px] rounded-[50px] border border-white/10 transition-all duration-700 group-hover:bg-white/5 group-hover:border-white/20 shadow-none" />

      {/* Konten bener-bener polos tanpa pembungkus div extra yang punya style */}
      <div className="relative z-10">
        {/* JUDUL */}
        <div className="mb-10 overflow-hidden">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="text-4xl md:text-7xl font-serif italic text-[#4A5D4E] mx-2 leading-tight">
              {title}
            </h4>

            {/* ANIMASI HARI */}
            <div className="flex items-center gap-4 mt-4 overflow-hidden">
              {/* Garis yang memanjang */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="h-px bg-[#8BA88E]/40"
              />

              {/* Teks hari yang muncul dari samping garis */}
              <motion.span
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                className="text-[10px] tracking-[0.8em] uppercase text-[#8BA88E] font-medium"
              >
                {day}
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/*  FLOATING TEXT */}
        <div className="space-y-12 bg-transparent shadow-none border-none">
          <div className="space-y-1">
            <p className="text-md tracking-[0.4em] font-signature opacity-40">
              The Date
            </p>
            <div className="flex flex-wrap items-baseline">
              <p className="text-xl md:text-4xl font-bold">{date}</p>
              <p className="text-sm font-light text-[#8BA88E] uppercase">
                Pukul {time}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-[#8BA88E] animate-ping" />
              <p className="text-[10px] uppercase tracking-[0.4em] opacity-40">
                Lokasi
              </p>
            </div>
            <p className="text-sm md:text-base leading-relaxed font-light text-[#4A5D4E]/80 max-w-sm">
              {loc}
            </p>
          </div>
        </div>

        {/* TOMBOL NAVIGASI */}
        <div className="mt-12">
          <motion.a
            href={linkMaps}
            target="_blank"
            whileHover={{ x: 10 }}
            className="inline-flex items-center gap-6 group/btn"
          >
            <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#4A5D4E] border-b border-transparent group-hover/btn:border-[#4A5D4E] transition-all pb-1">
              Lihat Lokasi
            </span>
            <div className="w-10 h-10 rounded-full border border-[#4A5D4E]/20 flex items-center justify-center transition-all group-hover/btn:bg-[#4A5D4E] group-hover/btn:text-white">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1 11L11 1M11 1H1M11 1V11"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
