"use client";

export function LoginForm() {
  return (
    <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--nova)", fontFamily: "var(--font-head)" }}>Email</label>
        <input id="email" type="email" placeholder="you@example.com" required
          className="w-full h-12 px-4 text-sm focus:outline-none transition-all"
          style={{ border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", fontFamily: "var(--font-body)", color: "var(--text)", background: "var(--nova-pale)" }} />
      </div>
      <div>
        <label htmlFor="password" className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--nova)", fontFamily: "var(--font-head)" }}>Password</label>
        <input id="password" type="password" placeholder="••••••••" required
          className="w-full h-12 px-4 text-sm focus:outline-none transition-all"
          style={{ border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", fontFamily: "var(--font-body)", color: "var(--text)", background: "var(--nova-pale)" }} />
      </div>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "var(--text-2)", fontFamily: "var(--font-body)" }}>
          <input type="checkbox" className="accent-nova w-4 h-4" />
          Remember me
        </label>
        <a href="#" className="text-sm font-semibold" style={{ color: "var(--nova)", fontFamily: "var(--font-body)" }}>Forgot password?</a>
      </div>
      <button type="submit" className="btn-nova w-full mt-2" style={{ borderRadius: "var(--r-sm)" }}>Sign In</button>
    </form>
  );
}
