"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import HeroSection from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import SeeItInAction from "@/components/SeeItInAction";
import { authClient } from "@/lib/auth-client";

const { data: session } = await authClient.getSession();

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);
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
