"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Sparkles, Target, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const PROJECT_NOTES_KEY = "autoanalyst_project_notes_seen";

type ProjectNotesModalProps = {
  open?: boolean;
  onClose?: () => void;
};

export function ProjectNotesModal({
  open = false,
  onClose,
}: ProjectNotesModalProps) {
  const [mounted, setMounted] = useState(false);
  const [autoOpen, setAutoOpen] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    setMounted(true);

    const seen = localStorage.getItem(PROJECT_NOTES_KEY);
    if (!seen) {
      setAutoOpen(true);
    }
  }, []);

  const isOpen = open || autoOpen;

  const closeModal = () => {
    if (autoOpen) {
      setAutoOpen(false);
    }
    onClose?.();
    setAcknowledged(false);
  };

  const handleUnderstood = () => {
    localStorage.setItem(PROJECT_NOTES_KEY, "seen");
    setAutoOpen(false);
    onClose?.();
    setAcknowledged(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={closeModal}
            aria-label="Close project notes"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.18 }}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white text-slate-900 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/70 px-8 py-6">
              <div>
                <div className="flex items-center gap-2 text-slate-500">
                  <FileText className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                    Project notes
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                  Welcome to Growth Intelligence Engine
                </h2>

                <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                  A strategy-oriented analytics product that turns backend data into
                  market, growth, unit economics, and executive decision views.
                </p>
              </div>

              <button
                className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
                onClick={closeModal}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 overflow-y-auto px-8 py-6 text-sm font-medium leading-relaxed text-slate-600">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-slate-700">
                  <Sparkles className="h-4 w-4" />
                  <h3 className="text-base font-bold text-slate-900">
                    What this project is
                  </h3>
                </div>
                <p className="mt-3">
                  Growth Intelligence Engine is a portfolio-grade product system designed to show how
                  structured business data can be converted into decision-ready outputs.
                  Instead of stopping at raw tables or isolated charts, it connects
                  market opportunity, growth quality, unit economics, and strategy memo
                  interpretation in one flow.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-slate-700">
                  <Target className="h-4 w-4" />
                  <h3 className="text-base font-bold text-slate-900">
                    What you are doing here
                  </h3>
                </div>
                <p className="mt-3">
                  You are exploring how backend-fed product modules can support business
                  thinking. Each module focuses on a different decision layer: choosing
                  the best wedge, diagnosing growth quality, validating scaling
                  economics, and converting all of that into an executive strategy view.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-base font-bold text-slate-900">
                  What output this delivers
                </h3>
                <div className="mt-3 space-y-3">
                  <p>
                    <span className="font-semibold text-slate-900">Market Opportunity:</span>{" "}
                    identifies the most credible entry wedge and compares adjacent segments.
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Growth Intelligence:</span>{" "}
                    evaluates retention quality, channel efficiency, and cohort durability.
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Unit Economics:</span>{" "}
                    shows whether the model supports scaling through payback, margin, levers,
                    and scenario analysis.
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Strategy Memo:</span>{" "}
                    converts the underlying signals into decision-ready recommendations for
                    founders and investors.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-5">
                <label className="group flex cursor-pointer items-start gap-3">
                  <div className="relative mt-0.5 flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-slate-300 transition-all checked:border-slate-900 checked:bg-slate-900"
                      checked={acknowledged}
                      onChange={(e) => setAcknowledged(e.target.checked)}
                    />
                    <svg
                      className="pointer-events-none absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5L4.5 8.5L13 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <span className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-slate-900">
                    I understand that this project is a portfolio-grade product demo that
                    showcases decision systems, structured analytics, and executive
                    interpretation workflows.
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/70 px-8 py-5 sm:flex-row">
              <span className="text-xs font-semibold text-slate-400">
                Review the modules to see how raw metrics become strategic outputs.
              </span>

              <div className="flex w-full items-center gap-3 sm:w-auto">
                <Button
                  variant="outline"
                  className="h-11 w-full border-slate-200 px-6 font-bold text-slate-600 hover:bg-white hover:text-slate-900 sm:w-auto"
                  onClick={closeModal}
                >
                  Close
                </Button>

                <Button
                  className={`h-11 w-full px-6 font-bold shadow-sm transition-all sm:w-auto ${
                    acknowledged
                      ? "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md"
                      : "cursor-not-allowed bg-slate-200 text-slate-400 hover:bg-slate-200"
                  }`}
                  disabled={!acknowledged}
                  onClick={handleUnderstood}
                >
                  Understood
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
