var currentDate = dayjs().format("(MM/DD/YYYY)");
var dateToday = document.querySelector(".dateToday");
dateToday.innerHTML = currentDate;

var searchBtn = document.getElementById('searchBtn');
var cardBodyOne = document.getElementById('cardBodyOne');
var cardBodyTwo = document.getElementById('cardBodyTwo');
var cardBodyThree = document.getElementById('cardBodyThree');
var cardBodyFour = document.getElementById('cardBodyFour');
var cardBodyFive = document.getElementById('cardBodyFive');

// Added days for 5-day forecast
var dayOne = dayjs().add(1, "day").format("MM/DD/YYYY");
var dayTwo = dayjs().add(2, "day").format("MM/DD/YYYY");
var dayThree = dayjs().add(3, "day").format("MM/DD/YYYY");
var dayFour = dayjs().add(4, "day").format("MM/DD/YYYY");
var dayFive = dayjs().add(5, "day").format("MM/DD/YYYY");

// Array to store the day names
var dayNames = [];

// Array to store the cardBody elements
var cardBodies = [cardBodyOne, cardBodyTwo, cardBodyThree, cardBodyFour, cardBodyFive];

// Function to create and append weather information for a day
function createWeatherInfo(dayIndex, data) {
  var cardBody = cardBodies[dayIndex - 1]; 
  var dayName = dayNames[dayIndex - 1];

  var h = document.createElement("h4");
  var pTemp = document.createElement("p");
  var pWind = document.createElement("p");
  var pHumidity = document.createElement("p");
  var weatherIcon = document.createElement("img"); // Create the weather icon element

  h.textContent = dayName;
  pTemp.textContent = "Temp: " + Math.round(data.daily[dayIndex].temp.max) + "°F";
  pWind.textContent = "Wind: " + data.daily[dayIndex].wind_speed + " MPH";
  pHumidity.textContent = "Humidity: " + data.daily[dayIndex].humidity + "%";
  
  // Set the weather icon source
  weatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + data.daily[dayIndex].weather[0].icon + ".png");

  cardBody.innerHTML = '';
  cardBody.appendChild(h);
  cardBody.appendChild(weatherIcon);
  cardBody.appendChild(pTemp);
  cardBody.appendChild(pWind);
  cardBody.appendChild(pHumidity);
}

// Populate the dayNames array
for (var i = 1; i <= 5; i++) {
  dayNames.push(dayjs().add(i, "day").format("MM/DD/YYYY"));
}

function getGeo(event) {
  event.preventDefault();
  var inputField = document.getElementById("inputField").value;
  console.log(inputField);

  var requestGeoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + inputField + '&limit=1&appid=fcafd102401c66de2b3db010da96e87c';
  fetch(requestGeoUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      document.getElementById("cityName").innerHTML = inputField + " " + currentDate;
      console.log(lat, lon);
      getWeather(lat, lon);
    })
};

function getWeather(lat, lon) {
  var requestWeatherUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&units=imperial&appid=fcafd102401c66de2b3db010da96e87c';
  console.log(requestWeatherUrl);
  fetch(requestWeatherUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      cardGroup.style.visibility = 'visible';
      document.getElementById("temp").innerHTML = "Temp: " + Math.round(data.current.temp) + "°F";
      document.getElementById("wind").innerHTML = "Wind: " + data.current.wind_speed + " MPH";
      document.getElementById("hum").innerHTML = "Humidity: " + data.current.humidity + "%";

      // Weather Icons
      var wIcon = document.createElement("img");
      wIcon.setAttribute("src", "http://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png");
      weatherIcon.appendChild(wIcon);

      // Using a loop to create and append weather info for each day
      for (var i = 1; i <= 5; i++) {
        createWeatherInfo(i, data);
      }
    });
};

searchBtn.addEventListener("click", function () {
  cardBodyOne.innerHTML = '';
  cardBodyTwo.innerHTML = '';
  cardBodyThree.innerHTML = '';
  cardBodyFour.innerHTML = '';
  cardBodyFive.innerHTML = '';
  weatherIcon.innerHTML = '';
  getGeo(event);
});