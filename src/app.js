const getData = async (lat, lon, units) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const apiKey = "D7ZPSP23W6LGWCHAFMMP22J8T";
  const unitGroup = units; // us = Fahrenheit, metric = Celcius

  let startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);
  startDate = startDate.toISOString().slice(0, 10);

  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 5);
  endDate = endDate.toISOString().slice(0, 10);

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/${startDate}/${endDate}?key=${apiKey}&unitGroup=${unitGroup}`;
  const response = await axios.get(url);

  if (response.hasOwnProperty("data")) {
    let dayCounter = 1;
    response.data.days.forEach((day) => {
      const dayName = days[new Date(day.datetime).getDay()];
      const minTemp = day.tempmin;
      const maxTemp = day.tempmax;
      const icon = day.icon;

      const dayNameHTML = document.querySelector(`#day${dayCounter}`);
      const temperatureMinHTML = document.querySelector(
        `#temperature-day${dayCounter}-min`
      );
      const temperatureMaxHTML = document.querySelector(
        `#temperature-day${dayCounter}-max`
      );
      let iconHTML = document.querySelector(`#icon${dayCounter}`);

      iconHTML.setAttribute("src", `img/${icon}.png`);
      dayNameHTML.innerHTML = dayName;
      temperatureMinHTML.innerHTML = Math.round(minTemp);
      temperatureMaxHTML.innerHTML = Math.round(maxTemp);

      dayCounter = dayCounter + 1;
    });
  }
};

function formatTime() {
  let today = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  let thisTime = `${today}`;
  return thisTime;
}

const currentTimeDay = document.querySelector(".current-time#time-current");
currentTimeDay.innerHTML = `${formatTime()}`;

function formatDate() {
  let now = new Date();
  let date = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let thisDate = `${day},${date}`;
  return thisDate;
}
const currentDate = document.querySelector(".current-day#day-current");
currentDate.innerHTML = `${formatDate()}`;

function getForecast(coordinates, units) {
  getData(coordinates.lat, coordinates.lon, units);
}

function displayTemperature(response, units) {
  console.log(response);

  let weatherDescription = document.querySelector(
    ".current-visibility#visibility-description"
  );
  weatherDescription.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector(
    ".current-humidity-index#index-humidity-description"
  );
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector(
    ".current-wind-index#index-wind-description"
  );
  wind.innerHTML = response.data.wind.speed;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let iconElementCurrent = document.querySelector("#current-image");

  iconElementCurrent.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let mainTemperature = document.querySelector(
    "#temperature-current-day-index"
  );
  mainTemperature.innerHTML = Math.round(response.data.main.temp);

  getForecast(response.data.coord, units);
}

function search(city, units = "metric") {
  let apiKey = "f4717a93880ad531595d505e3579e813";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f4717a93880ad531595d505e3579e813&units=${
    units === "us" ? "imperial" : units
  }`;
  axios
    .get(`${apiUrl}&appid=${apiKey}`)
    .then((response) => displayTemperature(response, units));
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value, "metric");
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city");
  search(cityInputElement.innerHTML, "us");
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city");
  search(cityInputElement.innerHTML, "metric");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

getData(50.04, 19.94, "metric");
