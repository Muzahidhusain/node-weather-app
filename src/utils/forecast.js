const request = require("request");

const foreCast = (latitude, longtitude, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=3527b0906d994b34eddd007d4f96add5&query=" +
        latitude +
        "," +
        longtitude +
        "&units=f";

    request({ url, json: true }, (error, { body }) => {
        // Instead of response here we are using object destructuring as body
        if (error) {
            callback("Unable to connect weather services", undefined);
        } else if (body.error) {
            callback("Unable to find location.Try another search", undefined);
        } else {
            callback(
                undefined,
                body.current.weather_descriptions[0] +
                " It is currently " +
                body.current.temperature +
                " degree out, It feels like " +
                body.current.feelslike +
                " out here"
            );
        }
    });
};

module.exports = foreCast;