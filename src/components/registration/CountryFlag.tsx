
// Component to display country flags
export const getCountryFlag = (code: string) => {
  const flags: Record<string, string> = {
    // European Union
    at: "🇦🇹", be: "🇧🇪", bg: "🇧🇬", hr: "🇭🇷", cy: "🇨🇾",
    cz: "🇨🇿", dk: "🇩🇰", ee: "🇪🇪", fi: "🇫🇮", fr: "🇫🇷",
    de: "🇩🇪", gr: "🇬🇷", hu: "🇭🇺", ie: "🇮🇪", it: "🇮🇹",
    lv: "🇱🇻", lt: "🇱🇹", lu: "🇱🇺", mt: "🇲🇹", nl: "🇳🇱",
    pl: "🇵🇱", pt: "🇵🇹", ro: "🇷🇴", sk: "🇸🇰", si: "🇸🇮",
    es: "🇪🇸", se: "🇸🇪",
    // Caribbean Islands
    ag: "🇦🇬", bs: "🇧🇸", bb: "🇧🇧", cu: "🇨🇺", dm: "🇩🇲",
    do: "🇩🇴", gd: "🇬🇩", ht: "🇭🇹", jm: "🇯🇲", kn: "🇰🇳",
    lc: "🇱🇨", vc: "🇻🇨", tt: "🇹🇹"
  };
  return flags[code] || "";
};

interface CountryFlagProps {
  countryCode: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({ countryCode }) => {
  const flag = getCountryFlag(countryCode);
  
  if (!flag) return null;
  
  return <span className="mr-4">{flag}</span>;
};
