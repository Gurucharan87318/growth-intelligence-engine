"use client";

import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

import { ProjectNotesModal } from "@/features/shared/components/ProjectNotes";

export function Footer() {
  const [projectNotesOpen, setProjectNotesOpen] = useState(false);

  return (
    <>
      <footer className="mt-12 bg-slate-950 text-slate-300">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 border-t border-white/10 py-16 md:grid-cols-5">
            <div className="pr-8 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="text-lg font-bold tracking-tight text-white">
                  Growth Intelligence Engine
                </div>
              </div>

              <p className="mt-5 max-w-sm text-sm font-medium leading-relaxed text-slate-400">
                A Decision intelligence platform that automates the transition from raw business metrics to executive strategy. It synthesizes market opportunity, growth quality, and unit economics into a modular "Strategy Memo" to drive data-led operational decisions.
              </p>
            </div>

            <div>
              <div className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
                Product
              </div>
              <div className="grid gap-3 text-sm font-medium">
                <a
                  href="/market-opportunity"
                  className="w-fit text-left transition-colors hover:text-white"
                >
                  Market Opportunity
                </a>
                <a
                  href="/growth-intelligence"
                  className="w-fit text-left transition-colors hover:text-white"
                >
                  Growth Intelligence
                </a>
                <a
                  href="/unit-economics"
                  className="w-fit text-left transition-colors hover:text-white"
                >
                  Unit Economics
                </a>
                <a
                  href="/strategy-memo"
                  className="w-fit text-left transition-colors hover:text-white"
                >
                  Strategy Memo
                </a>
              </div>
            </div>

            <div>
              <div className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
                Contact
              </div>
              <div className="grid gap-3 text-sm font-medium">
                <a
                  className="flex w-fit items-center gap-2 transition-colors hover:text-white"
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                    "gurucharansenthilkumar04@gmail.com"
                  )}&su=${encodeURIComponent("Growth Intelligence Engine - Contact")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>

                <a
                  className="flex w-fit items-center gap-2 transition-colors hover:text-white"
                  href="https://www.linkedin.com/in/gurucharansenthilkumar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>

                    <a
  className="flex items-center gap-2 transition-colors hover:text-white w-fit"
  href="https://github.com/Gurucharan87318/"
  target="_blank"
  rel="noopener noreferrer"
>
  <Github className="h-4 w-4" /> GitHub
</a>


                <button
                  type="button"
                  className="w-fit text-left transition-colors hover:text-white"
                  onClick={() => setProjectNotesOpen(true)}
                >
                  Project Notes
                </button>
              </div>
            </div>

            <div>
              <div className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
                Project
              </div>
              <p className="mb-4 text-sm font-medium leading-relaxed text-slate-400">
                Built as a strategy-oriented analytics product that connects market selection,
                growth quality, unit economics, and executive interpretation in one system.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-sm font-medium text-slate-500 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} Portfolio project</div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Built by Gurucharan Senthilkumar.
            </div>
          </div>
        </div>
      </footer>

      <ProjectNotesModal
        open={projectNotesOpen}
        onClose={() => setProjectNotesOpen(false)}
      />
    </>
  );
}
