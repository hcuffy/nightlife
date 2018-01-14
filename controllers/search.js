const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API);
const Attending = require('../models/attend')

function getAttendence(yelpId, callback) {

  Attending.find({
    place: yelpId
  }, function (err, data) {
    if (err)
      return err;
    let len = data.length;
    if (len === 0) {
      return callback(data);
    } else {
      return callback (null, data);
    }
  });
}

exports.getAttendence = getAttendence;

exports.getSearch = (req, res, next) => {
  const {phrase, place} = req.query;
  client.search({term: 'Bars', location: place}).then(res1 => {
    let allLocations = res1.jsonBody.businesses;
    let listOfPlaces = [];
    for (let i = 0; i < allLocations.length; i++) {
      let going = getAttendence(allLocations[i].id, next);
       console.log(going);
      let entry = {
        name: allLocations[i].name,
        id: allLocations[i].id,
        image: allLocations[i].image_url,
        rating: allLocations[i].rating,
        address: allLocations[i].location.display_address,
        contact: allLocations[i].phone
      }
      listOfPlaces.push(entry);
    }
    res.render('locations', {listOfPlaces})
  }).catch(e => {
    console.log(e);
  });

}

exports.addAttendence = (req, res, next) => {
  const {id} = req.params;

  Attending.find({
    place: id
  }, function(err, data) {
    if (err) {
      return next(err);
    }
    let len = data.length;

    if (len === 0) {
      const newEntry = new Attending({place: id, user: 'Unknown User', attending: 1})
      newEntry.save(err => {
        if (err)
          return next(err);
        }
      );
    } else {
      Attending.findOneAndUpdate({
        place: id
      }, {
        $inc: {
          attending: 1
        }
      }, {
        new: true
      }, function(err, data) {
        if (err)
          return next(err);
        }
      );

    }

  });
  return;

}
