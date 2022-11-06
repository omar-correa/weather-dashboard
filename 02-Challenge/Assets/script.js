const apiKey = "d5597b1e7a39fea80560c4ae65ba0cf7"
var temp = document.querySelector("#temp")
var cityName = document.querySelector("#cityName")

function cityWeather(cityName) {

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            document.getElementById("temp").innerHTML = data[0].lat
            cityLat = data[0].lat
            cityLon = data[0].lon
            cityLatlon = (cityLat, cityLon)
            document.getElementById("cityName").innerHTML = cityName
            console.log("city lat", cityLat)
            
        })

    // cityLatlon = (cityLat, cityLon)

}

cityWeather('Atlanta')



function cityLatlon(cityLat, cityLon) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}`)
        .then(function (response) {
            console.log(response)
            console.log("citylon", cityLon)
            return response.json()
        })
        .then(function (data) {
            console.log(data)

        })
}

cityLatlon('') 


function get5DaysForecast(apiResponse) {
    return apiResponse.list.reduce(function(days,current) {
        var currentDate=current.dt_txt.split(" ")[0];
        if(!days.find(function(day) {
            return day.dt_txt.includes(currentDate);
        })) {
            return [...days,current];
        }
        return days;
    },[])
}