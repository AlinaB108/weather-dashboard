var APIkey = 'fcafd102401c66de2b3db010da96e87c';
var currentDate = dayjs().format("(MM/DD/YYYY)");
var dateToday = document.querySelector(".dateToday");
dateToday.innerHTML = currentDate;
var searchBtn = document.querySelector('#searchBtn');
var cityHistory = [];



function getGeo(e) {
  event.preventDefault()
  var inputField = document.getElementById("inputField").value;
  console.log(inputField);

  var requestGeoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + inputField + '&limit=1&appid=fcafd102401c66de2b3db010da96e87c';
  fetch(requestGeoUrl)
    .then(function (response) {
      console.log(response);
      return response.json();l
    })
    .then(function (data) {
      console.log(data);
    })
}

searchBtn.addEventListener("click", getGeo);
