import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DashboardPreview from "../components/DashboardPreview";
import Features from "../components/Features";
import Workflow from "../components/Workflow";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090B]/70 backdrop-blur-md text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">

        {/* Purple */}
        <div className="absolute -left-64 -top-48 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[180px]" />

        {/* Blue */}
        <div className="absolute -right-64 top-20 h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[180px]" />

        {/* Cyan */}
        <div className="absolute bottom-[-250px] right-[15%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[220px]" />

      </div>
      

      

      <Navbar />
      <Hero />
      <DashboardPreview />
      <Features />
      <Workflow />
      <CTA />
      <Footer />
    </div>
  );
}

export default Landing;