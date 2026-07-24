"use client";

export function ContactForm() {
  return (
    <div className="lg:col-span-2" style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: "var(--r-xl)", padding: "2.5rem", boxShadow: "var(--sh-lg)" }}>
      <h2 className="font-bold mb-6" style={{ fontFamily: "var(--font-head)", fontSize: "1.5rem", color: "var(--text)" }}>Send us a message</h2>
      <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {["Your Name", "Email Address"].map(label => (
            <div key={label}>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--nova)", fontFamily: "var(--font-head)" }}>{label}</label>
              <input
                type={label.includes("Email") ? "email" : "text"}
                placeholder={label === "Your Name" ? "John Doe" : "you@example.com"}
                required
                className="w-full h-12 px-4 text-sm focus:outline-none transition-colors"
                style={{ border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", fontFamily: "var(--font-body)", color: "var(--text)", background: "var(--nova-pale)" }}
              />
            </div>
          ))}
        </div>
        <div>
          <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--nova)", fontFamily: "var(--font-head)" }}>Subject</label>
          <input
            type="text"
            placeholder="How can we help?"
            required
            className="w-full h-12 px-4 text-sm focus:outline-none"
            style={{ border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", fontFamily: "var(--font-body)", color: "var(--text)", background: "var(--nova-pale)" }}
          />
        </div>
        <div>
          <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--nova)", fontFamily: "var(--font-head)" }}>Message</label>
          <textarea
            placeholder="Tell us more…"
            required
            rows={5}
            className="w-full px-4 py-3 text-sm focus:outline-none resize-none"
            style={{ border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", fontFamily: "var(--font-body)", color: "var(--text)", background: "var(--nova-pale)" }}
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="btn-nova" style={{ borderRadius: "var(--r-md)" }}>Send Message</button>
        </div>
      </form>
    </div>
  );
}
