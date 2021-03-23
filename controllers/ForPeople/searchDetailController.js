var SearchDetail = require('../../models/ForPeople/search_detail');

exports.bachelorsDegreeSearchDetail = (req, res, next) => {
    SearchDetail.find({ 
        tile_id: req.params.id
      })
      .exec((err, data) => {
        if (err) {
          return res.sendStatus(404);
        }
        res.json(data);
      });
  };