const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18, // 🧠 smooth wow delay
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,        // 👈 comes from below
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,                 // 🧈 smooth
      ease: [0.22, 1, 0.36, 1],       // premium easing
    },
  },
};
