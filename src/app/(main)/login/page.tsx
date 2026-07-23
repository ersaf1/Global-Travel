import { MainLayout } from "@/components/layout/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: "72px", background: "var(--bg-tint)" }}>
        <div style={{ width: "100%", maxWidth: "440px", margin: "0 auto", padding: "2rem 1.5rem" }}>
          <div style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: "var(--r-xl)", padding: "2.5rem", boxShadow: "var(--sh-lg)" }}>
            {/* Logo */}
            <div className="text-center mb-8">
              <p className="font-bold text-2xl tracking-widest uppercase mb-1" style={{ fontFamily: "var(--font-sora)", color: "var(--nova)" }}>NOVA</p>
              <h1 className="font-bold" style={{ fontFamily: "var(--font-sora)", fontSize: "1.75rem", color: "var(--text)", letterSpacing: "-0.02em" }}>Welcome back</h1>
              <p className="mt-2 text-sm" style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)" }}>Sign in to your account</p>
            </div>

            <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-4">
              <div>
                <label htmlFor="email" className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--nova)", fontFamily: "var(--font-sora)" }}>Email</label>
                <input id="email" type="email" placeholder="you@example.com" required
                  className="w-full h-12 px-4 text-sm focus:outline-none transition-all"
                  style={{ border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", fontFamily: "var(--font-nunito)", color: "var(--text)", background: "var(--nova-pale)" }} />
              </div>
              <div>
                <label htmlFor="password" className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--nova)", fontFamily: "var(--font-sora)" }}>Password</label>
                <input id="password" type="password" placeholder="••••••••" required
                  className="w-full h-12 px-4 text-sm focus:outline-none transition-all"
                  style={{ border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", fontFamily: "var(--font-nunito)", color: "var(--text)", background: "var(--nova-pale)" }} />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)" }}>
                  <input type="checkbox" className="accent-nova w-4 h-4" />
                  Remember me
                </label>
                <a href="#" className="text-sm font-semibold" style={{ color: "var(--nova)", fontFamily: "var(--font-nunito)" }}>Forgot password?</a>
              </div>
              <button type="submit" className="btn-nova w-full mt-2" style={{ borderRadius: "var(--r-sm)" }}>Sign In</button>
            </form>

            <div className="mt-6 pt-6 text-center" style={{ borderTop: "1px solid var(--line)" }}>
              <p className="text-sm" style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)" }}>
                Don&apos;t have an account?{" "}
                <a href="/register" className="font-bold" style={{ color: "var(--nova)" }}>Sign up free</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
