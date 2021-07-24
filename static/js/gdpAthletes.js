// --------D3 TOP 10 ATHLETS-------- & TRANSITION TO GPD PER COUNTRY
// // API url



var obj = [
    { 'name': 'P1', 'value': 150 },
    { 'name': 'P1', 'value': 150 },
    { 'name': 'P2', 'value': 200 },
    { 'name': 'P3', 'value': 450 }
];
var holder = {};
obj.forEach(function(d) {
    if (holder.hasOwnProperty(d.name)) {
        holder[d.name] = holder[d.name] + d.value;
    } else {
        holder[d.name] = d.value;
    }
});
var obj2 = [];
for (var prop in holder) {
    obj2.push({ name: prop, value: holder[prop] });
}
console.log(obj2);








function getResultsGDP() {

    let buscar_tipo = d3.select("#buscarTipo").property("value")

    d3.json(`"/country/gdp"/${buscar_tipo}`).then(json => {

        let selection = d3
            .select("#rcontainer")
            .selectAll("li")
            .data(json)

        selection
            .enter()
            .append("li")
            .merge(selection)
            .text(d => d.desc)

        selection.exit().remove()

    })
}

function insertTodo() {
    let texto = d3.select("#todo").property("value")
    let tipo = d3.select("#tipoTodo").property("value")

    nuevo_dato = {
        "texto": texto,
        "tipo": tipo
    }

    let configOption = {
        method: "POST",
        body: JSON.stringify(nuevo_dato),
        headers: {
            "Content-type": "application/json"
        }
    }

    d3.json("/api/insert", configOption).then(json => {
        console.log(json)
        getResultsGDP()
    })

}

getResultsGDP();
d3.select("#buscarTipo").on("change", getResultsGDP);
d3.select("#addTodo").on("click", insertTodo);







// var obj = [
//     { 'name': 'P1', 'value': 150 },
//     { 'name': 'P1', 'value': 150 },
//     { 'name': 'P2', 'value': 200 },
//     { 'name': 'P3', 'value': 450 }
// ];
// var holder = {};
// obj.forEach(function(d) {
//     if (holder.hasOwnProperty(d.name)) {
//         holder[d.name] = holder[d.name] + d.value;
//     } else {
//         holder[d.name] = d.value;
//     }
// });
// var obj2 = [];
// for (var prop in holder) {
//     obj2.push({ name: prop, value: holder[prop] });
// }
// console.log(obj2);








// // // set the dimensions of the canvas
// // var margin = { top: 20, right: 20, bottom: 70, left: 40 },
// //     width = 600 - margin.left - margin.right,
// //     height = 300 - margin.top - margin.bottom;


// // // set the ranges
// // var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

// // var y = d3.scale.linear().range([height, 0]);

// // // define the axis
// // var xAxis = d3.svg.axis()
// //     .scale(x)
// //     .orient("bottom")


// // var yAxis = d3.svg.axis()
// //     .scale(y)
// //     .orient("left")
// //     .ticks(10);


// // // add the SVG element
// // var svg = d3.select("body").append("svg")
// //     .attr("width", width + margin.left + margin.right)
// //     .attr("height", height + margin.top + margin.bottom)
// //     .append("g")
// //     .attr("transform",
// //         "translate(" + margin.left + "," + margin.top + ")");


// // // load the data from SlashDB via a RESTful API to the resource for the SQL Pass-thru (query)
// // d3.json("http://demo.slashdb.com/query/sales-by-year.json", function(error, data) {

// //     data.forEach(function(d) {
// //         d.Year = d.Year;
// //         d.Total = +d.Total;
// //     });

// //     // scale the range of the data
// //     x.domain(data.map(function(d) { return d.Year; }));
// //     y.domain([0, d3.max(data, function(d) { return d.Total; })]);

// //     // add axis
// //     svg.append("g")
// //         .attr("class", "x axis")
// //         .attr("transform", "translate(0," + height + ")")
// //         .call(xAxis)
// //         .selectAll("text")
// //         .style("text-anchor", "end")
// //         .attr("dx", "-.8em")
// //         .attr("dy", "-.55em")
// //         .attr("transform", "rotate(-90)");

// //     svg.append("g")
// //         .attr("class", "y axis")
// //         .call(yAxis)
// //         .append("text")
// //         .attr("y", -16)
// //         .attr("dy", ".71em")
// //         .style("text-anchor", "end")
// //         .text("Sales");


// //     // Add bar chart
// //     svg.selectAll("bar")
// //         .data(data)
// //         .enter().append("rect")
// //         .attr("class", "bar")
// //         .attr("x", function(d) { return x(d.Year); })
// //         .attr("width", x.rangeBand() - 20)
// //         .attr("y", function(d) { return y(d.Total); })
// //         .attr("height", function(d) { return height - y(d.Total); });

// // });

// // // if (err) throw err;

// // // athlete_list = [];

// // //     sum = 0;
// // //     for (var j = 0; j < data.length; j++) {
// // //         console.log(data[j]);
// // //     };
// // // }).catch(function(data) {
// // //     console.log(data);
// // //});

// // // function doSomething(success){
// // //     //do whatever you like
// // //   }
// // //   fetch('http://127.0.0.1:5000/1948')
// // //      .then(data => data.json())
// // //      .then(success => doSomething(success));

// // // // var urlList = [];
// // // var url = ("http://127.0.0.1:5000/1948");

// // // d3.json("url").then((athleteData) => {
// // //     window.athleteData = athleteData;
// // //     console.log(athleteData);
// // //     //Looping through the array
// // //     for (var j = 0; j < athleteData.length; j++) {
// // //         console.log(athleteData[j]);
// // //     }
// // // });

// // //         // // // CREATE ATHLETS OBJECT
// // //         // var athletes= [];



// // //         // if athletes.find((d) => d.)
// // //     athletes.append(medal_value)
// // // else:
// // //     name= athlets
// // //     value= medal_value


// // // // TO CREATE A TABLE WITH THE DATA
// // // $scope.sum = 0;
// // // angular.forEach($scope.data, function(value, key){
// // //   $scope.sum += value.age
// // // })





// // // chart.orderByRank = function() {
// // //     d3.selectAll('.album')
// // //     .transition(700)
// // //     .attr('fill', 'url(#warmGradient)')
// // //     .attr('transform', function(d){
// // //       return 'translate(0,' + (d.rank - 1) * (barHeight + barMargin) + ')';
// // //     });

// // //     return chart;
// // //   };

// // //   chart.orderByPlayCount = function() {
// // //     d3.selectAll('.album')
// // //     .transition(700)
// // //     .attr('fill', 'url(#coolGradient)')
// // //     .attr('transform', function(d, i){
// // //       return 'translate(0,' + i * (barHeight + barMargin) + ')';
// // //     });

// // //     return chart;
// // //   };















// // // d3.json(url, function(err, data) {
// // //             if (err) throw err;

// // //             d3.select("tbody")
// // //                 .selectAll("tr")
// // //                 .data(data) // binding function
// // //                 .enter() // THIS FUNCTIONS ITERATE BY THEIR OWN
// // //                 .append("tr")
// // //                 // HTML FUNCTION helps to add the data to each column in the table
// // //                 .html(function(d) {
// // //                     return `<td>${d.date}</td><td>${d.low}</td><td>${d.high}</td>`;
// // //                 });
// // // LISTENER ACCORDING TO DROP DOWN MENU d3.json
// // //d3.select("")

// // // // BINDING DATA SUBSTITUTING THE VALUE OF THE ELEMENT one to one
// // // d3.select("ul").selectAll("li")
// // //     .data(arr) // BINDING THE DATA
// // //     .text((d) => `score: ${d}`) // ADDING THIS TEXT


// // // d3.select("ul").selectAll("li")
// // //     .data(arr) // BINDING THE DATA
// // //     .enter() // enter function SELECT THE DATA THAT HASN´T BEEING MAP- grab elements that werent binded-
// // //     .append("li")
// // //     .text((d) => `New Score: ${d}`) // ADDIN THE NEW DATA OR FUNCTION

// // // // REMOVE THE ELEMENTS THAT WERENT BINDED - DELETE
// // // d3.select("ul").selectAll("li")
// // //     .data(arr)
// // //     .exit() // GRAB THE ADDIONAL HTLM ELEMENTS THAT DIDNT GET BINDED
// // //     .remove(); // REMOVES THESE ELEMENTS DELETING THEM


// // // var array2 = [1, 2, 3, 4, 5, 6]

// // // d3.select("ul").selectAll("li")
// // //     .data(array2)
// // //     .text((d) => d * d); // CRETING A FUNCTION FOR A SQUARE- changing the value into the square of the elments

// // // d3.select("ul").selectAll("li")
// //     .data(array2)
// //     .enter() // ENTER ON THE SELECTION WILL GRAB THE DATA POINTS WERENT SHOWN IN MY SELECTION
// //     .append("li")
// //     .text((d) => d)
// //     .style("color", "red");


// // d3.select(".img-gallery").selectAll("div") // SELECT THE DATA FROM THE HTML - THERE ARE NO DIV, BUT 

// // .classed("col-md-4 thumbnail", true)
// //     .html((d) => `<img src="${d.url}">`)


// // d3.select(".img-gallery").selectAll("div")
// //     .data(complexData) // BINDING SELECTING = 3 OBJETS
// //     .enter() // entering in the UNBINNED DATA
// //     .append("div") // SLECTION = "NEW DIV" WITH 1 OBJECT BINDED
// //     .classed("col-md-4 thumbnail", true) //ADD CLASES SELECTION= "NEW DIV" WITH 1 OBJECT BINDED
// //     .html((d) => `<img src="${d.url}">`) //SLECTION ="NEW DIV" WITH 1 OBJECT BINDED
// //     .append("p") // SLECTION= "NEW p INSIDE A div" with 1 object binded
// //     .text((d) => d.title)
// //     .classed("h3 text-center", true);




// });


// d3.select("ul").selectAll("li")
//     .each(function(d.i) {
//         console.log("element", this);
//         console.log("data", d);
//         console.log("index", i);
//     });