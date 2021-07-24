

// year.on("change",getMap); 

// var medalValuesFill = d3.json(medals).then(function (data) {
//   medalValues = data.medalValue; 
// });

function medalsColor(medalValue) {

  // Using the Flask Endpoints 
var link = "/country";
var medals = "/medals";
var year = d3.select(".dropdown-menu");


  d3.json(medals).then(function (medalsData) {
    // Sums and groups by country 
    var grouping = d3.nest()
      .key(function (d) { return d.countryCode; })
      .rollup(function (d) {
        return d3.sum(d, function (g) { return g.medalValue; });
      }).entries(medalsData);
    console.log(grouping);

    var values = [];
    for (var i = 0; i < grouping.length; i++) {
      values.push(grouping[i].value);
    }
    // Obtains max and min value from the country grouping 
    var maxMedalValue = (Math.max(...values));
    var minMedalValue = (Math.min(...values));
    console.log(maxMedalValue);
    console.log(minMedalValue);
    var range = parseInt((maxMedalValue - minMedalValue) / 4);
    console.log(range);
    if (values == maxMedalValue) {
      return "#ffd700";
    }
    else if (values >= (range * 3)){
      return "#f7d417";
    }
    else if (values >= (range * 2)){
      return "#c0c0c0";
    }
    else if (values >= (range * 1)){
      return "#cd7f32";
    }
    else {return "#fe0000"};
  })


  // Creating map object
  var myMap = L.map("map", {
    center: [22.09, -36.10],
    zoom: 2
  });

  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


  // Our style object
  var mapStyle = {
   //  color: "gray", // perimeter 
    fillColor: values,
    fillOpacity: 0.8,
    weight: 1
  };

  // Grabbing our GeoJSON data..
  d3.json(link).then(function (data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
      // Passing in our style object
      onEachFeature: medalsColor(medalsValue), 
      style: mapStyle
    }).addTo(myMap);

  });

}

medalsColor();