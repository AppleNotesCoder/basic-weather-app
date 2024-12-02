function search(event) {
  event.preventDefault();

  const searchInputElement = document.querySelector("#search-input");
  const cityElement = document.querySelector("#current-city");
  const temperatureNowElement = document.querySelector(
    ".current-temperature-value"
  );
  const currentConditionElement = document.querySelector("#current-condition");
  const currentHumidtyElement = document.querySelector("#current-humidity");
  const currentWindElement = document.querySelector("#current-wind");
  const currentWeatherIconElement = document.querySelector(
    "#current-weather-icon"
  );

  cityElement.innerHTML = searchInputElement.value;

  let root = "https://api.shecodes.io/";
  let path = `weather/v1/current?query=${searchInputElement.value}&key=c4080adfbabfbe5dd4cb35fb3boat419&units=metric`;

  fetch(root + "/" + path)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);

      // Temperature
      temperatureNowElement.textContent = Math.round(json.temperature.current);

      // Condition
      currentConditionElement.textContent = json.condition.description;

      // Humidity
      currentHumidtyElement.textContent = json.temperature.humidity + "%";

      // Window
      currentWindElement.textContent = json.wind.speed + "km/h";

      // Icon - http://shecodes-assets.s3.amazonaws.com/api/weather/icons/
      currentWeatherIconElement.src = json.condition.icon_url;
      // Time
      currentDateELement.innerHTML = formatDate(new Date(json.time));
    });
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
