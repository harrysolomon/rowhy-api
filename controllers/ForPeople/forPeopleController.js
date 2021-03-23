var ForPeople = require('../../models/ForPeople/forpeople');

exports.tile_list = (req, res, next) => {
  ForPeople.find()
      .exec((err, data) => {
        if (err) {
          return res.sendStatus(404);
        }
        res.json(data);
      });
  };

