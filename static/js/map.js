var country = "/geoData";
var link = "/country"
var year = d3.select(".dropdown-menu");

function colorSelect(values) {
  if (values >= 5000) {
    return "#ffd700";
  }
  else if (values >= 1000){
    return "#f7d417";
  }
  else if (values >= 500){
    return "#c0c0c0";
  }
  else if (values >= 100){
    return "#cd7f32";
  }
  else {return "#3c3c3c"};
}

function createMarkers(data) {
  var markersGroup = []
  for (var i = 0; i < data.length; i++) {
    markersGroup.push(
      L.circle([data[i].features[0].properties.latitude, data[i].features[0].properties.longitude], {
        color: colorSelect(data[i].features[0].properties.medal_sum),
        fillColor: colorSelect(data[i].features[0].properties.medal_sum),
        fillOpacity: 0.7,
        radius: 200000 + (data[i].features[0].properties.medal_sum * 100)
      }).bindPopup(
        "<h1>" + data[i].features[0].properties.country_code + "</h1>" + "<hr>" +
        "<h2>" + data[i].features[0].properties.medal_sum + "</h2>"
      )
    )
  }
  return markersGroup;
}

d3.json(country).then(function (data) {

  // Adding tile layer
  tileLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  })

  // Creating the markers
  var markersGroup = createMarkers(data);
  var markersLayer = L.layerGroup(markersGroup);

  // Creating map object
  var myMap = L.map("map", {
    center: [22.09, -36.10],
    zoom: 3,
    layers: [tileLayer, markersLayer]
  })

  // Our style object
  var mapStyle = {
    color: "white", // perimeter 
    fillColor: "white",
    fillOpacity: 0.4,
    weight: 1
  };

  // // Grabbing our GeoJSON data..
  // d3.json(link).then(function (data) {
  //   // Creating a geoJSON layer with the retrieved data
  //   L.geoJson(data, {
  //     // Passing in our style object
  //     style: mapStyle
  //   }).addTo(myMap);
  // });

});
