require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");

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
  //     case 'movie-this':
  //     // code block
  //     break;
  //     case 'do-what-it-says':
  //     // code block
  //     break;
  default:
    console.log("try different command");
  // code block
}

// async/await
// node liri.js concert-this <artist/band name here>
// function bandsInTown(artist) {
//   axios
//     .get(
//       `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`
//     )
//     .then(function(response) {
//           console.log(response.venue.city + moment(response.venue.datetime).format('MM/DD/YYYY'));
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// }

// console.log(keys.spotify);
// access keys information like so
// node liri.js spotify-this-song '<song name here>'
// This will show the following information about the song in your terminal/bash window

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from

function spotifyIt(song) {
    // work on it
//   if (song === undefined) {
//     song = "The Sign";
//   }

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
