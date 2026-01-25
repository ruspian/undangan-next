import { motion } from "framer-motion";
export default function CountdownItem({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center min-w-15 md:min-w-20">
      {/* Container Angka dengan efek blur tipis di background agar elegan */}
      <div className="relative">
        <motion.span
          key={value} // Key ini penting biar ada animasi tiap angkanya berubah
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl md:text-5xl font-serif italic text-[#4A5D4E] block"
        >
          {value.toString().padStart(2, "0")}
        </motion.span>
      </div>

      {/* Label Keterangan */}
      <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-[#8BA88E] mt-2 font-light">
        {label}
      </span>

      {/* Garis dekoratif kecil di bawah label */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "20%" }}
        className="h-px bg-[#8BA88E]/30 mt-1"
      />
    </div>
  );
}
