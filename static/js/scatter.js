var scatter= '/scatter';
d3.json(scatter).then(function (data) {

xvalues = []; 
yvalues = [];
labels = [];

for (var i = 0; i < data.length; i++) {
  xvalues.push(data[i].countryCode); 
  yvalues.push(data[i].gdp_2008); 
  labels.push(data[i].medalValue); 
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

// console.log(dataArray.map(function(value, index){return value[1];}))
// Scatter Chart 

var trace1 = {
  x: dataArray.map(function(value, index){return value[1];}),
  y: dataArray.map(function(value, index){return value[2];}),
  mode: 'markers',
  type: 'scatter',
  name: 'Team A',
  text: dataArray.map(function(value, index){return value[0];}),
  marker: {
    color: dataArray.map(function(value, index){return value[1];}),
    'colorscale':[["0", "#777676"], ["0.2", "#c3c3c3c"],["0.4", "#cd7f32"],["0.6", "#c0c0c0"],["0.8", "#ddcd76"],["1", "#ffd700"]],
    size:20,
    line: {
      color: 'gray',
      width: 2
    }
}
}

var dataBar = [trace1];
// Define the plot layout
var layout = {
  title:'GDP & Medal Ranking per Country',
  xaxis:{title: "Gross Domestic Product"},
  yaxis: {title: "Medal Ranking"}
};

Plotly.newPlot('scatter', dataBar, layout);

});
