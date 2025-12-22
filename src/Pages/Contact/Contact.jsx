import HeadTitle from "../../Components/HeadTitle";
import { FiMail, FiPhone } from "react-icons/fi";
import {
  FaLinkedinIn,
  FaGithub,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaDribbble,
  FaBehance,
} from "react-icons/fa";

const Contact = () => {
  const socialLinks = [
    {
      id: 1,
      name: "LinkedIn",
      link: "https://linkedin.com",
      icon: <FaLinkedinIn className="text-white text-lg" />,
    },
    {
      id: 2,
      name: "GitHub",
      link: "https://github.com",
      icon: <FaGithub className="text-white text-lg" />,
    },
    {
      id: 3,
      name: "Facebook",
      link: "https://facebook.com",
      icon: <FaFacebookF className="text-white text-lg" />,
    },
    {
      id: 4,
      name: "Twitter",
      link: "https://twitter.com",
      icon: <FaTwitter className="text-white text-lg" />,
    },
    {
      id: 5,
      name: "Instagram",
      link: "https://instagram.com",
      icon: <FaInstagram className="text-white text-lg" />,
    },
    {
      id: 6,
      name: "YouTube",
      link: "https://youtube.com",
      icon: <FaYoutube className="text-white text-lg" />,
    },
    {
      id: 7,
      name: "WhatsApp",
      link: "https://wa.me/8801806116522",
      icon: <FaWhatsapp className="text-white text-lg" />,
    },
    {
      id: 8,
      name: "Dribbble",
      link: "https://dribbble.com",
      icon: <FaDribbble className="text-white text-lg" />,
    },
    {
      id: 9,
      name: "Behance",
      link: "https://behance.net",
      icon: <FaBehance className="text-white text-lg" />,
    },
  ];

  const contactInfo = [
    {
      id: 1,
      label: "Email",
      value: "kamrul116522@gmail.com",
      icon: <FiMail className="text-[#32e6e2]" size={28} />,
    },
    {
      id: 2,
      label: "Phone",
      value: "+8801806116522",
      icon: <FiPhone className="text-[#32e6e2]" size={28} />,
    },
    {
      id: 3,
      label: "WhatsApp",
      value: "+8801806116522",
      icon: <FaWhatsapp className="text-[#32e6e2]" size={28} />,
    },
  ];

  const inputBox = `w-full border px-4 py-3 rounded-md outline-none border-primary/20 focus:border-primary transition-all`;
  return (
    <section>
      <title>ThreadMart | Contact Us</title>

      <HeadTitle className={"!mt-0"}>Contact Us</HeadTitle>

      <div className="flex flex-col-reverse sm:flex-row gap-10">
        <div className="">
          <h4 className="text-primary font-semibold text-xl">Let's Connect</h4>
          <p className="text-gray-400 leading-relaxed">
            Whether you are sourcing garments, exploring a partnership, or need
            support — our team is ready to assist you with quick and
            professional communication.
          </p>

          <div>
            {contactInfo.map((item) => (
              <div className="bg-primary/10 p-4 rounded-2xl mt-2 flex  gap-3 items-center hover:scale-105 duration-300 hover:shadow-lg shadow-primary/20">
                <p>{item.icon}</p>
                <div>
                  <p className="text-sm text-gray-400">{item.label}</p>
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-[#32e6e2] mb-4">
              Connect With Me
            </h3>

            <div className="flex items-center gap-4 flex-wrap">
              {socialLinks.map((item) => (
                <a
                  href={item.link}
                  key={item.id}
                  className="hover:scale-105 duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="bg-primary/10 p-8 shadow-md border rounded-lg border-primary/50 text-white">
          <h3 className="text-xl font-semibold mb-6">Send a Message</h3>

          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className={inputBox} />

            <input type="email" placeholder="Your Email" className={inputBox} />

            <input type="text" placeholder="Subject" className={inputBox} />

            <textarea
              placeholder="Your Message"
              rows="5"
              className={inputBox}
            ></textarea>

            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
