import { cn } from "@/utils/cn";

type BadgeVariant = "default" | "blue" | "green" | "orange" | "red" | "gray";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-[#111827] text-white",
  blue: "bg-[#DBEAFE] text-[#1D4ED8]",
  green: "bg-[#D1FAE5] text-[#065F46]",
  orange: "bg-[#FEF3C7] text-[#92400E]",
  red: "bg-[#FEE2E2] text-[#991B1B]",
  gray: "bg-[#F3F4F6] text-[#6B7280]",
};

export function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
