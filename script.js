
var button = $('#submit-btn');
var inputVal = $('#user-input');
var citiesBtn = $("#citiesBtn");
var currentWeather = $('#display-current-weather');
var today = moment();

$("#current-date").text(moment().format("dddd, MMMM Do, YYYY"));


getApi = (lat, lon) => {
fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,daily&appid=eca4a1901a7a41c8ceead4f3f120e01b`)
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

    console.log(`Temp: ` + temp + `F Wind speed: ` + windSpeed + ` MPH Humidity: ` + humidity + `% UV Index: ` + uvi );
    currentWeather.append(`<ul> <li> Temp: ${temp} F </li> <li>Wind speed: ${windSpeed} MPH </li> <li>Humidity: ${humidity}% </li> <li>UV Index: ${uvi}</li></ul>`);
    
  


})

.catch(error => console.log('error'))
}

// Runs an API that with gather the input value and get its latitude and longitude, then executes those values to the weather app function
getLatLon = () => {
    fetch(`http://api.positionstack.com/v1/forward?access_key=e787a7efe77d71459dd6e00b2fe0e586&query=${inputVal.val()}&country=US`)
    .then(response => response.json())
    .then(data => {
        var lon = data.data[0].longitude;
        var lat = data.data[0].latitude;
        getApi(lat,lon);
    })
}

// Every time a new city is typed in this function creates a button
cityBtn = () => {
    citiesBtn.append(`<button class = "btn btn-primary" >${inputVal.val()}</button><br/>`);
}

// On click run get latitude/longitude function
button.click(e => {
    getLatLon();
});


