"use client";

export function RegisterForm() {
  return (
    <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        {["First Name", "Last Name"].map(label => (
          <div key={label}>
            <label htmlFor={label} className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--nova)", fontFamily: "var(--font-head)" }}>{label}</label>
            <input id={label} type="text" placeholder={label === "First Name" ? "John" : "Doe"} required
              className="w-full h-12 px-4 text-sm focus:outline-none"
              style={{ border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", fontFamily: "var(--font-body)", color: "var(--text)", background: "var(--nova-pale)" }} />
          </div>
        ))}
      </div>
      {[
        { id: "email",    label: "Email",           type: "email",    ph: "you@example.com"  },
        { id: "password", label: "Password",         type: "password", ph: "Min. 8 characters" },
        { id: "confirm",  label: "Confirm Password", type: "password", ph: "Repeat password"   },
      ].map(({ id, label, type, ph }) => (
        <div key={id}>
          <label htmlFor={id} className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--nova)", fontFamily: "var(--font-head)" }}>{label}</label>
          <input id={id} type={type as "email" | "password" | "text"} placeholder={ph} required
            className="w-full h-12 px-4 text-sm focus:outline-none"
            style={{ border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", fontFamily: "var(--font-body)", color: "var(--text)", background: "var(--nova-pale)" }} />
        </div>
      ))}
      <label className="flex items-start gap-2 text-sm cursor-pointer" style={{ color: "var(--text-2)", fontFamily: "var(--font-body)" }}>
        <input type="checkbox" required className="mt-0.5 accent-nova w-4 h-4 shrink-0" />
        <span>I agree to the <a href="/terms" className="font-semibold" style={{ color: "var(--nova)" }}>Terms of Service</a> and <a href="/privacy" className="font-semibold" style={{ color: "var(--nova)" }}>Privacy Policy</a></span>
      </label>
      <button type="submit" className="btn-nova w-full mt-2" style={{ borderRadius: "var(--r-sm)" }}>Create Account</button>
    </form>
  );
}
