var CadenceSchema = require('../models/cadences')

exports.cadences = (req, res, next) => {
    CadenceSchema.find()
    .exec((err, data) => {
        if (err) {
            return res.sendStatus(404);
        }
        res.json(data)
    });
};