export const fetchCountries = async name => {
  const params = new URLSearchParams({
    fields: `name,capital,population,flags,languages,`,
  });
  const response = await fetch('https://restcountries.com/v3.1/name/${name}?${params}');
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};
