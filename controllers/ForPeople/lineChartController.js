var ForPeopleFormInput = require('../../models/ForPeople/forpeople__form_inputs');

//I need to figure out a way to grab the inputs and generate the result. The inputs should match
//Best way to do this is to have the get request go before the post request
exports.bachelorsDegreeChart = (req, res, next) => {
    console.log(req.params.id)
    ForPeopleFormInput.find({ tile_id: req.params.id})
    .sort({rank: 'asc'})
      .exec((err, tileData) => {
        if (err) {
          return res.sendStatus(404);
        }

        //console.log(tileData)
        
        let inputData = []
        //going to detect if this is the first request to the page or multiple
        //next we need to build an array based on info that will be passed back from array or not
        
        if (JSON.stringify(req.body) === '{}') {
            for (let i = 0;i < tileData.length;++i) {
                let key = tileData[i]["form_id"];
                
                inputData[key] = tileData[i]["state"];
                console.log(tileData[i]["state"])
            }
        } else {
            req.body.map((item,i) => (
                inputData[item.form_id] = item.state
            ));
        }
//console.log(inputData)
        let result = {
            data: {
                labels:[],
                datasets: [
                    {
                        data:[],
                        backgroundColor: "transparent",
                        borderColor: "#377dff",
                        borderWidth: 2,
                        pointRadius: 0,
                        hoverBorderColor: "#377dff",
                        pointBackgroundColor: "#377dff",
                        pointBorderColor: "#fff",
                        pointHoverRadius: 0
                    },
                    {
                        data:[],
                        backgroundColor: "transparent",
                        borderColor: "#00c9db",
                        borderWidth: 2,
                        pointRadius: 0,
                        hoverBorderColor: "#00c9db",
                        pointBackgroundColor: "#00c9db",
                        pointBorderColor: "#fff",
                        pointHoverRadius: 0
                    }]
            },
            options: {
                legend: {
                    display:false
                },
                scales: {
                    yAxes: [{
                    gridLines: {
                        color: "#e7eaf3",
                        drawBorder: false,
                        zeroLineColor: "#e7eaf3"
                    },
                    ticks: {
                        suggestedMin: -20000,
                        suggestedMax: 430000, // can use the api call to determine max and min
                        //stepSize: 47000, // can use the api call to determine step size,
                        fontColor: "#97a4af",
                        fontFamily: "Open Sans, sans-serif",
                        padding: 10,
                        postfix: "k"
                    }
                    }],
                    xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        fontSize: 12,
                        fontColor: "#97a4af",
                        fontFamily: "Open Sans, sans-serif",
                        padding: 5
                    }
                    }]
                },
                tooltips: {
                    //prefix: "$", deprecated
                    //postfix: "k", deprecated
                    hasIndicator: true,
                    mode: "index",
                    intersect: false,
                    lineMode: true,
                    lineWithLineColor: "rgba(19, 33, 68, 0.075)"
                },
                hover: {
                mode: "nearest",
                intersect: true
                }
            }
            
        };

            let final_result = {}
            let draw_pct = 0.25
            let out_of_pocket_pct = parseFloat(inputData["percentOutOfPocket"])/100
            let loan_pct = parseFloat(inputData["percentLoan"])/100
            let total_cost = parseFloat(inputData["price"]) * parseFloat(inputData["quantity"])
            let loan_eligible = 4
            let rev_1_eligible = 4
            let start_rev_1 = parseFloat(inputData["s1_revenue"])
            let rev_1_increase = parseFloat(inputData["s1_revenue_increase"])/100
            let rev_2_eligible = 0
            let start_rev_2 = parseFloat(inputData["s2_revenue"])
            let rev_2_increase = parseFloat(inputData["s2_revenue_increase"])/100
            let total_periods = parseFloat(inputData["loan_period"]) * 12
            let forecast_length = parseFloat(inputData["forecast_length"])
            //let yearly_periods = total_periods/12
            let loan_rate = ((parseFloat(inputData["loan_rate"])/100) /12)
            let reinvest_rate = parseFloat(inputData["out_of_pocket_investment_return"])/100
        
            final_result["period"] = []
            final_result["out_of_pocket"] = []
            final_result["loan"] = []
            final_result["cost"] = []
            final_result["salary_1"] = []
            final_result["salary_2"] = []
        
            for (let i = 0;i <= forecast_length;++i) {
                //consider changing the equal signs to match based on type too
                    final_result["period"].push("Y" + String(i))
        
                    if (draw_pct * (i + 1) <= 1) {
                        let out_of_pocket = out_of_pocket_pct * draw_pct * total_cost;
                        final_result["out_of_pocket"].push(out_of_pocket)
                    } else {
                        let out_of_pocket = 0
                        final_result["out_of_pocket"].push(out_of_pocket)
                    }
        
                    if (i >= loan_eligible) {
                        let loan = ((loan_rate * total_cost * loan_pct) / (1 - ((1+loan_rate) ** (-1 * total_periods)))) * 12
                        final_result["loan"].push(loan)
                    } else {
                        let loan = 0
                        final_result["loan"].push(loan)
                    }
        
                    if (i >= rev_1_eligible) {
                        let s1 = start_rev_1*((1+(rev_1_increase))**(i - rev_1_eligible))
                        final_result["salary_1"].push(s1)
                    } else {
                        let s1 = 0
                        final_result["salary_1"].push(s1)
                    }
        
                    if (i >= rev_2_eligible) {
                        let s2 = start_rev_2*((1+(rev_2_increase))**(i - rev_2_eligible))
                        final_result["salary_2"].push(s2)
                    } else {
                        let s2 = 0
                        final_result["salary_2"].push(s2)
                    }
                    
                final_result["cost"].push(final_result["loan"][i] + final_result["out_of_pocket"][i]);
        
            }
        
            final_result["cum_opportunity_cash"] = []
            final_result["out_of_pocket"].reduce( (prev, curr,i) =>  final_result["cum_opportunity_cash"][i] = Math.round(((1+reinvest_rate) * prev) + curr), 0)
            
            final_result["cum_out_of_pocket"] = []
            final_result["out_of_pocket"].reduce( (prev, curr,i) =>  final_result["cum_out_of_pocket"][i] =  Math.round(prev + curr), 0)
        
            final_result["cum_loan"] = []
            final_result["loan"].reduce( (prev, curr,i) =>  final_result["cum_loan"][i] = Math.round(prev + curr), 0)
        
            final_result["cum_s1"] = []
            final_result["salary_1"].reduce( (prev, curr,i) =>  final_result["cum_s1"][i] = Math.round(prev + curr), 0)
        
            final_result["cum_s2"] = []
            final_result["salary_2"].reduce( (prev, curr,i) =>  final_result["cum_s2"][i] = Math.round(prev + curr), 0)
        
            final_result["total_opportunity_cash"] = []
        
            final_result["total_cost"] = []
        
            final_result["s1_income"] = []
        
            final_result["s2_income"] = []
        
            for(let i = 0; i < final_result["cum_opportunity_cash"].length; i++){
                final_result["total_opportunity_cash"].push(Math.round(final_result["cum_opportunity_cash"][i] + final_result["cum_loan"][i]));
            }
        
            for(let i = 0; i < final_result["cum_out_of_pocket"].length; i++){
                final_result["total_cost"].push(Math.round(final_result["cum_out_of_pocket"][i] + final_result["cum_loan"][i]));
            }
        
            for(let i = 0; i < final_result["total_cost"].length; i++){
                final_result["s1_income"].push(Math.round(final_result["cum_s1"][i] - final_result["total_cost"][i]))
            }
        
            for(let i = 0; i < final_result["total_opportunity_cash"].length; i++){
                final_result["s2_income"].push(Math.round(final_result["cum_s2"][i] + final_result["total_opportunity_cash"][i]));
            }
                

                result["data"]["labels"] = final_result["period"]
                result["data"]["datasets"][0]["data"] = final_result["s1_income"]
                result["data"]["datasets"][1]["data"] = final_result["s2_income"]

                //determine suggested min max for the chart.
                let combined_income = final_result["s1_income"].concat(final_result["s2_income"]);

                let minimum_val = Math.min.apply(Math, combined_income);
                let maximum_val = Math.max.apply(Math, combined_income);

                result["options"]["scales"]["yAxes"][0]["ticks"]["suggestedMin"] = minimum_val
                result["options"]["scales"]["yAxes"][0]["ticks"]["suggestedMax"] = maximum_val

                //console.log(result)
        res.json(result);      
        
    });
};

/*

*/


