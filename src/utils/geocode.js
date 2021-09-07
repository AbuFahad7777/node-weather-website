const { RSA_X931_PADDING } = require('constants');
const request = require('postman-request');

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWJkdWxsYWhmYWhhZCIsImEiOiJja3QxZzd4eW0wYTNxMnBwaGU5Y3Vwd3NzIn0.dUZJyjuGkzRJTyNd1iTQDg&limit=1';

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to geocode -LOCATION- service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find LOCATION!. Try another search', undefined)
        } else {
            // const latitde = response.body.features[0].center[1];
            // const longitude = response.body.features[0].center[0];
            // console.log(latitde, longitude);
            callback(undefined, {
                latitde: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}
module.exports = geocode;