"use strict";

const input = document.querySelector(".search__input");
const overview = document.querySelector(".overview-weather");
const preloder = document.querySelector(".preloder");

const fetchData = async (city) => {
  try {
    const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=30f236e20b11dc2477d9b1e50ef0518d&units=metric`;
    const result = await fetch(link);

    const data = await result.json();
    const main = data.weather[0].main;
    const temperature = Math.round(data.main.temp);
    const icon = data.weather[0].icon;

    createElement(temperature, city, main);

    addIcon(main, icon);
  } catch (err) {
    console.error("Ошибка!", err);
    alert("City isn't found. Try again!");
  }
};

//TAKE DATA FROM INPUT
input.onkeypress = keyPressed;
function keyPressed(e) {
  if (e.key === "Enter" && input !== "") {
    let city = input.value;

    const preloadTimer = setTimeout(() => {
      preloder.style.display = "block";
    });

    fetchData(city).then(() => {
      clearTimeout(preloadTimer);
      preloder.style.display = "none";
    });
  }
}

//ADD NEW CITY
function createElement(temperature, city, main) {
  let div = document.createElement("div");
  div.className = "overview-weather__body";
  div.innerHTML = `
              <div class="overview-weather__temp">${temperature}&deg;C</div>
              <div class="overview-weather__city">${city}</div>
              <div class="overview-weather__icon"></div>
             <div class="overview-weather__main">${main}</div>
            `;
  overview.prepend(div);
  input.value = "";
}

// //ADD ICON FOR WEATHER
function addIcon(main, icon) {
  const weatherIcon = document.querySelector(".overview-weather__icon");
  if (main === "Clear" && icon.includes("d")) {
    weatherIcon.innerHTML = `<img src="/images/Sun.svg" alt="" class="overview-weather__img"/>`;
  } else if (main === "Clear" && icon.includes("n")) {
    weatherIcon.innerHTML = `<img src="/images/Clear_night.svg" alt="" class="overview-weather__img"/>`;
  } else if (main === "Thunderstorm") {
    weatherIcon.innerHTML = `<img src="/images/Rain+Thunder.svg" alt=""  class="overview-weather__img"/>`;
  } else if (main === "Rain" || main === "Drizzle") {
    weatherIcon.innerHTML = `<img src="/images/Rain.svg" alt=""  class="overview-weather__img"/>`;
  } else if (main === "Clouds") {
    weatherIcon.innerHTML = `<img src="/images/Clouds.svg" alt=""  class="overview-weather__img"/>`;
  } else if (main === "Snow") {
    weatherIcon.innerHTML = `<img src="/images/Snow.svg" alt=""  class="overview-weather__img"/>`;
  } else if (
    main === "Mist" ||
    main === "Smoke" ||
    main === "Haze" ||
    main === "Dust" ||
    main === "Fog" ||
    main === "Sand" ||
    main === "Dust" ||
    main === "Ash" ||
    main === "Squall" ||
    main === "Tornado"
  ) {
    weatherIcon.innerHTML = `<img src="/images/Mist.svg" alt=""  class="overview-weather__img"/>`;
  }
}
