const currentDate = dayjs().format("(MM/DD/YYYY)");
let dateToday = document.querySelector(".dateToday");
dateToday.innerHTML = currentDate;

let cities = [];
let searchBtn = document.getElementById('searchBtn');
let cardBodyOne = document.getElementById('cardBodyOne');
let cardBodyTwo = document.getElementById('cardBodyTwo');
let cardBodyThree = document.getElementById('cardBodyThree');
let cardBodyFour = document.getElementById('cardBodyFour');
let cardBodyFive = document.getElementById('cardBodyFive');

// Added days for 5-day forecast
const dayOne = dayjs().add(1, "day").format("MM/DD/YYYY");
const dayTwo = dayjs().add(2, "day").format("MM/DD/YYYY");
const dayThree = dayjs().add(3, "day").format("MM/DD/YYYY");
const dayFour = dayjs().add(4, "day").format("MM/DD/YYYY");
const dayFive = dayjs().add(5, "day").format("MM/DD/YYYY");

// Array to store the day names
let dayNames = [];

// Array to store the cardBody elements
const cardBodies = [cardBodyOne, cardBodyTwo, cardBodyThree, cardBodyFour, cardBodyFive];

// Searched cities
 cities = JSON.parse(localStorage.getItem("allCities")) || [];
const searchHistory = document.getElementById("searchHistory");

// Function to create and append weather information for a day
 const createWeatherInfo = (dayIndex, data) => {
 const cardBody = cardBodies[dayIndex - 1]; 
 const dayName = dayNames[dayIndex - 1];
 const h = document.createElement("h4");
 const pTemp = document.createElement("p");
  pTemp.setAttribute("class", "temp");
  const pFeel = document.createElement("p");
  const pWind = document.createElement("p");
  const pHumidity = document.createElement("p");
  const weatherIcon = document.createElement("img");

  h.textContent = dayName;
  pTemp.textContent = Math.round(data.daily[dayIndex].temp.max) + "°F";
  pFeel.textContent = "Feels Like: " + data.daily[dayIndex].feels_like.day + "°F";
  pWind.textContent = "Wind: " + data.daily[dayIndex].wind_speed + " MPH";
  pHumidity.textContent = "Humidity: " + data.daily[dayIndex].humidity + "%";
  
  // Set the weather icon source
  weatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + data.daily[dayIndex].weather[0].icon + ".png");

  cardBody.innerHTML = '';
  cardBody.appendChild(h);
  cardBody.appendChild(weatherIcon);
  cardBody.appendChild(pTemp);
  cardBody.appendChild(pFeel);
  cardBody.appendChild(pWind);
  cardBody.appendChild(pHumidity);
}

// Populate the dayNames array
for (let i = 1; i <= 5; i++) {
  dayNames.push(dayjs().add(i, "day").format("MM/DD/YYYY"));
}

const getGeo=(cityName)=> {
  const requestGeoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=fcafd102401c66de2b3db010da96e87c';
  fetch(requestGeoUrl)
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data && data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        document.getElementById("cityNameHeader").innerHTML = cityName + " " + currentDate;
        console.log(lat, lon);
        getWeather(lat, lon);
      } else {
        console.error('No data found for city: ' + cityName);
      }
    })
}

const getWeather = (lat, lon)=> {
  const requestWeatherUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&units=imperial&appid=fcafd102401c66de2b3db010da96e87c';
  console.log(requestWeatherUrl);
  fetch(requestWeatherUrl)
    .then(response=> {
      console.log(response);
      return response.json();
    })
    .then(data=> {
      console.log(data);
      cardGroup.style.visibility = 'visible';
      document.getElementById("temp").innerHTML = Math.round(data.current.temp) + "°F";
      document.getElementById("feelsLike").innerHTML = "Feels Like: " + data.current.feels_like + "°F";
      document.getElementById("wind").innerHTML = "Wind: " + data.current.wind_speed + " MPH";
      document.getElementById("hum").innerHTML = "Humidity: " + data.current.humidity + "%";

      // Clearing weather icon before adding a new one
      weatherIcon.innerHTML = '';

      // Weather Icons
      const wIcon = document.createElement("img");
      wIcon.setAttribute("src", "http://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png");
      weatherIcon.appendChild(wIcon);

      // Using a loop to create and append weather info for each day
      for (let i = 1; i <= 5; i++) {
        createWeatherInfo(i, data);
      }
    });
};

searchBtn.addEventListener("click", ()=> {
  event.preventDefault();
  const cities = JSON.parse(localStorage.getItem("allCities")) || [];
  const cityName = document.getElementById("cityName").value;
  cities.push(cityName);
  localStorage.setItem("allCities", JSON.stringify(cities));
  const newCityButton = document.createElement("button");
  newCityButton.textContent = cityName;
  newCityButton.setAttribute("class", "btn w-100 mt-3");
  newCityButton.setAttribute("id", "historyCity");
  searchHistory.appendChild(newCityButton);
  getGeo(cityName);
});

searchHistory.addEventListener("click", event => {
  if (event.target && event.target.nodeName == "BUTTON") {
    event.preventDefault();
    const cityName = event.target.textContent;
    getGeo(cityName);
  }
});
