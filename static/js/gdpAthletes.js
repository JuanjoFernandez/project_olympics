// var url = "/medals";


// d3.json(url).then(function (medalsData) {
//   medalsData.forEach(function(data){
//   var medalValues = data.medalValue; 
//   console.log(medalValues);
//   })
// });

// dataset = d3.json(url).then(function(data){
//   array1 = [];
//   for (var i=0; i<data.length; i++) {
//       array1.push(data.medalValue);
//        console.log(data.medalValue);
//   }

// // dataset1 = [8, 18, 7, 10, 19, 20, 10, 10, 6, 19, 17, 18, 23, 23, 13, 12, 15, 6, 9, 8]
// w = 600
// h = 250
// //dataset = dataset1.slice(0, 10);
// dataset.sort(function(a, b){return b-a});


// var svgHeight = 400;
// var svgWidth = 1000;

// var margin = {
//   top: 50,
//   right: 50,
//   bottom: 50,
//   left: 50
// };

// var chartHeight = svgHeight - margin.top - margin.bottom;
// var chartWidth = svgWidth - margin.left - margin.right;

// // xScale will help us set the x position of the bars
// var xScale = d3.scaleBand() //Ordinal scale
//            .domain(d3.range(dataset.length)) //sets the input domain for the scale
//            .rangeRound([0, w]) //enables rounding of the range
//            .paddingInner(0.05); //spacing between each bar

// //yScale will help us map data to the height of bars in the barchart
// var yScale = d3.scaleLinear()
// 					 .domain([0, d3.max(dataset)]) //sets the upper end of the input domain to the largest data value in dataset
// 					 .range([0, h]);


//            //Create SVG element
// var svg = d3.select('#svg-area')
// .append("svg")
// .attr("width", w)
// .attr("height", h);  

// // shift everything over by the margins
// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// var yAxis = d3.axisLeft(yScale);
// var xAxis = d3.axisBottom(xScale);

// chartGroup.append("g")
//   .attr("transform", `translate(0, ${chartHeight})`)
//   .call(xAxis);

// chartGroup.append("g")
//   .call(yAxis);

// //Create bars
// svg.selectAll("rect")
//   .data(dataset)
//   .enter()
//   .append("rect")
//   .attr("x", function(d, i) { // position in x-axis
//     return xScale(i); // we will pass the values from the dataset
//   })
//   .attr("y", function(d) {
//     return h - yScale(d);
//   })
//   .attr("width", xScale.bandwidth()) //Asks for the bandwith of the scale
//   .attr("height", function(d) {
//     return yScale(d);
//   })
//   .attr("fill", function(d) {
//     return "rgb("+ Math.round(d * 8) + ",0," + Math.round(d * 10) + ")"; //Change the color of the bar depending on the value
//   });
// // });