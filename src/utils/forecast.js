const { RSA_X931_PADDING } = require('constants');
const request = require('postman-request');


const forecast = (latitde, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=738982b026026d60c9f304805b1d01bb&query=' + latitde + ',' + longitude +'&units=m'; // &units=f --> F, &units=s --> K, &units=m --> C°

    request({ url, json: true }, (error, { body }) => {

        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find LOCATION!', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is crrently ' + body.current.temperature + '° degrees out. It feels like ' + body.current.feelslike + '° degrees out. The humidity is ' + body.current.humidity + '%.');
        }
    });
}

module.exports = forecast;

// const url = 'http://api.weatherstack.com/current?access_key=738982b026026d60c9f304805b1d01bb&query=37.8267,-122.4233&units=f'; // units=f in --> F units=m in C --> units=f in K

// request({ url: url, json: true }, (error, response) => {

//     if(error) {
//         console.log('Unable to connect to weather service!', error);
//     } else if(response.body.error) {
//         console.log('Unable to find LOCATION!');
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + '. It is crrently ' + response.body.current.temperature + '° degrees out. It feels like ' + response.body.current.feelslike + '° degrees out.');
//     }
// });

// // Geocoding
// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYWJkdWxsYWhmYWhhZCIsImEiOiJja3QxZzd4eW0wYTNxMnBwaGU5Y3Vwd3NzIn0.dUZJyjuGkzRJTyNd1iTQDg&limit=1';
// request({ url: geocodeURL, json: true }, (error, response) => {

//     if(error) {
//         console.log('Unable to connect to geocode -LOCATION- service!', error);
//     } else if(response.body.features.length === 0) {
//         console.log('Unable to find LOCATION!. Try another search');
//     } else {
//         const latitde = response.body.features[0].center[1];
//         const longitude = response.body.features[0].center[0];
//         console.log(latitde, longitude);
//     }
// });