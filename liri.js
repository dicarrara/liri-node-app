require("dotenv").config();
let keys = require("./keys.js");
let axios = require("axios");
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);
let moment = require("moment");
let request = require("request");
let fs = require("fs");

let userCommand = process.argv[2];
let secondCommand = process.argv.slice(3).join("+");

fs.appendFile('log.txt', userCommand + ",", function (err) {
    if (err) throw err;
});

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
  case "do-what-it-says":
    doWhatSays();
    break;
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
        let response = JSON.parse(data);
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

    let tableArray = [];
    for (let i = 0; i < data.tracks.items.length; i++) {
      let result = {
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
  axios
    .get(
      `http://www.omdbapi.com/?t=${movie}&y=&plot=short&tomatoes=true&apikey=trilogy`
    )
    .then(function(response) {
      //console.log(response.data);
      if (response.data.Title != undefined) {
        console.log(`Movie Title: ${response.data.Title}`);
        console.log(`Year Released: ${response.data.Year}`);
        console.log(`IMDB Rating: ${response.data.imdbRating}`);
        console.log(
          `Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`
        );
        console.log(`Country Produced: ${response.data.Country}`);
        console.log(`Language of the Movie: ${response.data.Language}`);
        console.log(`Movie Plot: ${response.data.Plot}`);
        console.log(`Movie Actors: ${response.data.Actors}`);
      } else {
        movieThis("Green Book");
      }
    })
    .catch(function(error) {
      console.log(error);
      console.log("No Results found. ");
    });
}

function doWhatSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    let dataArr = data.split(",");
    spotifyIt(dataArr[1]);
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  });
}
