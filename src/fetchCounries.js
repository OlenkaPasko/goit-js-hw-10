
/*Метод fetch() надає сучасний інтерфейс для формування запитів 
до сервера і побудований на промісах.

Напиши функцію fetchCountries(name), яка робить HTTP-запит на ресурс name 
і повертає проміс з масивом країн - результатом запиту. 
Винеси її в окремий файл fetchCountries.js і зроби іменований експорт. */

/*fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    // Response handling
  })
  .then(data => {
    // Data handling
  })
  .catch(error => {
    // Error handling
  });*/

//https://restcountries.com/v3.1/all
//https://restcountries.com/v3.1/name/{name}?fullText=true
//https://restcountries.com/v3.1/name/{name}

const fetchCountries = name => {
  const params = new URLSearchParams({
    fields: `name,capital,population,flags,languages,`,
  });
  return fetch(
    'https://restcountries.com/v3.1/name/${name}?${params.toString()}'
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};