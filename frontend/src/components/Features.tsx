import { motion } from "framer-motion";
import { Link as LinkIcon, Key, Settings } from "lucide-react";

const items = [
  {
    icon: <LinkIcon size={32} strokeWidth={1.5} />,
    title: "Shorten URLs",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo egestas dignissim elit dolor ullamcorper adipiscing vel.",
  },
  {
    icon: <Key size={32} strokeWidth={1.5} />,
    title: "Create secure & reliable links",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo egestas dignissim elit dolor ullamcorper adipiscing vel.",
  },
  {
    icon: <Settings size={32} strokeWidth={1.5} />,
    title: "Manage URLs",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo egestas dignissim elit dolor ullamcorper adipiscing vel.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 ">
      <div className="container mx-auto px-6">
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-bold"
        >
          Features <span className="font-normal">- What We Offer</span>
        </motion.h2>

        {/* CARDS */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center">
          {items.map((it, idx) => {
            const isSelected = idx === 1; // SELECTED CARD = ALWAYS CENTER CARD

            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.15,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.04,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                className={`
                  w-full max-w-sm rounded-xl p-8 transition-all duration-200
                  shadow-md 
                  ${
                    isSelected
                      ? "bg-[#241B42] text-white shadow-xl shadow-black/20"
                      : " border border-[#241B42] text-[#241B42]"
                  }
                `}
              >
                <div className="mb-4">{it.icon}</div>

                <h4
                  className={`font-semibold text-xl mb-3 ${
                    isSelected ? "text-white" : "text-[#241B42]"
                  }`}
                >
                  {it.title}
                </h4>

                <p
                  className={`text-sm leading-relaxed ${
                    isSelected ? "text-[#C9BEE5]" : "text-[#4A4560]"
                  }`}
                >
                  {it.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
