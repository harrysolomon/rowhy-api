var schemas = require('../functions/schemas')

module.exports = {
    timesaver_cost_per_period: function(req, interval){
        
        let date_dict = schemas.date_dictionary()
        
        let time_now_period = "hour"

        let final_result = []

        for (let interval_idx = 0; interval_idx < interval.length; ++interval_idx){

            let result = {
                new_cost: 0,
                cur_cost: 0,
                value: 0,
                period: interval[interval_idx]
            }

            let total_new_employee_costs = 0
            let total_cur_employee_costs = 0

            for (let i = 0;i < req.length;++i){
                
                if(req[i].products.time_unit === "pct"){
                    time_save_convert = req[i].current_time_spent * (req[i].products.time_save / 100)
                } else {
                    time_save_convert = req[i].products.time_save * date_dict[req[i].products.time_unit][req[i].current_time_spent_period.period]
                }

                //calculates cost of employee to do the task once
                let cur_cost_per_task = req[i].employees.cost * req[i].current_time_spent * date_dict[req[i].current_time_spent_period.period][req[i].employees.period]
                //calculate cost of employee to do the task for an entire time increment
                let cur_cost_per_period = cur_cost_per_task * date_dict[interval[interval_idx]][req[i].cadences.period]
                //cost of the product for the entire time increment
                let product_cost_rate = req[i].products.cost * date_dict[interval[interval_idx]][req[i].products.period]
                //cost of employee to do the task once now with the product
                let new_cost_per_task = (req[i].employees.cost * (req[i].current_time_spent - time_save_convert) * date_dict[req[i].current_time_spent_period.period][req[i].employees.period])
                //cost of employee to do the task the number of times within the time increment with the help of the product
                let new_cost_per_period = new_cost_per_task * date_dict[interval[interval_idx]][req[i].cadences.period] + product_cost_rate
                console.log("new_cost", result.period, new_cost_per_period)
                console.log("cur_cost", result.period, cur_cost_per_period)
                
                total_new_employee_costs += new_cost_per_period
                total_cur_employee_costs += cur_cost_per_period
                

            }
            result.new_cost = Math.round(total_new_employee_costs,0) 
            result.cur_cost = Math.round(total_cur_employee_costs,0)
            result.value = result.cur_cost - result.new_cost
            final_result.push(result)

        }

        return final_result
    }
}