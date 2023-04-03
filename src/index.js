import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

//Поле пошуку
function onInputSearch(event) {
  const searchValue = searchBox.value.trim();
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (!searchValue) return;

  fetchCountries(searchValue)
    .then(result => {
      function renderedCountries(result) {
        const inputLetters = result.length;

        if (inputLetters === 1) {
          countryList.innerHTML = '';
          countryCardMarkup(result);
        }

        if (inputLetters > 1 && inputLetters <= 10) {
          countryInfo.innerHTML = '';
          countryList.innerHTML = countriesListMarkup(result);
        }

        if (result.length > 10) {
          Notify.info(
            'Too many matches found. Please, enter a more specific name.'
          );
          return;
        }
      }
      renderedCountries(result);
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });

  //Фільтрація полів

  function countriesListMarkup(result) {
    const listMarkup = result
      .map(({ name, flags }) => {
        return `<li>
                         <img src="${flags.svg}" alt="${name}" width="60" height="auto">
                         <span>${name.official}</span>
                 </li>`;
      })
      .join('');
    countriesListMarkup.innerHTML = listMarkup;
    return listMarkup;
  }
}

function countryCardMarkup(result) {
  const cardMarkup = result
    .map(({ flags, name, capital, population, languages }) => {
      languages = Object.values(languages).join(', ');
      return `
             <img src="${flags.svg}" alt="${name}" width="320" height="auto">
             <p> ${name.official}</p>
             <p>Capital: <span> ${capital}</span></p>
             <p>Population: <span> ${population}</span></p>
             <p>Languages: <span> ${languages}</span></p>`;
    })
    .join('');
  countryInfo.innerHTML = cardMarkup;
  return cardMarkup;
}
