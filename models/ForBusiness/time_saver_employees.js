var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TimeSaverEmployeeSchema = new Schema(
  {
    name: {type: String, required: true},
    cost: {type: Number, required: true},
    department: {type: String, required: true},
    period: {type: String, required: true},
    deleted: {type: Boolean, required: true}
  },
  { timestamps: true },
  {collection: 'timesaveremployeeschemas'}
);

//Export model
module.exports = mongoose.model('TimeSaverEmployeeSchema', TimeSaverEmployeeSchema);