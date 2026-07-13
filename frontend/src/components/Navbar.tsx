import logo from "../assets/threatlens-logo.png";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-zinc-800 bg-[#09090B]/95">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-1">
          <div className="origin-top transition-transform duration-300 hover:-rotate-3">
          <img
            src={logo}
            alt="ThreatLens Logo"
            className="h-16 w-auto object-contain"
          />
        </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            ThreatLens
          </h1>
        </a>

        {/* Right Side */}
        <div className="flex items-center gap-8">
          <button className="text-lg font-medium text-zinc-300 transition duration-300 hover:text-white">
            Login
          </button>

          
        </div>
      </nav>
    </header>
  );
};

export default Navbar;