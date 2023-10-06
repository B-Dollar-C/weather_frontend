const Form = document.getElementById("weatherForm");

const latti = document.querySelector(".latti");
const longi = document.querySelector(".longi");
const weather = document.querySelector(".weather");
const pressure = document.querySelector(".pressure");
const humidity = document.querySelector(".humidity");
const speed = document.querySelector(".speed");
const direction = document.querySelector(".direction");
const sunrise = document.querySelector(".rise");
const sunset = document.querySelector(".set");
if (Form) {
    Form.addEventListener("submit", function (event) {
        event.preventDefault();

        const city = document.getElementById("cityInput").value;
        const weatherResult = document.getElementById("weatherResult");
        const weatherResultDetail = document.getElementById("weatherResultDetail");
        const weatherBg = document.getElementById("weather-bg");

        fetch(`https://akashvani.onrender.com/weather/${city}`)
            .then(response => response.json())
            .then(data => {
                // dynamic data load
                latti.innerHTML = data.Coord.Lat;
                longi.innerHTML = data.Coord.Lon;
                weather.innerHTML = data.Weather[0].Description;
                pressure.innerHTML = data.Main.Pressure;
                humidity.innerHTML = data.Main.Humidity;
                speed.innerHTML = data.Wind.Speed;
                direction.innerHTML = data.Wind.Deg;
                sunrise.innerHTML = data.Sys.SunriseTime;
                sunset.innerHTML = data.Sys.SunsetTime;

                // dynamic bg 
                let url = '';
                let Image = document.querySelector('#weather-bg');
                if (data.Weather[0].Description.includes('rainy')) {
                    url = './assets/lightRain.jpg'
                } else if (data.Weather[0].Description.includes('cloud')) {
                    url = './assets/cloudy.jpg'
                } else if (data.Weather[0].Description.includes('thunderstorm')) {
                    url = './assets/thunderstorm.jpg'
                } else if (data.Weather[0].Description.includes('scattered')) {
                    url = './assets/scatteredCloud.jpg'
                } else if (data.Weather[0].Description.includes('clear')) {
                    url = "./assets/clearSky.jpg"
                } else if (data.Weather[0].Description.includes('mist')) {
                    url = "./assets/mist.jpg"
                }
                Image.src = url;
            })
            .catch(error => {
                console.error("Error:", error);
                weatherResult.innerHTML = "An error occurred while fetching weather data.";
            });
    });
}

function updateDayTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const formattedDate = now.toLocaleDateString('en-US', options);
    document.getElementById("dayTime").textContent = formattedDate;
}

function copyLatti() {
    const res = navigator.clipboard.writeText(latti.innerText);
    console.log(res)
}
function copyLon() {
    const res = navigator.clipboard.writeText(longi.innerText);
    console.log(res)
}

updateDayTime();
setInterval(updateDayTime, 1000);
