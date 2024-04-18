let apikey = "3e0e3b28154c462b96a00934242703";
let apiUrl = "https://api.weatherapi.com/v1/forecast.json?q=";
let searchBox = document.getElementById("searchBox");
let submitBtn = document.getElementById("submitBtn");
let weatherIcon = document.getElementById("weatherIcon");

async function checkWeather(city) {
  let response = await fetch(apiUrl + city + `&key=${apikey}` + "&days=3");
  let data = await response.json();
  console.log(data);
  // City name
  document.getElementById("city").innerHTML = data.location.name;
  // Temperature in Fahrenheit
  document.getElementById("temp").innerHTML =
    data.current.temp_c + `<sup>o</sup>C`;
  // Maximum Two temperature for the day
  document.getElementById("maxtemp").innerHTML =
    data.forecast.forecastday[1].day.maxtemp_c + `<sup>o</sup>C`;
  // Maximum Three temperature for the day
  document.getElementById("maxtempTwo").innerHTML =
    data.forecast.forecastday[2].day.maxtemp_c + `<sup>o</sup>C`;
  //  Minimum Two temperature for the day
  document.getElementById("mintemp").innerHTML =
    data.forecast.forecastday[1].day.mintemp_c + `<sup>o</sup>C`;
  //  Minimum Three temperature for the day
  document.getElementById("mintempTwo").innerHTML =
    data.forecast.forecastday[2].day.mintemp_c + `<sup>o</sup>C`;
  //  Humidity
  document.getElementById("humidity").innerHTML =
    `<img src="img/icon-umberella.png" alt="" />` + data.current.humidity + "%";
  //  Wind Speed and Direction
  document.getElementById("wind").innerHTML =
    `<img src="img/icon-wind.png" alt="" />` + data.current.wind_kph + "km/h";
  // Weather condition
  document.getElementById("condition").innerHTML = data.current.condition.text;
  // Weather condition Tomorrow
  document.getElementById("conditionTwo").innerHTML =
    data.forecast.forecastday[1].day.condition.text;
  // Weather condition  After Tomorrow
  document.getElementById("conditionThree").innerHTML =
    data.forecast.forecastday[2].day.condition.text;
  //Weather direction
  document.getElementById("direction").innerHTML =
    `<img src="img/icon-compass.png" alt="" />` + data.current.wind_dir;
  //  Showing the icon according to the code returned by API
  document.getElementById("weatherIcon").innerHTML = `<img
      src="https:${data.current.condition.icon}"
      alt=""
      width="90px"
      />`; //  Weather icon

  document.getElementById("weatherIconTwo").innerHTML = `<img
      src="https:${data.forecast.forecastday[1].day.condition.icon}"
      alt=""
      width="48px"
      />`; //  Weather icon
  document.getElementById("weatherIconThree").innerHTML = `<img
      src="https:${data.forecast.forecastday[2].day.condition.icon}"
      alt=""
      width="48px"
      />`; //  Weather icon

  let dateNow = new Date(data.current.last_updated);
  let dataTomorrow = new Date(data.forecast.forecastday[1].date);
  let afterTomorrow = new Date(data.forecast.forecastday[2].date);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.getElementById("updateDate").innerHTML =
    dateNow.getDate() + " " + monthNames[dateNow.getMonth()];
  document.getElementById("updateDay").innerHTML = days[dateNow.getDay()];
  document.getElementById("nextDay").innerHTML = days[dataTomorrow.getDay()];
  document.getElementById("next2day").innerHTML = days[afterTomorrow.getDay()];
  // console.log(dateNow.getDate() + 1);
  // console.log(dateNow.getMonth());
  // console.log(monthNames[dateNow.getMonth()]);
  // console.log(days[dateNow.getDay() + 1]);
}
submitBtn.addEventListener("click", function () {
  checkWeather(searchBox.value);
});
searchBox.addEventListener("input", function (event) {
  checkWeather(event.target.value);
});

checkWeather("Cairo");

// Function to get weather based on user's current location
async function checkWeatherByGeolocation() {
  try {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        let response = await fetch(
          `${apiUrl}${position.coords.latitude},${position.coords.longitude}&key=${apikey}&days=3`
        );
        let data = await response.json();
        checkWeather(data.location.name);
      },
      function (error) {
        console.error("Error getting user's location:", error);
      }
    );
  } catch (error) {
    console.error("Error getting weather by geolocation:", error);
  }
}
checkWeatherByGeolocation();
