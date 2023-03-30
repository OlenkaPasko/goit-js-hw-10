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
  const searchValue = searchBox.ariaValueMax.trim();
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (!searchValue) return;
}
/*Інтерфейс */
//fetchCountries();


/*Фільтрація полів
//function countryList()
//name.official - повна назва країни
capital - столиця
population - населення
flags.svg - посилання на зображення прапора
languages - масив мов

додай рядок параметрів запиту - таким чином цей бекенд реалізує фільтрацію полів.*/

//Обробка помилки
//fetchCountries.js