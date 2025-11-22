import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function WhyChoose() {
  return (
    <section className="bg-[#221B38] text-white py-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1"
        >
          <h3 className="text-3xl font-semibold leading-tight">
            Why Choose <span className="italic font-bold">briefly?</span>
          </h3>

          <p className="mt-6 text-sm leading-relaxed text-gray-300 max-w-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            nisl diam elit, enim sit tristique. Vitae scelerisque augue cursus
            in elementum non vulputate massa velit. Vulputate mus rhoncus id
            mauris sed ultricies aliquet purus. Amet tellus, sit eget ac nec
            vivamus urna. Integer sagittis, pellentesque sagittis et non diam
            duis. Fringilla nunc feugiat consequat et quam imperdiet. Quis non
            dictumst amet lobortis quam porta facilisi.
          </p>

          <button className="mt-8 text-sm font-medium tracking-wide flex items-center gap-2 text-white relative group">
            <span className="border-b-2 border-purple-300 group-hover:border-white transition-all pb-0.5">
              LEARN MORE ABOUT US
            </span>
          </button>
        </motion.div>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden shadow-lg">
            <img
              src={"/mnt/data/c174a18a-51fa-4aa2-867e-895c8a297e6c.png"}
              alt="video placeholder"
              className="w-full h-full object-cover opacity-95"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 /90 rounded-full shadow-md flex items-center justify-center hover:scale-105 transition">
                <Play className="text-black" size={30} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
