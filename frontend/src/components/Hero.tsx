import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-6 pt-36 text-center">
      <h1 className="bg-gradient-to-b from-cyan via-zinc-100 to-zinc-400 bg-clip-text text-6xl font-bold tracking-tight text-transparent md:text-7xl lg:text-6xl">
        THREATLENS
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
        AI-Powered Web Vulnerability Intelligence Platform. Automatically crawl
        endpoints, fuzz parameters, map vectors to MITRE ATT&CK frameworks, and
        generate instant secure code remediations.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-7 py-3 font-semibold text-white transition duration-300 hover:scale-105">
          Start Vulnerability Scan
          <ArrowRight size={18} />
        </button>

        <button className="rounded-xl border border-zinc-700 bg-zinc-900 px-7 py-3 font-semibold text-zinc-200 transition duration-300 hover:border-zinc-500 hover:bg-zinc-800">
          View Security Dashboard
        </button>
      </div>
    </section>
  );
};

export default Hero;