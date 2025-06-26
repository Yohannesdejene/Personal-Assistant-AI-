import Image from "next/image";
import Header from "@/components/Header";
import HeroSection from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import SeeItInAction from "@/components/SeeItInAction";
export default function Home() {
  return (
    <div className="bg-white ">
      <main className="gradient-primary text-white font-sans  ">
        <Header />
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <SeeItInAction />
        <Footer />
      </main>
    </div>
  );
}
