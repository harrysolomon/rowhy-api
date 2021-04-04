var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TimeSaverSchema = new Schema(
  {
    name: {type: String, required: true},
    values: [
      {
        period: {type: String, required: true},
        value: {type: Number, required: true},
        new_cost: {type: Number, required: true},
        cur_cost: {type: Number, required: true},
        per_task: [
          {
            name: {type: String, required: false},
            row_id: {type: Schema.Types.ObjectId, required: false},
            current_time_spent: {type: Number, required: false},
            current_time_spent_period: {type: String, required: false},
            time_spent_cadence: {type: String, required: false},
            employee: {type: String, required: false},
            employee_cost: {type: Number, required: false},
            employee_cost_period: {type: String, required: false},
            employee_rate: {type: Number, required: false},
            cur_cost_per_task: {type: Number, required: false},
            cur_cost_per_period: {type: Number, required: false},
            new_cost_per_task: {type: Number, required: false},
            new_cost_per_period: {type: Number, required: false},
            time_increment: {type: String, required: false},
            product: {type: String, required: false},
            product_time_save: {type: Number, required: false},
            product_time_save_unit: {type: String, required: false},
            product_time_save_pct: {type: Number, required: false},
            product_cost_per_task: {type: Number, required: false},
            product_cost_per_period: {type: Number, required: false},
            new_task_time_pct: {type: Number, required: false},
            value_per_task: {type: Number, required: false},
            value_per_period: {type: Number, required: false},
            tasks_in_period: {type: Number, required: false}
          }
        ]
      }
    ],
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
    }],
    deleted: {type: Boolean, required: true}
  },
  { timestamps: true },
  {collection: 'timesavers'}
);
        
module.exports = mongoose.model('TimeSaver', TimeSaverSchema);
