const apiKey = "d5597b1e7a39fea80560c4ae65ba0cf7"
var temp = document.querySelector("#temp")
var cityName = document.querySelector("#cityName")
var cityCoord = document.querySelector("#cityCoord")
var dayOneTemp = document.createElement("h1")
var temp = document.getElementById("dayone")
var search = document.getElementById("search")

let forecastElem = document.getElementById("forecast-elem")
console.log("forecastElem", forecastElem)

search.addEventListener("click", function(){
    cityLatlon()
})

function cityWeather(cityName) {

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            cityLat = data[0].lat
            cityLon = data[0].lon
            console.log("lat", cityLat)
            console.log("lon", cityLon)
            cityLatlon(cityLat, cityLon)
        })
}

cityLatlon('atlanta')

function cityLatlon() {
    console.log("lat", cityLat)
    console.log("lon", cityLon)
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}`)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (data) {


            let index = 0

            for (var i = 0; i < 5; i++) {
                let dateElem = document.createElement("h1")
                let temperatureElem = document.createElement("h1")
                let humElem = document.createElement("h1")
                // create elem for icon here..prob a div not h1

                temperatureElem.textContent = Math.round((data.list[index].main.temp - 273) * 1.8) + 32
                dateElem.textContent = data.list[index].dt_txt
                humElem.textContent = data.list[index].main.humidity + "%"
                // let icon = ?

                forecastElem.appendChild(dateElem)
                forecastElem.appendChild(temperatureElem)
                forecastElem.appendChild(humElem)

                index = + 8

            }
            
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