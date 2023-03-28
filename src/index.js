import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const inputCount = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
const DEBOUNCE_DELAY = 300;

inputCount.addEventListener("input", debounce(inputBox, DEBOUNCE_DELAY));
    function inputBox(e){
        e.preventDefault();

    let countryName = e.target.value.trim();
if(!countryName) {
    countryList.innerHTML = ""; 
    countryInfo.innerHTML = "";
    return;
}
fetchCountries(countryName)
.then(country => {
if(country.length > 10) {
    countryList.innerHTML = ""; 
    countryInfo.innerHTML = "";
    Notiflix.Notify.failure("Too many matches found. Please enter a more specific name.");
} else if (country.length === 1){
    selectedCountry(country);
   countryList.innerHTML = ""; 
} else  {
    selectedCountries(country);
    countryInfo.innerHTML = "";
}
})
.catch(() => {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    countryList.innerHTML = ""; 
    countryInfo.innerHTML = "";
  });
};


function selectedCountries(country) {
    const markupUl = country 
    .map(({name, flags}) => {
        return `<ul style="list-style:none"><li class="countries">
        <img src = "${flags.svg}" class="flags" width="50px" height="30px"/>
        <p class="countries__name">${name.common}</p>
        </li></ul>`;
    })
    .join("");
    countryList.innerHTML = markupUl;
}
function selectedCountry(country) {
    const markupInfo = country
    .map(({ name, flags, capital, population, languages }) => {
        return `<div class="country">
        <img src = "${flags.svg}" width="50px" height="30px"></img>
        <h3 class="country__name"> ${name.common}</h3></div>
        <p><b>Capital</b>: ${capital}</p>
        <p><b>Population</b>: ${population}</p>
        <p><b>Languages</b>: ${Object.values(languages)}</p>`
    })
    .join("");
    countryInfo.innerHTML = markupInfo;
}
