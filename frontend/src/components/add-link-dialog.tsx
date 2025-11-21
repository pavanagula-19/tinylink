import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { api } from "@/lib/api";

export default function AddLinkDialog({ onCreate }: { onCreate: () => void }) {
  const [open, setOpen] = useState(false);
  const [targetUrl, setTargetUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!targetUrl.startsWith("http")) {
      toast.error("Enter a valid URL");
      return;
    }
    setLoading(true);
    const res: any = await api.createLink({ targetUrl, code });
    setLoading(false);
    if (!res.ok) {
      toast.error("Failed");
      return;
    }
    const data = await res.json();
    onCreate();
    setOpen(false);
    toast.success("Created");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Link</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a short link</DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <Input
            placeholder="https://example.com/long"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
          />
          <Input
            placeholder="custom code (optional)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={submit} disabled={loading}>
              {loading ? "..." : "Create"}
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
