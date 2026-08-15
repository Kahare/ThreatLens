import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="mx-auto mt-32 max-w-7xl px-6">
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 px-8 py-20 text-center">

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
        </div>

        <h2 className="text-5xl font-bold text-white">
          Ready to Secure Your
        </h2>

        <h2 className="mt-2 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-5xl font-bold text-transparent">
          Web Applications?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          Scan smarter, discover vulnerabilities faster, and generate
          professional security reports—all from one modern platform.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-7 py-3 font-semibold text-white transition duration-300 hover:scale-105">
            Start Scanning
            <ArrowRight size={18} />
          </button>

          <button className="rounded-xl border border-zinc-700 px-7 py-3 font-semibold text-white transition hover:border-violet-500 hover:bg-zinc-800">
            View Documentation
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;