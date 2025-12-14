const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const requiredTripFields = [
    'code',
    'name',
    'length',
    'start',
    'resort',
    'perPerson',
    'image',
    'description'
];

function pickTripFields(payload, { requireAll }) {
    const src = (payload && typeof payload === 'object') ? payload : {};
    const trip = {};

    for (const field of requiredTripFields) {
        if (src[field] !== undefined) trip[field] = src[field];
    }

    if (requireAll) {
        const missing = requiredTripFields.filter((f) => trip[f] === undefined || trip[f] === null || trip[f] === '');
        if (missing.length) {
            return { error: { message: 'Missing required fields', missing } };
        }
    } else {
        if (!Object.keys(trip).length) {
            return { error: { message: 'No fields provided to update' } };
        }
    }

    if (trip.start !== undefined) {
        const startDate = new Date(trip.start);
        if (Number.isNaN(startDate.valueOf())) {
            return { error: { message: 'Invalid start date' } };
        }
        trip.start = startDate;
    }

    return { trip };
}

const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({});
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({ message: err.message });
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
        return res.status(500).json({ message: err.message });
    }
};

const tripsAddTrip = async (req, res) => {
    const { trip, error } = pickTripFields(req.body, { requireAll: true });
    if (error) return res.status(400).json(error);

    try {
        const existing = await Trip.findOne({ code: trip.code }).exec();
        if (existing) {
            return res.status(409).json({ message: `Trip with code '${trip.code}' already exists` });
        }

        const created = await Trip.create(trip);
        return res.status(201).json(created);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const tripsUpdateTrip = async (req, res) => {
    const tripCode = req.params.tripCode;

    const { trip, error } = pickTripFields(req.body, { requireAll: false });
    if (error) return res.status(400).json(error);

    // Do not allow changing the trip code via update body.
    delete trip.code;

    try {
        const updated = await Trip.findOneAndUpdate(
            { code: tripCode },
            trip,
            { new: true, runValidators: true }
        ).exec();

        if (!updated) {
            return res.status(404).json({ message: 'trip not found' });
        }

        return res.status(200).json(updated);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const tripsDeleteTrip = async (req, res) => {
    const tripCode = req.params.tripCode;

    try {
        const deleted = await Trip.findOneAndDelete({ code: tripCode }).exec();
        if (!deleted) {
            return res.status(404).json({ message: 'trip not found' });
        }
        return res.status(204).send();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};
