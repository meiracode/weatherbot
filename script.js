const apiKey = "d3288df9a536489cf61d2a6d300b033a";

const cityInput = document.getElementById("city");
const stateInput = document.getElementById("state");
const result = document.getElementById("result");
const button = document.getElementById("weatherBtn");

if (stateInput) {
  stateInput.addEventListener("input", () => {
    stateInput.value = stateInput.value.toUpperCase();
  });
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

function getWeather() {
  const city = cityInput.value.trim();
  const state = stateInput ? stateInput.value.trim().toUpperCase() : "";

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  let query = city;
  if (state) {
    query += `,${state},US`;
  }

  result.classList.remove("show");
  result.innerText = "";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      if (!data.main) {
        result.innerText = "City not found. Please try again.";
      } else {
        result.innerText =
`Weather in ${data.name}:
${data.main.temp}°F ( Feels like ${data.main.feels_like}°F )
Description: ${capitalizeWords(data.weather[0].description)}
Wind Speed: ${data.wind.speed} mph
Humidity: ${data.main.humidity}%`;
      }

      requestAnimationFrame(() => {
        result.classList.add("show");
      });
    })
    .catch(() => {
      result.innerText = "Error fetching weather data.";
      requestAnimationFrame(() => {
        result.classList.add("show");
      });
    });
}

button.addEventListener("click", getWeather);