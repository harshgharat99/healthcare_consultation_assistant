"use client";

import { useState, FormEvent } from "react";
import { useAuth, Protect, PricingTable, UserButton } from "@clerk/nextjs";
import DatePicker from "react-datepicker";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { fetchEventSource } from "@microsoft/fetch-event-source";

function ConsultationForm() {
  const { getToken } = useAuth();

  const [patientName, setPatientName] = useState("");
  const [visitDate, setVisitDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setOutput("");
    setLoading(true);

    const jwt = await getToken();
    if (!jwt) {
      setOutput("Authentication required");
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    let buffer = "";

    await fetchEventSource("/api", {
      signal: controller.signal,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        patient_name: patientName,
        date_of_visit: visitDate?.toISOString().slice(0, 10),
        notes,
      }),
      onmessage(ev) {
        buffer += ev.data;
        setOutput(buffer);
      },
      onclose() {
        setLoading(false);
      },
      onerror(err) {
        console.error("SSE error:", err);
        controller.abort();
        setLoading(false);
      },
    });
  }

  return (
    <div className="relative">
      {/* soft radial glow accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(250,245,239,.8),transparent_60%)] blur-2xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(240,232,224,.7),transparent_60%)] blur-2xl" />

      <header className="mb-10 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#E8E0D6] bg-[#FCF9F5] px-3 py-1 text-xs tracking-wide text-[#6E6359]">
          ✨ Elegant tools for clinicians
        </p>
        <h1 className="mt-5 font-serif text-5xl font-semibold tracking-tight text-[#1B1917] md:text-6xl">
          Consultation Notes
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[#6E6359]">
          Create clean, structured visit summaries your team will love. Minimal
          look, maximal clarity.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="group space-y-6 rounded-2xl border border-[#E8E0D6] bg-[#FFFCF8]/80 p-6 shadow-[0_10px_30px_rgba(34,26,20,0.07)] backdrop-blur-sm transition-transform"
      >
        {/* Patient */}
        <div className="space-y-2">
          <label
            htmlFor="patient"
            className="block text-sm font-medium text-[#5A4F46]"
          >
            👩‍⚕️ Patient Name
          </label>
          <input
            id="patient"
            type="text"
            required
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Full name"
            className="w-full rounded-xl border border-[#E4D9CC] bg-white px-4 py-2 text-[#1B1917] outline-none ring-0 transition focus:border-[#1B1917] focus:ring-2 focus:ring-[#1B1917]/10"
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-[#5A4F46]"
          >
            📅 Date of Visit
          </label>
          <DatePicker
            id="date"
            selected={visitDate}
            onChange={(d: Date | null) => setVisitDate(d)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select date"
            required
            className="w-full rounded-xl border border-[#E4D9CC] bg-white px-4 py-2 text-[#1B1917] outline-none focus:border-[#1B1917] focus:ring-2 focus:ring-[#1B1917]/10"
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-[#5A4F46]"
          >
            🧾 Consultation Notes
          </label>
          <textarea
            id="notes"
            required
            rows={9}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Chief concern, HPI, exam findings, assessment, plan…"
            className="w-full rounded-xl border border-[#E4D9CC] bg-white px-4 py-3 text-[#1B1917] outline-none transition focus:border-[#1B1917] focus:ring-2 focus:ring-[#1B1917]/10"
          />
          <div className="flex flex-wrap gap-2 text-xs text-[#6E6359]">
            <span className="rounded-full border border-[#E8E0D6] bg-[#FCF9F5] px-2 py-1">
              Tip: Use headings like <b>Assessment</b> and <b>Plan</b>
            </span>
            <span className="rounded-full border border-[#E8E0D6] bg-[#FCF9F5] px-2 py-1">
              Supports **bold**, lists, and tables via Markdown
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full transform rounded-xl bg-[#1B1917] px-6 py-3 font-medium text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-[#7D7A76]"
        >
          {loading ? "Generating Summary…" : "Generate Summary ✍️"}
        </button>
      </form>

      {/* Extras: Feature highlights */}
      <section className="mx-auto mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Structured Output",
            body: "Auto-organized assessment & plan with bullet clarity.",
            emoji: "🧩",
          },
          {
            title: "Share-Ready",
            body: "Clean formatting for charting or patient handouts.",
            emoji: "📤",
          },
          {
            title: "Gentle on Eyes",
            body: "Ivory & sand palette with generous white space.",
            emoji: "🎨",
          },
        ].map((c, i) => (
          <div
            key={i}
            className="rounded-2xl border border-[#E8E0D6] bg-[#FFFCF8] p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="text-2xl">{c.emoji}</div>
            <h3 className="mt-2 font-semibold text-[#1B1917]">{c.title}</h3>
            <p className="mt-1 text-sm text-[#6E6359]">{c.body}</p>
          </div>
        ))}
      </section>

      {/* Output */}
      {output && (
        <section className="mt-10 rounded-2xl border border-[#E8E0D6] bg-white p-6 shadow-[0_8px_24px_rgba(34,26,20,0.06)]">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#1B1917]">
              Visit Summary
            </h2>
            <span className="rounded-full border border-[#E8E0D6] bg-[#FCF9F5] px-3 py-1 text-xs text-[#6E6359]">
              ✅ Ready to copy
            </span>
          </div>
          <div className="prose prose-neutral max-w-none prose-headings:font-serif prose-headings:text-[#1B1917] prose-p:text-[#342F2A] prose-strong:text-[#1B1917]">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {output}
            </ReactMarkdown>
          </div>
        </section>
      )}

      {/* Mini FAQ */}
      <section className="mt-10 rounded-2xl border border-[#E8E0D6] bg-[#FFFCF8] p-6">
        <h3 className="font-serif text-xl text-[#1B1917]">Quick FAQs</h3>
        <details className="mt-3">
          <summary className="cursor-pointer text-[#4D453E]">
            Can I paste old notes?
          </summary>
          <p className="mt-2 text-sm text-[#6E6359]">
            Yes. Paste your raw notes and the summary will adapt to them.
          </p>
        </details>
        <details className="mt-2">
          <summary className="cursor-pointer text-[#4D453E]">
            Does Markdown work?
          </summary>
          <p className="mt-2 text-sm text-[#6E6359]">
            Absolutely. Use **bold**, lists, and tables for extra structure.
          </p>
        </details>
      </section>
    </div>
  );
}

export default function Product() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F6F2EE] via-[#F2ECE6] to-[#ECE3DA] px-4 py-8 text-[#1B1917]">
      {/* Top bar */}
      <div className="mx-auto mb-8 flex max-w-5xl items-center justify-between">
        <div className="font-serif text-lg tracking-tight">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#1B1917]" />
          AIMed Notes
        </div>
        <UserButton showName />
      </div>

      <Protect
        plan="premium_subscription"
        fallback={
          <div className="mx-auto max-w-5xl">
            <section className="rounded-2xl border border-[#E8E0D6] bg-[#FFFCF8] p-10 text-center shadow-[0_10px_30px_rgba(34,26,20,0.07)]">
              <h1 className="font-serif text-5xl font-semibold tracking-tight text-[#1B1917]">
                Healthcare Professional Plan
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-[#6E6359]">
                Streamline your patient consultations with beautiful,
                share-ready summaries.
              </p>
              <div className="mt-8">
                <PricingTable />
              </div>
            </section>
          </div>
        }
      >
        <div className="mx-auto max-w-5xl">
          <ConsultationForm />
        </div>
      </Protect>

      <footer className="mx-auto mt-14 max-w-5xl border-t border-[#E8E0D6] pt-6 text-center text-sm text-[#6E6359]">
        Made with care 🫶 — soft neutrals, clean type, gentle motion.
      </footer>
    </main>
  );
}
