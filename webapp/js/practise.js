const apiKey = "7c0f381f68431d5fdc9c009247c7f8e2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.getElementById("wIcon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    //console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if(weatherIcon){
        console.log(data.weather[0].main)
        if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "/webapp/images/cloud-weather.svg"
    }
    if(data.weather[0].main == "Clear"){
        weatherIcon.src = "/webapp/images/sun.svg"
    }
    if(data.weather[0].main == "Rain"){
        weatherIcon.src = "/webapp/images/rain.svg"
    }
    if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "/webapp/images/drizzle.svg"
    }
    if(data.weather[0].main == "Mist"){
        weatherIcon.src = "/webapp/images/mist.svg"
    }
    
    document.querySelector(".weather").style.display = "block"
    }  
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
