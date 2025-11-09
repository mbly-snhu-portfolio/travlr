
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
  res.render('rooms', {
    title: 'Travlr Getaways - Rooms',
    isRooms: true
  });
};

var renderMeals = function(req, res) {
  res.render('meals', {
    title: 'Travlr Getaways - Meals',
    isMeals: true
  });
};

var renderNews = function(req, res) {
  res.render('news', {
    title: 'Travlr Getaways - News',
    isNews: true
  });
};

var renderAbout = function(req, res) {
  res.render('about', {
    title: 'Travlr Getaways - About',
    isAbout: true
  });
};

var renderContact = function(req, res) {
  res.render('contact', {
    title: 'Travlr Getaways - Contact',
    isContact: true
  });
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

