
var button = $('#submit-btn');
var inputVal = $('#user-input');
var citiesBtn = $("#citiesBtn")




getApi = (lat, lon) => {
fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,daily&appid=eca4a1901a7a41c8ceead4f3f120e01b`)
.then(response => response.json())
.then(data => {
    console.log(data);
    city();

    
        
    // When you click on button and get value THEN you need to display city name, date, temp,wind speed, humidity, uv index
    currentWeather = () => {
        // var temp = data.data;
    var temp = JSON.stringify(data.current.temp);
    console.log(`Temp: ` + temp);
    };

currentWeather();
})

.catch(error => console.log('error'))
}

getLatLon = () => {
    fetch(`http://api.positionstack.com/v1/forward?access_key=e787a7efe77d71459dd6e00b2fe0e586&query=${inputVal.val()}&country=US`)
    .then(response => response.json())
    .then(data => {
        var lon = data.data[0].longitude;
        var lat = data.data[0].latitude;
        getApi(lat,lon);
    })
}

city = () => {
    citiesBtn.append(`<button class = "btn btn-primary" >${inputVal.val()}</button><br/>`);


}

button.click(e => {
    getLatLon();
});


