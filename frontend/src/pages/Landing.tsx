import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Link as LinkIcon, Key, Settings } from "lucide-react";

export default function LandingPage() {
  const [value, setValue] = useState("");

  return (
    <div className="w-full">
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className=" shadow-sm"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-bold text-xl text-foreground">
            TinyUrl.
          </a>

          <nav className="flex gap-4 items-center">
            <a href="#why" className="px-3 py-1 text-muted">
              Why briefly?
            </a>

            <a href="#features" className="px-3 py-1 text-muted">
              Features
            </a>

            <a href="#contact" className="px-3 py-1 text-muted">
              Contact Us
            </a>

            <a
              href="/login"
              className="ml-4 inline-flex px-4 py-2  border 
              border-purple-200 rounded-full text-sm shadow-sm hover:bg-purple-50"
            >
              Login
            </a>
          </nav>
        </div>
      </motion.header>

      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r 
          from-[#0a1020] to-[#121b33] text-white shadow-xl"
        >
          <motion.img
            src="https://ik.imagekit.io/pavanagulla19/hero_bg.jpg"
            alt="hero"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2 }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />

          <div className="relative z-10 px-6 md:px-12 py-24">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="text-center text-4xl md:text-5xl font-bold"
            >
              URL Shortener
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-center mt-4 text-md md:text-lg text-purple-100 max-w-2xl mx-auto"
            >
              Clean. Fast. Reliable. Paste your long URL and shorten it
              instantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.35 }}
              className="absolute left-1/2 -bottom-6 w-[60%] h-24 blur-3xl 
                rounded-full bg-purple-600/20 transform -translate-x-1/2"
            />

            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-3xl mx-auto mt-12"
            >
              <div className=" rounded-full shadow-lg flex overflow-hidden border">
                <div className="px-5 flex items-center text-sm text-gray-500 /80 rounded-l-full flex-1 border-r">
                  briefly.link/
                  <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="flex-1 px-4 py-4 bg-transparent outline-none"
                    placeholder="yourlink"
                  />
                </div>

                <Button
                  onClick={() => alert("Demo shorten: " + value)}
                  className="rounded-r-full px-8 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Shorten
                </Button>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center text-xs text-purple-200 mt-4"
              >
                Free URL shortener — secure, clean & easy to remember.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="why" className="bg-[#221B38] text-white py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h3 className="text-3xl font-semibold">
              Why Choose <span className="italic font-bold">briefly?</span>
            </h3>

            <p className="mt-6 text-sm text-gray-300 max-w-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <button className="mt-8 text-sm font-medium tracking-wide border-b-2 border-purple-300">
              LEARN MORE ABOUT US
            </button>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://via.placeholder.com/600x350"
                className="w-full h-full object-cover opacity-95"
                alt="video"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 /90 rounded-full flex items-center justify-center">
                  <Play size={30} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-20 ">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-3xl font-bold"
          >
            Features <span className="font-normal">- What We Offer</span>
          </motion.h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <LinkIcon size={32} />,
                title: "Shorten URLs",
                desc: "Lorem ipsum dolor sit amet.",
              },
              {
                icon: <Key size={32} />,
                title: "Create secure & reliable links",
                desc: "Lorem ipsum dolor sit amet.",
              },
              {
                icon: <Settings size={32} />,
                title: "Manage URLs",
                desc: "Lorem ipsum dolor sit amet.",
              },
            ].map((it, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className={`rounded-xl p-8 shadow-md transition-all ${
                  idx === 1
                    ? "bg-[#241B42] text-white"
                    : " border border-[#241B42] text-[#241B42]"
                }`}
              >
                <div className="mb-4">{it.icon}</div>
                <h4 className="font-semibold text-xl mb-3">{it.title}</h4>
                <p className="text-sm leading-relaxed">{it.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 border-t">
        <div className="container mx-auto px-6 text-sm text-muted">
          © {new Date().getFullYear()} briefly — Built with TinyLink.
        </div>
      </footer>
    </div>
  );
}
