var queryURL = '/scatter';
d3.json(queryURL).then((data) => {
console.log(data[0].features[0].properties.country_code);

});