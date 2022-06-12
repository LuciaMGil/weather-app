
var button = $('#submit-btn');
var inputVal = $('#user-input');
var citiesBtn = $(".citiesBtn");
var currentWeather = $('#display-current-weather');
var cityName = $(`#city-name`);
var forecastDiv = $("#forecastDiv");
var today = moment().format("dddd, MMMM Do, YYYY");
var cities = [{
    name: "Atlanta",
    lat: 33.7698,
    lon: -84.4146,
}];

$("#current-date").text(today);
// Runs an API that with gather the input value and get its latitude and longitude, then executes those values to the weather app function
getLatLon = () => {
    fetch(`http://api.positionstack.com/v1/forward?access_key=e787a7efe77d71459dd6e00b2fe0e586&query=${inputVal.val()}&country=US`)
    .then(response => response.json())
    .then(data => {
        var cityInput = {
            name: inputVal.val(),
            lat: data.data[0].latitude,
            lon: data.data[0].longitude,
        }
        cities.push(cityInput);
        // Runs the function cityBtn which creates a button for every new city entered
        cityBtn();
        getCurrentWeather(cityInput.lat,cityInput.lon);
        console.log(cities);
    })
}

// On click run get latitude/longitude function and change header
button.click(e => {
    getLatLon();    
});

// Gets current wather from API, appends info adds it to local storage
getCurrentWeather = (lat, lon) => {
    var todaysWeatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely&appid=eca4a1901a7a41c8ceead4f3f120e01b`;
    fetch (todaysWeatherAPI)
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
        cityName.empty();
        cityName.append(`<h4 class = cap>${inputVal.val()}</h4>`);
        currentWeather.append(`<ul> <li> Temp: ${temp} F </li> <li>Wind speed: ${windSpeed} MPH </li> <li>Humidity: ${humidity}% </li> <li>UV Index: ${uvi}</li></ul>`);
    
        forecastDiv.empty();
        // We need temp wind and humidity
        for (let i=0; i < 5; i++) {
            var date = new Date(data.daily[i].dt * 1000);
            var dateFormat = moment(date).format("dddd, MMMM Do YYYY");
            console.log(dateFormat);
            var temp = data.daily[i].temp.day;
            var humidity = data.daily[i].humidity;
            var forecastedWindSpeed = data.daily[i].wind_speed;
            console.log(temp + `F`);
            var ForecastCol = $(`<div class="col card card-body forecastCards col-sm-2" data-type="` + i + `"> <ul><li>${dateFormat}</li><li>Temp: ${temp} F° </li> <li>Humidity: ${humidity}% </li><li> Wind Speed: ${forecastedWindSpeed} MPH <li></ul></div>`);
            forecastDiv.append(ForecastCol);
        }

        localStorage.setItem("city",)
        
    })
    .catch(error => console.log('error'))
}


// Every time a new city is typed in this function creates a button
cityBtn = () => {
    citiesBtn.empty();
    cities.forEach(city => {
        citiesBtn.append(`<button class = "btn btn-primary citiesBtn cap" value="${city}">${city.name}</button><br/>`);
    })

}

citiesBtn.on("click", getCurrentWeather(citiesBtn.val().lat,citiesBtn.val().lon));




