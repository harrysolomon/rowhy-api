var time_save_functions = require('../../functions/time_saved')
var TimeSaver = require('../../models/ForBusiness/time_saver');
var TimeSaverProductSchema = require('../../models/ForBusiness/time_saver_products');
var TimeSaverEmployeeSchema = require('../../models/ForBusiness/time_saver_employees');
var cost_per_period = require('../../functions/time_saver_cost_per_period');
var data_sanity = require('../../functions/data_sanity');
var request = require('request');



exports.createData = (req, res) => {
    
    if(!req.body.hasOwnProperty('deleted')){
        req.body.deleted = false
    }
    
    let bad_data = data_sanity.unrealist_timesaver(req.body.inputs)
    if (bad_data.length >= 1){
        res.status(404).send(bad_data[0])
    } else {

        intervals = ['year','month','quarter','week','day','hour']
        req.body["values"] = []

        req.body["values"] = cost_per_period.timesaver_cost_per_period(req.body.inputs,intervals)
        
        var new_data = new TimeSaver(req.body);

        
        new_data.save(function (err, data) {
            
            
            if (err) {
                return console.log(err)
            };

            console.log("saved successfully")
            req.body["_id"] = data._id

            //req.body["data"] = chart_data["data"]
            //req.body["options"] = chart_data["options"]

            res.json(req.body)
        })
}

};

exports.updateData = (req, res) => {
    
    //Figuring out how to check for existing products and employees
    /*request.post('http://localhost:3000/timesaver/product/list', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body) // Print the google web page.
        }
    })*/
    
    const unique = [...new Set(req.body.inputs.map(input => input.products._id))];
    
      console.log(unique)
    
    if(!req.body.hasOwnProperty('deleted')){
        req.body.deleted = false
    }
    //reserving a section here for recalculating the value portion
    let bad_data = data_sanity.unrealist_timesaver(req.body.inputs)
    if (bad_data.length >= 1){
        res.status(404).send(bad_data[0])
    } else {
        intervals = ['year','month','quarter','week','day','hour']

        req.body["values"] = cost_per_period.timesaver_cost_per_period(req.body.inputs,intervals)
    
        TimeSaver.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, doc) => {
            if (err) {
                return console.log(err)
            }
            res.json(doc)
        })
    }
};

exports.getData = (req, res, next) => {
    
    TimeSaver.find(
        {_id: req.params.id, deleted: false})
      .exec((err, data) => {
        if (err) {
          return res.sendStatus(404);
        } 
        let result = {
            meta: {},
            graph_data: {},
            table_data: []
        }
        let chart_data = time_save_functions.new_cost(data[0].inputs, req.query)
        
        result.meta = data
        result.graph_data.data = chart_data.data
        result.graph_data.options = chart_data.options
        result.table_data = chart_data.table_data

        res.json(result)
        
      });
  };

exports.timeSaverList = (req, res, next) => {
    TimeSaver.find({deleted: false})
    .exec((err, data) => {
        if (err) {
            return res.sendStatus(404);
        }
        res.json(data)
    });
};

exports.productList = (req, res, next) => {
    console.log(req.query)
    TimeSaverProductSchema.find({deleted: false})
    .exec((err, data) => {
        if (err) {
            return res.sendStatus(404);
        }
        res.json(data)
    });
};

exports.product = (req, res, next) => {
    TimeSaverProductSchema.find(
        {_id: req.params.id, deleted: false})
      .exec((err, data) => {
        if (err) {
          return res.sendStatus(404);
        } 
        res.json(data)
        
      });
  };

exports.newProduct = (req, res, next) => {
    var new_data = new TimeSaverProductSchema(req.body);

    
    new_data.save({new: true}, (err, data) => {
        if (err) {
            return console.log(err)
        };
        res.json(data)
    })
};

exports.editProduct = (req, res, next) => {
    TimeSaverProductSchema.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, data) => {
        if (err) {
            return console.log(err)
    }

    res.json(data)
    })
};

exports.employeeList = (req, res, next) => {
    TimeSaverEmployeeSchema.find({deleted: false})
    .exec((err, data) => {
        if (err) {
            return res.sendStatus(404);
        }
        res.json(data)
    });
};

exports.employee = (req, res, next) => {
    TimeSaverEmployeeSchema.find(
        {_id: req.params.id, deleted: false})
      .exec((err, data) => {
        if (err) {
          return res.sendStatus(404);
        } 
        res.json(data)
        
      });
  };
exports.newEmployee = (req, res, next) => {
    var new_data = new TimeSaverEmployeeSchema(req.body);


    new_data.save({new: true}, (err, data) => {
        if (err) {
            return console.log(err)
        };
        res.json(data)
    })
};

exports.editEmployee = (req, res, next) => {
    TimeSaverEmployeeSchema.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, data) => {
        if (err) {
            return console.log(err)
    }

    res.json(data)
    })
};


    
