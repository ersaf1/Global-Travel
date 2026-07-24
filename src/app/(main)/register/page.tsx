import { MainLayout } from "@/components/layout/MainLayout";
import { RegisterForm } from "./RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: "72px", background: "var(--bg-tint)" }}>
        <div style={{ width: "100%", maxWidth: "480px", margin: "0 auto", padding: "2rem 1.5rem" }}>
          <div style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: "var(--r-xl)", padding: "2.5rem", boxShadow: "var(--sh-lg)" }}>
            <div className="text-center mb-8">
              <p className="font-bold text-2xl tracking-widest uppercase mb-1" style={{ fontFamily: "var(--font-head)", color: "var(--nova)" }}>NOVA</p>
              <h1 className="font-bold" style={{ fontFamily: "var(--font-head)", fontSize: "1.75rem", color: "var(--text)", letterSpacing: "-0.02em" }}>Start your journey</h1>
              <p className="mt-2 text-sm" style={{ color: "var(--text-2)", fontFamily: "var(--font-body)" }}>Create your free account today</p>
            </div>
            <RegisterForm />
            <div className="mt-6 pt-6 text-center" style={{ borderTop: "1px solid var(--line)" }}>
              <p className="text-sm" style={{ color: "var(--text-2)", fontFamily: "var(--font-body)" }}>
                Already have an account?{" "}
                <a href="/login" className="font-bold" style={{ color: "var(--nova)" }}>Sign in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
