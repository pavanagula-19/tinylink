"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useAppDispatch } from "@/hooks";
import { updateLinkRequest } from "@/redux/slices/links-slice";

interface EditLinkModalProps {
  open: boolean;
  onClose: () => void;

  code: string;
  targetUrl: string;
}

export default function EditLinkModal({
  open,
  onClose,
  code,
  targetUrl,
}: EditLinkModalProps) {
  const dispatch = useAppDispatch();

  const [newUrl, setNewUrl] = useState("");
  const [newCode, setNewCode] = useState("");

  // Prefill initial data when modal opens
  useEffect(() => {
    if (open) {
      setNewUrl(targetUrl);
      setNewCode(code);
    }
  }, [open, code, targetUrl]);

  const saveChanges = () => {
    if (!newUrl.startsWith("http")) {
      toast.error("Invalid URL");
      return;
    }

    dispatch(
      updateLinkRequest({
        code,
        targetUrl: newUrl,
        newCode,
      })
    );

    toast.success("Link updated!");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>
            Update your short link details below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-3">
          <div>
            <label className="text-sm font-medium">Target URL</label>
            <Input
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Short Code</label>
            <Input
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder="abc123"
            />
          </div>

          <Button className="w-full" onClick={saveChanges}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
