var medals= '/athlete';
d3.json(medals).then(function (data) {
// console.log(data);

xvalues = []; 
yvalues = [];
labels = [];

for (var i = 0; i < data.length; i++) {
  xvalues.push(data[i].athlete); 
  yvalues.push(data[i].totalmedals); 
  labels.push(data[i].country_code); 
}; 

var dataArray = []; 
var row = 0; 
xvalues.forEach(x => {
  dataArray.push([xvalues[row], yvalues[row], labels[row]]); 
  row++; 
})

var sortedArr = dataArray.sort(function compareFunction(firstNum, secondNum) {
  return secondNum[1] - firstNum[1];
});

var slicedArr = sortedArr.slice(0,20);

//console.log(slicedArr); 


// Create the Trace for the Bar Chart 
var trace = {
  x: slicedArr.map(function(value, index){return value[0];}),
  marker:{color: ["#ffd700","#ffd700","#ffd700",
                  "#ddcd76","#ddcd76","#ddcd76",
                  "#c0c0c0","#c0c0c0","#c0c0c0",
                  "#cd7f32","#cd7f32","#cd7f32",
                  "#c3c3c3c","#c3c3c3c","#c3c3c3c", 
                  "#777676", "#777676", "#777676", 
                  "#777676", "#777676"
  ]  
  }, 
  y: slicedArr.map(function(value, index){return value[1];}),
  type: "bar",
  text: slicedArr.map(function(value, index){return value[2];})
};
var dataBar = [trace];

// Define the plot layout
var layoutBar = {
title: "Top Athletes",
titlefont: {size: 24},
xaxis: {
  tickangle: -45
}, 
yaxis:{
  title: "Medals per Athlete"
}
};

// Plot the chart to a div tag with id "bar"
Plotly.newPlot("svg-area", dataBar, layoutBar);

});