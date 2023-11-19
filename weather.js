
function displayWeatherData(data) {
    let temperatureValue = document.getElementById("temp");
    let humidityValue = document.getElementById("humidity");
    let windSpeedValue = document.getElementById("wind");
    let iconElement = document.getElementById("weather-icon");
    let displayLocation = document.getElementById("location");
  
    let temperature = data.main.temp;
    let humidity = data.main.humidity;
    let windSpeed = data.wind.speed;
    let icon = data.weather[0].icon;
    let city = data.name;
  
    temperatureValue.textContent = Math.round(temperature);
    humidityValue.textContent = humidity;
    windSpeedValue.textContent = windSpeed;
    displayLocation.textContent = city;
    iconElement.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
  
  function fetchWeatherData(city) {
    let apiKey = "19ce5ead7b51f2501db21c905a912f33";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayWeatherData(data);
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });
}



  function fetchAndDisplay5DayForecast(city) {
    const apiKey = "c1d226ece90d2d7dedf2c9f06b9973e3";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    clearForecastData();
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const forecastContainer = document.getElementById("forecast");
        for (let i = 0; i < data.list.length; i+=8 ) {
            const forecastItem = data.list[i];
            //console.log(data)
           // console.log(forecastItem)
            const forecastDate = new Date(forecastItem.dt * 1000);// converts the forecast,dt provided by
            //open weather into a javascript Date object. *1000 converts to millisecond- standard units for JS sate object
            const dayOfWeek= getDayOfWeek(forecastDate)
            const temperature = forecastItem.main.temp;
            const icon = forecastItem.weather[0].icon;
           

            // Create a new forecast element
        const forecastElement = document.createElement("div");
        forecastElement.classList.add("forecast-item");

        // Populate the forecast element with data
        forecastElement.innerHTML = `
          <p>${dayOfWeek}</p>
          <p>${Math.round(temperature)}°C</p>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
        `;

        // Append the forecast element to the forecast container
        forecastContainer.appendChild(forecastElement);
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}


function clearForecastData() {
  // Clear previous forecast data by removing all child elements from the forecast container
  const forecastContainer = document.getElementById("forecast");
  while (forecastContainer.firstChild) {
    forecastContainer.removeChild(forecastContainer.firstChild);
  }
}


function getDayOfWeek(date) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    return daysOfWeek[date.getDay()];
    
  }


  function callWeather() {
    let apiKey = "c1d226ece90d2d7dedf2c9f06b9973e3";
    let location = document.getElementById("input");
    let city = location.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    // Clear previous data
    clearWeatherData();
  
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Handle the weather data here
        displayWeatherData(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  
    displayLocation = document.getElementById("location");
    displayLocation.innerHTML = city;
  }


  document.addEventListener("DOMContentLoaded", function () {
    fetchWeatherData("London");
    fetchAndDisplay5DayForecast("London"); // Display current weather for London on load
  });

  const searchBtn = document.getElementById('search');
  searchBtn.addEventListener("click", function () {
    const location = document.getElementById("input").value;
    fetchWeatherData(location);
    fetchAndDisplay5DayForecast(location);
  });
