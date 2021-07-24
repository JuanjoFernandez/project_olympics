// Using the Flask Endpoints 
var link = "/country";
var medals = "/medals";
var year = d3.select(".dropdown-menu");

// year.on("change",getMap); 


// function medalsColor(medalValue){
d3.json(medals).then(function(medalsData) {
// Sums and groups by country 
  var grouping = d3.nest()
    .key(function(d) { return d.countryCode;})
    .rollup(function(d) { 
    return d3.sum(d, function(g) {return g.medalValue; });
    }).entries(medalsData);
    console.log(grouping);

    
      // if (medalValue >90)
      //     return "#cc0000"; 
      // else if (medalValue >70)
      //   return "#ff6600";
      // else if (medalValue >50)
      //   return "#ff9966";
      // else if (medalValue >30)
      //   return "#ffff00";
      // else if (medalValue >10)
      //   return "#33cc33";
      // else return "#00ff00";
       
  });

// function getMap(){

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


// Use this link to get the geojson data.
var link = "/country";


// Our style object
var mapStyle = {
  color: "white", // perimeter 
  fillColor: "red", // calls the medalsColor function--> medalsColor(data.medalValue),
  fillOpacity: 0.5,
  weight: 1.5
};

// Grabbing our GeoJSON data..
d3.json(link).then(function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Passing in our style object
    style: mapStyle
  }).addTo(myMap);

});

});

