import { MainLayout } from "@/components/layout/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: "72px", background: "var(--bg-tint)" }}>
        <div style={{ width: "100%", maxWidth: "480px", margin: "0 auto", padding: "2rem 1.5rem" }}>
          <div style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: "var(--r-xl)", padding: "2.5rem", boxShadow: "var(--sh-lg)" }}>
            <div className="text-center mb-8">
              <p className="font-bold text-2xl tracking-widest uppercase mb-1" style={{ fontFamily: "var(--font-sora)", color: "var(--nova)" }}>NOVA</p>
              <h1 className="font-bold" style={{ fontFamily: "var(--font-sora)", fontSize: "1.75rem", color: "var(--text)", letterSpacing: "-0.02em" }}>Start your journey</h1>
              <p className="mt-2 text-sm" style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)" }}>Create your free account today</p>
            </div>

            <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                {["First Name", "Last Name"].map(label => (
                  <div key={label}>
                    <label htmlFor={label} className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--nova)", fontFamily: "var(--font-sora)" }}>{label}</label>
                    <input id={label} type="text" placeholder={label === "First Name" ? "John" : "Doe"} required
                      className="w-full h-12 px-4 text-sm focus:outline-none"
                      style={{ border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", fontFamily: "var(--font-nunito)", color: "var(--text)", background: "var(--nova-pale)" }} />
                  </div>
                ))}
              </div>
              {[
                { id: "email",    label: "Email",    type: "email",    ph: "you@example.com" },
                { id: "password", label: "Password", type: "password", ph: "Min. 8 characters" },
                { id: "confirm",  label: "Confirm Password", type: "password", ph: "Repeat password" },
              ].map(({ id, label, type, ph }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--nova)", fontFamily: "var(--font-sora)" }}>{label}</label>
                  <input id={id} type={type as "email" | "password" | "text"} placeholder={ph} required
                    className="w-full h-12 px-4 text-sm focus:outline-none"
                    style={{ border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", fontFamily: "var(--font-nunito)", color: "var(--text)", background: "var(--nova-pale)" }} />
                </div>
              ))}
              <label className="flex items-start gap-2 text-sm cursor-pointer" style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)" }}>
                <input type="checkbox" required className="mt-0.5 accent-nova w-4 h-4 shrink-0" />
                <span>I agree to the <a href="/terms" className="font-semibold" style={{ color: "var(--nova)" }}>Terms of Service</a> and <a href="/privacy" className="font-semibold" style={{ color: "var(--nova)" }}>Privacy Policy</a></span>
              </label>
              <button type="submit" className="btn-nova w-full mt-2" style={{ borderRadius: "var(--r-sm)" }}>Create Account</button>
            </form>

            <div className="mt-6 pt-6 text-center" style={{ borderTop: "1px solid var(--line)" }}>
              <p className="text-sm" style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)" }}>
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
