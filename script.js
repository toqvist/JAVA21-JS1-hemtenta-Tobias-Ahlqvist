//Skriv all kod här
//KEY: 988b6ed27d7e444cabd31e2df91bdfc7
const KEY = '988b6ed27d7e444cabd31e2df91bdfc7'

const btn = document.querySelector('button');
const input = document.querySelector('input');

btn.innerText = 'Search'
btn.addEventListener('click', search)


//Select current-weather display elements
const currentDescription = document.getElementById('current-description');
const currentTemp = document.getElementById('current-temp');
const currentWind = document.getElementById('current-wind');
const currentHumidity = document.getElementById('current-humidity');
const currentWeatherIcon = document.getElementById('current-weather-icon');

const errorMessage = document.getElementById('error-message');

const forecastElements = document.getElementsByClassName('forecast')
//currentDescription.innerText = "sunny"

function search () {
    clearDisplay();
    let city = input.value;
    
    getCurrentWeather(city);
    getForecast(city);
}

function getCurrentWeather (city) {
    // const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${KEY}&include=minutely`
    //lang=[language]

    const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${KEY}&include=minutely&lang=sv`
    console.log("url: " + url)
    


    fetch(url).then(
        function (response) {

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
    console.log("url: " + url)
    
    fetch(url).then(
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
        
    )
}

function displayCurrentWeather(currentWeather) {
    console.log(currentWeather);

    currentDescription.innerText = `${currentWeather.data[0].weather.description}`
    currentTemp.innerText = `Temperatur: ${Math.round(currentWeather.data[0].temp)}`;
    currentWind.innerText = `Vindhastighet: ${Math.round(currentWeather.data[0].wind_spd)};`
    currentHumidity.innerText = `Luftfuktighet: ${Math.round(currentWeather.data[0].rh)}`;

    const icon = currentWeather.data[0].weather.icon;
    currentWeatherIcon.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`

    // console.log(currentWeather.data[0].temp)
    // console.log(currentWeather.data[0].wind_spd)
    // console.log(currentWeather.data[0].rh)

}

function displayForecast(forecast) {
    
    console.log(forecast);
    
    // currentWeatherIcon.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`

    
    // currentDescription.innerText = `${currentWeather.data[0].weather.description}`
    // currentTemp.innerText = `Temperatur: ${Math.round(currentWeather.data[0].temp)}`;
    
    const forecastChildren = forecastElements[0].children;
        //Icon
        const icon = forecast.data[0].weather.icon;
        forecastChildren[0].src = "https://www.weatherbit.io/static/img/icons/${icon}.png"

    //Dubbelkolla så att 0 inte är idag
    // for (let i=0;i<1;i++) {
    //     const forecastChildren = forecastElements[0].children;
    //     //Icon
    //     const icon = forecast.data[i].weather.icon;
    //     forecastChildren[0].src = "https://www.weatherbit.io/static/img/icons/${icon}.png"
    //     //Description
    //     //forecastChildren[1].innerText = 
    //     //Temp
    // }

}

function displayError (){
    errorMessage.innerText = "City not found."

}

function clearDisplay () {
    errorMessage.innerText = "";
}