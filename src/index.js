import './css/styles.css';
import { filteredCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const ref = {
  input: document.getElementById('search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

ref.input.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

function inputHandler(e) {
  const textInput = e.target.value.trim();
  if (!textInput) {
    ref.info.innerHTML = '';
    return;
  }

  filteredCountries(textInput)
    .then(sortCountries)
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function sortCountries(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name');
    return;
  } else if (countries.length === 1) {
    ref.info.innerHTML = '';
    renderCountry(countries[0]);
    return;
  }
  ref.info.innerHTML = '';
  countries.forEach(el => {
    renderCountries(el);
  });
}

function renderCountries(country) {
  const markup = `<div class ="main__country">
                    <img src="${country.flags.svg}" alt="${country.name.common} width="50" height="50">
                    <p class="countryName">${country.name.common}</p>
                  </div>`;
  ref.info.insertAdjacentHTML('afterbegin', markup);
}

function renderCountry(country) {
  const markup = `<div class ="main__country">
                    <img src="${country.flags.svg}" alt="${country.name.common} width="50" height="50">
                    <p class="countryName">${country.name.common}</p>
                  </div>
                  <p><span style="font-weight:bold;">Capital:  </span>${country.capital}</p>
                  <p><span style="font-weight:bold;">Population:  </span>${country.population}</p>
                  <p><span style="font-weight:bold;">Languages:  </span>${country.languages}</p>`;
  ref.info.innerHTML = markup;
}
