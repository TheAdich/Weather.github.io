//js for vanishing the loader animation effect

const loader = document.querySelector(".loader");
// Call the hideLoader function after 3 seconds (3000 milliseconds)


// Function to hide and remove the loader
const hideLoader = () => {
    loader.classList.add("loader-hide");

    loader.addEventListener("transitionend", () => {
        document.body.removeChild(loader);
    });
};
setTimeout(hideLoader, 3000);


//js for the weather App

//selecting the h p tags to show their desired values :)

const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("icon");
const extraDetail = document.getElementById("ex-detail");
const humidity = document.querySelector(".weather-prop-humidity");
const pressure = document.querySelector(".weather-prop-pressure");
const windSpedd = document.querySelector(".weather-prop-windSpeed");
const windDirection = document.querySelector(".weather-prop-windDirection");
const precipitation = document.querySelector(".weather-prop-precipitation");
const visibility = document.querySelector(".weather-prop-visibility");
const currentDate = document.getElementById("date");
//calculating current date
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
//calc if necessary:
const calc = (data) => {
    return data / 1000;
}



//fetching the data
async function getweather() {
    try {
        //asking user to give permission to access his/her location
        async function weatherDetails(data) {
            console.log(data.coords);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.coords.latitude}&lon=${data.coords.longitude}&appid=803c984d5994f01c3ad050b277d19183&units=metric`);
            const weather_data = await response.json(); //this will give the weather updates of user location 
            console.log(weather_data);
            //CHECKING IF ANY DETAIL GOES UNDEFINED THEN WE WILL REMOVE IT
            const precipitation_data = precipitation.innerText = `:${weather_data.clouds.all}%`;
            if (precipitation_data === undefined) precipitation.classList.add(".weather-prop-hide");
            const visibility_data = visibility.innerText = `:${calc(weather_data.visibility)}km`;
            if (visibility_data === undefined) visibility.classList.add("..weather-prop-hide");
            //genrating random images on loading related to user-location weather conditions
            document.body.style.background =
                `url('https://source.unsplash.com/1600x900/?" +${weather_data.weather[0].main}+ "')`;
            //DOM Manipulation Starts Here
            weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${weather_data.weather[0].icon}.png">`;
            currentDate.innerText = `Today's Date:${day}-${month}-${year}`
            cityName.innerText = `Weather in ${weather_data.name}`
            extraDetail.innerHTML = `Feels-Like:${weather_data.main.feels_like}°C <br>  
                                    ${weather_data.weather[0].main}  ||  ${weather_data.weather[0].description.toUpperCase()}`;
            humidity.innerText = `:${weather_data.main.humidity}%`;
            pressure.innerText = `:${weather_data.main.pressure} hPa`;
            windSpedd.innerText = `:${weather_data.wind.speed}m/s`;
            windDirection.innerText = `:${weather_data.wind.deg}°`;
            precipitation.innerText = `:${weather_data.clouds.all}%`
            visibility.innerText = `:${calc(weather_data.visibility)}km`
                //once each and every thing is loaded we will remove the loading class from weather-card
            document.querySelector(".location").classList.remove("loading");
            document.querySelector(".location-info").classList.remove("loading");


        }

        function success(data) {
            return weatherDetails(data);
        }

        function error(err) {
            alert("User has not given the permission to fetch location");
            alert("we are redirectig you back to Github")
            window.open("https://github.com/TheAdich");
            window.close("index.html");

        }

        const getLocation = () => { return navigator.geolocation.getCurrentPosition(success, error); }
        getLocation();

    } catch (err) {
        console.log(err.name);
        alert(err);

    }
}
getweather();