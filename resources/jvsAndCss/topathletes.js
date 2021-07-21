url= ''

d3.json(url, function(data) {
    console.log(data);
    // Everything goes inside this section

});

// Funtion to generate the table
function tabulate(data, columns) {
    var table = d3.select("#Athletes")
    .append("table")
    .attr(''), /////// FALTA //////
    thead = table.append("thead"),
    tbody = table.append("tbody");

    // Append header
    thead.append("tr")
        .selectAll("th")
        .data(columns) // falta cuál info
        .enter()
        .append("th")
            .text(function(column) { return column; });

    // Funtion to create rows for each object
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
            return columns.map(function(column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append("td")
        .attr("style", "font-family: Courier") // sets the font style
            .html(function(d) { return d.value; });
    
    return table;
}

// render the table
 var peopleTable = tabulate(data, ['Name', 'Rank']);
