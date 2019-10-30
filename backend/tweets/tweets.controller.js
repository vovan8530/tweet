const express = require('express');
const router = express.Router();
const tweetService = require('./tweet.service');

// routes
router.post('/save', saveGeoTweets);
router.post('/', getTweets);
router.get('/db', getTweetsDb);
router.get('/get', getGeoTweets);


module.exports = router;

function saveGeoTweets(req, res) {
  tweetService.createGeoTweets(req, res);
}

function getTweets(req, res) {
   tweetService.getTweets(req, res);
 }

function getGeoTweets(req, res) {
   tweetService.getGeoTweetsDb(res)
    .then(tweets => res.json(tweets));
 }

function getTweetsDb(req, res) {
   tweetService.getTweetsDb(res)
     .then(tweets => res.json(tweets));
 }


