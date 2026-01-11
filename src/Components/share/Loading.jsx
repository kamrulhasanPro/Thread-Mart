import { motion } from "framer-motion";

export default function Loading({ className }) {
  const dots = Array(5).fill(0);

  return (
    <div
      className={`flex gap-2 items-center justify-center h-full ${className}`}
    >
      {dots.map((_, i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: ["#32e6e2", "#9b5de5", "#ff7a5c", "#baff29"][
              i % 4
            ],
          }}
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}
