var Trip = require('../models/trips');

var tripsList = async function(req, res) {
  try {
    var trips = await Trip.find({}).exec();
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({
      "error": "Error retrieving trips: " + err.message
    });
  }
};

var tripsReadOne = async function(req, res) {
  try {
    var tripid = req.params.tripid;
    var trip = null;

    if (tripid.match(/^[0-9a-fA-F]{24}$/)) {
      trip = await Trip.findById(tripid).exec();
    } else {
      trip = await Trip.findOne({ code: tripid }).exec();
    }

    if (!trip) {
      res.status(404).json({
        "error": "Trip not found"
      });
      return;
    }

    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({
      "error": "Error retrieving trip: " + err.message
    });
  }
};

module.exports = {
  tripsList,
  tripsReadOne
};

