"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F6F7F9] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={28} className="text-red-500" aria-hidden="true" />
          </div>
          <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#111827] mb-2">
            Something went wrong
          </h1>
          <p className="text-[#6B7280] mb-8">
            An unexpected error occurred. Please try again.
          </p>
          <Button onClick={reset} icon={<RefreshCcw size={16} />}>
            Try Again
          </Button>
        </motion.div>
      </body>
    </html>
  );
}
