import type { Metadata } from "next";
import HeroSection from "./components/HeroSection";
import MissionVisionSection from "./components/MissionVisionSection";
import CoreValuesSection from "./components/CoreValuesSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import TeamSection from "./components/TeamSection";
import CTASection from "./components/CTASection";
import { statsData, aboutJsonLd } from "@/store";

// SEO Metadata
export const metadata: Metadata = {
  title: "About Us | NearByDeals - Local Shopping Platform",
  description:
    "Learn about NearByDeals - Your trusted local shopping platform connecting you to verified stores, instant deals, and premium products within 50KM. Discover our mission, vision, and the team behind the platform.",
  keywords: [
    "about NearByDeals",
    "local shopping",
    "nearby deals",
    "local stores",
    "same day delivery",
    "verified stores",
    "community shopping",
    "local marketplace",
  ],
  openGraph: {
    title: "About Us | NearByDeals - Local Shopping Platform",
    description:
      "Discover NearByDeals - Your trusted local shopping companion. Find verified stores, get same-day delivery, and support local businesses within 50KM.",
    type: "website",
    locale: "en_US",
    siteName: "NearByDeals",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "NearByDeals - About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | NearByDeals",
    description:
      "Your trusted local shopping platform connecting you to verified stores and premium products within 50KM.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* JSON-LD Structured Data and  this is for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <HeroSection statsData={statsData} />

        {/* Mission & Vision */}
        <MissionVisionSection />

        {/* Core Values */}
        <CoreValuesSection />

        {/* Why Choose Us */}
        <WhyChooseUsSection />

        {/* Team Section */}
        <TeamSection />

        {/* CTA Section */}
        <CTASection />
      </main>
    </>
  );
}
