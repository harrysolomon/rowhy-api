var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CadenceSchema = new Schema(
  {
    name: {type: String, required: true},
    period: {type: String, required: true},
    plural: {type: String, required: true},
    abbr: {type: String, required: true}
  },
  {collection: 'cadences'}
);

//Export model
module.exports = mongoose.model('CadenceSchema', CadenceSchema);