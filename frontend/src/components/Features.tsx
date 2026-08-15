import { BrainCircuit, ShieldCheck, FileText } from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Vulnerability Detection",
    description:
      "Automatically detect SQL Injection, XSS, IDOR, SSRF and other web vulnerabilities using intelligent scanning.",
  },
  {
    icon: ShieldCheck,
    title: "MITRE ATT&CK Mapping",
    description:
      "Every vulnerability is mapped to MITRE ATT&CK techniques for better threat analysis and prioritization.",
  },
  {
    icon: FileText,
    title: "Smart Security Reports",
    description:
      "Generate professional reports with severity ratings, remediation guidance and executive summaries.",
  },
];

const Features = () => {
  return (
    <section className="mx-auto mt-32 max-w-7xl px-6">

      <div className="text-center">

        <h2 className="text-4xl font-bold text-white">
          Everything You Need to Secure
        </h2>

        <h2 className="mt-2 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-5xl font-bold text-transparent">
          Your Web Applications
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
          ThreatLens combines AI-powered vulnerability detection,
          MITRE ATT&CK mapping and intelligent reporting
          into one modern security platform.
        </p>

      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 transition duration-300 hover:-translate-y-2 hover:border-violet-500/40"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/20 to-blue-600/20">

              <feature.icon className="h-7 w-7 text-violet-400" />

            </div>

            <h3 className="text-xl font-semibold text-white">
              {feature.title}
            </h3>

            <p className="mt-4 leading-7 text-zinc-400">
              {feature.description}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Features;