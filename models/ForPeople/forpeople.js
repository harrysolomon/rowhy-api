var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ForPeopleSchema = new Schema(
  {
    scenario_type: {type: String, required: true, maxlength: 100},
    scenario_description: {type: String, required: true},
    scenario_icon: {type: String, required: true},
    scenario_icon_owner: {type: String, required: true, maxlength: 100},
    scenario_icon_owner_link: {type: String, required: true}
  },
  {collection: 'tiles'}
);

//Export model
module.exports = mongoose.model('ForPeople', ForPeopleSchema);