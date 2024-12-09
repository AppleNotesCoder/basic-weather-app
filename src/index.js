// API
const root = "https://api.shecodes.io";
const key = "c4080adfbabfbe5dd4cb35fb3boat419";

// Elements
const currentDateElement = document.querySelector("#current-date");
const searchInputElement = document.querySelector("#search-input");
const searchButtonElement = document.querySelector(".search-button");
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
let searchForm = document.querySelector("#search-form");
let forecastContainerElement = document.querySelector(".forecast-weather");

// Functions
function searchCity(event) {
  event.preventDefault();

  const currentWeatherPath = `${root}/weather/v1/current?query=${searchInputElement.value}&key=${key}&units=metric`;

  cityElement.innerHTML = searchInputElement.value;

  // ################# CURRENT #################
  fetch(currentWeatherPath)
    .then((response) => response.json())
    .then((json) => {
      console.log("CURRENT", json);

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
      currentDateElement.innerHTML = formatDate(new Date(json.time));
    });

  // ################# FORECAST #################
  let forecastPath = `${root}/weather/v1/forecast?query=${searchInputElement.value}&key=${key}&units=metric`;

  fetch(forecastPath)
    .then((response) => response.json())
    .then((json) => {
      console.log("FORECAST", json);

      let days = json.daily;

      let forecastHtml = "";

      for (let i = 0; i < 5; i++) {
        const day = days[i];

        console.log("Day", day);

        let dayName = new Date(day.time * 1000).toLocaleString("en-us", {
          weekday: "long",
        });
        let dayMaxTemperature = Math.round(day.temperature.maximum);
        let dayMinTemperature = Math.round(day.temperature.minimum);

        let dayHtml = `
            <div class="forecast-weather-day">
              <p class="day">${dayName}</p>
              <img id="day-weather-icon" src="${day.condition.icon_url}" />
              <p class="low-high">
                ${dayMaxTemperature}° <span>${dayMinTemperature}°</span>
              </p>
            </div>
           `;

        forecastHtml += dayHtml;
      }

      forecastContainerElement.innerHTML = forecastHtml;
    });
}

function formatDate(date) {
  console.log(date);
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

// Events
searchForm.addEventListener("submit", searchCity);

// When the page loads - default search to Paris
searchInputElement.value = "Paris";
searchButtonElement.click();
