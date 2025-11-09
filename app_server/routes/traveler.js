var express = require('express');
var router = express.Router();
var ctrlTraveler = require('../controllers/traveler');

router.get('/', ctrlTraveler.renderHomepage);
router.get('/travel', ctrlTraveler.renderTravelList);

module.exports = router;

