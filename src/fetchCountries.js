const BASE_URL = 'https://restcountries.com/v3.1';

export function filteredCountries(countryName) {
  return fetch(
    `${BASE_URL}/name/${countryName}?fields=name,capital,population,flags,languages`
  ).then(r => {
    if (r.status === 404) {
      throw new Error();
    }
    return r.json();
  });
}
