import React, { useEffect, useState } from "react";
import { getABTestVariant, trackABTestEvent } from "@/utils/abTesting";

const cruzVermelhaHeroTestConfig = {
  testName: 'cruzVermelhaHero',
  variants: [
    'https://redcross.eu/uploads/files/Latest%20News/EUAV%20Interview%20with%20Margherita/IMG_4.JPG',
    'https://media-assets.stryker.com/is/image/stryker/Red%20Cross%20Zambia?$max_width_1440$',
    'https://www.icrc.org/sites/default/files/styles/desktop_full/public/2024-07/V-P-PY-E-00173-%28003%29.jpg.webp'
  ]
};

export function CruzVermelhaHeroImage() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const variant = getABTestVariant(cruzVermelhaHeroTestConfig);
    setImageUrl(variant);
    trackABTestEvent(cruzVermelhaHeroTestConfig.testName, variant, 'view');
  }, []);

  return (
    <div className="hidden lg:flex lg:w-1/2 relative">
      <div 
        className="w-full bg-cover bg-center"
        style={{
          backgroundImage: `url('${imageUrl}')`
        }}
      >
        <div className="absolute inset-0 bg-red-900/20" />
      </div>
    </div>
  );
} 