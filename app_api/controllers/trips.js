const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({});
        if (!trips) {
            return res.status(404).json({ "message": "trips not found" });
        }
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(404).json(err);
    }
};

const tripsFindCode = async (req, res) => {
    try {
        const trip = await Trip.findOne({ 'code': req.params.tripCode });
        if (!trip) {
            return res.status(404).json({ "message": "trip not found" });
        }
        return res.status(200).json(trip);
    } catch (err) {
        return res.status(404).json(err);
    }
};

module.exports = {
    tripsList,
    tripsFindCode
};
