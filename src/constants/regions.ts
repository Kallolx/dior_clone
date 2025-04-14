export type Country = {
  name: string;
  code: string;
};

export type Continent = {
  name: string;
  code: string;
  countries: Country[];
};

export const continents: Continent[] = [
  {
    name: 'Asia Pacific',
    code: 'AP',
    countries: [
      { name: 'Australia', code: 'AU' },
      { name: '中国大陆', code: 'CN' },
      { name: '香港特別行政區 (繁體中文)', code: 'HK_ZH' },
      { name: '香港特別行政區 (English)', code: 'HK_EN' },
      { name: '臺灣地區', code: 'TW' },
      { name: '日本', code: 'JP' },
      { name: '한국', code: 'KR' },
      { name: 'Indonesia', code: 'ID' },
      { name: 'Malaysia', code: 'MY' },
      { name: 'Singapore', code: 'SG' },
      { name: 'Thailand (ภาษาไทย)', code: 'TH_TH' },
      { name: 'Thailand (English)', code: 'TH_EN' },
      { name: 'Vietnam', code: 'VN' },
      { name: 'New Zealand', code: 'NZ' },
      { name: 'India', code: 'IN' },
      { name: 'Bangladesh', code: 'BD' },
    ],
  },
  {
    name: 'North America',
    code: 'NA',
    countries: [
      { name: 'Canada (English)', code: 'CA_EN' },
      { name: 'Canada (Français)', code: 'CA_FR' },
      { name: 'United States', code: 'US' },
    ],
  },
  {
    name: 'South America',
    code: 'SA',
    countries: [
      { name: 'Brasil', code: 'BR' },
      { name: 'América Latina', code: 'LAT' },
    ],
  },
  {
    name: 'Middle East',
    code: 'ME',
    countries: [
      { name: 'United Arab Emirates', code: 'AE' },
      { name: 'Saudi Arabia', code: 'SA' },
    ],
  },
  {
    name: 'Europe',
    code: 'EU',
    countries: [
      { name: 'Österreich (English)', code: 'AT_EN' },
      { name: 'Österreich (Deutsch)', code: 'AT_DE' },
      { name: 'België (Français)', code: 'BE_FR' },
      { name: 'België (Nederlands)', code: 'BE_NL' },
      { name: 'Bulgaria', code: 'BG' },
      { name: 'Czech Republic', code: 'CZ' },
      { name: 'Croatia', code: 'HR' },
      { name: 'Cyprus', code: 'CY' },
      { name: 'Denmark', code: 'DK' },
      { name: 'Deutschland', code: 'DE' },
      { name: 'España', code: 'ES' },
      { name: 'Estonia', code: 'EE' },
      { name: 'Finland', code: 'FI' },
      { name: 'France', code: 'FR' },
      { name: 'Greece', code: 'GR' },
      { name: 'Latvia', code: 'LV' },
      { name: 'Lithuania', code: 'LT' },
      { name: 'Luxemburg', code: 'LU' },
      { name: 'Nederland', code: 'NL' },
      { name: 'Norway', code: 'NO' },
      { name: 'Россия', code: 'RU' },
      { name: 'Poland', code: 'PL' },
      { name: 'Portugal', code: 'PT' },
      { name: 'Romania', code: 'RO' },
      { name: 'Slovakia', code: 'SK' },
      { name: 'Slovenia', code: 'SI' },
      { name: 'Sweden', code: 'SE' },
      { name: 'Switzerland (English)', code: 'CH_EN' },
      { name: 'Switzerland (Français)', code: 'CH_FR' },
      { name: 'Switzerland (Deutsch)', code: 'CH_DE' },
    ],
  },
]; 