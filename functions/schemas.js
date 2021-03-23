module.exports = {

    line_chart_schema: function(){
        let result = {
            "data": {
                "labels": [
                ],
                "datasets": [
                    {
                    "data": [],
                    "backgroundColor": "transparent",
                    "borderColor": "#377dff",
                    "borderWidth": 2,
                    "pointRadius": 0,
                    "hoverBorderColor": "#377dff",
                    "pointBackgroundColor": "#377dff",
                    "pointBorderColor": "#fff",
                    "pointHoverRadius": 0
                    },
                    {
                    "data": [],
                    "backgroundColor": "transparent",
                    "borderColor": "#00c9db",
                    "borderWidth": 2,
                    "pointRadius": 0,
                    "hoverBorderColor": "#00c9db",
                    "pointBackgroundColor": "#00c9db",
                    "pointBorderColor": "#fff",
                    "pointHoverRadius": 0
                    }
                ]
            },
            "options": {
                "legend": {
                    "display": false
                },
                "scales": {
                    "yAxes": [
                        {
                            "gridLines": {
                            "color": "#e7eaf3",
                            "drawBorder": false,
                            "zeroLineColor": "#e7eaf3"
                            },
                            "ticks": {
                            "suggestedMin": -20168,
                            "suggestedMax": 430091,
                            "fontColor": "#97a4af",
                            "fontFamily": "Open Sans, sans-serif",
                            "padding": 10,
                            "postfix": "k"
                            }
                        }
                    ],
                    "xAxes": [
                        {
                            "gridLines": {
                            "display": false,
                            "drawBorder": false
                            },
                            "ticks": {
                            "fontSize": 12,
                            "fontColor": "#97a4af",
                            "fontFamily": "Open Sans, sans-serif",
                            "padding": 5
                            }
                        }
                    ]
                },
                "tooltips": {
                    "hasIndicator": true,
                    "mode": "index",
                    "intersect": false,
                    "lineMode": true,
                    "lineWithLineColor": "rgba(19, 33, 68, 0.075)"
                },
                "hover": {
                    "mode": "nearest",
                    "intersect": true
                },
                "maintainAspectRatio":false,
            }
        }
        return result
    },

    date_dictionary: function(){
        let date_dict = {
            "year": {
                    "hour": 2096,
                    "day": 262,
                    "quarter": 4,
                    "month": 12,
                    "week": 52,
                    "year": 1,
                    "abbr": "Y"
              },
              "week":{
                "hour": 40,
                "year": (40/2096),
                "quarter": (40/524),
                "day": 5,
                "week": 1,
                "month": (12/52),
                "abbr": "W"
            },
            "month":{
                "hour": (2080/12),
                "year": (1/12),
                "quarter": (1/4),
                "day": (262/12),
                "week": (52/12),
                "month": 1,
                "abbr": "M"
            },
              "day":{
                  "hour": 8,
                  "year": (1/262),
                  "quarter": (1/65.5),
                  "day": 1,
                  "week": (1/52),
                  "month": (12/262),
                  "abbr": "D"
              },
              "hour":{
                  "day":  (1/8),
                  "year": (1/(262*8)),
                  "quarter": (1/((262/4)*8)),
                  "hour": 1,
                  "week": (1/40),
                  "month": (12/2080),
                  "abbr": "H"
              },
              "quarter":{
                  "hour": 524,
                  "day": 65.5,
                  "year": (1/4),
                  "quarter": 1,
                  "week": (524/40),
                  "month": 4,
                  "abbr": "Q"
              }
          }
        return date_dict
    }
}