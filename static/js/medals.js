var link_medals = "http://127.0.0.1:5000/medals"
var medal_list = []

d3.json(link_medals).then((data) => {
            //console.log(data);

            // Sums and groups by country 
            var grouping = d3.nest()
                .key(function(d) { return d.countryCode; })
                .rollup(function(d) {
                    return d3.sum(d, function(g) { return g.medalValue; });
                }).entries(data);
            xValues = [];
            yValues = [];
            for (var i = 0; i < grouping.length; i++) {
                xValues.push(grouping[i].key);
                yValues.push(grouping[i].value);
            };
            console.log(yValues);
            ////////////////


            //Create SVG element
            // Setting the dimensions for the SVG containerç

            var svgHeight = 400;
            var svgWidth = 1000;
            var margin = {
                top: 50,
                right: 50,
                bottom: 50,
                left: 25
            };

            var svg = d3
                .select("#medals")
                .append("svg")
                .attr("height", svgHeight)
                .attr("width", svgWidth);

            var chartHeight = svgHeight - margin.top - margin.bottom;
            var chartWidth = svgWidth - margin.left - margin.right;
            // xScale will help us set the x position of the bars
            var xScale = d3.scaleBand() //Ordinal scale
                .domain(d3.range(data.length)) //sets the input domain for the scale
                .rangeRound([0, w]) //enables rounding of the range
                .paddingInner(0.05); //spacing between each bar
            //yScale will help us map data to the height of bars in the barchart
            var yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset)]) //sets the upper end of the input domain to the largest data value in dataset
                .range([h, 0]);
            //Create SVG element
            var svg = d3.select('#svg-area')
                .append("svg")
                .attr("width", w)
                .attr("height", h);
            var yAxis = d3.axisLeft(yScale);
            var xAxis = d3.axisBottom(xScale);
            // shift everything over by the margins
            var chartGroup = svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);
            chartGroup.append("g")
                .attr("transform", `translate(0, ${chartHeight})`)
                .call(xAxis);
            chartGroup.append("g")
                .call(yAxis);

            //Creating the right number of  bars
            svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", function(d, i) { // position in x
                    return xScale(i); // we will pass th
                })
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("width", xScale.bandwidth()) //Asks for the bandwith of the scale
                .attr("height", function(d) {
                    return yScale(d);
                })
                .attr("fill", function(d) {
                    return "rgb(" + Math.round(d * 8) + ",0," + Math.round(d * 10) + ")"; //Change the color of the bar depending on the value
                });




            ////// Table

            var tableCountry = [{
                xValues = [];
                yValues = [];
                for (var i = 0; i < grouping.length; i++) {
                    xValues.push(grouping[i].key);
                    yValues.push(grouping[i].value);
                };

            }];

            d3.select("tbody")
                .selectAll("tr")
                .data(tableCountry)
                .enter()
                .append("tr")
                .html(function(d) {
                    return `<td>${d.countryCode}</td><td>${d.medalValue}</td>`;
                });