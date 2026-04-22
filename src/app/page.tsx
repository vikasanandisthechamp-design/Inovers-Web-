import { HeroSection } from "@/components/sections/hero";
import { WhatIsSection } from "@/components/sections/what-is";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { EcosystemSection } from "@/components/sections/ecosystem";
import { LiveActivitySection } from "@/components/sections/live-activity";
import { SuccessStoriesSection } from "@/components/sections/success-stories";
import { InstitutionsSection } from "@/components/sections/institutions";
import { CtaSection } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatIsSection />
      <HowItWorksSection />
      <EcosystemSection />
      <LiveActivitySection />
      <SuccessStoriesSection />
      <InstitutionsSection />
      <CtaSection />
    </>
  );
}
