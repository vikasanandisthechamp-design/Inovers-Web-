import { HeroSection } from "@/components/sections/hero";
import { ProductPreviewSection } from "@/components/sections/product-preview";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { FeaturesSection } from "@/components/sections/features";
import { LiveActivitySection } from "@/components/sections/live-activity";
import { CategoriesSection } from "@/components/sections/categories";
import { SuccessStoriesSection } from "@/components/sections/success-stories";
import { CommunitySection } from "@/components/sections/community";
import { InstitutionsSection } from "@/components/sections/institutions";
import { CtaSection } from "@/components/sections/cta";
import { AcceleratorTakeover } from "@/components/accelerator/homepage-takeover";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AcceleratorTakeover />
      <ProductPreviewSection />
      <HowItWorksSection />
      <FeaturesSection />
      <LiveActivitySection />
      <CategoriesSection />
      <SuccessStoriesSection />
      <CommunitySection />
      <InstitutionsSection />
      <CtaSection />
    </>
  );
}
