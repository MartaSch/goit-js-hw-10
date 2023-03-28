
export function fetchCountries(name) {
    //const searchParams = new URLSearchParams({fields: 'name, capital, population, flags, languages'});
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then((response) => {
        if(!response.ok) {
            throw new Error('Error-1');
        }
        return response.json();
    })
    
}