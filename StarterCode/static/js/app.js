
function buildMetaData(sampleID) {

    d3.json("samples.json").then((data) => {
        console.log(data)

        var metadata = data.metadata;
        var filterdata = metadata.filter(d => d.id == sampleID)[0];
        console.log(filterdata);
        var row = d3.select("#sample-metadata")
        row.html("")
        Object.entries(filterdata).forEach(([key, value]) => {
            var cell = row.append("tr");
            cell.append("td").text(key);
            cell.append("td").text(value);
        });
    });
}
function buildchart(sampleID) {
    d3.json("samples.json").then((data) => {
        console.log(data)
        var samples = data.samples;

        var filterdata = samples.filter(d => d.id == sampleID)[0];
        console.log(filterdata);
        var yData = filterdata.otu_ids.map(row => `OTU ${row}`).slice(0, 10).reverse();
        var otu_labels = filterdata.otu_labels
        var sample_values = filterdata.sample_values


        var trace1 = {

            x: sample_values.slice(0, 10).reverse(),
            y: yData,

            text: otu_labels.slice(0, 10).reverse(),

            type: "bar",
            orientation: "h",
        };

        var data = [trace1];

        var layout = {
            title: 'Belly Button Biodiversity: Bar Chart',
            
        };

        Plotly.newPlot("bar", data,layout);
    });


}
function drawBubbleChart(chartData) {
    d3.json("samples.json").then((data) => {
        console.log(data)
        var samples = data.samples;

        var filterdata = samples.filter(d => d.id == chartData)[0];
        var xData = filterdata.otu_ids;
        var yData = filterdata.sample_values;
        var barLabels = filterdata.otu_labels;
        var trace2 = {
            x: xData,
            y: yData,
            mode: 'markers',
            marker: {
                color: xData,
                size: yData,
                colorscale: "Earth"
            },
            text: barLabels
        };
        var bubbledata = [trace2];
        var layout = {
            title: 'Belly Button Biodiversity: Bubble Chart',
            showlegend: false,
            height: 500,
            width: 1100
        };
        Plotly.newPlot('bubble', bubbledata, layout);
    });
}

function dropdownmenu() {
    d3.json("samples.json").then((data) => {
        console.log(data)
        var names = data.names;
        var tableinfo = d3.select("#selDataset")
        names.forEach((element) => {
            tableinfo.append("option").text(element).property("value", element)
        });
        buildMetaData(names[0])
        buildchart(names[0]);
        drawBubbleChart(names[0])
    })
}

function optionChanged(newsample) {
    buildMetaData(newsample)
    buildchart(newsample)
    drawBubbleChart(newsample)
}




dropdownmenu()