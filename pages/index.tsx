"use client";

import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F6F2EE] via-[#F2ECE6] to-[#ECE3DA] text-[#1B1917]">
      {/* soft radial background glows */}
      <div className="pointer-events-none fixed -top-24 -left-24 h-80 w-80 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(250,245,239,.85),transparent_60%)] blur-2xl" />
      <div className="pointer-events-none fixed -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(240,232,224,.8),transparent_60%)] blur-2xl" />

      <div className="container mx-auto max-w-6xl px-4 py-10">
        {/* Nav */}
        <nav className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-2 font-serif text-lg tracking-tight">
            <span className="inline-block h-2 w-2 rounded-full bg-[#1B1917]" />
            AIMed Notes
          </div>

          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="rounded-xl bg-[#1B1917] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link
                href="/product"
                className="rounded-xl bg-[#1B1917] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                Go to App
              </Link>
              <UserButton showName />
            </SignedIn>
          </div>
        </nav>

        {/* Hero */}
        <section className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#E8E0D6] bg-[#FFFCF8] px-3 py-1 text-xs tracking-wide text-[#6E6359]">
              ✨ Minimal look, maximal clarity
            </p>
            <h1 className="mt-5 font-serif text-6xl font-semibold leading-[1.05] tracking-tight text-[#1B1917] md:text-7xl">
              Bring the Calm
              <br />
              To Your Notes
            </h1>
            <p className="mt-5 max-w-xl text-lg text-[#6E6359]">
              An elegant, AI-assisted workspace that turns messy consult notes
              into clean summaries, action plans, and patient-friendly emails.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="rounded-xl bg-[#1B1917] px-6 py-3 text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
                    Start Free Trial
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/product">
                  <button className="rounded-xl bg-[#1B1917] px-6 py-3 text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
                    Open Consultation Assistant
                  </button>
                </Link>
              </SignedIn>

              <span className="text-sm text-[#6E6359]">No credit card needed 🔒</span>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                emoji: "📋",
                title: "Professional Summaries",
                body: "Auto-organized A/P with bullet clarity.",
                glowFrom: "#e6dfd6",
                glowTo: "#f6f1ea",
              },
              {
                emoji: "✅",
                title: "Action Items",
                body: "Crystal-clear follow-ups for every visit.",
                glowFrom: "#e9e0d6",
                glowTo: "#f7f2ec",
              },
              {
                emoji: "📧",
                title: "Patient Emails",
                body: "Plain-language drafts in one click.",
                glowFrom: "#e7ded4",
                glowTo: "#f6efe8",
              },
              {
                emoji: "🧩",
                title: "Markdown-Ready",
                body: "Supports **bold**, lists, and tables.",
                glowFrom: "#eadfd4",
                glowTo: "#f8f2eb",
              },
            ].map((f, i) => (
              <div key={i} className="relative group">
                <div
                  className="absolute inset-0 rounded-2xl opacity-30 blur transition group-hover:opacity-50"
                  style={{
                    background: `linear-gradient(135deg, ${f.glowFrom}, ${f.glowTo})`,
                  }}
                />
                <div className="relative rounded-2xl border border-[#E8E0D6] bg-[#FFFCF8] p-5 shadow-sm transition hover:shadow-md">
                  <div className="text-2xl">{f.emoji}</div>
                  <h3 className="mt-2 font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm text-[#6E6359]">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Proof / Trust */}
        <section className="mt-14 rounded-2xl border border-[#E8E0D6] bg-[#FFFCF8] p-6 text-center shadow-[0_10px_30px_rgba(34,26,20,0.07)]">
          <p className="text-sm text-[#6E6359]">
            HIPAA-friendly • Secure by design • Built for clinicians
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="rounded-full border border-[#E8E0D6] bg-white px-3 py-1">
              ⏱️ Saves 10–15 mins per visit
            </span>
            <span className="rounded-full border border-[#E8E0D6] bg-white px-3 py-1">
              🧠 Consistent documentation
            </span>
            <span className="rounded-full border border-[#E8E0D6] bg-white px-3 py-1">
              🎨 Calm, distraction-free UI
            </span>
          </div>
        </section>

        {/* Mini FAQ */}
        <section className="mx-auto mt-12 max-w-4xl">
          <h2 className="font-serif text-3xl">Quick FAQs</h2>
          <div className="mt-4 space-y-3">
            <details className="rounded-xl border border-[#E8E0D6] bg-[#FFFCF8] p-4">
              <summary className="cursor-pointer">Can I paste old notes? 🧾</summary>
              <p className="mt-2 text-sm text-[#6E6359]">
                Yes. Paste raw text and the system will structure it into a clean
                summary you can copy to your EMR.
              </p>
            </details>
            <details className="rounded-xl border border-[#E8E0D6] bg-[#FFFCF8] p-4">
              <summary className="cursor-pointer">Does it support Markdown? ✍️</summary>
              <p className="mt-2 text-sm text-[#6E6359]">
                Absolutely—use **bold**, lists, and tables to emphasize key items.
              </p>
            </details>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-14 border-t border-[#E8E0D6] pt-6 text-center text-sm text-[#6E6359]">
          Made with care 🫶 — soft neutrals, clean type, gentle motion.
        </footer>
      </div>
    </main>
  );
}
