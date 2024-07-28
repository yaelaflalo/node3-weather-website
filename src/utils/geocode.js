const axios = require('axios');

const geocode = (address, callback) => {
    const url = 'https://nominatim.openstreetmap.org/search?q=' + address + '&countrycodes=IL&format=json&limit=1'

    axios.get(url)
        .then(response => {
            if(response.data.length === 0){
                callback('unable to find location', undefined)
            }else{
                callback(undefined, {
                    latitude: response.data[0].lat,
                    longitude: response.data[0].lon,
                    location: response.data[0].display_name
                })
            }
        })
        .catch(error => {
            callback('unable to connect to location services!', undefined)
        });
}


module.exports= geocode