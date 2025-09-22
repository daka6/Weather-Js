const citySelect = document.getElementById("city-select");
const btn = document.getElementById("get-forecast");
const card = document.getElementById("card");
const poster = document.getElementById("poster");

const locationParagraph = document.getElementById("location");
const weatherMain = document.getElementById("weather-main");
const mainTemp = document.getElementById("main-temperature");
const weatherIcon = document.getElementById("weather-icon");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");

let citySelected = citySelect.value;
async function getWeather(city) {
  try {
    if (!city) return null;
    let res = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`
    );

    let data = await res.json();

    console.log("Data: ", data);

    return data?.error
      ? alert("Something went wrong, please try again later")
      : data;
  } catch (error) {
    console.log(error);
    let message =
      error.status || "Something went wrong, please try again later";
  }
}

async function showWeather() {
  if (citySelect.value === "new york") {
    city = "New York";
  } else if (citySelect.value === "los angeles") {
    city = "Los Angeles";
  } else if (citySelect.value === "chicago") {
    city = "Chicago";
  } else if (citySelect.value === "paris") {
    city = "Paris";
  } else if (citySelect.value === "tokyo") {
    city = "Tokyo";
  } else if (citySelect.value === "london") {
    city = "London";
  }
  const data = await getWeather(city);
  console.log(data);
  locationParagraph.textContent = "Location: " + data.name;
  weatherMain.textContent = "Weather Main: " + data.weather[0].main;
  mainTemp.textContent = "Main Temperature: " + data.main.temp + `º C`;
  let icon = data.weather[0].icon;
  weatherIcon.setAttribute("src", data.weather[0].icon);
  feelsLike.textContent = "Feels Like: " + data.main.feels_like + `º C`;
  humidity.textContent = "Humidity: " + data.main.humidity + "%";
  wind.textContent = "Wind: " + data.wind.speed + " m/s";
  windGust.textContent = "Wind Gust: " + data.wind.gust || "N/A";
}

btn.addEventListener("click", () => {
  showWeather();
  displayCard();
});

/*cuando cambia el select, despliega el card y la plantilla*/
const displayCard = () => {
  card.classList.add("card");
  if (citySelect.value === "new york") {
    poster.setAttribute("src", "img/_newYork.avif");
  } else if (citySelect.value === "los angeles") {
    poster.setAttribute("src", "img/_losAngeles.webp");
  } else if (citySelect.value === "chicago") {
    poster.setAttribute("src", "img/_chicago.jpeg");
  } else if (citySelect.value === "paris") {
    poster.setAttribute("src", "img/_paris.avif");
  } else if (citySelect.value === "tokyo") {
    poster.setAttribute("src", "img/_tokio2.avif");
  } else if (citySelect.value === "london") {
    poster.setAttribute("src", "img/_london.jpg");
  } else if (citySelect.value === "") {
    card.classList.remove("card");
  }
};

/*evento: al cambiar el select, se despliega la card*/
citySelect.addEventListener("change", () => {
  card.classList.remove("card");
  locationParagraph.textContent = "";
  weatherMain.textContent = "";
  mainTemp.textContent = "";
  feelsLike.textContent = "";
  humidity.textContent = "";
  wind.textContent = "";
  windGust.textContent = "";
  weatherIcon.removeAttribute("src");
});
