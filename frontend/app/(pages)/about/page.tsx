import type { Metadata } from "next";
import HeroSection from "./components/HeroSection";
import MissionVisionSection from "./components/MissionVisionSection";
import CoreValuesSection from "./components/CoreValuesSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import TeamSection from "./components/TeamSection";
import CTASection from "./components/CTASection";


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

// Stats Data
const statsData = [
  { value: "50K+", label: "Active Users" },
  { value: "2,000+", label: "Partner Stores" },
  { value: "100K+", label: "Products" },
  { value: "50KM", label: "Radius" },
];

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NearByDeals",
  description:
    "Local shopping platform connecting customers with verified stores within 50KM",
  url: "https://nearbydeals.com",
  logo: "https://nearbydeals.com/logo.png",
  foundingDate: "2024",
  sameAs: [
    "https://facebook.com/nearbydeals",
    "https://twitter.com/nearbydeals",
    "https://instagram.com/nearbydeals",
    "https://linkedin.com/company/nearbydeals",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-800-NEARBY",
    contactType: "customer service",
    availableLanguage: ["English"],
  },
};

export default function AboutPage() {
  return (
    <>
      {/* JSON-LD Structured Data and  this is for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
