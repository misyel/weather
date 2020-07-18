const p = document.querySelector('p');
const submit = document.getElementById("submit");
const city = document.getElementById("city");
const weather = document.getElementById("weather");
const temp = document.getElementById("temp");
const img = document.getElementById("weather-img");

//get current position
if(window.navigator.geolocation){
    window.navigator.geolocation.getCurrentPosition( 
        (success) => {
            console.log(success);
        
        },
        (err) => {
            console.log(err);
        }
    );
}

submit.addEventListener("click", getInfo);

async function getInfo() {
    var city = document.getElementById('weather-input').value; //get city input
    var units = document.getElementById("degree");
    units = units.options[units.selectedIndex].value; //get selected unit
    city = city.split(" ").join("+");
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},US&APPID=d854458373b1b4194495223422ea2535&units=${units}`, {mode: 'cors'}
)

    try{
        const data = await getWeather(response);
        displayWeather(data);
    } catch(error){
        alert("invalid city");
        console.log(error.message);
    }

    
}

function getWeather(response){
    const data = response.json();
    if(response.ok == false){
        throw{"message": "invalid city"};
    }
    return data;
}

function displayWeather(response){
    console.log(response);        
    console.log("reponse ok");
    weather.innerText = "weather: " + response.weather[0].main;
    city.innerText = "city: "+response.name;
    temp.innerText = "temp: " + response.main.temp;
    console.log(response.weather[0].icon);
    img.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
}