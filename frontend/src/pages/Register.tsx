import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        {/* Left Side */}
        <div className="hidden w-1/2 flex-col justify-center px-16 lg:flex">
          <h1 className="text-5xl font-bold leading-tight">
            Welcome to
            <span className="text-blue-500"> ThreatLens</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-zinc-400">
            Analyze websites, detect vulnerabilities, monitor threats, and stay
            one step ahead of cyber attacks.
          </p>

          <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h3 className="text-xl font-semibold">Why ThreatLens?</h3>

            <ul className="mt-4 space-y-3 text-zinc-400">
              <li>✓ AI-powered vulnerability analysis</li>
              <li>✓ Real-time threat intelligence</li>
              <li>✓ Security reports & dashboards</li>
              <li>✓ Scan history & analytics</li>
            </ul>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-lg">
            <h2 className="text-3xl font-bold">
              Create Your Account 🚀
            </h2>

            <p className="mt-2 text-zinc-400">
              Join ThreatLens and start securing your applications.
            </p>

            {/* Full Name */}
            <div className="mt-8">
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Full Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 pr-12 text-white outline-none transition focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 pr-12 text-white outline-none transition focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="mt-5 flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 rounded border-zinc-600 bg-zinc-800"
              />

              <p className="text-sm text-zinc-400">
                I agree to the{" "}
                <span className="cursor-pointer text-blue-500 hover:text-blue-400">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="cursor-pointer text-blue-500 hover:text-blue-400">
                  Privacy Policy
                </span>
                .
              </p>
            </div>

            {/* Create Account Button */}
            <button className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold transition hover:bg-blue-700">
              Create Account
            </button>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="h-px flex-1 bg-zinc-700"></div>

              <span className="px-4 text-sm text-zinc-500">OR</span>

              <div className="h-px flex-1 bg-zinc-700"></div>
            </div>

            {/* Google Placeholder */}
            <button
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-zinc-700 py-3 text-zinc-500"
            >
              Continue with Google (Coming Soon)
            </button>

            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-500 hover:text-blue-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;