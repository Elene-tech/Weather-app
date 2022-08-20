let apiKey = "f4717a93880ad531595d505e3579e813";
let currentCity = "Kiev";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=f4717a93880ad531595d505e3579e813&units=metric`;

function displayTemperature(response) {
  console.log(response);
  let temperatureElement1 = document.querySelector(
    ".current-day-temperature#temperature-current-day-index"
  );
  temperatureElement1.innerHTML = Math.round(response.data.main.temp);

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
}
axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);

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
