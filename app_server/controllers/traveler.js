

var renderHomepage = function (req, res) {
  res.render('index', {
    title: 'Travlr Getaways - Home',
    isHome: true
  });
};

const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

function getTripsEndpoint(req) {
  const proto = req.protocol || 'http';
  const host = req.get('host');
  return `${proto}://${host}/api/trips`;
}

var renderTripDetails = async function (req, res) {
  try {
    const tripCode = req.params.tripCode;
    const tripsEndpoint = getTripsEndpoint(req);
    const response = await fetch(`${tripsEndpoint}/${encodeURIComponent(tripCode)}`, options);

    if (!response.ok) {
      res.status(response.status).render('error', {
        message: `Trip not found (${tripCode})`,
        error: {}
      });
      return;
    }

    const trip = await response.json();

    res.render('trip', {
      title: `Travlr Getaways - ${trip.name}`,
      isTravel: true,
      trip
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

var renderTravelList = async function (req, res) {
  try {
    const tripsEndpoint = getTripsEndpoint(req);
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
  renderTripDetails,
  renderRooms,
  renderMeals,
  renderNews,
  renderAbout,
  renderContact
};

