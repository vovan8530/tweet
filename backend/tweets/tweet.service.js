const cron = require('node-cron');
const db = require('_helpers/db');
const Tweet = db.Tweet;
const GeoTweet = db.GeoTweet;
const Twitter = require('twit');


module.exports = {
  getTweets,
  createGeoTweets,
  getTweetsDb,
  getGeoTweetsDb,
};

const client = new Twitter({
  consumer_key: 'HMPy9UmDJcELYhdWssf00llNa',
  consumer_secret: 'FJf2n8szMnnhrBqtk7UpabgMSlPZdEmrtxSGRr4tcp7oPh1M45',
  access_token: '1007140982863876096-NbmEzEiLBweDAjpLGhemP4cQNjmkma',
  access_token_secret: 'C4FhG6BOPdNmywe9FZBOmcrywReDI4lamD5HZsfSR9z7k'
});


  async function getTweets(req, res) {
    let radkm = Math.round(req.body.rad/1000);
    let loc = req.body.lat+','+req.body.lng+','+radkm+'km';
    console.log(loc)
    let w = req.body.w;
    const params = { q: w, geocode: loc,  count: 10 };

    client
      .get(`search/tweets`, params)
      .then(timeline => {

        res.send(timeline);
      })
      .catch(error => {
        res.send(error);
      });

  }

  async function createGeoTweets(req, res) {
      GeoTweet.create(req.body)
        .then(timeline => {

          res.send(timeline);
        })
        .catch(error => {
          res.send(error);
        });
  }

  async  function getGeoTweetsDb() {
      return await GeoTweet.findOne().sort({_id:-1});
  }

  async function getTweetsToDb(getGeo) {
    let radkm = Math.round(getGeo.rad/1000);
    let loc = getGeo.lat+','+getGeo.lng+','+radkm+'km';
    let w = getGeo.w;
    const params = { q: w, geocode: loc,  count: 10 };

    let res = await client
      .get(`search/tweets`, params);
    return res;
  }

  async function transTweets(getTw) {
    return Object.values(getTw.data.statuses).map( tweet =>  { return {text: tweet.text, name: tweet.user.name,
      location: tweet.user.location, img: tweet.user.profile_image_url}});
  }


  async function getTweetsDb(res) {
    return await Tweet.find().sort({_id:-1})
      .then(timeline => {

        res.send(timeline);
      })
      .catch(error => {
        res.send(error);
      });

  }

  async function SaveTweetsDb() {
    let getGeo = await getGeoTweetsDb();
    let getTw = await getTweetsToDb(getGeo);
    let trans = await transTweets(getTw);
    Tweet.create(trans);
  }

  let save = cron.schedule('* * * * *', () => {
    SaveTweetsDb();
    console.log('save')
    }, {
      scheduled: false
  });

    // save.start();
