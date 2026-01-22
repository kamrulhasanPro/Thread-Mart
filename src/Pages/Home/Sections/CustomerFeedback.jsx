import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import HeadTitle from "../../../Components/share/HeadTitle";
import { motion } from "framer-motion";
const CustomerFeedback = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rahim Ahmed",
      role: "Factory Owner",
      text: "This platform made bulk order management smooth and transparent. Highly recommended!",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      role: "Production Manager",
      text: "Tracking production stages is now super easy. The dashboard is a lifesaver!",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Shakib Khan",
      role: "Supply Chain Officer",
      text: "Modern UI and useful features make factory workflows efficient.",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      id: 4,
      name: "Farhana Akter",
      role: "Merchandiser",
      text: "Dashboard insights and delivery tracking improved client satisfaction greatly.",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: 5,
      name: "Tariq Islam",
      role: "Quality Manager",
      text: "Quality checks are easy to manage now, ensuring our garments meet high standards.",
      image: "https://randomuser.me/api/portraits/men/27.jpg",
    },
    {
      id: 6,
      name: "Sohana Rahman",
      role: "Logistics Coordinator",
      text: "Real-time delivery updates help us plan shipments efficiently. Love this system!",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
      id: 7,
      name: "Imran Hossain",
      role: "Buyer",
      text: "Ordering in bulk is now faster and transparent. I can track my orders easily.",
      image: "https://randomuser.me/api/portraits/men/33.jpg",
    },
    {
      id: 8,
      name: "Rina Akter",
      role: "Accountant",
      text: "Automated invoices and payments save us a lot of time. Very reliable platform!",
      image: "https://randomuser.me/api/portraits/women/48.jpg",
    },
  ];

  return (
    <section className="mt-10 space-y-7">
      <HeadTitle>Customer Feedback</HeadTitle>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={1500}
          loop={true}
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-secondary text-white p-6 rounded-3xl shadow-xl border border-secondary text-center transition duration-500  hover:shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_25px_rgba(50,230,226,0.3)] hover:border-primary">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 mx-auto rounded-full border-4 border-primary object-cover"
                />
                <p className="mt-6 text-lg italic text-gray-300 grow">
                  {item.text.length < 60
                    ? `“${item.text}”`
                    : `“${item.text.slice(0, 60)}...more”`}
                </p>
                <h3 className="mt-5 text-xl font-bold text-primary">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-400">{item.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default CustomerFeedback;
