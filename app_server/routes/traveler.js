var express = require('express');
var router = express.Router();
var ctrlTraveler = require('../controllers/traveler');

router.get('/', ctrlTraveler.renderHomepage);
router.get('/travel', ctrlTraveler.renderTravelList);
router.get('/rooms', ctrlTraveler.renderRooms);
router.get('/meals', ctrlTraveler.renderMeals);
router.get('/news', ctrlTraveler.renderNews);
router.get('/about', ctrlTraveler.renderAbout);
router.get('/contact', ctrlTraveler.renderContact);

module.exports = router;

