const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "11a07f75f4b974932f2708637a4db0e2";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector("#search-button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
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

        console.log(data);

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

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    checkWeather(searchBox.value);
});

// İsteğe bağlı: Ayrıca arama kutusunda Enter tuşuna basıldığında aramayı da gerçekleştirebiliriz.
searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        checkWeather(searchBox.value);
    }
});
