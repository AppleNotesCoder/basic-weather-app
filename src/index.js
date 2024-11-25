function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;

  let root = "https://api.shecodes.io/";
  let path = `weather/v1/current?query=${searchInputElement.value}&key=c4080adfbabfbe5dd4cb35fb3boat419&units=metric`;

  fetch(root + "/" + path)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      const temperatureNowElement = document.querySelector(
        ".current-temperature-value"
      );
      temperatureNowElement.textContent = Math.round(json.temperature.current);
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
