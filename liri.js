require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var request = require("request");
// var omdb = require('omdb');

var userCommand = process.argv[2];
var secondCommand = process.argv.slice(3).join("+");

// Make it so liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

switch (userCommand) {
  case "concert-this":
    bandsInTown(secondCommand);
    break;
  case "spotify-this-song":
    spotifyIt(secondCommand);
    break;
  case "movie-this":
    movieThis(secondCommand);
    break;
  //     case 'do-what-it-says':
  //     // code block
  //     break;
  default:
    console.log("Try different command");
  // code block
}

// try async/await!
// node liri.js concert-this <artist/band name here>

function bandsInTown(artist) {
  // Default value
  if (artist == "") {
    artist = "Cher";
  }
  request(
    `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`,
    function(err, response, data) {
      try {
        var response = JSON.parse(data);
        if (response.length != 0) {
          console.log(`Upcoming concerts for ${artist} include: `);
          response.forEach(function(element) {
            console.log(`Venue name: ${element.venue.name}`);
            if (element.venue.country === "United States") {
              console.log(
                `City: ${element.venue.city} ${element.venue.region}`
              );
            } else {
              console.log(
                `City: ${element.venue.city} ${element.venue.country}`
              );
            }
            console.log(
              `Date: ${moment(element.datetime).format("MM/DD/YYYY")}`
            );
            console.log();
          });
        } else {
          console.log("No concerts found");
        }
      } catch (err) {
        console.log("No concerts");
      }
    }
  );
}

// node liri.js spotify-this-song '<song name here>'
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from

function spotifyIt(song) {
  // work on it
  if (song === "") {
    song = "The Sign";
  }

  spotify.search({ type: "track", query: song, limit: 1 }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    var tableArray = [];
    for (var i = 0; i < data.tracks.items.length; i++) {
      var result = {
        artist: data.tracks.items[i].album.artists[0].name,
        song_name: data.tracks.items[i].name,
        preview_url: data.tracks.items[i].preview_url,
        album_name: data.tracks.items[i].album.name
      };
      tableArray.push(result);
    }

    console.log(tableArray);
  });
}

// movie-this

function movieThis(movie) {
  if (movie == null) {
    axios
      .get(`https://omdbapi.com/?t=${movie}&apikey=trilogy`)
      .then(function(resp) {
        console.log(`Movie Title: ${resp.data.Title}`);
        console.log(`Year Released: ${resp.data.Year}`);
        console.log(`IMDB Rating: ${resp.data.imdbRating}`);
        console.log(`Rotten Tomatoes Rating: ${resp.data.Ratings[1].Value}`);
        console.log(`Country Produced: ${resp.data.Country}`);
        console.log(`Language of the Movie: ${resp.data.Language}`);
        console.log(`Movie Plot: ${resp.data.Plot}`);
        console.log(`Movie Actors: ${resp.data.Actors}`);
      })
      .catch(function(error) {
        console.log(error);
      });
  } else {
    axios
      .get(`https://omdbapi.com/?t=${movie}&apikey=trilogy`)
      .then(function(resp) {
        console.log(`Movie Title: ${resp.data.Title}`);
        console.log(`Year Released: ${resp.data.Year}`);
        console.log(`IMDB Rating: ${resp.data.imdbRating}`);
        console.log(`Rotten Tomatoes Rating: ${resp.data.Ratings[1].Value}`);
        console.log(`Country Produced: ${resp.data.Country}`);
        console.log(`Language of the Movie: ${resp.data.Language}`);
        console.log(`Movie Plot: ${resp.data.Plot}`);
        console.log(`Movie Actors: ${resp.data.Actors}`);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
