
var button = $('#submit-btn');
var inputVal = $('#user-input');




getApi = (lat, lon) => {
fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=eca4a1901a7a41c8ceead4f3f120e01b`)
.then(response => response.json())
.then(data => {
    console.log(data);
})

.catch(error => console.log('error'))
}

getLatLon = () => {
    fetch(`http://api.positionstack.com/v1/forward?access_key=e787a7efe77d71459dd6e00b2fe0e586&query=${inputVal.val()}&country=US`)
    .then(response => response.json())
    .then(data => {
        console.log(data.data)
        var lon = data.data[0].longitude;
        console.log(lon);
        var lat = data.data[0].latitude;
        getApi(lat,lon);
    })
}

button.click(e => {
    getLatLon();
});