var currentDate = dayjs().format("(MM/DD/YYYY)");
var dateToday = document.querySelector(".dateToday");
    dateToday.innerHTML = currentDate;
var cardGroup = document.getElementById('cardGroup');
var searchBtn = document.getElementById('searchBtn');
var cityName = document.getElementById('cityName');
var weatherIcon = document.getElementById("weatherIcon");
var days = document.getElementById("days");
var weatherIcon =  document.getElementById('weatherIcon');
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

var weatherIconOne;
var weatherIconTwo; 
var weatherIconThree; 
var weatherIconFour; 
var weatherIconFive;

//Will add later for local storage
var cityHistory = [];


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
      cardGroup.style.visibility = 'visible';
      document.getElementById("temp").innerHTML = "Temp: " + Math.round(data.current.temp) + "°F";
      document.getElementById("wind").innerHTML = "Wind: " + data.current.wind_speed + " MPH";
      document.getElementById("hum").innerHTML = "Humidity: " + data.current.humidity + "%";

      // // Weather Icons
      var wIcon = document.createElement("img");
      wIcon.setAttribute("src", "http://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png");
      weatherIcon.appendChild(wIcon);

      var wIconOne = document.createElement("img");
      wIconOne.setAttribute("src", "http://openweathermap.org/img/w/" + data.daily[1].weather[0].icon + ".png");
      cardBodyOne.appendChild(wIconOne);

      var wIconTwo = document.createElement("img");
      wIconTwo.setAttribute("src", "http://openweathermap.org/img/w/" + data.daily[2].weather[0].icon + ".png");
      cardBodyTwo.appendChild(wIconTwo);

      var wIconThree = document.createElement("img");
      wIconThree.setAttribute("src", "http://openweathermap.org/img/w/" + data.daily[3].weather[0].icon + ".png");
      cardBodyThree.appendChild(wIconThree);

      
      var wIconFour = document.createElement("img");
      wIconFour.setAttribute("src", "http://openweathermap.org/img/w/" + data.daily[4].weather[0].icon + ".png");
      cardBodyFour.appendChild(wIconFour);

      var wIconFive = document.createElement("img");
      wIconFive.setAttribute("src", "http://openweathermap.org/img/w/" + data.daily[5].weather[0].icon + ".png");
      cardBodyFive.appendChild(wIconFive);

    //Day One
    var h1 = document.createElement("h4");
    var p1a = document.createElement("p");
    var p1b = document.createElement("p");
    var p1c = document.createElement("p");
    h1.textContent = dayOne;
    p1a.textContent = "Temp: " + Math.round(data.daily[1].temp.max) + '°F';
    p1b.textContent = "Wind: " + data.daily[1].wind_speed + 'MPH';
    p1c.textContent = "Humidity: " + data.daily[1].humidity + '%';
    cardBodyOne.appendChild(h1);
    cardBodyOne.appendChild(p1a);
    cardBodyOne.appendChild(p1b);
    cardBodyOne.appendChild(p1c);
    
    //Day Two
    var h2 = document.createElement("h4");
    var p2a = document.createElement("p");
    var p2b = document.createElement("p");
    var p2c = document.createElement("p");
    h2.textContent = dayTwo;
    p2a.textContent = "Temp: " + Math.round(data.daily[2].temp.max) + '°F';
    p2b.textContent = "Wind: " + data.daily[2].wind_speed + 'MPH';
    p2c.textContent = "Humidity: " + data.daily[2].humidity + '%';
    cardBodyTwo.appendChild(h2);
    cardBodyTwo.appendChild(p2a);
    cardBodyTwo.appendChild(p2b);
    cardBodyTwo.appendChild(p2c);

    //Day Three
    var h3 = document.createElement("h4");
    var p3a = document.createElement("p");
    var p3b = document.createElement("p");
    var p3c = document.createElement("p");
    h3.textContent = dayThree;
    p3a.textContent = "Temp: " + Math.round(data.daily[3].temp.max) + '°F';
    p3b.textContent = "Wind: " + data.daily[3].wind_speed + 'MPH';
    p3c.textContent = "Humidity: " + data.daily[3].humidity + '%';
    cardBodyThree.appendChild(h3);
    cardBodyThree.appendChild(p3a);
    cardBodyThree.appendChild(p3b);
    cardBodyThree.appendChild(p3c);

    //Day Four
    var h4 = document.createElement("h4");
    var p4a = document.createElement("p");
    var p4b = document.createElement("p");
    var p4c = document.createElement("p");
    h4.textContent = dayFour;
    p4a.textContent = "Temp: " + Math.round(data.daily[4].temp.max) + '°F';
    p4b.textContent = "Wind: " + data.daily[4].wind_speed + 'MPH';
    p4c.textContent = "Humidity: " + data.daily[4].humidity + '%';
    cardBodyFour.appendChild(h4);
    cardBodyFour.appendChild(p4a);
    cardBodyFour.appendChild(p4b);
    cardBodyFour.appendChild(p4c);

    //Day Five
    var h5 = document.createElement("h4");
    var p5a = document.createElement("p");
    var p5b = document.createElement("p");
    var p5c = document.createElement("p");
    h5.textContent = dayFive;
    p5a.textContent = "Temp: " + Math.round(data.daily[5].temp.max) + '°F';
    p5b.textContent = "Wind: " + data.daily[5].wind_speed + 'MPH';
    p5c.textContent = "Humidity: " + data.daily[5].humidity + '%';
    cardBodyFive.appendChild(h5);
    cardBodyFive.appendChild(p5a);
    cardBodyFive.appendChild(p5b);
    cardBodyFive.appendChild(p5c);
    })
};

searchBtn.addEventListener("click", function() {
  cardBodyOne.innerHTML = '';
  cardBodyTwo.innerHTML = '';
  cardBodyThree.innerHTML = '';
  cardBodyFour.innerHTML = '';
  cardBodyFive.innerHTML = '';
  weatherIcon.innerHTML = '';
  getGeo(event);
});

