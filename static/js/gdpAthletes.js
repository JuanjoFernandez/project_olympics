dataset = [8, 18, 7, 10, 19, 20, 10, 10, 6, 19, 17, 18, 23, 23, 13, 12, 15, 6, 9, 8]
w = 600
h = 250
// xScale will help us set the x position of the bars
var xScale = d3.scaleBand() //Ordinal scale
           .domain(d3.range(dataset.length)) //sets the input domain for the scale
           .rangeRound([0, w]) //enables rounding of the range
           .paddingInner(0.05); //spacing between each bar

//yScale will help us map data to the height of bars in the barchart
var yScale = d3.scaleLinear()
					 .domain([0, d3.max(dataset)]) //sets the upper end of the input domain to the largest data value in dataset
					 .range([0, h]);


           //Create SVG element
var svg = d3.select('#svg-area')
.append("svg")
.attr("width", w)
.attr("height", h);  

//Create bars
svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function(d, i) { // position in x-axis
    return xScale(i); // we will pass the values from the dataset
  })
  .attr("y", function(d) {
    return h - yScale(d);
  })
  .attr("width", xScale.bandwidth()) //Asks for the bandwith of the scale
  .attr("height", function(d) {
    return yScale(d);
  })
  .attr("fill", function(d) {
    return "rgb("+ Math.round(d * 8) + ",0," + Math.round(d * 10) + ")"; //Change the color of the bar depending on the value
  });

  d3.select(button)
    .on("click", function() {
        newData(); //Changes de values of the data
        updateBar(); //Updates the bar chart
    });

    function newData(){
        while (dataset.length > 0) { //Clear the current dataset
          dataset.pop();
        }
        for (var i = 0; i < 20; i++) {			 //Loop 20 times
          var newNumber = Math.floor(Math.random() * 20) + 5;  //New random integer (5-25)
          dataset.push(newNumber);			 //Add new number to array
        }
      }

      function updateBar(){
        //Update all rects
        svg.selectAll("rect")
          .data(dataset)
          .transition() // <---- Here is the transition
          .duration(2000) // 2 seconds
          .attr("y", function(d) {
            return h - yScale(d);
          })
          .attr("height", function(d) {
            return yScale(d);
          })
          .attr("fill", function(d) {
            return "rgb("+ Math.round(d * 8) + ",0," + Math.round(d * 10) + ")";
          });
      }
      
      