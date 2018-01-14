$(document).ready(function() {

  navigator.geolocation.getCurrentPosition(function(position) {

    lati = position.coords.latitude;
    long = position.coords.longitude;

    var cityGET = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lati + "," + long + "&key=AIzaSyCuYn_s_VFT7e41SsVaWCFKfWNB2MNjj3c";

    $.getJSON(cityGET, function(dataA) {
      city = dataA.results[0].address_components[3].long_name + ", " + dataA.results[0].address_components[4].short_name;
    });

  })
