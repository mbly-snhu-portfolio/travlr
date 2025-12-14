const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const authRouter = require('./auth');
const { authRequired } = require('../middleware/auth');

router.use('/auth', authRouter);

router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(authRequired, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(authRequired, tripsController.tripsUpdateTrip)
    .delete(authRequired, tripsController.tripsDeleteTrip);

module.exports = router;
