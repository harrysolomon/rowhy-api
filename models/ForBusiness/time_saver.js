var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TimeSaverSchema = new Schema(
  {
    name: {type: String, required: true},
    values: [{
      period: {type: String, required: true},
      value: {type: Number, required: true},
      new_cost: {type: Number, required: true},
      cur_cost: {type: Number, required: true}
    }],
    inputs:[{
      cadences:{
        _id: {type: String, required: true},
        period:{type: String, required: true},
        name:{type: String, required: true}
      },
    current_time_spent:{type: Number, required: true},
    current_time_spent_period:{
      _id: {type: String, required: true},
      period:{type: String, required: true},
      name: {type: String, required: true},
      plural: {type: String, required: true},
      abbr: {type: String, required: true}
    },
    name: {type: String, required: true},
    employees:{
        _id: {type: Schema.Types.ObjectId, ref: 'TimeSaverEmployeeSchema', required: true},
        cost:{type: Number, required: true},
        name:{type: String, required: true},
        period:{type: String, required: true}
    },
    products:{
        _id:{type: Schema.Types.ObjectId, ref: 'TimeSaverProductSchema', required: true},
        name:{type: String, required: true},
        cost: {type: Number, required: true},
        period: {type: String, required: true},
        time_save:{type: Number, required: true},
        time_unit:{type: String, required: true}   
    }
    }]
  },
  { timestamps: true },
  {collection: 'timesavers'}
);
        
module.exports = mongoose.model('TimeSaver', TimeSaverSchema);
