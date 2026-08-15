import {
  Globe,
  Search,
  BrainCircuit,
  FileText,
} from "lucide-react";

const steps = [
  {
    icon: Globe,
    title: "Crawl Target",
    description:
      "ThreatLens intelligently crawls your web application and discovers all reachable endpoints.",
  },
  {
    icon: Search,
    title: "Detect Vulnerabilities",
    description:
      "Advanced scanners identify SQL Injection, XSS, SSRF, IDOR and other security issues.",
  },
  {
    icon: BrainCircuit,
    title: "AI Analysis",
    description:
      "AI prioritizes findings, reduces false positives and suggests practical remediation.",
  },
  {
    icon: FileText,
    title: "Generate Report",
    description:
      "Export detailed reports with severity, MITRE ATT&CK mapping and remediation guidance.",
  },
];

const Workflow = () => {
  return (
    <section className="mx-auto mt-32 max-w-7xl px-6">

      <div className="text-center">
        <h2 className="text-5xl font-bold text-white">
          How ThreatLens Works
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-lg text-zinc-400">
          From discovery to reporting, ThreatLens automates the complete
          vulnerability assessment workflow.
        </p>
      </div>

      <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4">

        {steps.map((step, index) => (
          <div
            key={step.title}
            className="relative rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/20 to-blue-600/20">
              <step.icon className="h-7 w-7 text-violet-400" />
            </div>

            <span className="mb-3 inline-block rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
              Step {index + 1}
            </span>

            <h3 className="text-xl font-semibold text-white">
              {step.title}
            </h3>

            <p className="mt-4 leading-7 text-zinc-400">
              {step.description}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
};

export default Workflow;