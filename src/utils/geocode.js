const axios = require('axios');

const location = (address, callback) => {
    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=pk.eyJ1IjoianR3MDAyMyIsImEiOiJja2NlMTczNTkwMndwMnNwYjZoY3U0M3kzIn0.pJtZhlaf_6dNmpTOnEaPyA&limit=1`;

    axios
        .get(url)
        .then((res) => {
            if (res.data.features === []) {
                callback(
                    undefined,
                    'Place Not Found. Please make sure everything is spelt right.'
                );
            } else {
                callback(undefined, {
                    longitude: res.data.features[0].center[0],
                    latitude: res.data.features[0].center[1],
                    location: res.data.features[0].place_name,
                });
            }
        })
        .catch((err) => {
            if (err.code === 'EAI_AGAIN') {
                callback(
                    'HTTP request could not fetch data. Please make sure that your computer has internet access.'
                );
            } else {
                callback(
                    'Place Not Found. Please make sure everything is spelt right.'
                );
            }
        });
};

module.exports = location;
