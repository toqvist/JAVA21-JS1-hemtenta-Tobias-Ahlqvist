//Skriv all kod här
//API-key from weatherbit.io
const KEY = '988b6ed27d7e444cabd31e2df91bdfc7'

//Get input form and button elements from the DOM
const btn = document.querySelector('button');
const input = document.querySelector('input');

//When button is clicked, call the search function
btn.addEventListener('click', search)

//Select all display elements so that we can modify their content later
const currentDescription = document.getElementById('current-description');
const currentTemp = document.getElementById('current-temp');
const currentWind = document.getElementById('current-wind');
const currentHumidity = document.getElementById('current-humidity');
const currentWeatherIcon = document.getElementById('current-weather-icon');

const errorMessage = document.getElementById('error-message');

const forecastElements = document.getElementsByClassName('forecast');

function search () {
    //Remove error message (if it exists)
    clearDisplay();

    //Get input from form
    let city = input.value;

    //Make API calls for current weather and weather forecast
    getCurrentWeather(city);
    getForecast(city);
}

function getCurrentWeather (city) {
    
    const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${KEY}&include=minutely&lang=sv`

    fetch(url).then(
        function (response) {
            //If data is successful, return the data as a JSON
            if(response.status>=200 && response.status<300){
                return response.json();
            }
            else{
                displayError(response.status);
                throw 'Error: ' + response.status;

            }
        }
    )
    .then(
        function (data) {
            displayCurrentWeather(data)
            return data;
        }
    ).catch (
        function () {
            displayError();
        }
    )
}

function getForecast (city) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${KEY}&lang=sv`

    fetch(url).then(
        //If data is successful, return the data as a JSON
        function (response) {

            if(response.status>=200 && response.status<300){
                return response.json();// displayData (getCurrentWeather(city), getForecast(city))
            }
            else{
                displayError(response.status);
                throw 'Error: ' + response.status;

            }
        }
     )
    .then(
        function (data) {
            displayForecast(data)
            return data;
        }
    ).catch (
        function () {
            displayError();
        }
    )
}

function displayCurrentWeather(currentWeather) {
    
    //Get data from JSON file and modify display element contents to match the JSON data. 
    currentDescription.innerText = `${currentWeather.data[0].weather.description}`
    currentTemp.innerText = `Temperatur: ${Math.round(currentWeather.data[0].temp)}°C`;
    currentWind.innerText = `Vindhastighet: ${Math.round(currentWeather.data[0].wind_spd)};`
    currentHumidity.innerText = `Luftfuktighet: ${Math.round(currentWeather.data[0].rh)}`;

    const icon = currentWeather.data[0].weather.icon;
    currentWeatherIcon.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`

}

function displayForecast(forecast) {
    
    //Loop through an array of forecast-div-card-elements
    for (let i=0;i<5;i++) {
      
        //Get the display elements of the current forecast card
        const imgE = forecastElements[i].querySelector("img");
        const descE = forecastElements[i].querySelector(".description")
        const tempE = forecastElements[i].querySelector(".temperature")
        

        //Get data from JSON and modify the display elements of each forecast card. 
        //We use i+1 because we are not interested in the forecast for today, 
        //index 0 is today's forecast.
        const icon = forecast.data[i+1].weather.icon;
        imgE.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`

        descE.innerText = `${forecast.data[i+1].weather.description}`
        tempE.innerText = `Temperatur: ${Math.round(forecast.data[i+1].temp)}°C`;
    }

}

function displayError (){
    errorMessage.innerText = "City not found."
}

function clearDisplay () {
    errorMessage.innerText = "";
}