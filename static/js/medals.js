var link_medals = "http://127.0.0.1:5000/medals"
var medal_list = []

d3.json(link_medals).then((data) => {

    // Sums and groups by country 
    var grouping = d3.nest()
        .key(function (d) { return d.countryCode; })
        .rollup(function (d) {
            return d3.sum(d, function (g) { return g.medalValue; });
        }).entries(data);
    xValues = [];
    yValues = [];
    for (var i = 0; i < grouping.length; i++) {
        xValues.push(grouping[i].key);
        yValues.push(grouping[i].value);
    };
    console.log(yValues);



    // Sums and groups by country
    // var grouping = d3.nest()
    //     .key(function(d) { return d.athlete; })
    //     .key(function(d) { return d.totalmedals })
    //     .entries(medalsData);
    // console.log(grouping);

});

