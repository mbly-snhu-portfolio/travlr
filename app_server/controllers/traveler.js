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

module.exports = {
  renderHomepage,
  renderTravelList
};

