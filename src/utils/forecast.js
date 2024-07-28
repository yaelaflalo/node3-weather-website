const axios = require('axios');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://www.7timer.info/bin/api.pl?lon=' + longitude + '&lat=' + latitude + '&product=civillight&output=json&lang=en'

    axios.get(url)
        .then(response => {
            callback(undefined, response.data.dataseries[0].weather + ' max temp:' + response.data.dataseries[0].temp2m.max)
        })
        .catch(error => {
            if (error.code === 'ERR_NETWORK') {
                callback('Unable to connect to weather service!', undefined)
            } else if (error.code === 'ERR_BAD_RESPONSE') {
                callback('unable to find location', undefined)
            }
            //בשביל להבדיל בין סוגי השגיאות יש קודים לשגיאו בדקומנטציה
        });
}

module.exports = forecast