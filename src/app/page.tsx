import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import StatsBar from "@/components/landing/StatsBar";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import BrainPreview from "@/components/landing/BrainPreview";
import WhoIsThisFor from "@/components/landing/WhoIsThisFor";
import ExamMarquee from "@/components/landing/ExamMarquee";
import CollegePreview from "@/components/landing/CollegePreview";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import CTABanner from "@/components/landing/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <StatsBar />
      <FeaturesGrid />
      <BrainPreview />
      <WhoIsThisFor />
      <ExamMarquee />
      <CollegePreview />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
