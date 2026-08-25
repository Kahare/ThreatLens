import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Cookie,
  FileText,
  Globe,
  Lock,
  Network,
  Play,
  RefreshCw,
  Server,
  ShieldCheck,
  ScanLine,
} from "lucide-react";
import { Link } from "react-router-dom";

const NewScan = () => {
  const scanModules = [
    {
      name: "Connection Check",
      description: "Verify target availability",
      icon: Globe,
    },
    {
      name: "Port Exposure",
      description: "Identify exposed services",
      icon: Network,
    },
    {
      name: "Security Headers",
      description: "Check HTTP security headers",
      icon: ShieldCheck,
    },
    {
      name: "Cookie Security",
      description: "Analyze cookie attributes",
      icon: Cookie,
    },
    {
      name: "SSL / TLS",
      description: "Inspect certificate security",
      icon: Lock,
    },
    {
      name: "Server Information",
      description: "Check exposed server details",
      icon: Server,
    },
    {
      name: "Redirects",
      description: "Analyze redirect behavior",
      icon: RefreshCw,
    },
    {
      name: "robots.txt",
      description: "Inspect robots configuration",
      icon: FileText,
    },
    {
      name: "security.txt",
      description: "Check security contact policy",
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-zinc-800 px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Dashboard
          </Link>

          <div className="h-4 w-px bg-zinc-800" />

          <h1 className="text-sm font-semibold">New Scan</h1>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-600">
          <span className="h-2 w-2 bg-green-500" />
          Scanner ready
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        {/* Page heading */}
        <section>
          <p className="text-xs font-medium uppercase tracking-wider text-blue-500">
            Vulnerability Scanner
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            New Security Scan
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Analyze a website for common security weaknesses, exposed
            services, configuration issues, and other vulnerabilities.
          </p>
        </section>

        {/* Target */}
        <section className="mt-8 border border-zinc-800 bg-zinc-900/20">
          <div className="border-b border-zinc-800 px-5 py-4">
            <h3 className="text-sm font-semibold">Target</h3>

            <p className="mt-1 text-xs text-zinc-600">
              Enter the website you are authorized to assess.
            </p>
          </div>

          <div className="p-5">
            <label className="mb-2 block text-xs font-medium text-zinc-400">
              Target URL
            </label>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Globe
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                />

                <input
                  type="url"
                  placeholder="https://example.com"
                  className="h-11 w-full border border-zinc-800 bg-[#09090B] pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-700 transition focus:border-blue-500"
                />
              </div>

              <button className="flex h-11 items-center justify-center gap-2 bg-blue-600 px-6 text-sm font-medium transition hover:bg-blue-700">
                <Play size={16} />
                Start Scan
              </button>
            </div>

            <p className="mt-3 text-xs text-zinc-600">
              Example: https://example.com
            </p>
          </div>
        </section>

        {/* Scanner checks */}
        <section className="mt-6 border border-zinc-800 bg-zinc-900/20">
          <div className="border-b border-zinc-800 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">
                  Scanner Checks
                </h3>

                <p className="mt-1 text-xs text-zinc-600">
                  The following checks will run automatically.
                </p>
              </div>

              <span className="text-xs text-zinc-600">
                9 checks
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {scanModules.map((module) => {
              const Icon = module.icon;

              return (
                <div
                  key={module.name}
                  className="flex items-start gap-3 border-b border-r border-zinc-800 px-5 py-4"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-zinc-800 bg-zinc-900 text-zinc-500">
                    <Icon size={16} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">
                        {module.name}
                      </p>

                      <Check
                        size={14}
                        className="text-green-500"
                      />
                    </div>

                    <p className="mt-1 text-xs leading-5 text-zinc-600">
                      {module.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Scan process */}
        <section className="mt-6 border border-zinc-800 bg-zinc-900/20">
          <div className="border-b border-zinc-800 px-5 py-4">
            <h3 className="text-sm font-semibold">
              Scan Process
            </h3>

            <p className="mt-1 text-xs text-zinc-600">
              ThreatLens will execute the checks sequentially.
            </p>
          </div>

          <div className="grid divide-y divide-zinc-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="px-5 py-5">
              <p className="text-xs text-zinc-600">01</p>
              <p className="mt-2 text-sm font-medium">
                Target validation
              </p>
              <p className="mt-1 text-xs leading-5 text-zinc-600">
                Validate the URL and establish a connection.
              </p>
            </div>

            <div className="px-5 py-5">
              <p className="text-xs text-zinc-600">02</p>
              <p className="mt-2 text-sm font-medium">
                Security analysis
              </p>
              <p className="mt-1 text-xs leading-5 text-zinc-600">
                Execute the configured vulnerability checks.
              </p>
            </div>

            <div className="px-5 py-5">
              <p className="text-xs text-zinc-600">03</p>
              <p className="mt-2 text-sm font-medium">
                Risk assessment
              </p>
              <p className="mt-1 text-xs leading-5 text-zinc-600">
                Aggregate findings and calculate the final risk level.
              </p>
            </div>
          </div>
        </section>

        {/* Authorization warning */}
        <section className="mt-6 flex gap-3 border border-yellow-500/20 bg-yellow-500/[0.03] p-4">
          <AlertTriangle
            size={18}
            className="mt-0.5 shrink-0 text-yellow-500"
          />

          <div>
            <p className="text-sm font-medium text-yellow-500">
              Authorized testing only
            </p>

            <p className="mt-1 text-xs leading-5 text-zinc-500">
              Only scan websites and systems that you own or have explicit
              permission to assess. Unauthorized security testing may be
              illegal.
            </p>
          </div>
        </section>

        {/* Bottom action */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            to="/dashboard"
            className="flex h-10 items-center justify-center border border-zinc-800 px-5 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          >
            Cancel
          </Link>

          <button className="flex h-10 items-center justify-center gap-2 bg-blue-600 px-5 text-sm font-medium transition hover:bg-blue-700">
            <ScanLine size={16} />
            Start Security Scan
          </button>
        </div>
      </main>
    </div>
  );
};

export default NewScan;