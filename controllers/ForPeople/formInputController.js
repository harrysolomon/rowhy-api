var ForPeopleFormInput = require('../../models/ForPeople/forpeople__form_inputs');

exports.form_input = (req, res, next) => {
  ForPeopleFormInput.find({ 
        tile_id: req.params.id
      })
      .sort({parent_rank: 'asc', sibling_rank: 'asc'})
      .exec((err, data) => {
        if (err) {
          return res.sendStatus(404);
        }
        res.json(data);
      });
  };