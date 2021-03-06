# liri-node-app

This node application at it's core is a simple SWITCH CASE statement. From the command line run the liri.js file as you would any other Node.js and provide it with any of the following commands then a search term as noted below:

## Commands & Filter:
* _"concert-this" Artist_
   * Will call the Bands In Town API and return the first result of a concert matching the artist that you entered.

   ![GitHub Logo](./screens/concert.png)
Format: !

* _"spotify-this-song" Song_
   * Will call the Spotify API and return the first result matching the song you entered.
   ![GitHub Logo](./screens/spotify.png)
* _"movie-this" Movie_
   * Will call the IMBD API and display the details of the movie you searched for.
   ![GitHub Logo](./screens/movie.png)
* _"do-what-it-says"_
    * liri.js with this command and it will read in a search term from the file "random.txt" and search Spotify for the term that was read into the file. Random.txt is structured as a comma delimited file so the search term is always idex 1 on the array created using the javascript "split()" function.
    ![GitHub Logo](./screens/doWhat.png)
### Dependancies:

* fs
* moment
* axios
* node-spotify-api
