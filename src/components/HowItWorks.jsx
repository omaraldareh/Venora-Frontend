import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import explore from "../assets/images/Expolre.png";
import customize from "../assets/images/Customize.png";
import celebrate from "../assets/images/Celebrate.png";

const HowItWorks = () => {
  const Data = [
    {
      image: explore,
      title: "Explore & Discover",
      description: "Discover Jordan’s finest premium venues and unique event spaces.",
    },
    {
      image: customize,
      title: "Customize Your Experience",
      description: "Customize every detail to match your perfect experience.",
    },
    {
      image: celebrate,
      title: "Celebrate Your Moment",
      description: "Enjoy a beautifully crafted and unforgettable celebration.",
    },
  ];

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-linear-to-b from-white via-[#fafafa] to-white py-32 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-[#d4af37]/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-24"
        >
          <div className="flex items-center gap-2 mb-5 bg-white shadow-sm border border-gray-100 px-5 py-2 rounded-full">
            <Sparkles size={16} className="text-[#d4af37]" />
            <span className="text-sm tracking-[3px] uppercase text-gray-500">
              Simple Process
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            How It <span className="text-[#d4af37]">Works</span>
          </h2>

          <p className="mt-6 max-w-2xl text-gray-500 leading-relaxed text-base md:text-lg">
            Plan your perfect event experience in just a few elegant and seamless steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {Data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.015,
                rotateX: 1,
                rotateY: -1,
                transition: {
                  duration: 0.18,
                  ease: "easeOut",
                },
              }}
              style={{
                willChange: "transform",
              }}
              className="group relative bg-white/80 backdrop-blur-xl rounded-[30px] p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-linear-to-br from-[#d4af37]/5 via-transparent to-transparent" />

              <div className="absolute top-6 right-6 text-5xl font-bold text-gray-100">
                0{index + 1}
              </div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  rotate: 2,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="relative z-10"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-3xl mb-8 shadow-md"
                />
              </motion.div>

              <h4 className="relative z-10 text-2xl font-semibold text-gray-900 mb-4">
                {item.title}
              </h4>

              <p className="relative z-10 text-gray-500 leading-relaxed text-sm md:text-base">
                {item.description}
              </p>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "40%" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className="h-0.5 bg-[#d4af37] mt-8 rounded-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;