const Form = document.getElementById("weatherForm");
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
                // const latitudeWithEmoji = `Latitude: ${data.Coord.Lat} 🌐`;
                // const longitudeWithEmoji = `Longitude: ${data.Coord.Lon} 🌏`;
                weatherResult.innerHTML = `
                <div
                    class="absolute top-[30%] md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-5xl md:text-7xl font-thin">
                    <div class="text-center">
                       <h1>${data.Name}</h1>
                       <h1 class="text-5xl mt-3">${data.Main.Celsius} &deg;C  |  ${data.Main.Temp} K </h1>
                    </div>
                </div>`;
                weatherResultDetail.innerHTML = `
                <div class="flex flex-col md:flex-row w-full justify-evenly items center p-3 text-md font-medium">
                    <div class="drop-shadow-2xl w-full md:w-[13%] m-1  font-thin p-2 rounded-xl bg-white">
                        <p class="text-md">Weather 🌧️</p>
                        <p class="temp p-1   text-2xl font-thin"> ${data.Weather[0].Description}</p>
                    </div>
                    <div class="drop-shadow-2xl w-full md:w-[13%] font-thin m-1 p-2 rounded-xl bg-white">
                        <p class="text-md">Pressure 🦾</p>
                        <p class=" p-1  text-2xl font-thin">${data.Main.Pressure} mm </p>
                    </div>
                    <div class="drop-shadow-2xl w-full md:w-[13%] font-thin m-1 p-2 rounded-xl bg-white">
                        <p class="text-md">Humidity 💦</p>
                        <p class=" p-1  text-2xl font-thin">${data.Main.Humidity} %</p>
                    </div>
                    <div class="drop-shadow-2xl w-full md:w-[13%] font-thin m-1 p-2 rounded-xl bg-white">
                        <p class="text-md">Wind Speed 🍃</p>
                        <p class=" p-1  text-2xl font-thin">${data.Wind.Speed} km/hr </p>
                    </div>
                    <div class="drop-shadow-2xl w-full md:w-[13%] font-thin m-1 p-1 rounded-xl bg-white">
                        <p class="text-md">Wind Direction ↗️</p>
                        <p class=" p-1  text-2xl font-thin"> 12 &deg North </p>
                    </div>
                    <div class="drop-shadow-2xl w-full md:w-[13%] font-thin m-1 p-1 rounded-xl bg-white">
                        <p class="text-md">Sunrise 🌅</p>
                        <p class=" p-1  text-2xl font-thin">${data.Sys.SunriseTime} am</p>
                    </div>
                    <div class="drop-shadow-2xl w-full md:w-[13%] font-thin m-1 p-1 rounded-xl bg-white">
                        <p class="text-md">Sunset 🌄</p>
                        <p class=" p-1  text-2xl font-thin">${data.Sys.SunsetTime} am</p>
                    </div>
            </div>`;
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

updateDayTime();
setInterval(updateDayTime, 1000);
