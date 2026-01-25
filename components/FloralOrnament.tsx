import { motion } from "framer-motion";

// Komponen Floral Rame Kiri Atas
export const FloralTopLeft = () => (
  <svg
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    {/* Batang Utama Menjuntai */}
    <motion.path
      d="M0 0C100 50 150 200 100 350"
      stroke="#4A5D4E"
      strokeWidth="0.5"
      strokeDasharray="5 5"
      opacity="0.4"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 2 }}
    />

    {/* Cluster Daun 1 */}
    <motion.path
      d="M80 120C120 100 160 140 140 180C120 220 80 200 80 120Z"
      fill="#A3B18A"
      fillOpacity="0.15"
      stroke="#4A5D4E"
      strokeWidth="0.5"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 0.6 }}
      transition={{ delay: 0.2 }}
    />

    {/* Bunga Mekar Utama */}
    {[0, 72, 144, 216, 288].map((rotate, i) => (
      <motion.path
        key={i}
        d="M200 150C230 100 270 100 300 150C270 200 230 200 200 150Z"
        fill="#E9EDC9"
        fillOpacity="0.2"
        stroke="#4A5D4E"
        strokeWidth="0.3"
        style={{ originX: "200px", originY: "150px", rotate }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
      />
    ))}

    {/* Daun-daun kecil tambahan (Biar Rame) */}
    <motion.path
      d="M50 250Q80 230 100 280"
      stroke="#4A5D4E"
      strokeWidth="0.5"
    />
    <motion.path d="M120 50Q150 30 180 80" stroke="#4A5D4E" strokeWidth="0.5" />
  </svg>
);

// Komponen Floral Rame Kanan Bawah
export const FloralBottomRight = () => (
  <svg
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    {/* Lingkaran Abstrak Layered */}
    <motion.circle
      cx="300"
      cy="300"
      r="80"
      stroke="#4A5D4E"
      strokeWidth="0.2"
      opacity="0.3"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 1.5 }}
    />
    <motion.circle
      cx="300"
      cy="300"
      r="60"
      stroke="#4A5D4E"
      strokeWidth="0.1"
      strokeDasharray="2 2"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />

    {/* Daun Lebar Modern */}
    <motion.path
      d="M400 400C300 350 250 250 200 250C150 250 100 300 0 400"
      fill="#A3B18A"
      fillOpacity="0.1"
      stroke="#4A5D4E"
      strokeWidth="0.5"
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    />

    {/* Bunga-bunga kecil menyebar */}
    {[1, 2, 3].map((_, i) => (
      <motion.circle
        key={i}
        cx={250 + i * 40}
        cy={200 + i * 30}
        r="5"
        fill="#CCD5AE"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        transition={{ delay: 1 + i * 0.2 }}
      />
    ))}
  </svg>
);
