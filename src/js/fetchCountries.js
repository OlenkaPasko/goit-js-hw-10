export const fetchCountries = name => {
  const params = new URLSearchParams({
    fields: `name,capital,population,flags,languages,`,
  });
  return fetch(`https://restcountries.com/v3.1/name/${name}?${params}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status === 404);
      }
      return response.json();
    }
  );
};
