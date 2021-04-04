var schemas = require('../functions/schemas')

module.exports = {
    timesaver_cost_per_period: function(req, interval){
        
        let date_dict = schemas.date_dictionary()

        let final_result = []

        for (let interval_idx = 0; interval_idx < interval.length; ++interval_idx){

            let result = {
                new_cost: 0,
                cur_cost: 0,
                value: 0,
                period: interval[interval_idx],
                per_task: []
            }

            let tasks = []

            let total_new_employee_costs = 0
            let total_cur_employee_costs = 0

            for (let i = 0;i < req.length;++i){
                
                let task = {
                }
                if(req[i].products.time_unit === "pct"){
                    time_save_convert = req[i].current_time_spent * (req[i].products.time_save / 100)
                } else {
                    time_save_convert = req[i].products.time_save * date_dict[req[i].products.time_unit][req[i].current_time_spent_period.period]
                }

                task.name = req[i].name
                task.row_id = req[i]._id
                task.current_time_spent = req[i].current_time_spent
                task.current_time_spent_period = req[i].current_time_spent_period.period
                task.time_spent_cadence = req[i].cadences.period
                task.employee = req[i].employees.name
                task.employee_cost = req[i].employees.cost
                task.employee_cost_period = req[i].employees.period
                task.employee_rate = (req[i].employees.cost * date_dict[req[i].current_time_spent_period.period][req[i].employees.period]).toFixed(2)
                task.time_increment = interval[interval_idx]
                task.product = req[i].products.name
                task.product_time_save = req[i].products.time_save.toFixed(2)
                task.product_time_save_unit = req[i].products.time_unit
                task.product_time_save_pct = ((time_save_convert / req[i].current_time_spent) * 100).toFixed(2)
                task.new_task_time_pct = ((1 - (time_save_convert / req[i].current_time_spent)) * 100).toFixed(2)
                task.product_cost_per_task = (req[i].products.cost * date_dict[req[i].cadences.period][req[i].products.period]) // this is technically flawed I think
                task.product_cost_per_period = (req[i].products.cost * date_dict[interval[interval_idx]][req[i].products.period])
                task.tasks_in_period = (date_dict[interval[interval_idx]][req[i].cadences.period]).toFixed(2)
                task.cur_cost_per_task = (task.employee_rate * task.current_time_spent).toFixed(2)
                task.cur_cost_per_period = (task.cur_cost_per_task * task.tasks_in_period)
                task.new_cost_per_task = (task.employee_rate * (task.current_time_spent - time_save_convert)) + task.product_cost_per_task // missing product costs
                task.new_cost_per_period = (task.new_cost_per_task * task.tasks_in_period)
                task.value_per_task = (task.cur_cost_per_task - task.new_cost_per_task).toFixed(2)
                task.value_per_period = (task.cur_cost_per_period - task.new_cost_per_period).toFixed(2)
                
                console.log("cost per period",task.new_cost_per_period,"cost per task is", task.new_cost_per_task, "tasks in a period is", task.tasks_in_period, "product cost period", task.product_cost_per_period)

                tasks.push(task)

                total_new_employee_costs += task.new_cost_per_period
                total_cur_employee_costs += task.cur_cost_per_period


            }
            result.new_cost = total_new_employee_costs
            result.cur_cost = total_cur_employee_costs
            result.value = result.cur_cost - result.new_cost
            result.per_task = tasks
            final_result.push(result)     

        }

        return final_result
    }
}