const apiKey = "d3288df9a536489cf61d2a6d300b033a";

const cityInput = document.getElementById("city");
const stateInput = document.getElementById("state");
const result = document.getElementById("result");
const button = document.getElementById("weatherBtn");

// Capitalize state input automatically
stateInput.addEventListener("input", () => {
  stateInput.value = stateInput.value.toUpperCase();
});

// Capitalize each word in weather description
function capitalizeWords(str) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

// Main function to fetch weather
function getWeather() {
  const city = cityInput.value.trim();
  const state = stateInput.value.trim().toUpperCase();

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  let query = city;
  if (state) {
    query += `,${state},US`;
  }

  // Hide previous result
  result.classList.remove("show");
  result.innerText = "";

  // Small delay to let CSS collapse animation run
  setTimeout(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        let text;

        if (data.cod !== 200) {
          text = "City not found. Please try again.";
        } else {
          text = `Weather in ${data.name}:
          ${capitalizeWords(data.weather[0].description)}
          ${data.main.temp}°C (feels like ${data.main.feels_like}°C)
          Wind: ${data.wind.speed} m/s
          Humidity: ${data.main.humidity}%`;
        }

        result.innerText = text;

        // Animate result in
        requestAnimationFrame(() => {
          result.classList.add("show");
        });
      })
      .catch(error => {
        console.error(error);
        result.innerText = "Error fetching weather data.";
        requestAnimationFrame(() => {
          result.classList.add("show");
        });
      });
  }, 100); // slight delay for smooth transition
}

button.addEventListener("click", getWeather);
