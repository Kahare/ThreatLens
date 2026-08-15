const DashboardPreview = () => {
  return (
    <section className="mx-auto mt-20 max-w-6xl px-6">
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#0C0C0F] shadow-2xl shadow-black/40">

        {/* Browser Header */}
        <div className="flex h-14 items-center border-b border-zinc-800 bg-[#101014] px-6">

          {/* Browser Buttons */}
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>

          {/* URL */}
          <div className="flex-1 text-center text-xs tracking-wide text-zinc-500">
            console.threatlens.io/workspace
          </div>
        </div>

        {/* Dashboard */}
        <div className="grid min-h-[360px] gap-6 bg-[#09090B] p-6 lg:grid-cols-[0.9fr_1.4fr]">

          {/* Left Side */}
          <div className="rounded-xl border border-zinc-800 bg-[#111217] p-6">

            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Security Rating
            </p>

            <div className="mt-6 flex items-center justify-between">

              <div>
                <h2 className="text-6xl font-bold text-white">
                  42
                </h2>

                <p className="mt-2 text-red-400">
                  Critical Risk
                </p>
              </div>

              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-red-500">
                <span className="text-xl font-bold text-white">
                  42
                </span>
              </div>

            </div>

            {/* Progress */}

            <div className="mt-10">

              <div className="mb-2 flex justify-between text-sm">
                <span className="text-zinc-400">
                  Scan Progress
                </span>

                <span className="text-violet-400">
                  42%
                </span>
              </div>

              <div className="h-2 rounded-full bg-zinc-800">
                <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-violet-500 to-blue-500"></div>
              </div>

            </div>

            <p className="mt-8 text-sm leading-6 text-zinc-500">
              18 vulnerabilities discovered across scanned endpoints.
            </p>

          </div>

          {/* Right Side */}

          <div className="rounded-xl border border-zinc-800 bg-[#111217] p-6">

            <div className="font-mono text-sm space-y-4">

              <p className="text-zinc-500">
                $ threatlens scan example.com
              </p>

              <p className="text-blue-400">
                [INFO] Starting scan...
              </p>

              <p className="text-green-400">
                [SUCCESS] 12 endpoints discovered
              </p>

              <p className="text-yellow-400">
                [WARNING] Missing security headers
              </p>

              <p className="text-red-400">
                [CRITICAL] SQL Injection vulnerability detected
              </p>

              <p className="text-green-400">
                [SUCCESS] Security report generated
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default DashboardPreview;