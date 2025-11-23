var express = require('express');
var router = express.Router();
var ctrlApi = require('../controllers/api');

router.get('/trips', ctrlApi.tripsList);
router.get('/trips/:tripid', ctrlApi.tripsReadOne);

module.exports = router;

