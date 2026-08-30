import {
  AlertTriangle,
  Check,
  Cookie,
  FileText,
  Globe,
  Lock,
  LoaderCircle,
  Network,
  Play,
  RefreshCw,
  ScanLine,
  Server,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const NewScan = () => {
  const navigate = useNavigate();

  const [target, setTarget] = useState("");
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

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

  const startScan = async () => {
      setError("");

      let url = target.trim();

      if (!url) {
        setError("Please enter a target URL.");
        return;
      }

      // Allow users to enter example.com instead of https://example.com
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://${url}`;
      }

      // Validate URL
      try {
        new URL(url);
      } catch {
        setError("Please enter a valid website URL.");
        return;
      }

      setScanning(true);

      const token =
        localStorage.getItem("threatlens_token") ||
        sessionStorage.getItem("threatlens_token");

      try {
        const response = await api.post(
          "/api/scan",
          {
            target: url,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Save the complete scan result
        sessionStorage.setItem(
          "threatlens_scan_result",
          JSON.stringify(response.data)
        );

        // Go to findings after successful scan
        navigate("/findings");
      } catch (err: any) {
        console.error("Scan failed:", err);

        const message =
          err?.response?.data?.detail ||
          "Unable to complete the scan. Please make sure the backend is running.";

        setError(message);
      } finally {
        setScanning(false);
      }
    }; 
    

      

  return (
    <>
      {/* Page Header */}
      <header className="flex h-16 items-center justify-between border-b border-zinc-800 px-5 sm:px-7">
        <div>
          <h1 className="text-base font-semibold sm:text-lg">
            New Security Scan
          </h1>

          <p className="mt-0.5 hidden text-xs text-zinc-600 sm:block">
            Configure and start a vulnerability assessment.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-600">
          <span
            className={`h-2 w-2 ${
              scanning ? "animate-pulse bg-yellow-500" : "bg-green-500"
            }`}
          />

          {scanning ? "Scanner running" : "Scanner ready"}
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-7">
        {/* Intro */}
        <section>
          <p className="text-xs font-medium uppercase tracking-wider text-blue-500">
            Vulnerability Scanner
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Start a Security Scan
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
                  value={target}
                  onChange={(e) => {
                    setTarget(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !scanning) {
                      startScan();
                    }
                  }}
                  disabled={scanning}
                  placeholder="https://example.com"
                  className="h-11 w-full border border-zinc-800 bg-[#09090B] pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-700 transition focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              <button
                type="button"
                onClick={startScan}
                disabled={scanning}
                className="flex h-11 items-center justify-center gap-2 bg-blue-600 px-6 text-sm font-medium transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-600/50"
              >
                {scanning ? (
                  <>
                    <LoaderCircle
                      size={16}
                      className="animate-spin"
                    />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    Start Scan
                  </>
                )}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 border border-red-500/20 bg-red-500/[0.03] px-4 py-3">
                <p className="text-xs text-red-400">
                  {error}
                </p>
              </div>
            )}

            <p className="mt-3 text-xs text-zinc-600">
              Example: https://example.com
            </p>
          </div>
        </section>

        {/* Scanner Checks */}
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

        {/* Scan Process */}
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

        {/* Authorization Warning */}
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

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            to="/dashboard"
            className="flex h-10 items-center justify-center border border-zinc-800 px-5 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          >
            Cancel
          </Link>

          <button
            type="button"
            onClick={startScan}
            disabled={scanning}
            className="flex h-10 items-center justify-center gap-2 bg-blue-600 px-5 text-sm font-medium transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-600/50"
          >
            {scanning ? (
              <>
                <LoaderCircle
                  size={16}
                  className="animate-spin"
                />
                Scanning...
              </>
            ) : (
              <>
                <ScanLine size={16} />
                Start Security Scan
              </>
            )}
          </button>
        </div>
      </main>
    </>
  );
};

export default NewScan;