const axios = require('axios');
const forecast = (latitude, longitude, callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=1a5e4571bbff060870f613082cb4b19d&query=" +latitude+','+longitude+"&units=f";
    axios.get(url).then(function({data}){
        if(data.error)
    {
        callback('Invalid location', undefined);
    }
    else{
        callback(undefined, {
            temperature: data.current.temperature,
            feelslike: data.current.feelslike
        });
    }
    })
    .catch(function(error){
    {
       callback('Unable to connect', undefined)
    }
})
}

module.exports = forecast;