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


                    const dayContainerCard = $("card")
                    const dayContainer = $("<div>")
                    dayContainer.append(dayContainerCard)
                    const date = $("<p>").text(day)
                    const img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + element.weather[0].icon + ".png");
                    // Convert the temp to fahrenheit
                    const tempF = (element.main.temp - 273.15) * 1.80 + 32;
                    const temp = $("<p>").text(Math.floor(tempF) + "° F")
                    const wind = $("<p>").text("Wind: " + element.wind.speed + " mph")
                    dayContainer.append(date, temp, img, wind)

                    //create weather boxes for given city
                    $(".fiveDay").append(dayContainer)
                    $(".fiveDay").attr("style", "display: flex; justify-content:space-around")
                    dayContainer.attr("style", "margin-left:20px; margin-top:20px; background-color:grey; width:11em; display:inline-block; text-align:center; border:1px solid black;")



                }



            }


        });
};


   






//submit func

$(".searchBar").on("submit", (e) => {
    e.preventDefault()
    //clear previous city
    $(".fiveDay").empty()
    $(".currentCity").empty()

    //show current city

    const currentCity = citySearchEl.val()
    localStorage.setItem("currentCity", currentCity);
    localStorage.getItem("currentCity")
    const searchContainer = $("<div>")
    const userSearch = $("<button><p>").text(currentCity)
  
   
    
    userSearch.attr("style", "background-color:gray; align-self:center")
    

    searchContainer.append(userSearch)
    $('.searchHistory').append(searchContainer)
    searchContainer.attr("style", "width:120px; background-color:gray; text-align:center;")
   


    //headline current city as h1

    const cityContainer = $("<div>")
    const city = $("<h1>").text(currentCity)
    cityContainer.append(city)
    $('.currentCity').append(cityContainer)
    cityContainer.attr("style", "text-align:center; padding-top: 20px; text-decoration:underline")

    citySearchArr.push(currentCity)

    searchWeather(currentCity);

    console.log(citySearchArr)





});





