

var renderHomepage = function (req, res) {
  res.render('index', {
    title: 'Travlr Getaways - Home',
    isHome: true
  });
};

const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

var renderTravelList = async function (req, res) {
  try {
    const response = await fetch(tripsEndpoint, options);
    const json = await response.json();

    let message = null;
    if (!(json instanceof Array)) {
      message = 'API lookup error';
      json = [];
    } else {
      if (!json.length) {
        message = 'No trips found in database';
      }
    }

    res.render('travel', {
      title: 'Travlr Getaways - Travel',
      isTravel: true,
      trips: json,
      message: message
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

var renderRooms = function (req, res) {
  res.render('rooms', {
    title: 'Travlr Getaways - Rooms',
    isRooms: true
  });
};

var renderMeals = function (req, res) {
  res.render('meals', {
    title: 'Travlr Getaways - Meals',
    isMeals: true
  });
};

var renderNews = function (req, res) {
  res.render('news', {
    title: 'Travlr Getaways - News',
    isNews: true
  });
};

var renderAbout = function (req, res) {
  res.render('about', {
    title: 'Travlr Getaways - About',
    isAbout: true
  });
};

var renderContact = function (req, res) {
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

