// AFTER DAYS OF TRYING I JUST COULD NOT GET THE PREVIOUS CITY BUTTONS TO WORK AND DISPLAY ITS CITY INFO.  
$(document).ready(function () {
    //CALL BACK FUNCTION TO EXECUTE WHEN SEARCH BUTTON IS CLICKED. 
    $("#btn-searchCity").on("click", cityInput);
    //ARRAY OF CITIES SEARCHED
    let cities = [];
    // FUNCTION THAT TAKES IN CLICK EVENT SUBMIT
    function cityInput(ev) {
        event.preventDefault();
    // VARIABLE THAT TAKES IN SUBMIT VALUE    
        let city = $("#submitCity").val();
        cities.push(city);
    // MAKES A CITY LIST ARRAY
        localStorage.setItem("myCityList", JSON.stringify(cities));
    // CREATE A BUTTON AND FILL IT WITH CITY SEARCHED 
        let searchedCities = $("<button>").text(city).addClass("button secondary");
        $("#searchedList").prepend(searchedCities);
        weatherApi(city);
    }
    //FUNCTION CONVERTING STRING TO AN OBJECT. 
    function searchedList() {
        cities = JSON.parse(localStorage.getItem("myCityList"));
        if (cities === null) {
            cities = [];
        }
        // LOOP GOES THROUGH OUR CITY ARRAY
        for (let i = 0; i < cities.length; i++) {
            let displayCity = cities[i];
        // PUT INFO IN A LIST AND THEN CREATE A BUTTON WITH A CLASS TO BE CLICKABLE 
            let listSearched = $("<button>").text(displayCity).addClass("button secondary");
            $("#searchedList").append(listSearched);
            function cityButtons() {
                // PLACING CITY VALUE INSIDE THIS.
                let city = $(this)[0].innerHTML;
               //THIS FUNCTION WAS SUPPOSE TO TAKE IN PREVIOUS CITIES SEARCHED AND PLACE THEM INSIDE WEATHERAPI() TO DISPLAY INFO.
                weatherApi(city);
            }    
            $(".button secondary").on("click", cityButtons);
        }
    }
    // MY API KEY TO BE PLACED IN THE AJAX CALL
    apiKey = "eb493dd8b4fdeb8581b3f2ab5f80c990";
    // THIS FUNCTION CREATES OUR URL TO GET THE INFORMATION FROM THE API VIA AJAX CALL 
    function weatherApi(city) {
        let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // STORE DATA RECEIVED INSIDE RESPONSE THEN GENERATE URL AND PLACE DESIRED DATA INSIDE VARIABLE 
            .then(function (response) {
                console.log(response);
            // THESE VARIABLES STORE IMAGE     
                let currentDay = "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png";
                let dayOne = "http://openweathermap.org/img/wn/" + response.list[6].weather[0].icon + "@2x.png";
                let dayTwo = "http://openweathermap.org/img/wn/" + response.list[14].weather[0].icon + "@2x.png";
                let dayThree = "http://openweathermap.org/img/wn/" + response.list[22].weather[0].icon + "@2x.png";
                let dayFour = "http://openweathermap.org/img/wn/" + response.list[30].weather[0].icon + "@2x.png";
                let dayFive = "http://openweathermap.org/img/wn/" + response.list[38].weather[0].icon + "@2x.png";
                let daySix = "http://openweathermap.org/img/wn/" + response.list[39].weather[0].icon + "@2x.png";
                let imageToday = $('<img src=" ' + currentDay + ' "/>');
                let imageOne = $('<img src=" ' + dayOne + ' "/>');
                let imageTwo = $('<img src=" ' + dayTwo + ' "/>');
                let imageThree = $('<img src=" ' + dayThree + ' "/>');
                let imageFour = $('<img src=" ' + dayFour + ' "/>');
                let imageFive = $('<img src=" ' + dayFive + ' "/>');
                //GENERATING PRESENT DAY DATA 
                $("#currentCity").text(response.city.name); // Use substr(0, 10 to only retrieve date and not time from the WeatherAPI)
                $("#fechaToday").empty().append(imageToday);
                $("#Temp").text("Current Temperature: " + ((response.list[6].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F°");
                $("#Humidity").text("Current Humidity: " + response.list[6].main.humidity + " %");
                $("#Wind").text("Current Wind Speed: " + response.list[6].wind.speed + " MPH");
                //GENERATING DATA FOR DATE 1/5  
                $("#dateOne").text(response.list[6].dt_txt.substr(0, 10));
                $("#fechaOne").empty().append(imageOne);
                $("#tempOne").text("Temperature: " + ((response.list[6].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F°");
                $("#humidOne").text("Humidity: " + response.list[6].main.humidity + " %");
               //GENERATING DATA FOR DATE 2/5
                $("#dateTwo").text(response.list[14].dt_txt.substr(0, 10));
                $("#fechaTwo").empty().append(imageTwo);
                $("#tempTwo").text("Temperature: " + ((response.list[14].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F°");
                $("#humidTwo").text("Humidity: " + response.list[14].main.humidity + " %");
                //GENERATING DATA FOR DATE 3/5
                $("#dateThree").text(response.list[22].dt_txt.substr(0, 10));
                $("#fechaThree").empty().append(imageThree);
                $("#tempThree").text("Temperature: " + ((response.list[22].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F°");
                $("#humidThree").text("Humidity: " + response.list[22].main.humidity + " %");
                //GENERATING DATA FOR DATE 4/5
                $("#dateFour").text(response.list[30].dt_txt.substr(0, 10));
                $("#fechaFour").empty().append(imageFour);
                $("#tempFour").text("Temperature: " + ((response.list[30].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F°");
                $("#humidFour").text("Humidity: " + response.list[30].main.humidity + " %");
                //GENERATING DATA FOR DATE 5/5
                $("#dateFive").text(response.list[38].dt_txt.substr(0, 10));
                $("#fechaFive").empty().append(imageFive);
                $("#tempFive").text("Temperature: " + ((response.list[38].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F°");
                $("#humidFive").text("Humidity: " + response.list[38].main.humidity + " %");
                //PULLING COORDINATES FOR UV INDEX
                let lat = response.city.coord.lat;
                let lon = response.city.coord.lon;
                // PASSING VARIABLES TO FUNCTION THAT GENERATES COLOR CODE FOR UV INDEX
                weatherUvIndex(lat, lon)
            });
    } 
    // END OF WEATHERAPI FUNCTION
    // UV INDEX FUNCTION BEGINS.  GENERATING ANOTHER URL TO OBTAIN UV DATA
    function weatherUvIndex(lat, lon) {
        let accessURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=" + apiKey;
        $.ajax({
            url: accessURL,
            method: "GET"
        })
    // STORING DATA RECEIVED IN RESPONSE1    
            .then(function (response1) {
                let uviNum = response1.current.uvi;
    // ELSE IF STATEMENT DETERMINES WHICH CLASS IS GOING TO BE ADDED FOR UV COLOR             
                $("#uvIndex").text("UV Index: " + uviNum);
                if (uviNum <= 2.99) {
                    uviNum = $("#uvIndex").addClass("classOne");
                } else if (uviNum >= 3 & uviNum <= 5.99) {
                    uviNum = $("#uvIndex").addClass("classTwo");
                } else if (uviNum >= 6 & uviNum <= 7.99) {
                    uviNum = $("#uvIndex").addClass("classThree");
                } else if (uviNum >= 8) {
                    uviNum = $("#uvIndex").addClass("classFour");
                };

            });
    } 
// END OF UV INDEX FUNCTION
    searchedList();
});