
async function getWeather(){
    const city = document.getElementById('city').value;
    const error = document.getElementById('error');

    error.innerHTML = "";

    if(city === ""){
        error.innerHTML = "Please enter a city name";
        return;
    }

    try{
        const response = await fetch(`http://localhost:5000/weather/${city}`);
        const data = await response.json();

        if(data.error){
            error.innerHTML = data.error;
            return;
        }

        document.getElementById('cityName').innerHTML = data.city;
        document.getElementById('temp').innerHTML = data.temperature + " °C";
        document.getElementById('description').innerHTML = data.description;
        document.getElementById('humidity').innerHTML = "Humidity: " + data.humidity + "%";
        document.getElementById('wind').innerHTML = "Wind Speed: " + data.wind + " km/h";
        document.getElementById('weatherIcon').src = data.icon;

    }catch(err){
        error.innerHTML = "Server Error";
    }
}
