
var checkWeatherBtn = $('#submit-btn');
var inputVal = $('#user-input');
var citiesBtn = $("#citiesBtn");
var currentWeather = $('#display-current-weather');
var cityName = $(`#city-name`);
var forecastDiv = $("#forecastDiv");
var today = moment().format("dddd, MMMM Do, YYYY");
var cities = [{
    name: "Atlanta",
    lat: 33.7698,
    lon: -84.4146,
}];

$(document).ready( function () {
    var storedCityArray = JSON.parse(localStorage.getItem("savedCities"));
    if (storedCityArray) {
        cities = storedCityArray
    }
    getCurrentWeather(cities[0].lat,cities[0].lon);
    cityBtn();
    
});

// Displays current date
$("#current-date").text(today);
console.log( JSON.parse(localStorage.getItem('storedCities')))
// Runs an API that with gather the input value and get its latitude and longitude, then executes those values to the weather app function
getLatLon = () => {
    fetch(`http://api.positionstack.com/v1/forward?access_key=e787a7efe77d71459dd6e00b2fe0e586&query=${inputVal.val()}&country=US`)
    .then(response => response.json())
    .then(data => {
        // Where we store new city information
        var cityInput = {
            name: inputVal.val(),
            lat: data.data[0].latitude,
            lon: data.data[0].longitude,
        } 
        
        // Clear previous appended name and add new one
        cityName.empty();
        cityName.append(`<h4 class="cap">${inputVal.val()}</h4>`);

        cities.push(cityInput);
        storeCities();
        
        // Runs the function cityBtn which creates a button for every new city entered
        cityBtn();
        // Runs weather data for the lat and lon of city entered
        getCurrentWeather(cityInput.lat,cityInput.lon);
       
        
    })
}

// SAVE CITIES
storeCities = () => {
    localStorage.setItem("savedCities", JSON.stringify(cities));
}
// When check weather button is clicked then getLatLon function and change header
checkWeatherBtn.click(e => {
    getLatLon();    
});

// Gets current wather from API, appends info adds it to local storage
getCurrentWeather = (lat, lon) => {
    var weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely&appid=eca4a1901a7a41c8ceead4f3f120e01b`;
    fetch (weatherAPI)
    .then(response => response.json())
    .then(data => {
        console.log(data);
       
        // Display name, date, temp,wind speed, humidity, uv index
        var temp = data.current.temp;
        var windSpeed = data.current.wind_speed;
        var humidity = data.current.humidity;
        var uvi = data.current.uvi;
        // Creates currentWeather div with information on the current weather
        currentWeather.empty();
      

        // RUN CITY NAME APPEND H4 WHEN CLICKED AND WHEN WRITTEN AND ENTERED
       
        currentWeather.append(`<ul><li> Temp: ${temp} F°  </li> <li>Wind speed: ${windSpeed} MPH </li> <li>Humidity: ${humidity}% </li> <li>UV Index: ${uvi}</li></ul>`);
        
        forecastDiv.empty();
        // We need temp wind and humidity
        for (let i=0; i < 5; i++) {
            var date = new Date(data.daily[i].dt * 1000);
            var dateFormat = moment(date).format("ddd, MMMM Do YYYY");
            var temp = data.daily[i].temp.day;
            var humidity = data.daily[i].humidity;
            var forecastedWindSpeed = data.daily[i].wind_speed;
            var ForecastCol = $(`<div class="col card card-body forecastCards col-sm-2 shadow-sm text-left data-type="` + i + `"> <ul><h6 style="text-decoration: underline">${dateFormat}</h6> <br> <li>Temp: ${temp} F° </li> <li>Humidity: ${humidity}% </li><li> Wind Speed: ${forecastedWindSpeed} MPH <li></ul></div>`);
            forecastDiv.append(ForecastCol);
        }
        
    })
    .catch(error => console.log('error'))
}


// Every time a new city is typed in this function creates a button
cityBtn = () => {
    citiesBtn.empty();
    cities.forEach(city => {
        citiesBtn.append(`<button class = "btn btn-primary citiesBtn shadow-sm cap" value="${city}">${city.name}</button><br/>`);
    })

}


// When you click a city button then that cities weather info will be displayed
citiesBtn.on("click", function (e) {
    var cityText = e.target.textContent
    var matchingCity = getItemByName(cities, cityText);
    getCurrentWeather(matchingCity.lat,matchingCity.lon);
    cityName.empty();
    cityName.append(`<h4 class>${cityText}</h4>`);

});

// Gets object if button text equals name value in city object
getItemByName = (cities, name) => {
var ret = cities.filter(function (city) {
    return city.name === name;
});
return ret[0];
}


