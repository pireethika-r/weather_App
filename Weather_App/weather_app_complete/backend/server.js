
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

const API_KEY = 'YOUR_OPENWEATHER_API_KEY';

app.get('/', (req,res)=>{
    res.send('Weather App Backend Running');
});

app.get('/weather/:city', async(req,res)=>{

    const city = req.params.city;

    try{

        const weather = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = weather.data;

        res.json({
            city:data.name,
            temperature:data.main.temp,
            description:data.weather[0].description,
            humidity:data.main.humidity,
            wind:data.wind.speed,
            icon:`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        });

        console.log("Weather fetched for:", city);

    }catch(error){

        res.json({
            error:"Invalid city name or API error"
        });

    }

});

app.listen(5000, ()=>{
    console.log('Server running on port 5000');
});
