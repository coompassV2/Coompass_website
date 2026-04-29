
import { useState, useEffect } from "react";

interface Theme {
  background: string;
  logo: string;
}

interface ThemeOptions {
  default: Theme;
  caribbean: Theme;
}

export const useRegistrationTheme = () => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [logoImage, setLogoImage] = useState("");

  useEffect(() => {
    // Get the same theme that was selected in the login page
    const selectedTheme = localStorage.getItem('selectedTheme') || 'default';
    const themes: ThemeOptions = {
      default: {
        background: '/demo-hero.jpg',
        logo: '/lovable-uploads/4be2e00f-693c-4dd3-be7d-8a3ddce5c065.png'
      },
      caribbean: {
        background: '/lovable-uploads/2d5d215e-2b1c-40ee-b17f-bea9199f7d84.png',
        logo: '/lovable-uploads/70245805-0d4d-40c4-a0fd-3bb7a89fe469.png'
      }
    };
    
    setBackgroundImage(themes[selectedTheme as keyof ThemeOptions].background);
    setLogoImage(themes[selectedTheme as keyof ThemeOptions].logo);
  }, []);

  return { backgroundImage, logoImage };
};
