"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fungsi toggle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-9999">
      <audio ref={audioRef} loop autoPlay>
        <source src="/music/wedding-song.mp3" type="audio/mpeg" />
      </audio>

      <motion.button
        onClick={togglePlay}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-[#4A5D4E] shadow-lg overflow-hidden relative"
      >
        {/* Efek Piringan Hitam Berputar */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-dashed border-[#8BA88E]/20 rounded-full"
        />

        {/* Ikon Play/Pause */}
        <span className="relative z-10 text-xl">{isPlaying ? "🎵" : "🔇"}</span>
      </motion.button>

      {/* Label "Music On" yang muncul ilang */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute left-16 top-1/2 -translate-y-1/2 bg-white/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-[#4A5D4E] border border-white/20 whitespace-nowrap pointer-events-none"
          >
            Now Playing
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
