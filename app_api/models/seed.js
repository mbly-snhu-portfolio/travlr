const mongoose = require('mongoose');
const Trip = require('./travlr');
const fs = require('fs');
const path = require('path');

const dbURI = 'mongodb://127.0.0.1/travlr';
mongoose.connect(dbURI);

const readTrips = () => {
    const filePath = path.join(__dirname, '../../data/trips.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

const seedDB = async () => {
    try {
        const trips = readTrips();
        await Trip.deleteMany({});
        await Trip.insertMany(trips);
        console.log('Database seeded successfully');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close();
    }
};

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
    seedDB();
});
