
import { useState, useEffect } from "react";

interface CountryFlag {
  name: string;
  code: string;
  flag: string;
}

// This map contains country names to ISO 3166-1 alpha-2 codes
const countryCodeMap: Record<string, string> = {
  "Nigeria": "NG",
  "Ghana": "GH",
  "South Africa": "ZA",
  "Tanzania": "TZ",
  "Kenya": "KE",
  "Angola": "AO",
  "Zimbabwe": "ZW",
  "Uganda": "UG",
  "Ivory Coast": "CI",
  "Côte d'Ivoire": "CI",
  "Senegal": "SN",
  "Cameroon": "CM",
  "Congo": "CG",
  "Democratic Republic of the Congo": "CD",
  "DRC": "CD",
  "Mali": "ML",
  "Zambia": "ZM",
  "Mozambique": "MZ",
  "Benin": "BJ",
  "Togo": "TG",
  "Rwanda": "RW",
  "Gabon": "GA",
  "Burkina Faso": "BF",
  "Guinea": "GN",
  "Ethiopia": "ET",
};

export function useCountryFlags() {
  const [flags, setFlags] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFlags = async () => {
      setLoading(true);
      const flagData: Record<string, string> = {};
      
      // Create flags for all countries in our map
      Object.entries(countryCodeMap).forEach(([country, code]) => {
        flagData[country] = `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
      });
      
      setFlags(flagData);
      setLoading(false);
    };
    
    loadFlags();
  }, []);

  const getFlag = (countryName: string): string => {
    if (!countryName) return '';
    return flags[countryName] || '';
  };

  return { flags, getFlag, loading };
}
