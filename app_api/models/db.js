var mongoose = require('mongoose');

var dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/travlr';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);

  // Module 7: seed a default admin user for local testing.
  // This only creates the user if it doesn't already exist.
  (async () => {
    try {
      const User = mongoose.model('users');
      const email = (process.env.ADMIN_EMAIL || 'admin@travlr.local').toLowerCase();
      const password = process.env.ADMIN_PASSWORD || 'Password123!';
      const name = process.env.ADMIN_NAME || 'Admin';

      const existing = await User.findOne({ email }).exec();
      if (existing) return;

      const user = new User({ name, email, passwordHash: 'temp' });
      await user.setPassword(password);
      await user.save();
      console.log(`Seeded default admin user: ${email}`);
    } catch (err) {
      // Don't crash the app if seeding fails (e.g., during tests).
    }
  })();
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function () {
  mongoose.connection
    .close()
    .then(() => {
      console.log('Mongoose connection closed through app termination');
      process.exit(0);
    })
    .catch(() => process.exit(0));
});

require('./travlr');
require('./user');
module.exports = mongoose;

