type CountryObject = {
  city?: string | null;
  country?: {
    code?: string;
    id?: number;
    name?: string;
    partnerIds?: number[];
  };
  postCode?: string | null;
  street?: string;
};

// Function to format the address
export function formatAddress(obj?: CountryObject): string {
  if (!obj) return '';

  const { city, country, postCode, street } = obj;
  const countryName = country?.name || "";

  // Create an array of the address components
  const addressComponents = [street, city, postCode, countryName];

  // Filter out any undefined or empty components and join them with a comma and space
  return addressComponents.filter((component) => component).join(", ");
}
