const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String },
  text: { type: String },
  location: { type: String },
  img: { type: String },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Tweet', schema);



