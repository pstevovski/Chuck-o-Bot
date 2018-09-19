const Twit = require('twit');
const config = require('./config');
const fetch = require('node-fetch');

const T = new Twit(config);

// First tweet, after this the jokes start rolling in.
let joke = "Get ready for good Chuck Norris jokes. The Chuck-o-Bot is starting!";

// Get API for random jokes
theTweet();
setInterval(theTweet, 1000*60*5);

function theTweet(){
    // Fetching API to get random jokes.
    fetch("http://api.icndb.com/jokes/random/").then(response => response.json()).then(data => {
        joke = data.value.joke;
        joke.charAt(0).toUpperCase();
    })

    const tweet = {
        status: joke + " #ChuckNorrisJokes"
    }

    T.post('statuses/update', tweet, tweeted);
    
    function tweeted(err, data, response){
        if(err){
            console.log(err)
        } else {
            console.log("Joke tweeted.");
        }
    }
}
