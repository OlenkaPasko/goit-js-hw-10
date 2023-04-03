export const fetchCountries = (name) => {
  const params = new URLSearchParams({
    fields: `name,capital,population,flags,languages,`,
  });
  const response = fetch('https://restcountries.com/v3.1/name/${name}?${params}');
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
};
