import React from "react";
import Navbar from "../components/layout/Navbar";
import LandingHero from "../components/home/LandingHero";
import CategoriesSection from "../components/home/CategoriesSection";
import NearbyProviders from "../components/home/NearbyProviders";
import { HowItWorksSection } from "../components/home/HowItWorksSection";
import BecomeProviderBanner from "../components/home/BecomeProviderBanner";
import Footer from "../components/layout/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Navbar />
      <main className="flex-1">
        <LandingHero />
        <CategoriesSection />
        <NearbyProviders />
        <HowItWorksSection />
        <BecomeProviderBanner />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
