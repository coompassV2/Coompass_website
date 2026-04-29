import { useEffect } from 'react';
import { getABTestVariant, trackABTestEvent } from '@/utils/abTesting';
import { homepageHeroTest } from '@/config/abTests';
import { HeroVariantA } from './hero-variants/HeroVariantA';
import { HeroVariantB } from './hero-variants/HeroVariantB';
import { HeroVariantC } from './hero-variants/HeroVariantC';
import { HeroVariantD } from './hero-variants/HeroVariantD';
import { HeroVariantE } from './hero-variants/HeroVariantE';
import { HeroVariantF } from './hero-variants/HeroVariantF';

export function HeroABTest() {
  const variant = getABTestVariant(homepageHeroTest);

  useEffect(() => {
    trackABTestEvent(homepageHeroTest.testName, variant, 'view');
  }, [variant]);

  const renderVariant = (selectedVariant: string) => {
    switch (selectedVariant) {
      case 'A':
        return <HeroVariantA />;
      case 'B':
        return <HeroVariantB />;
      case 'C':
        return <HeroVariantC />;
      case 'D':
        return <HeroVariantD />;
      case 'E':
        return <HeroVariantE />;
      case 'F':
        return <HeroVariantF />;
      default:
        return <HeroVariantA />;
    }
  };

  return renderVariant(variant);
}
