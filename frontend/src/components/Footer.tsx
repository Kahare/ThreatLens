import logo from "../assets/threatlens-logo.png";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-zinc-800">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 text-center md:flex-row md:text-left">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="ThreatLens Logo"
            className="h-10 w-auto object-contain"
          />

          <h2 className="text-xl font-bold text-white">
            Threat<span className="text-zinc-400">Lens</span>
          </h2>
        </div>

        {/* Footer Text */}
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} ThreatLens. Built for smarter web security.
        </p>

      </div>
    </footer>
  );
};

export default Footer;