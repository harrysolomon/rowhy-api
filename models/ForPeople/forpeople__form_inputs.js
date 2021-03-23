//Is this tech debt to not define state in the schema?

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ForPeopleFormInputSchema = new Schema(
  {
    tile_id: {type: Schema.Types.ObjectId, ref: 'Tiles', required: true},
    form_id: {type: String, required: true, maxlength: 100},
    form_name: {type: String, required: true, maxlength: 100},
    default_value: {type: String, required: true, maxlength: 100},
    rank: {type: Number, required: true},
    hidden: {type: Boolean, required: true},
    state: {type: String, required: true, maxlength: 100},
    parent_name: {type: String, required: true},
    parent_rank: {type: Number, required: true},
    sibling_rank: {type: Number, required: true},
    type: {type: String, required: true}
  },
  {collection: 'tiles__form_inputs'}
);

//Export model
module.exports = mongoose.model('ForPeopleFormInput', ForPeopleFormInputSchema);