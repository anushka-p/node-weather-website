const axios = require('axios');
const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW51c2hrYS1wIiwiYSI6ImNsbHVuN2pkbDB5ZjQzam9ocWZjcGg1cmIifQ.3o0U__t0ihyD54g5QOwIjA&limit=1';
    axios.get(url).then(function({data}){
        if(data.features.length ===0)
        {
            callback('Invalid location', undefined);
        }
        else{
            callback(undefined, {
                latitude: data.features[0].center[1],
                longitude: data.features[0].center[0],
                location: data.features[0].place_name
            });
        }
    })
    .catch(function(error){
    {
       callback('Unable to connect', undefined)
    }
})
}


module.exports = geocode;