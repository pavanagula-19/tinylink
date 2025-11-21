import { Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyState() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center py-32">
      <Link2 className="text-blue-600 mb-3" size={40} />
      <h2 className="text-xl font-semibold text-gray-900">Create New Link</h2>
      <p className="text-gray-500 mt-2 max-w-sm">
        Start shortening your links and track performance seamlessly. Create a
        new link now to simplify sharing and gain insights.
      </p>

      <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-md">
        Create New Link
      </Button>
    </div>
  );
}
