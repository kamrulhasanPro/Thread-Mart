import React from "react";
import HeadTitle from "../../../Components/share/HeadTitle";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const FabricTimeline = () => {
  const fabrics = ["Cotton", "Denim", "Polyester", "Silk", "Wool", "Linen"];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section className="overflow-hidden">
      {/* title */}
      <HeadTitle>Fabric & Materials</HeadTitle>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true }}
        ref={ref}
        className="flex flex-col sm:flex-row  justify-center gap-12"
      >
        {/* images */}
        <figure className="grid grid-cols-2 flex-1 gap-3 place-self-center w-full">
          <img
            src="https://i.postimg.cc/hG04nXwM/wooden-brush-4279881-1280.jpg"
            alt="coloths"
            className="row-span-2 rounded-lg hover:scale-[1.03] duration-500"
          />
          <img
            src="https://i.postimg.cc/TPc2xKSc/towel-1838210-1280.jpg"
            alt="coloths"
            className=" rounded-lg hover:scale-[1.03] duration-500"
          />
          <img
            src="https://i.postimg.cc/N0xGtKVH/yarn-9942590-1280.jpg"
            alt="coloths"
            className=" rounded-lg hover:scale-[1.03] duration-500"
          />
        </figure>

        {/* items */}
        <div className="relative flex-1">
          {/* line */}
          <div className="w-1 top-0 absolute bg-primary/50 h-full left-0">
            <motion.div style={{ height }} className="bg-secondary w-1" />
          </div>

          {/* item */}
          <div className="ml-12 flex flex-col justify-between h-full gap-5">
            {fabrics.map((fabric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false }}
                className="flex items-center gap-4"
              >
                <div className="w-6 h-6 bg-primary rounded-full" />
                <h3 className="text-xl font-semibold">{fabric}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FabricTimeline;
