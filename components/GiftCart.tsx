import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function GiftCard({
  bankName,
  accNumber,
  accHolder,
}: {
  bankName: string;
  accNumber: string;
  accHolder: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(accNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="relative group p-10 rounded-[40px] overflow-hidden"
    >
      {/* Glass Effect Layer */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl border border-white/30 rounded-[40px] shadow-2xl transition-all duration-500 group-hover:bg-white/20" />

      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Nama Bank */}
        <p className="text-[10px] tracking-[0.6em] uppercase font-bold text-[#8BA88E]">
          {bankName}
        </p>

        {/* Nomor Rekening */}
        <div className="space-y-1">
          <h3 className="text-2xl md:text-3xl font-sans tracking-widest text-[#4A5D4E]">
            {accNumber}
          </h3>
          <p className="text-[11px] uppercase tracking-widest opacity-40 italic">
            a.n {accHolder}
          </p>
        </div>

        {/* Tombol Copy (Modern Style) */}
        <button
          onClick={handleCopy}
          className="relative px-8 py-3 rounded-full overflow-hidden group/btn"
        >
          {/* Background Button Glow */}
          <div className="absolute inset-0 bg-[#4A5D4E] opacity-10 group-hover/btn:opacity-100 transition-all duration-500" />

          <span
            className={`relative z-10 text-[9px] uppercase tracking-[0.3em] font-bold transition-colors duration-500 ${copied ? "text-[#8BA88E]" : "text-[#4A5D4E] group-hover/btn:text-[#F4F7F5]"}`}
          >
            {copied ? "Berhasil Disalin" : "Salin Rekening"}
          </span>

          {/* Animasi Partikel Kecil saat Copied */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#8BA88E]/20 rounded-full"
              />
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Aksen Garis Estetik di kartu */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-[#8BA88E]/20 rounded-br-[40px]" />
    </motion.div>
  );
}
