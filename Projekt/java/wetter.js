const API_KEY = "743896362de4e3da5a6a86b66c76352f";

function displayWeatherData(data) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'});
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'});
  
  // Convert wind direction to cardinal direction
  const getWindDirection = (deg) => {
    const directions = ["N", "NNO", "NO", "ONO", "O", "OSO", "SO", "SSO", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return directions[Math.round(deg / 22.5) % 16];
  };
  
  const windDirection = data.wind ? getWindDirection(data.wind.deg) : 'N/A';
  const windSpeed = data.wind ? data.wind.speed : 0;
  const visibility = data.visibility ? (data.visibility / 1000).toFixed(1) : 'N/A';
  
  const weatherData = `
        <div class="weather-card">
            <div class="weather-header">
                <h2><i class="fas fa-map-marker-alt"></i> ${data.name}, ${data.sys.country}</h2>
                <div class="weather-main">
                    <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">
                    <div class="temp-main">${Math.round(data.main.temp)}°C</div>
                    <div class="weather-desc">${data.weather[0].description}</div>
                </div>
            </div>
            
            <div class="weather-details">
                <div class="weather-row">
                    <div class="weather-item">
                        <i class="fas fa-thermometer-half"></i>
                        <div class="weather-label">Gefühlt wie</div>
                        <div class="weather-value">${Math.round(data.main.feels_like)}°C</div>
                    </div>
                    <div class="weather-item">
                        <i class="fas fa-tint"></i>
                        <div class="weather-label">Luftfeuchtigkeit</div>
                        <div class="weather-value">${data.main.humidity}%</div>
                    </div>
                </div>
                
                <div class="weather-row">
                    <div class="weather-item">
                        <i class="fas fa-wind"></i>
                        <div class="weather-label">Wind</div>
                        <div class="weather-value">${windSpeed} m/s ${windDirection}</div>
                    </div>
                    <div class="weather-item">
                        <i class="fas fa-compress-arrows-alt"></i>
                        <div class="weather-label">Luftdruck</div>
                        <div class="weather-value">${data.main.pressure} hPa</div>
                    </div>
                </div>
                
                <div class="weather-row">
                    <div class="weather-item">
                        <i class="fas fa-temperature-low"></i>
                        <div class="weather-label">Min. Temp.</div>
                        <div class="weather-value">${Math.round(data.main.temp_min)}°C</div>
                    </div>
                    <div class="weather-item">
                        <i class="fas fa-temperature-high"></i>
                        <div class="weather-label">Max. Temp.</div>
                        <div class="weather-value">${Math.round(data.main.temp_max)}°C</div>
                    </div>
                </div>
                
                <div class="weather-row">
                    <div class="weather-item">
                        <i class="fas fa-eye"></i>
                        <div class="weather-label">Sichtweite</div>
                        <div class="weather-value">${visibility} km</div>
                    </div>
                    <div class="weather-item">
                        <i class="fas fa-cloud"></i>
                        <div class="weather-label">Bewölkung</div>
                        <div class="weather-value">${data.clouds.all}%</div>
                    </div>
                </div>
                
                <div class="weather-row">
                    <div class="weather-item">
                        <i class="fas fa-sun"></i>
                        <div class="weather-label">Sonnenaufgang</div>
                        <div class="weather-value">${sunrise}</div>
                    </div>
                    <div class="weather-item">
                        <i class="fas fa-moon"></i>
                        <div class="weather-label">Sonnenuntergang</div>
                        <div class="weather-value">${sunset}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.getElementById("weatherData").innerHTML = weatherData;
}
function getWeather() {
  const city = document.getElementById("city").value;
  
  if (!city.trim()) {
    document.getElementById("weatherData").innerHTML = 
      '<div class="error-message">Bitte geben Sie eine Stadt ein.</div>';
    return;
  }
  
  // Show loading state
  document.getElementById("weatherData").innerHTML = 
    '<div class="loading-message"><i class="fas fa-spinner fa-spin"></i> Wetterdaten werden geladen...</div>';
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=de`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      console.error("Es gab einen Fehler:", error);
      // Show demo data when API fails (e.g., in sandbox environment)
      showDemoWeatherData(city);
    });
}

function showDemoWeatherData(cityName) {
  const demoData = {
    name: cityName,
    sys: { country: "CH", sunrise: 1694670000, sunset: 1694715600 },
    main: {
      temp: 22.5,
      feels_like: 21.8,
      temp_min: 18.3,
      temp_max: 25.7,
      pressure: 1013,
      humidity: 65
    },
    weather: [{
      description: "leicht bewölkt",
      icon: "02d"
    }],
    wind: { speed: 3.2, deg: 245 },
    clouds: { all: 25 },
    visibility: 10000
  };
  
  displayWeatherData(demoData);
  
  // Add demo notice
  const weatherCard = document.querySelector('.weather-card');
  if (weatherCard) {
    const demoNotice = document.createElement('div');
    demoNotice.className = 'demo-notice';
    demoNotice.innerHTML = '<i class="fas fa-info-circle"></i> Demo-Daten (API nicht verfügbar)';
    weatherCard.insertBefore(demoNotice, weatherCard.firstChild);
  }
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
    document.getElementById("weatherData").innerHTML = 
      '<div class="loading-message"><i class="fas fa-spinner fa-spin"></i> Standort wird ermittelt...</div>';
      
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
            // Show demo data for current location
            showDemoWeatherData("Mein Standort");
          });
      },
      (error) => {
        console.error("Fehler beim Abrufen des Standorts:", error.message);
        document.getElementById("weatherData").innerHTML =
          '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Fehler beim Abrufen des Standorts: ' + error.message + '</div>';
      }
    );
  } else {
    console.error("Geolocation wird von diesem Browser nicht unterstützt.");
    document.getElementById("weatherData").innerHTML =
      '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Geolocation wird von diesem Browser nicht unterstützt.</div>';
  }
}
