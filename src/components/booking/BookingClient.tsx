"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Plane, Train, Car, Bike, Calendar, Users, CreditCard, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { cn } from "@/utils/cn";
import type { TransportMode } from "@/types";

const bookingSchema = z.object({
  destinationId: z.string().min(1, "Please select a destination"),
  departureDate: z.string().min(1, "Please select a departure date"),
  returnDate: z.string().optional(),
  travelers: z.number().min(1).max(20),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const transportModes: { mode: TransportMode; icon: React.ReactNode; label: string; emoji: string }[] = [
  { mode: "FLIGHT", icon: <Plane size={18} />, label: "Flight", emoji: "✈️" },
  { mode: "TRAIN", icon: <Train size={18} />, label: "Train", emoji: "🚆" },
  { mode: "CAR", icon: <Car size={18} />, label: "Car", emoji: "🚗" },
  { mode: "MOTORCYCLE", icon: <Bike size={18} />, label: "Motorcycle", emoji: "🏍" },
];

const steps = ["Trip Details", "Transport", "Payment", "Confirm"];

export function BookingClient() {
  const [step, setStep] = useState(0);
  const [transport, setTransport] = useState<TransportMode>("FLIGHT");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { travelers: 1 },
  });

  const onSubmit = async (data: BookingFormValues) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_8px_40px_rgba(0,0,0,0.10)] p-12 text-center max-w-md w-full"
        >
          <div className="w-16 h-16 bg-[#D1FAE5] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={28} className="text-[#059669]" aria-hidden="true" />
          </div>
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#111827] mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-[#6B7280] mb-6">
            Your trip has been booked successfully. Check your dashboard for details.
          </p>
          <Button fullWidth onClick={() => { window.location.href = "/dashboard"; }}>
            Go to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-sm font-medium text-[#60A5FA] uppercase tracking-wide mb-1">Booking</p>
          <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#111827]">
            Book Your Trip
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-8" aria-label="Booking steps" role="list">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1" role="listitem">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                    i < step ? "bg-[#111827] text-white" :
                    i === step ? "bg-[#111827] text-white ring-4 ring-[#111827]/20" :
                    "bg-[#F3F4F6] text-[#9CA3AF]"
                  )}
                  aria-current={i === step ? "step" : undefined}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span className="text-xs text-[#6B7280] hidden sm:block whitespace-nowrap">{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn("flex-1 h-0.5 mx-2", i < step ? "bg-[#111827]" : "bg-[#E5E7EB]")} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 0 — Trip Details */}
          {step === 0 && (
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <Card padding="lg" className="space-y-4">
                <h2 className="font-[family-name:var(--font-poppins)] font-semibold text-[#111827] flex items-center gap-2">
                  <Calendar size={18} aria-hidden="true" /> Trip Details
                </h2>
                <Input
                  label="Destination"
                  placeholder="e.g. Bali, Indonesia"
                  error={errors.destinationId?.message}
                  {...register("destinationId")}
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Departure Date"
                    type="date"
                    error={errors.departureDate?.message}
                    {...register("departureDate")}
                  />
                  <Input
                    label="Return Date (optional)"
                    type="date"
                    {...register("returnDate")}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#374151] block mb-1.5">
                    <Users size={14} className="inline mr-1" aria-hidden="true" />
                    Travelers
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] focus:outline-none focus:border-[#60A5FA] focus:ring-2 focus:ring-[#60A5FA]/20"
                    {...register("travelers", { valueAsNumber: true })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#374151] block mb-1.5">
                    <FileText size={14} className="inline mr-1" aria-hidden="true" />
                    Notes (optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any special requests or notes..."
                    className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#60A5FA] focus:ring-2 focus:ring-[#60A5FA]/20 resize-none"
                    {...register("notes")}
                  />
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 1 — Transport */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <Card padding="lg">
                <h2 className="font-[family-name:var(--font-poppins)] font-semibold text-[#111827] mb-4">
                  Choose Transport
                </h2>
                <div className="grid grid-cols-2 gap-3" role="group" aria-label="Transport mode">
                  {transportModes.map(({ mode, label, emoji }) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setTransport(mode)}
                      aria-pressed={transport === mode}
                      className={cn(
                        "flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all duration-200",
                        transport === mode
                          ? "border-[#111827] bg-[#F9FAFB]"
                          : "border-[#E5E7EB] hover:border-[#D1D5DB]"
                      )}
                    >
                      <span className="text-3xl" aria-hidden="true">{emoji}</span>
                      <span className="text-sm font-medium text-[#111827]">{label}</span>
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 2 — Payment */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <Card padding="lg" className="space-y-4">
                <h2 className="font-[family-name:var(--font-poppins)] font-semibold text-[#111827] flex items-center gap-2">
                  <CreditCard size={18} aria-hidden="true" /> Payment Details
                </h2>
                <Input label="Cardholder Name" placeholder="John Doe" />
                <Input label="Card Number" placeholder="1234 5678 9012 3456" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Expiry Date" placeholder="MM / YY" />
                  <Input label="CVV" placeholder="123" type="password" />
                </div>
                <p className="text-xs text-[#9CA3AF] flex items-center gap-1">
                  🔒 Your payment info is encrypted and secure.
                </p>
              </Card>
            </motion.div>
          )}

          {/* Step 3 — Confirm */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <Card padding="lg">
                <h2 className="font-[family-name:var(--font-poppins)] font-semibold text-[#111827] mb-4">
                  Review & Confirm
                </h2>
                <div className="space-y-3 mb-6">
                  {[
                    { label: "Destination", value: watch("destinationId") || "—" },
                    { label: "Departure", value: watch("departureDate") || "—" },
                    { label: "Return", value: watch("returnDate") || "One-way" },
                    { label: "Travelers", value: `${watch("travelers")} person(s)` },
                    { label: "Transport", value: transport },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-2 border-b border-[#F3F4F6] last:border-0">
                      <span className="text-sm text-[#6B7280]">{label}</span>
                      <span className="text-sm font-medium text-[#111827] capitalize">{value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
            >
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button type="button" onClick={() => setStep(step + 1)}>
                Continue
              </Button>
            ) : (
              <Button type="submit" loading={loading}>
                Confirm Booking
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
