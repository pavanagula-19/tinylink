import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  const loc = useLocation();
  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-sm"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl text-foreground">
          briefly.
        </Link>

        <nav className="flex gap-4 items-center">
          <Link
            to="/"
            className={`px-3 py-1 rounded ${
              loc.pathname === "/"
                ? "bg-purple-50 text-purple-700"
                : "text-muted"
            }`}
          >
            Why briefly?
          </Link>
          <a href="#features" className="px-3 py-1 text-muted">
            Features
          </a>
          <a href="#contact" className="px-3 py-1 text-muted">
            Contact Us
          </a>

          <Link
            to="/dashboard"
            className="ml-4 inline-flex items-center px-4 py-2 bg-white border border-purple-200 rounded-full text-sm shadow-sm hover:bg-purple-50"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
