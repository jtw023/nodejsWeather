const axios = require('axios');

const weather = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=da8a24eaa8b966c2a897d098d50e3a7c&query=${lat},${long}&units=f`;

    axios
        .get(url)
        .then((res) => {
            if (res.data.success === false) {
                callback(
                    'Could not find location. Please make sure everything is spelt right.'
                );
            } else {
                callback(undefined, {
                    description: res.data.current.weather_descriptions[0],
                    temperature: res.data.current.temperature,
                    lastObservedTime: res.data.current.observation_time,
                    location: `${res.data.location.name}, ${res.data.location.region}, ${res.data.location.country}`,
                });
            }
        })
        .catch((err) => {
            if (err.code === 'ENOTFOUND') {
                callback(
                    'This site is temporarily down due to a broken URL link.'
                );
            } else if (err.code === 'EAI_AGAIN') {
                callback(
                    'HTTP request could not fetch data. Please make sure that your computer has internet access.'
                );
            }
        });
};

module.exports = weather;
