import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Topbar() {
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-between items-center px-8 py-5 border-b "
    >
      <div>
        <h1 className="text-xl font-semibold text-gray-900">WasDo Links</h1>
        <p className="text-sm text-gray-500">Manage, view and analyse links.</p>
      </div>

      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-md">
        Create New Link
      </Button>
    </motion.div>
  );
}
