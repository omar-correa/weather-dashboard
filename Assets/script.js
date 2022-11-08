const apiKey = "d5597b1e7a39fea80560c4ae65ba0cf7"
var searchButton = document.getElementById("search")
let forecastLabel = document.getElementById("forecast-label")

let forecastElem = document.getElementById("forecast-elem")
console.log("forecastElem", forecastElem)

searchButton.addEventListener("click", function () {
    let cityInput = document.getElementById("city-input")
    console.log('this is the cityInput: ', cityInput, cityInput.value)

    cityWeather(cityInput.value)
})

function cityWeather(cityName) {

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            var cityLat = data[0].lat
            var cityLon = data[0].lon
            console.log("lat", cityLat)
            console.log("lon", cityLon)
            cityLatlon(cityLat, cityLon)
        })
}

function cityLatlon(cityLat, cityLon) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}`)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (data) {

        
            let todaysWeatherElem = document.getElementById("todays-date-elem")

            let cityNameElem = document.createElement("h1")
            cityNameElem.textContent = data.city.name
            todaysWeatherElem.appendChild(cityNameElem)
            
            let todaysDateElem = document.createElement("h1")
            let splitDate = data.list[0].dt_txt.split(" ")[0].split("-")
            let finalString = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`
            todaysDateElem.textContent = finalString
            todaysWeatherElem.appendChild(todaysDateElem)

            let todaysTemp = document.createElement("h1")
            todaysTemp.textContent = "Temperature: " + (Math.round((data.list[0].main.temp - 273) * 1.8) + 32) + "°F"
            todaysWeatherElem.appendChild(todaysTemp)

            let todaysHum = document.createElement("h1")
            todaysHum.textContent =  "Humidity: " + (data.list[0].main.humidity) + "%"
            todaysWeatherElem.appendChild(todaysHum)
            




            
            // create 5 day forecast elems and append them 
            for (var i = 0; i < 5; i++) {
                let wrapperDiv = document.createElement("div")
                let dateElem = document.createElement("h1")
                let temperatureElem = document.createElement("h1")
                let humElem = document.createElement("h1")
                // create elem for icon here..prob a div not h1

                wrapperDiv.style.marginRight = "1rem"
                wrapperDiv.style.margin = "1rem"
                wrapperDiv.classList.add("card")

                wrapperDiv.appendChild(dateElem)
                wrapperDiv.appendChild(temperatureElem)
                wrapperDiv.appendChild(humElem)

                temperatureElem.textContent = "Temp: "+( Math.round((data.list[i*8].main.temp - 273) * 1.8) + 32 ) + "°F"

                let splitDate = data.list[i*8].dt_txt.split(" ")[0].split("-")
                let finalString = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`
                // icon

                dateElem.textContent = finalString
                humElem.textContent = "Humidity: " + (data.list[i*8].main.humidity) + "%"

                forecastElem.appendChild(wrapperDiv)
            }

            forecastLabel.style.display = "block"

        })
}



// function get5DaysForecast(apiResponse) {
//     return apiResponse.list.reduce(function (days, current) {
//         var currentDate = current.dt_txt.split(" ")[0];
//         if (!days.find(function (day) {
//             return day.dt_txt.includes(currentDate);
//         })) {
//             return [...days, current];
//         }
//         return days;
//     }, [])
// }