//Is this tech debt to not define state in the schema?

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SearchDetailSchema = new Schema(
  {
    tile_id: {type: Schema.Types.ObjectId, ref: 'Tiles', required: true},
    dependencies: [{
        dependent_id: {type: Schema.Types.ObjectId, ref: 'TilesFormInput', required: true},
        col_ref: {type: String, required: true}
    }],
    search_name: {type: String, required: true}
    
  },
  {collection: 'search_details'}
);

//Export model
module.exports = mongoose.model('SearchDetails', SearchDetailSchema);