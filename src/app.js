let apiKey = "f4717a93880ad531595d505e3579e813";
let currentCity = "Krakow";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Krakow&appid=f4717a93880ad531595d505e3579e813&units=metric`;

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
}
axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
