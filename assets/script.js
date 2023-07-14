var currentDate = dayjs().format("(MM/DD/YYYY)");
var dateToday = document.querySelector(".dateToday");
dateToday.innerHTML = currentDate;
var searchBtn = document.querySelector('#searchBtn');
//Will add later for local storage
var cityHistory = [];


function getGeo(event) {
  event.preventDefault();
  var inputField = document.getElementById("inputField").value;
  console.log(inputField);

  var requestGeoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + inputField + '&limit=1&appid=fcafd102401c66de2b3db010da96e87c';
  fetch(requestGeoUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      console.log(lat,lon);
      getWeather(lat,lon);
    })
};

function getWeather(lat,lon) {
  var requestWeatherUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&units=imperial&appid=fcafd102401c66de2b3db010da96e87c';
  console.log(requestWeatherUrl);
  fetch(requestWeatherUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
}

searchBtn.addEventListener("click", getGeo);

