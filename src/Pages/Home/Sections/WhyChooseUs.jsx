import { motion } from "framer-motion";
import HeadTitle from "../../../Components/HeadTitle";
import { FaTshirt, FaTags, FaTruck, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Premium Quality",
      desc: "High-quality fabrics for comfort and durability.",
      icon: <FaTshirt />,
      color: "text-indigo-500", // quality / fabric feel
    },
    {
      title: "Best Price",
      desc: "Affordable prices without compromising quality.",
      icon: <FaTags />,
      color: "text-green-500", // money / savings
    },
    {
      title: "Fast Delivery",
      desc: "Quick and reliable delivery across Bangladesh.",
      icon: <FaTruck />,
      color: "text-orange-500", // speed / movement
    },
    {
      title: "24/7 Support",
      desc: "Always here to help with your orders.",
      icon: <FaHeadset />,
      color: "text-blue-500", // trust / support
    },
  ];

  return (
    <section>
      <>
        <HeadTitle className="text-3xl font-bold text-center mb-4">
          Why Choose Us
        </HeadTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, i) => (
            <motion.div
              whileHover={"hover"}
              key={i}
              className="bg-secondary flex sm:flex-col  gap-4 p-6 rounded-xl shadow hover:shadow-lg hover:scale-105 duration-300 transition"
            >
              <motion.div
                variants={{
                  hover: {
                    y: -10,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                    },
                  },
                }}
                className={`text-4xl ${item.color}  flex items-center`}
              >
                {item.icon}
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </>
    </section>
  );
};

export default WhyChooseUs;
