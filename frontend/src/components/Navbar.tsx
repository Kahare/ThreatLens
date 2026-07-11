import { Shield } from "lucide-react";
function Navbar() {
  return (
    <nav className="bg-[#0B1120] border-b border-zinc-800 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Logo */}
        <div className="flex items-center gap-2">
        <Shield size={28} className="text-cyan-400" />

        <h1 className="text-xl font-bold">
            Threat Lens
        </h1>
       </div>

        {/* Navigation */}
        <div className="flex gap-8">
          <a
            href="#"
            className="hover:text-cyan-400 transition-colors duration-200"
        >
            Features
        </a>

          <a href="#" className="hover:text-cyan-400 transition-colors duration-200">
            Docs
          </a>

          <a href="#" className="hover:text-cyan-400 transition-colors duration-200">
            GitHub
          </a>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
        className="px-4 py-2 rounded-xl hover:scale-105 transition-colors duration-200"
        >
            Login
        </button>

          <button
        className="bg-cyan-400 text-black px-5 py-2 rounded-xl font-semibold hover:bg-cyan-300 transition-all duration-200 shadow-lg shadow-cyan-500/20"
        >
            Get Started
        </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;