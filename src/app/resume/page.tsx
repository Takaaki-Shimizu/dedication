import React from "react";
import { ResumeForm } from "@/components/resume-form";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-900 pt-20">
      <ResumeForm />
    </div>
  );
}
