//jshint 

const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function (req, res) {

    const query = req.body.cityName;
    const apiKey = "de7e635d2ae9e4076da31e423a56d046";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";


    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            console.log(JSON.parse(data));
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(temp);
            console.log(icon);
            res.write("<p>The weather is currently " + weatherData.weather[0].description + "</p>");
            res.write("<h1>The temperature in Sydney is " + temp + " degree </h1>");
            res.write("<img src=" + imageURL + " />");
            res.send();
        });

    });
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
})