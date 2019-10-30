const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  lat: { type: String },
  lng: { type: String },
  rad: { type: Number },
    w: { type: String },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('GeoTweet', schema);
