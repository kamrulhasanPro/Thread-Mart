import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import HeadTitle from "../../../Components/HeadTitle";

const CustomerFeedback = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rahim Ahmed",
      role: "Factory Owner",
      text: "This platform made bulk order management smooth and transparent. Highly recommended!",
      image: "https://i.ibb.co/6W8bVhZ/user1.png",
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      role: "Production Manager",
      text: "Tracking production stages is now super easy. The dashboard is a lifesaver!",
      image: "https://i.ibb.co/2v2F0Yp/user2.png",
    },
    {
      id: 3,
      name: "Shakib Khan",
      role: "Supply Chain Officer",
      text: "Modern UI and useful features make factory workflows efficient.",
      image: "https://i.ibb.co/Fh8qB5S/user3.png",
    },
    {
      id: 4,
      name: "Farhana Akter",
      role: "Merchandiser",
      text: "Dashboard insights and delivery tracking improved client satisfaction greatly.",
      image: "https://i.ibb.co/9YwK7nF/user4.png",
    },
    {
      id: 5,
      name: "Tariq Islam",
      role: "Quality Manager",
      text: "Quality checks are easy to manage now, ensuring our garments meet high standards.",
      image: "https://i.ibb.co/2nZkFhH/user5.png",
    },
    {
      id: 6,
      name: "Sohana Rahman",
      role: "Logistics Coordinator",
      text: "Real-time delivery updates help us plan shipments efficiently. Love this system!",
      image: "https://i.ibb.co/3N6RtLf/user6.png",
    },
    {
      id: 7,
      name: "Imran Hossain",
      role: "Buyer",
      text: "Ordering in bulk is now faster and transparent. I can track my orders easily.",
      image: "https://i.ibb.co/N9vV5Y9/user7.png",
    },
    {
      id: 8,
      name: "Rina Akter",
      role: "Accountant",
      text: "Automated invoices and payments save us a lot of time. Very reliable platform!",
      image: "https://i.ibb.co/4tHf7qT/user8.png",
    },
  ];

  return (
    <section className="mt-10 space-y-7">
      <HeadTitle>Customer Feedback</HeadTitle>

      <div>
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
      </div>
    </section>
  );
};

export default CustomerFeedback;
