const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API);
const Attending = require('../models/attend')


exports.getSearch = (req, res, next) => {
  const {phrase, place} = req.query;
  client.search({term: 'Bars', location: place}).then(res1 => {
    let allLocations = res1.jsonBody.businesses;
    let listOfPlaces = [];
    for (let i = 0; i < allLocations.length; i++) {
      let entry = {
        name: allLocations[i].name,
        id: allLocations[i].id,
        image: allLocations[i].image_url,
        rating: allLocations[i].rating,
        address: allLocations[i].location.display_address,
        contact: allLocations[i].phone,
        going: null

      }

      listOfPlaces.push(entry);
    }
    Attending.find({}, (err, data) => {
      if (err)
        return next(err)
      for (var i = 0; i < data.length; i++) {
        let place = data[i].place;
        for (var j = 0; j < listOfPlaces.length; j++) {
          if (place === listOfPlaces[j].id && Number.isInteger(data[i].attending)) {
            listOfPlaces[j].going = data[i].attending;
            console.log(listOfPlaces[j].going);
          } else if(isNaN(data[i].attending)){
            listOfPlaces[j].going = 0;
            console.log(listOfPlaces[j].going);
          }
        }
      }
      res.render('locations', {listOfPlaces});
    });

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

}
