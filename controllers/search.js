const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API);
const Attending = require('../models/attend')

function getAttendence = (yelpId){

  Attending.findOne({ place: yelpId }, function (err, data) {
     if (err) return handleError(err);

   
 })



}
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
        contact: allLocations[i].phone
      }
      listOfPlaces.push(entry);
    }
    res.render('locations', {listOfPlaces})
  }).catch(e => {
    console.log(e);
  });

}
