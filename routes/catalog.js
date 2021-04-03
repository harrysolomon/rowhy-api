var express = require('express');
var router = express.Router();

// Require controller modules.
var tile_controller = require('../controllers/ForPeople/forPeopleController');
var form_input_controller = require('../controllers/ForPeople/formInputController');
var line_chart_controller = require('../controllers/ForPeople/lineChartController');
var search_detail_controller = require('../controllers/ForPeople/searchDetailController');
var time_saver_controller = require('../controllers/ForBusiness/timeSaverController');
var cadence_controller = require('../controllers/cadenceController')

// note to self, each route should be drastically different from the next. Similarities throw it off
router.get('/forpeople', tile_controller.tile_list);

router.get('/forpeople/bachelorsdegree/form_input/:id', form_input_controller.form_input);

router.post('/forpeople/bachelorsdegree/chart/:id', line_chart_controller.bachelorsDegreeChart);

router.get('/forpeople/bachelorsdegree/searchdetail/:id', search_detail_controller.bachelorsDegreeSearchDetail);

router.post('/timesaver', time_saver_controller.createData);

router.put('/timesaver/edit/:id', time_saver_controller.updateData);

router.get('/timesaver/:id', time_saver_controller.getData);

router.get('/timesaver/calculator/list', time_saver_controller.timeSaverList);

router.get('/timesaver/product/list', time_saver_controller.productList);

router.get('/timesaver/product/:id', time_saver_controller.product);

router.put('/timesaver/product/:id', time_saver_controller.editProduct);

router.post('/timesaver/product', time_saver_controller.newProduct);

router.get('/timesaver/employee/list', time_saver_controller.employeeList);

router.get('/timesaver/employee/:id', time_saver_controller.employee);

router.post('/timesaver/employee', time_saver_controller.newEmployee);

router.put('/timesaver/employee/:id', time_saver_controller.editEmployee);

router.get('/cadences/list', cadence_controller.cadences);

module.exports = router;