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

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "f4717a93880ad531595d505e3579e813";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=f4717a93880ad531595d505e3579e813&units=metric`;
}

function displayTemperature(response) {
  console.log(response);
  let temperatureElement1 = document.querySelector(
    ".current-day-temperature#temperature-current-day-index"
  );
  temperatureElement1.innerHTML = Math.round(response.data.main.temp);

  celciusTemperature = response.data.main.temp;

  let temperatureElement2 = document.querySelector(
    ".tuesday-weather-temperature-day#temperature-tuesday-day"
  );
  temperatureElement2.innerHTML = Math.round(response.data.main.temp_max);

  let temperatureElement3 = document.querySelector(
    ".tuesday-weather-temperature-night#temperature-tuesday-night"
  );
  temperatureElement3.innerHTML = Math.round(response.data.main.temp_min);
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

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "f4717a93880ad531595d505e3579e813";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f4717a93880ad531595d505e3579e813&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemperatureElement = document.querySelector(
    "#temperature-current-day-index"
  );
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  currentTemperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemperatureElement = document.querySelector(
    "#temperature-current-day-index"
  );
  currentTemperatureElement.innerHTML = Math.round(celciusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
