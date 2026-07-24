"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#0F2540] text-white hover:bg-[#1B3A5C] border border-[#0F2540] hover:border-[#1B3A5C]",
  secondary:
    "bg-white text-[#0F2540] border border-[#E5E5E5] hover:border-[#0F2540]",
  outline:
    "bg-transparent text-[#0F2540] border border-[#0F2540] hover:bg-[#0F2540] hover:text-white",
  ghost:
    "bg-transparent text-[#666666] hover:text-[#111111] hover:bg-[#F7F8FA] border border-transparent",
  danger:
    "bg-red-600 text-white hover:bg-red-700 border border-red-600",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-4 text-xs tracking-wide gap-1.5",
  md: "h-10 px-5 text-sm tracking-wide gap-2",
  lg: "h-12 px-7 text-sm tracking-[0.06em] gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: isDisabled ? 1 : 0.98 }}
        whileHover={{ scale: isDisabled ? 1 : 1.005 }}
        transition={{ duration: 0.15 }}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center font-semibold uppercase transition-all duration-200 cursor-pointer select-none",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading 
          </span>
        ) : (
          <>
            {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
            {children}
            {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
