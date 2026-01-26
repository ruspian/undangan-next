"use client";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  Variants,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FloralBottomRight, FloralTopLeft } from "./FloralOrnament";
import EventDetail from "./EventDetail";
import GiftCard from "./GiftCart";

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

export default function MainContent() {
  const containerRef = useRef(null);
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const flowerY1 = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const flowerY2 = useTransform(smoothProgress, [0, 1], ["0%", "-80%"]);
  const rotateFlower = useTransform(smoothProgress, [0, 1], [0, 90]);
  const scaleHero = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);
  const opacityHero = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const generate = () => {
      const generatedLeaves = [...Array(10)].map((_, i) => ({
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 100, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div
      ref={containerRef}
      className="bg-[#F4F7F5] relative min-h-screen overflow-hidden text-[#4A5D4E]"
    >
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          style={{ y: flowerY1, rotate: rotateFlower }}
          className="absolute -top-20 -left-20 w-[80vw] md:w-150 opacity-10"
        >
          <FloralTopLeft />
        </motion.div>

        {/* MAP DAUN DI SINI (Dulu hilang, sekarang sudah balik) */}
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            className="absolute text-[#8BA88E] opacity-10 select-none"
            style={{ fontSize: `${leaf.size}px` }}
            initial={{ y: "110vh", x: `${leaf.xStart}vw`, rotate: 0 }}
            animate={{ y: "-10vh", rotate: 360 }}
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

        <motion.div
          style={{ y: flowerY2, rotate: rotateFlower }}
          className="absolute -bottom-40 -right-20 w-[90vw] md:w-175 opacity-10"
        >
          <FloralBottomRight />
        </motion.div>
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="h-screen flex items-center justify-center px-6 text-center">
          <motion.div style={{ scale: scaleHero, opacity: opacityHero }}>
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 0.6, letterSpacing: "0.8em" }}
              transition={{ duration: 2 }}
              className="text-[10px] uppercase mb-8"
            >
              Wedding Of
            </motion.p>
            <h1 className="text-7xl md:text-9xl font-serif italic leading-tight overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1 }}
                className="block"
              >
                Yayan
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="font-signature text-5xl md:text-7xl block text-[#8BA88E] my-4 italic"
              >
                dan
              </motion.span>
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="block"
              >
                Ilan
              </motion.span>
            </h1>
          </motion.div>
        </section>

        {/* SECTION: QUOTE / KATA-KATA */}
        <section className="py-40 px-6 relative overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Ikon Floral Kecil di Atas Quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="mb-12 text-[#8BA88E] opacity-40 text-3xl"
            >
              ❤️
            </motion.div>

            <div className="space-y-8">
              {/* Teks Utama dengan Animasi Reveal */}
              <motion.p
                variants={itemVariants}
                className="font-serif italic text-2xl md:text-4xl leading-relaxed text-[#4A5D4E]/90"
              >
                &quot;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia
                menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya
                kamu cenderung dan merasa tenteram kepadanya.&quot;
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center gap-4 opacity-60"
              >
                <div className="h-px w-8 bg-[#4A5D4E]/30" />
                <span className="text-[10px] uppercase tracking-[0.5em] font-medium">
                  Ar-Rum 21
                </span>
                <div className="h-px w-8 bg-[#4A5D4E]/30" />
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-sm md:text-lg font-light leading-relaxed max-w-2xl mx-auto text-[#4A5D4E]/80 pt-8 px-4"
              >
                Tanpa mengurangi rasa hormat, kami bermaksud mengundang
                Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada
                hari bahagia pernikahan kami.
              </motion.p>
            </div>

            {/* Hiasan Garis Vertikal Mengalir ke Bawah */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: 80 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="w-px bg-linear-to-b from-[#8BA88E]/40 to-transparent mx-auto mt-16"
            />
          </motion.div>

          {/* Aksen Daun Melayang Khusus di Section ini */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-10 md:right-40 text-2xl opacity-10 pointer-events-none"
          >
            🍃
          </motion.div>
        </section>

        {/*  MEMPELAI  */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-40 px-6 max-w-7xl mx-auto relative overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32 md:gap-12 items-center relative">
            {/* Mempelai Pria */}
            <motion.div variants={itemVariants} className="relative group">
              {/* Inisial dengan Parallax - Gerak ke atas pas scroll */}
              <motion.span
                style={{ y: useTransform(smoothProgress, [0, 1], [0, -100]) }}
                className="absolute -top-32 -left-16 text-[20rem] font-serif italic opacity-[0.04] select-none pointer-events-none text-[#4A5D4E]"
              >
                Y
              </motion.span>

              <div className="relative z-10 pl-6 md:pl-12 border-l-2 border-[#8BA88E]/20">
                <div className="overflow-hidden">
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 0.6 }}
                    transition={{ duration: 0.8 }}
                    className="text-[10px] uppercase tracking-[0.8em] text-[#4A5D4E] mb-8"
                  >
                    Mempelai Pria
                  </motion.p>
                </div>

                <h2 className="text-4xl md:text-6xl font-serif italic mb-8 leading-[0.8] overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    Yayan
                  </motion.span>
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="block text-[#8BA88E] mt-2 mb-4"
                  >
                    Pilobu, S.Pd., Gr
                  </motion.span>
                </h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="space-y-2"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">
                    Anak kedua dari
                  </p>
                  <p className="text-xl md:text-3xl font-light italic text-[#4A5D4E] leading-tight">
                    Bapak Adnan Pilobu <br /> & Ibu Rawa Moha
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Mempelai Wanita */}
            <motion.div
              variants={itemVariants}
              className="relative group flex flex-col items-end text-right md:mt-48"
            >
              {/*  Inisial dengan Parallax - Gerak ke bawah pas scroll */}
              <motion.span
                style={{ y: useTransform(smoothProgress, [0, 1], [0, 100]) }}
                className="absolute -bottom-32 -right-16 text-[20rem] font-serif italic opacity-[0.04] select-none pointer-events-none text-[#4A5D4E]"
              >
                S
              </motion.span>

              <div className="relative z-10 pr-6 md:pr-12 border-r-2 border-[#8BA88E]/20">
                <div className="overflow-hidden">
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 0.6 }}
                    transition={{ duration: 0.8 }}
                    className="text-[10px] uppercase tracking-[0.8em] text-[#4A5D4E] mb-8"
                  >
                    Mempelai Wanita
                  </motion.p>
                </div>

                <h2 className="text-4xl md:text-6xl font-serif italic mb-8 leading-[0.8] overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    Srilaningsih
                  </motion.span>
                  <motion.span
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="block text-[#8BA88E] mt-2 mb-4"
                  >
                    Suleman Hasan, S.Pd., Gr
                  </motion.span>
                </h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="space-y-2"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">
                    Anak pertama dari
                  </p>
                  <p className="text-xl md:text-3xl font-light italic text-[#4A5D4E] leading-tight">
                    Bapak Suleman Hasan <br /> & Ibu Saida Lasena
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/*Garis Tengah Interaktif */}
          <motion.div
            style={{ scaleY: smoothProgress }}
            className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[80%] bg-linear-to-b from-transparent via-[#8BA88E]/40 to-transparent origin-center"
          />
        </motion.section>

        {/* SECTION: EVENT */}
        <section className="py-40 px-6">
          <motion.div
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2 }}
            className="max-w-5xl mx-auto p-12 md:p-24 bg-white/20 backdrop-blur-2xl rounded-[60px] border border-white/50 shadow-[0_40px_100px_rgba(0,0,0,0.05)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div className="space-y-8 text-[#4A5D4E]">
                <h3 className="text-5xl font-serif italic tracking-tighter">
                  The Ceremony
                </h3>
                <div className="h-px w-20 bg-[#4A5D4E]/30" />
                <p className="opacity-70 leading-relaxed font-light italic text-xl">
                  &quot;Dalam keheningan doa dan restu alam, kami memulai
                  perjalanan abadi.&quot;
                </p>
              </div>
              <div className="grid grid-cols-1  gap-8 md:gap-12 items-start">
                <EventDetail
                  title="Akad Nikah"
                  day="Minggu"
                  date="08 Februari 2026"
                  time="10:00 WITA "
                  loc="Kediaman Mempelai Wanita, Dusun Nangka Desa Lembah Permai, Kec. Wanggarasi, Kab. Pohuwato"
                  linkMaps="https://maps.app.goo.gl/jSzEnet3E1HG1JuV9"
                />

                <EventDetail
                  title="Resepsi"
                  day="Minggu"
                  date="08 Februari 2026"
                  time="19:00 WITA"
                  loc="Kediaman Mempelai Wanita, Dusun Nangka Desa Lembah Permai, Kec. Wanggarasi, Kab. Pohuwato"
                  linkMaps="https://maps.app.goo.gl/jSzEnet3E1HG1JuV9"
                />
              </div>
            </div>
          </motion.div>
        </section>

        <section className="py-40 px-6 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="max-w-4xl mx-auto text-center relative"
          >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="mb-20 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.8em] text-[#8BA88E]">
                Wedding Gift
              </span>
              <h2 className="text-5xl md:text-7xl font-serif italic text-[#4A5D4E]">
                Tanda Kasih
              </h2>
              <p className="text-sm font-light opacity-60 italic max-w-lg mx-auto leading-relaxed">
                Doa restu Anda adalah kado terindah. Namun, bagi Anda yang ingin
                memberikan tanda kasih, dapat melalui nomor rekening di bawah
                ini:
              </p>
            </motion.div>

            {/* GRID KARTU REKENING */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <GiftCard
                bankName="BANK BSG"
                accNumber="01002060153684"
                accHolder="YAYAN PILOBU"
              />

              <GiftCard
                bankName="BANK MANDIRI"
                accNumber="04002090012815"
                accHolder="SRILANINGSIH S. HASAN"
              />
            </div>

            {/* Aksen Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#8BA88E]/5 blur-[120px] -z-10 rounded-full" />
          </motion.div>
        </section>

        {/* ---  UCAPAN TERIMA KASIH --- */}
        <section className="min-h-[60vh] flex items-center justify-center px-6 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <p className="text-lg md:text-2xl font-serif italic text-[#4A5D4E]/70 leading-relaxed px-4">
              &quot;Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
              Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada
              kedua mempelai.&quot;
            </p>
            <div className="overflow-hidden">
              <motion.h3
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-5xl md:text-7xl font-serif italic text-[#4A5D4E]"
              >
                Terima Kasih
              </motion.h3>
            </div>
          </motion.div>
        </section>

        {/* ---  TURUT MENGUNDANG  --- */}
        <section className="py-32 px-6 relative bg-white/2 backdrop-blur-3xl border-y border-[#4A5D4E]/5">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center gap-6 mb-16">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 60 }}
                  className="h-px bg-[#8BA88E]/40"
                />
                <span className="text-[11px] uppercase text-center tracking-[0.8em] text-[#8BA88E] font-bold">
                  Turut Mengundang
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 60 }}
                  className="h-px bg-[#8BA88E]/40"
                />
              </div>

              <div className="grid grid-cols-1   gap-4 text-center">
                {[
                  "Keluarga Besar Pilobu & Moha",
                  "Keluarga Besar Hasan & Lasena",
                  "Keluarga Besar Abusali & Karim",
                  "Keluarga Besar Puluhulawa",
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    whileHover={{ scale: 1.1, color: "#8BA88E" }}
                    className="group cursor-default"
                  >
                    <p className="text-sm text-center font-light italic tracking-wide text-[#4A5D4E]/60 group-hover:opacity-100 transition-all">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---  FOOTER --- */}
        <section className="h-screen flex flex-col items-center justify-center px-6 relative">
          {/* Ornamen Background yang Berputar Pelan */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute z-100 w-[150vw] md:w-250 opacity-[0.03] pointer-events-none"
          >
            <FloralBottomRight />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            className="relative z-10 text-center space-y-12"
          >
            <motion.p
              variants={itemVariants}
              className="text-[11px] uppercase tracking-[1.2em] text-[#8BA88E] font-medium opacity-60 text-center"
            >
              Kami yang berbahagia
            </motion.p>

            <div className="space-y-4">
              <motion.h2
                variants={itemVariants}
                className="text-5xl md:text-6xl font-serif italic text-[#4A5D4E] leading-tight"
              >
                Yayan
                <br className="md:hidden" />
                <span className="font-signature text-5xl md:text-7xl text-[#8BA88E] not-italic mx-4">
                  &
                </span>
                Ilan
              </motion.h2>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 2, ease: "circOut" }}
                className="h-px w-full max-w-md mx-auto bg-linear-to-r from-transparent via-[#8BA88E]/50 to-transparent"
              />
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
