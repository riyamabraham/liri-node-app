require("dotenv").config();
var action = process.argv[2];
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var keys = require('./keys.js')

switch (action) {
    case "my-tweets":
        tweets();
        break;

    case "spotify-this-song":
        var song = process.argv[3];
        spotify();
        break;

    case "movie-this":
        movies();
        break;

    case "do-what-it-says":
        reflect();
        break;
}


function tweets() {
    var client = new Twitter(keys.twitter);
    var params = { screen_name: 'Riya81060624' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
}


function spotify(song = process.argv[3]){
    var spotify = new Spotify(keys.spotify);
    if (song != null) {
        spotify.search({ type: 'track', query: song }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log(data);
        });
    }

    else {
        spotify.search({ type: 'track', query: "The Sign" }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log(data);
        });
    }
}




function movies() {
    var movieName = process.argv[3];
    if (movieName != null) {
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        console.log(queryUrl);
        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("Rating " + JSON.parse(body).Rated);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("Plot: " + JSON.parse(body).Plot);

            }

        });
    }
    else {
        var movieName = "Mr. Nobody";
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        console.log("If you haven't watched 'Mr.Noobody' then you should :" + queryUrl);
        console.log("Its on Netflix!");
        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("Rating " + JSON.parse(body).Rated);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("Plot: " + JSON.parse(body).Plot);

            }

        });
    }
}


function reflect() {
   fs.readFile("random.txt","utf-8",function(err,data){
        if(err){
            console.log(err);
        }
        data = data.split(",");
        for(var i=0;i<data.length;i++){
            console.log(data[i]);
        }
        var song = data[1];
        console.log(song);
        spotify(song);
   });
}





