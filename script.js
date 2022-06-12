
var button = $('#submit-btn');
var inputVal = $('#user-input');
var citiesBtn = $("#citiesBtn");
var currentWeather = $('#display-current-weather');
var cityName = $(`#city-name`);
var today = moment();

$("#current-date").text(moment().format("dddd, MMMM Do, YYYY"));
// Runs an API that with gather the input value and get its latitude and longitude, then executes those values to the weather app function
getLatLon = () => {
    fetch(`http://api.positionstack.com/v1/forward?access_key=e787a7efe77d71459dd6e00b2fe0e586&query=${inputVal.val()}&country=US`)
    .then(response => response.json())
    .then(data => {
        var lat = data.data[0].latitude;
        var lon = data.data[0].longitude;
        getCurrentWeather(lat,lon);
        getForecast(lat,lon);
    })
}

// On click run get latitude/longitude function and change header
button.click(e => {
    getLatLon();
    cityName.append(`<h4 class = cap>${inputVal.val()}</h4>`);
    
});

// Gets current wather from API, appends info adds it to local storage
getCurrentWeather = (lat, lon) => {
    var todaysWeatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,daily&appid=eca4a1901a7a41c8ceead4f3f120e01b`;
    fetch (todaysWeatherAPI)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Runs the function cityBtn which creates a button for every new city entered
        cityBtn();

        // Display name, date, temp,wind speed, humidity, uv index
        var temp = data.current.temp;
        var windSpeed = data.current.wind_speed;
        var humidity = data.current.humidity;
        var uvi = data.current.uvi;
        // Creates currentWeather div with information on the current weather
        currentWeather.append(`<ul> <li> Temp: ${temp} F </li> <li>Wind speed: ${windSpeed} MPH </li> <li>Humidity: ${humidity}% </li> <li>UV Index: ${uvi}</li></ul>`);
    
        localStorage.setItem("city", inputVal.val());
        
    })
    .catch(error => console.log('error'))
}

getForecast = (lat, lon) => {
    var forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=eca4a1901a7a41c8ceead4f3f120e01b`;
    fetch (forecastAPI)
    .then (response => response.json())
    .then (data => {
        console.log(data);
        // We need temp wind and humidity
        for (let i=0; i < 6; i++) {
            var temp = data.list[i].main.temp;
            console.log(temp);
        }
    })
    .catch(error => console.log(error))
}


// Every time a new city is typed in this function creates a button
cityBtn = () => {
    citiesBtn.append(`<button class = "btn btn-primary citiesBtn cap" >${inputVal.val()}</button><br/>`);
}




