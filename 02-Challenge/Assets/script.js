const apiKey = "d5597b1e7a39fea80560c4ae65ba0cf7"
var temp = document.querySelector("#temp")
var cityName = document.querySelector("#cityName")
var cityCoord = document.querySelector("#cityCoord")
var currentWeather = document

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
            console.log("function", cityLatlon)



            // document.getElementById("temp").innerHTML = data[0].lat
            // cityLat = data[0].lat
            // cityLon = data[0].lon
            // cityLatlon = (cityLat, cityLon)
            // document.getElementById("cityName").innerHTML = cityName
            // console.log("city lat", cityLat)

        })

    // cityLatlon = (cityLat, cityLon)

}

cityWeather('Atlanta')



function cityLatlon() {
    console.log("lat", cityLat)
    console.log("lon", cityLon)
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}`)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            console.log(Math.round((data.list[5].main.temp - 273) * 1.8) + 32)
            // date
            dayOneDate = data.list[4].dt_txt
            dayTwoDate = data.list[4].dt_txt
            dayThreeDate = data.list[4].dt_txt
            dayFourDate = data.list[4].dt_txt
            dayFiveDate = data.list[4].dt_txt

            // day temps
            dayOneTemp = Math.round((data.list[4].main.temp - 273) * 1.8) + 32
            dayTwoTemp = Math.round((data.list[12].main.temp - 273) * 1.8) + 32
            dayThreeTemp = Math.round((data.list[20].main.temp - 273) * 1.8) + 32
            dayFourTemp = Math.round((data.list[28].main.temp - 273) * 1.8) + 32
            dayFiveTemp = Math.round((data.list[36].main.temp - 273) * 1.8) + 32

            // icons
            dayOneIcon =data.list[4].weather.icon
            dayTwoIcon =data.list[12].weather.icon
            dayThreeIcon =data.list[20].weather.icon
            dayFourIcon =data.list[28].weather.icon
            dayFiveIcon =data.list[36].weather.icon

            // day humidty
            dayOneHum = data.list[4].main.humidity
            dayTwoHum = data.list[12].main.humidity
            dayThreeHum = data.list[20].main.humidity
            dayFourHum = data.list[28].main.humidity
            dayFiveHum = data.list[36].main.humidity


            //dynamic elements
            document.createElement("h4", dayOneDate).innerHTML
            document.createElement("h4", dayTwoDate).innerHTML
            document.createElement("h4", dayThreeDate).innerHTML
            document.createElement("h4", dayFourDate).innerHTML
            document.createElement("h4", dayFiveDate).innerHTML

            document.createElement("p", dayOneTemp)
            document.createElement("p", dayTwoTemp)
            document.createElement("p", dayThreeTemp)
            document.createElement("p", dayFourTemp)
            document.createElement("p", dayFiveTemp)

            document.createElement("p", dayOneIcon)
            document.createElement("p", dayTwoIcon)
            document.createElement("p", dayThreeIcon)
            document.createElement("p", dayFourIcon)
            document.createElement("p", dayFiveIcon)

            document.createElement("p", dayOneHum)
            document.createElement("p", dayTwoHum)
            document.createElement("p", dayThreeHum)
            document.createElement("p", dayFourHum)
            document.createElement("p", dayFiveHum)

        })
}

// cityLatlon() 


function get5DaysForecast(apiResponse) {
    return apiResponse.list.reduce(function (days, current) {
        var currentDate = current.dt_txt.split(" ")[0];
        if (!days.find(function (day) {
            return day.dt_txt.includes(currentDate);
        })) {
            return [...days, current];
        }
        return days;
    }, [])
}