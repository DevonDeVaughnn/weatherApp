const citySearchEl = $("#citySearch")
const citySearchArr = []
function searchWeather(city) {
    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(response);
            //Add date, temp, humidity, wind speed, UV index.
            console.log(response.city.name)
            const data = response.list
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                console.log(element)
                const day = element.dt_txt.split(" ")[0]
                const time = element.dt_txt.split(" ")[1]
                if (time === "12:00:00") {
                    const dayContainer = $("<div>")
                    const date = $("<p>").text(day)
                    const img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + element.weather[0].icon + ".png");
                    // Convert the temp to fahrenheit
                    const tempF = (element.main.temp - 273.15) * 1.80 + 32;
                    const temp = $("<p>").text(Math.floor(tempF) + " F")
                    const wind = $("<p>").text(element.wind.speed + " mph")
                    dayContainer.append(date, temp, img, wind)
                    $(".fiveDay").append(dayContainer)
                }



            }

            // Transfer content to HTML
            /*$(".city").html("<h1>" + response.name + " Weather Details</h1>");
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);
            
    
            // add temp content to html
            $(".temp").text("Temperature (K) " + response.main.temp);
            $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
    
            // Log the data in the console as well
            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + tempF);*/

            saveCity();
        });

    // Store buttons in local storage
    function saveCity() {
        var searchedCities = JSON.stringify(citySearchArr);
        console.log(searchedCities);
        localStorage.setItem("Cities", searchedCity);
    }
    // Pull from localstorage
    function getList() {
        var cityList = JSON.parse(localStorage.getItem("Cities"));
        if (cityList != null) {
            citySearchArr = [];
            citySearchArr = cityList;
            console.log(cityList);
        }

    }
    $(".searchBar").on("submit", (e) => {
        e.preventDefault()

        const currentCity = citySearchEl.val()
        citySearchArr.push(currentCity)
        searchWeather(currentCity);


    })}