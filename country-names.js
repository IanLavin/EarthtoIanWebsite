const COUNTRY_NAMES = {
  US: "United States",
  PE: "Peru",
  AU: "Australia",
};

export function countryName(code) {
  if (!code) return "";
  return COUNTRY_NAMES[code] ?? code;
}

export default COUNTRY_NAMES;
