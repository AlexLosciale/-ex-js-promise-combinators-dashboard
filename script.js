//In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query),

//  che accetta una città come input e recupera simultaneamente:

//Nome completo della città e paese da  /destinations?search=[query]
//(result.name, result.country, nelle nuove proprietà city e country).
//Il meteo attuale da /weathers?search={query}
//(result.temperature e result.weather_description nella nuove proprietà temperature e weather).
//Il nome dell’aeroporto principale da /airports?search={query}
//(result.name nella nuova proprietà airport).
//Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.

//Nota: a differenza di quanto visto finora negli esempi, per accedere all'API utilizzare utilizzare l'url base:
//https://boolean-spec-frontend.vercel.app/freetestapi
//al posto di:
//https://freetestapi.com/api/v1

//Ad esempio:
//https://boolean-spec-frontend.vercel.app/freetestapi/users
//per chiamare l'endpoint /users

//Note del docente:

//Scrivi la funzione getDashboardData(query), che deve:
//Essere asincrona (async).
//Utilizzare Promise.all() per eseguire più richieste in parallelo.
//Restituire una Promise che risolve un oggetto contenente i dati aggregati.
//Stampare i dati in console in un messaggio ben formattato.
//Testa la funzione con la query "london"

//Esempio di utilizzo:

//getDashboardData('london')
//    .then(data => {
//        console.log('Dasboard data:', data);
//        console.log(
//            `${data.city} is in ${data.country}.\n` +
//            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
//            `The main airport is ${data.airport}.\n`
//        );
//    })
//    .catch(error => console.error(error));

async function getDashboardData(query) {
    try {
        const [destinationResponse, weatherResponse, airportResponse] = await Promise.all([
            fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`),
            fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`),
            fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`)
        ]);

        const destinationData = await destinationResponse.json();
        const weatherData = await weatherResponse.json();
        const airportData = await airportResponse.json();

        return {
            city: destinationData[0].name,
            country: destinationData[0].country,
            temperature: weatherData[0].temperature,
            weather: weatherData[0].weather_description,
            airport: airportData[0].name
        };
    } catch (error) {
        console.error(error);
    }
}

getDashboardData('london')
    .then(data => {
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));




