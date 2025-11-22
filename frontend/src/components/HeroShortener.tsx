import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroShortener() {
  const [value, setValue] = useState("");

  const submit = () => {
    alert("Demo shorten: " + value);
  };

  return (
    <section className="container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0a1020] to-[#121b33] text-white shadow-xl"
      >
        <motion.img
          src={"https://ik.imagekit.io/pavanagulla19/hero_bg.jpg"}
          alt="hero bg"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />

        <div className="relative z-10 px-6 md:px-12 py-24">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center text-4xl md:text-5xl font-bold tracking-tight"
          >
            URL Shortener
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center mt-4 text-md md:text-lg text-purple-100 max-w-2xl mx-auto"
          >
            Clean. Fast. Reliable. Paste your long URL and shorten it instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
            className="absolute left-1/2 -bottom-6 w-[60%] h-24 blur-3xl rounded-full bg-purple-600/20 transform -translate-x-1/2"
          />

          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="max-w-3xl mx-auto mt-12"
          >
            <div className=" rounded-full shadow-lg flex overflow-hidden border border-white/20 backdrop-blur-md transition-all">
              <div className="px-5 flex items-center text-sm text-gray-500 /80 rounded-l-full flex-1 border-r backdrop-blur-sm">
                briefly.link/
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="flex-1 px-4 py-4 text-gray-700 bg-transparent outline-none placeholder-gray-400"
                  placeholder="yourlink"
                />
              </div>

              <Button
                onClick={submit}
                className="rounded-r-full px-8 bg-purple-600 text-white hover:bg-purple-700 transition-all active:scale-95"
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
  );
}
