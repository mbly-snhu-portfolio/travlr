require('../app_server/models/db');
var Trip = require('../app_server/models/trips');

var trips = [
  {
    code: 'B0101',
    name: 'Cancun',
    length: { nights: 4, days: 5 },
    start: new Date('2021-02-14'),
    resort: 'Emerald Bay, 3-stars',
    perPerson: 799.00,
    category: 'Beaches'
  },
  {
    code: 'B0103',
    name: 'Barbados',
    length: { nights: 5, days: 6 },
    start: new Date('2021-02-28'),
    resort: 'Castaway Cove, 4-stars',
    perPerson: 1299.00,
    category: 'Beaches'
  },
  {
    code: 'B0401',
    name: 'Panama City',
    length: { nights: 4, days: 5 },
    start: new Date('2021-03-21'),
    resort: 'Sunseeker Surf, 4-stars',
    perPerson: 1199.00,
    category: 'Beaches'
  },
  {
    code: 'B0701',
    name: 'Tahiti',
    length: { nights: 6, days: 7 },
    start: new Date('2021-03-28'),
    resort: 'Hedonist Heaven, 5-stars',
    perPerson: 1799.00,
    category: 'Beaches'
  },
  {
    code: 'B0901',
    name: 'French Riviera',
    length: { nights: 5, days: 6 },
    start: new Date('2021-04-11'),
    resort: 'Chateau Royal, 5-stars',
    perPerson: 2499.00,
    category: 'Beaches'
  },
  {
    code: 'C0101',
    name: 'Caribbean Cruise',
    length: { nights: 7, days: 8 },
    start: new Date('2021-03-15'),
    resort: 'Ocean Explorer, 4-stars',
    perPerson: 1599.00,
    category: 'Cruises'
  },
  {
    code: 'C0201',
    name: 'Mediterranean Cruise',
    length: { nights: 10, days: 11 },
    start: new Date('2021-04-20'),
    resort: 'Mediterranean Dream, 5-stars',
    perPerson: 2999.00,
    category: 'Cruises'
  },
  {
    code: 'C0301',
    name: 'Alaska Cruise',
    length: { nights: 7, days: 8 },
    start: new Date('2021-06-01'),
    resort: 'Northern Lights, 4-stars',
    perPerson: 2199.00,
    category: 'Cruises'
  },
  {
    code: 'C0401',
    name: 'Bahamas Cruise',
    length: { nights: 4, days: 5 },
    start: new Date('2021-05-10'),
    resort: 'Tropical Paradise, 3-stars',
    perPerson: 899.00,
    category: 'Cruises'
  },
  {
    code: 'M0101',
    name: 'Aspen',
    length: { nights: 5, days: 6 },
    start: new Date('2021-12-15'),
    resort: 'Snow Peak Lodge, 4-stars',
    perPerson: 1899.00,
    category: 'Mountains'
  },
  {
    code: 'M0201',
    name: 'Whistler',
    length: { nights: 6, days: 7 },
    start: new Date('2021-12-20'),
    resort: 'Mountain View Resort, 4-stars',
    perPerson: 1999.00,
    category: 'Mountains'
  },
  {
    code: 'M0301',
    name: 'Swiss Alps',
    length: { nights: 7, days: 8 },
    start: new Date('2021-12-25'),
    resort: 'Alpine Chalet, 5-stars',
    perPerson: 3499.00,
    category: 'Mountains'
  },
  {
    code: 'M0401',
    name: 'Park City',
    length: { nights: 4, days: 5 },
    start: new Date('2021-12-10'),
    resort: 'Ski Lodge Inn, 3-stars',
    perPerson: 1299.00,
    category: 'Mountains'
  },
  {
    code: 'M0501',
    name: 'Vail',
    length: { nights: 5, days: 6 },
    start: new Date('2021-12-18'),
    resort: 'Mountain Retreat, 4-stars',
    perPerson: 1799.00,
    category: 'Mountains'
  },
  {
    code: 'M0601',
    name: 'Banff',
    length: { nights: 6, days: 7 },
    start: new Date('2021-12-22'),
    resort: 'Canadian Rockies Lodge, 4-stars',
    perPerson: 2099.00,
    category: 'Mountains'
  }
];

async function populateDatabase() {
  try {
    await Trip.deleteMany({});
    console.log('Cleared existing trips collection');

    var insertedTrips = await Trip.insertMany(trips);
    console.log('Successfully inserted ' + insertedTrips.length + ' trips');

    var beachesCount = await Trip.countDocuments({ category: 'Beaches' });
    var cruisesCount = await Trip.countDocuments({ category: 'Cruises' });
    var mountainsCount = await Trip.countDocuments({ category: 'Mountains' });

    console.log('Beaches: ' + beachesCount);
    console.log('Cruises: ' + cruisesCount);
    console.log('Mountains: ' + mountainsCount);

    process.exit(0);
  } catch (err) {
    console.error('Error populating database: ' + err.message);
    process.exit(1);
  }
}

populateDatabase();

