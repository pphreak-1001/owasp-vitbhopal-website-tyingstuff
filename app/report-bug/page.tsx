"use client"
import { Container } from '@/components/container'
import React, { useEffect, useState } from 'react'
import Header from '@/components/header'

const BugReportForm = () => {
  const [form, setForm] = useState({
    category: "",
    description: "",
    screenRecording: "",
    attachmentLink: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [bugRef, setBugRef] = useState<string | null>(null);

  const categories = [
    "UI/UX Issue",
    "Performance Issue",
    "Security Vulnerability",
    "Functionality Bug",
    "Data Loss",
    "Integration Problem",
    "Other"
  ];

  useEffect(() => {
    // Prefill affected URL when available
    if (typeof window !== "undefined" && !form.screenRecording && !form.attachmentLink) {
      // keep this read-only to avoid leaking too much; user can edit if needed
      setForm((prev) => ({ ...prev, screenRecording: window.location.href }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess("");
    setError("");
    setBugRef(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    setBugRef(null);

    // Basic validation
    if (!form.category || !form.description.trim()) {
      setError("Please select a category and provide a description.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/bug-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok && data?.success) {
        setSuccess("Bug report submitted successfully!");
        // api returns { data: { bugId, message } } in current implementation
        const returnedId = data?.data?.bugId || data?.id || null;
        if (returnedId) setBugRef(String(returnedId));
        setForm({ category: "", description: "", screenRecording: "", attachmentLink: "" });
      } else {
        setError(data?.error || data?.message || "Failed to submit bug report.");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to submit bug report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-8 px-4">
      <Header title='Report a Bug'>
        Report issues and help us improve. Provide steps to reproduce, a short description, and optionally attachments or a recording link.
      </Header>

      <div className="max-w-3xl mx-auto">
        {/* Glass-style card that matches site theme (no yellow) */}
        <div className="mt-6 bg-white/6 border border-[var(--border)] backdrop-blur-md rounded-2xl p-6 text-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2 text-[var(--muted-text)]">
                Please select a category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg bg-transparent border border-[var(--border)] text-white appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-[var(--muted-text)]">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="opacity-70">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bug Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2 text-[var(--muted-text)]">
                Please describe the bug in detail <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full p-3 border border-[var(--border)] rounded-lg bg-transparent text-white placeholder:text-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Describe the bug, steps to reproduce, expected behavior, and actual behavior..."
                aria-required
                aria-invalid={form.description.trim() === ""}
              />
            </div>

            {/* Screen Recording / Affected URL */}
            <div>
              <label htmlFor="screenRecording" className="block text-sm font-medium mb-2 text-[var(--muted-text)]">
                Affected URL (auto-filled) / Screen recording link
              </label>
              <input
                id="screenRecording"
                type="url"
                name="screenRecording"
                value={form.screenRecording}
                onChange={handleChange}
                className="w-full p-3 border border-[var(--border)] rounded-lg bg-transparent text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="https://example.com/page"
              />
            </div>

            {/* Attachment Link */}
            <div>
              <label htmlFor="attachmentLink" className="block text-sm font-medium mb-2 text-[var(--muted-text)]">
                Attachment link (optional)
              </label>
              <input
                id="attachmentLink"
                type="url"
                name="attachmentLink"
                value={form.attachmentLink}
                onChange={handleChange}
                className="w-full p-3 border border-[var(--border)] rounded-lg bg-transparent text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="https://drive.google.com/..."
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? "Submitting..." : "Submit report"}
                  {!loading && (
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => { setForm({ category: "", description: "", screenRecording: typeof window !== "undefined" ? window.location.href : "", attachmentLink: "" }); setError(""); setSuccess(""); setBugRef(null); }}
                  className="px-4 py-2 border border-[var(--border)] rounded-lg text-[var(--muted-text)] bg-transparent"
                >
                  Reset
                </button>
              </div>

              <div className="text-sm text-[var(--muted-text)]">
                <span className="font-medium">Tip:</span> Provide steps & a link to help us reproduce faster.
              </div>
            </div>

            {/* Success/Error Messages */}
            {success && (
              <div className="text-green-400 text-sm p-3 bg-green-900/20 rounded-lg">
                {success}
                {bugRef && (
                  <div className="mt-2 text-sm text-[var(--muted-text)]">
                    Reference ID: <span className="font-mono text-white/90">{bugRef}</span>
                  </div>
                )}
              </div>
            )}
            {error && (
              <div className="text-rose-400 text-sm p-3 bg-rose-900/10 rounded-lg">{error}</div>
            )}
          </form>
        </div>
      </div>
    </Container>
  );
};

export default BugReportForm;
