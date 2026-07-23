"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        <div className="font-[family-name:var(--font-sora)] text-8xl font-bold text-[#E5E7EB] mb-4" aria-hidden="true">
          404
        </div>
        <h1 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[#111827] mb-2">
          Page Not Found
        </h1>
        <p className="text-[#6B7280] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button icon={<Home size={16} />} onClick={() => { window.location.href = "/"; }}>
            Go Home
          </Button>
          <Button variant="outline" onClick={() => history.back()} icon={<ArrowLeft size={16} />}>
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
