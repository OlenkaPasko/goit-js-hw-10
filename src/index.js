import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

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

  //інтерфейс
  //Якщо у відповіді бекенд повернув більше ніж 10 країн, в інтерфейсі
  fetchCountries(searchValue).then(result => {
    if (result.length > 10) {
      Notify.info(
        'Too many matches found. Please, enter a more specific name.'
      );
      return;
    }
    renderedCountries(result);
  });
}
function renderedCountries(result) {
  const input = result.length;

  if (inputLetters === 1) {
    countryList.innerHTML = '';
    countryCardMarkup(result);
  }
  //Якщо бекенд повернув від 2-х до 10-и країн,
  if (input > 1 && input <= 10) {
    countryInfo.innerHTML = '';
    countriesList(result);
  }
}
function countriesList(result) {
  const listMarkup = result
    .map(({ name, flags }) => {
      return `<li>
                         <img src="${flags.svg}" alt="${name}" width="60" height="auto">
                         <span>${name.official}</span>
                 </li>`;
    })
    .join('');
  countryList.innerHTML = listMarkup;
  return listMarkup;
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
