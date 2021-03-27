var schemas = require('../functions/schemas')

module.exports = {
    unrealist_timesaver: function(req){
        let bad_records = []
        let date_dict = schemas.date_dictionary()
        console.log(date_dict[req[0].cadences.period][req[0].current_time_spent_period.period])
        for (let i = 0;i < req.length;++i){
            let max_range = date_dict[req[i].cadences.period][req[i].current_time_spent_period.period]
            if(req[i].current_time_spent > max_range){
                let task_time = req[i].current_time_spent + " " + req[i].current_time_spent_period.plural
                let cadence =  " in a " + req[i].cadences.period
                response = "There is less than " + task_time + cadence
                bad_records.push(response)
            }
        }
        return bad_records
    }
}