const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "11a07f75f4b974932f2708637a4db0e2";
const citySuggestionsList = document.getElementById("city-suggestions");
const searchBox = document.querySelector(".search-input");
const searchButton = document.querySelector("#search-button");
const weatherIcon = document.querySelector(".weather-icon");
let lastSuggestions = [];

async function fetchCitySuggestions(city) {
  if (!city) {
    citySuggestionsList.innerHTML = "";
    return;
  }

  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
  );

  if (!response.ok) {
    citySuggestionsList.innerHTML = "";
    return;
  }

  const data = await response.json();
  const suggestions = data.map((item) => item.name);

  lastSuggestions = [];

  citySuggestionsList.innerHTML = suggestions
    .filter((cityName) => cityName.toLowerCase().startsWith(city.toLowerCase()))
    .map((city) => {
      if (!lastSuggestions.includes(city)) {
        lastSuggestions.push(city);
        return `<option value="${city}">${city}</option>`;
      }
      return '';
    })
    .join("");
}

async function checkWeather(city) {
  if (!city) {
    document.querySelector(".weather").style.display = "none";
    return;
  }

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    document.querySelector(".error").style.display = "none";

    var statement = data.weather[0].main;
    switch (statement) {
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
      default:
        weatherIcon.src = "images/clouds.png";
        break;
    }

    document.querySelector(".weather").style.display = "block";
  }
}

searchBox.addEventListener("input",updateValue);
function updateValue(e) {
  if (e.target.value == "") {
    document.querySelector(".weather").style.display = "none";
  }
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const selectedCity = searchBox.value;
  checkWeather(selectedCity);
});

searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const selectedCity = searchBox.value;
    checkWeather(selectedCity);
  }
});

function updateValue(e) {
  if (e.target.value == "") {
    document.querySelector(".weather").style.display = "none";
  }
}

const suggestionList = document.getElementById("city-suggestions");
suggestionList.addEventListener("change", (e) => {
  const selectedCity = e.target.value;
  checkWeather(selectedCity);
});
