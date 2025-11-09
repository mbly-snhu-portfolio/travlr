var path = require('path');

var renderHomepage = function(req, res) {
  res.render('index', {
    title: 'Travlr Getaways - Home',
    isHome: true
  });
};

var renderTravelList = function(req, res) {
  res.render('travel', {
    title: 'Travlr Getaways - Travel',
    isTravel: true
  });
};

var renderRooms = function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/rooms.html'));
};

var renderMeals = function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/meals.html'));
};

var renderNews = function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/news.html'));
};

var renderAbout = function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/about.html'));
};

var renderContact = function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/contact.html'));
};

module.exports = {
  renderHomepage,
  renderTravelList,
  renderRooms,
  renderMeals,
  renderNews,
  renderAbout,
  renderContact
};

