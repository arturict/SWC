const API_KEY = "743896362de4e3da5a6a86b66c76352f";

function displayWeatherData(data) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  const weatherData = `
        <h2>${data.name}</h2>
        <p><i class="fas fa-thermometer-half"></i> Temperatur: ${data.main.temp}°C</p>
        <p><i class="fas fa-cloud"></i> Wetter: ${data.weather[0].description} <br><img src="${iconUrl}" alt="${data.weather[0].description}"></p>
        <p><i class="fas fa-wind"></i> Windgeschwindigkeit: ${data.wind.speed} m/s</p>
        <p><i class="fas fa-location-arrow"></i> Windrichtung: ${data.wind.deg}°</p>
        <p><i class="fas fa-tint"></i> Luftfeuchtigkeit: ${data.main.humidity}%</p>
        <p><i class="fas fa-barometer"></i> Luftdruck: ${data.main.pressure} hPa</p>
        <p><i class="fas fa-temperature-low"></i> Min. Temperatur: ${data.main.temp_min}°C</p>
        <p><i class="fas fa-temperature-high"></i> Max. Temperatur: ${data.main.temp_max}°C</p>
    `;
  document.getElementById("weatherData").innerHTML = weatherData;
}
function getWeather() {
  const city = document.getElementById("city").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=de`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      console.error("Es gab einen Fehler:", error);
      document.getElementById("weatherData").innerHTML =
        "Fehler beim Abrufen der Wetterdaten.";
    });
}

var input = document.getElementById("city");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getWeather();
    document.getElementById("enter").click();
  }
});

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=de`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            displayWeatherData(data);
          })
          .catch((error) => {
            console.error("Es gab einen Fehler:", error);
            document.getElementById("weatherData").innerHTML =
              "Fehler beim Abrufen der Wetterdaten.";
          });
      },
      (error) => {
        console.error("Fehler beim Abrufen des Standorts:", error.message);
        document.getElementById("weatherData").innerHTML =
          "Fehler beim Abrufen des Standorts: " + error.message;
      }
    );
  } else {
    console.error("Geolocation wird von diesem Browser nicht unterstützt.");
    document.getElementById("weatherData").innerHTML =
      "Geolocation wird von diesem Browser nicht unterstützt.";
  }
}
