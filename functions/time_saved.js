var schemas = require('../functions/schemas')
var cost_per_period = require('../functions/time_saver_cost_per_period')

module.exports = {
    new_cost: function(req, query){

        let date_dict = schemas.date_dictionary()
        let interval = []
        
        if(query.hasOwnProperty('period')) {
            interval.push(query.period)
        } else {
            interval.push('quarter')
        }


        if(query.hasOwnProperty('range')) {
            forecast_length = query.range
        } else {
            forecast_length = 8
        }


        let costs_per_period = cost_per_period.timesaver_cost_per_period(req,interval)

        //console.log("the costs are ", costs_per_period[0].per_task)

        
        let final_new_employee_cost_array = []
        let final_cur_employee_cost_array = []

        for (let i = 0;i < forecast_length;++i) {
            final_new_employee_cost_array.push(costs_per_period[0].new_cost)
            final_cur_employee_cost_array.push(costs_per_period[0].cur_cost)
        }

        let result = schemas.line_chart_schema()
        let period_abbr = date_dict[interval[0]]["abbr"]

        for (let increment = 1; increment <= forecast_length;++increment){
            result["data"]["labels"].push(period_abbr+increment)
        }

        final_cur_employee_cost_array.reduce( (prev, curr,i) =>  result["data"]["datasets"][0]["data"][i] = Math.round(prev + curr), 0)
        final_new_employee_cost_array.reduce( (prev, curr,i) =>  result["data"]["datasets"][1]["data"][i] = Math.round(prev + curr), 0)

        let combined_cost = result["data"]["datasets"][0]["data"].concat(result["data"]["datasets"][1]["data"]);

        let minimum_val = Math.min.apply(Math, combined_cost);
        let maximum_val = Math.max.apply(Math, combined_cost);

        result["options"]["scales"]["yAxes"][0]["ticks"]["suggestedMin"] = minimum_val
        result["options"]["scales"]["yAxes"][0]["ticks"]["suggestedMax"] = maximum_val

        //Create the same output for the line chart but for use in table form
        result["table_data"] = []
        
        for (let idx = 0; idx < forecast_length;++idx){
            let time_slice_performance = {}
            time_slice_performance.cur_cost = result["data"]["datasets"][0]["data"][idx]
            time_slice_performance.new_cost = result["data"]["datasets"][1]["data"][idx]
            time_slice_performance.value = time_slice_performance.cur_cost - time_slice_performance.new_cost
            time_slice_performance.time_increment = result["data"]["labels"][idx]
            
            result["table_data"].push(time_slice_performance)
        }


        return result
    }
}