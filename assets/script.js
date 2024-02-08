const currentDate = dayjs().format("(MM/DD/YYYY)");
const dateToday = document.querySelector(".dateToday");
dateToday.innerHTML = currentDate;

const cardBodies = [
  document.getElementById('cardBodyOne'),
  document.getElementById('cardBodyTwo'),
  document.getElementById('cardBodyThree'),
  document.getElementById('cardBodyFour'),
  document.getElementById('cardBodyFive')
];

// Array to store the day names
const dayNames = [];
const searchHistory = document.getElementById("searchHistory");

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
  pTemp.textContent = `${Math.round(data.daily[dayIndex].temp.max)}°F`;
  pFeel.textContent = `Feels Like: ${data.daily[dayIndex].feels_like.day}°F`;
  pWind.textContent = `Wind: ${data.daily[dayIndex].wind_speed} MPH`;
  pHumidity.textContent = `Humidity: ${data.daily[dayIndex].humidity}%`;
  
  // Set the weather icon source
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/w/${data.daily[dayIndex].weather[0].icon}.png`);

  cardBody.innerHTML = '';
  cardBody.appendChild(h);
  cardBody.appendChild(weatherIcon);
  cardBody.appendChild(pTemp);
  cardBody.appendChild(pFeel);
  cardBody.appendChild(pWind);
  cardBody.appendChild(pHumidity);
};

// Populate the dayNames array
for (let i = 1; i <= 5; i++) {
  dayNames.push(dayjs().add(i, "day").format("MM/DD/YYYY"));
}

const getGeo = (cityName) => {
  const requestGeoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=fcafd102401c66de2b3db010da96e87c`;
  fetch(requestGeoUrl)
    .then(response => response.json())
    .then(data => {
      if (data && data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        document.getElementById("cityNameHeader").innerHTML = `${cityName} ${currentDate}`;
        getWeather(lat, lon);
      } else {
        console.error('No data found for city: ' + cityName);
      }
    });
};

const getWeather = (lat, lon) => {
  const requestWeatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=fcafd102401c66de2b3db010da96e87c`;
  fetch(requestWeatherUrl)
    .then(response => response.json())
    .then(data => {
      cardGroup.style.visibility = 'visible';
      document.getElementById("temp").innerHTML = `${Math.round(data.current.temp)}°F`;
      document.getElementById("feelsLike").innerHTML = `Feels Like: ${data.current.feels_like}°F`;
      document.getElementById("wind").innerHTML = `Wind: ${data.current.wind_speed} MPH`;
      document.getElementById("hum").innerHTML = `Humidity: ${data.current.humidity}%`;

      // Clearing weather icon before adding a new one
      weatherIcon.innerHTML = '';

      // Weather Icons
      const wIcon = document.createElement("img");
      wIcon.setAttribute("src", `http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`);
      weatherIcon.appendChild(wIcon);

      // Using a loop to create and append weather info for each day
      for (let i = 1; i <= 5; i++) {
        createWeatherInfo(i, data);
      }
    });
};

searchBtn.addEventListener("click", () => {
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

searchHistory.addEventListener("click", (event) => {
  if (event.target && event.target.nodeName == "BUTTON") {
    event.preventDefault();
    const cityName = event.target.textContent;
    getGeo(cityName);
  }
});
