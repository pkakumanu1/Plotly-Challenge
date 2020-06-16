

// select option from dropdown
function init() {
  d3.json("samples.json").then((importedData) => {
    console.log(importedData);
    // Populate the dropdown options
    var dropdownMenu = d3.select("#selDataset");
    importedData.names.forEach((name) => {
      opt = dropdownMenu.append("option");
      opt.text(name)
        .property("value", name);
    });


    var samples = importedData.samples[0].sample_values.slice(0, 10);
    console.log(samples);
    var otu_id = importedData.samples[0].otu_ids.slice(0, 10);
    console.log(otu_id);
    var otu_label = importedData.samples[0].otu_labels.slice(0, 10)
    console.log(otu_label)

    // Meta Data
    var metaId = importedData.metadata[0].id;
    console.log(metaId);
    var bbtype = importedData.metadata[0].bbtype;
    console.log(bbtype);
    var ethnicity = importedData.metadata[0].ethnicity;
    console.log(ethnicity);
    var gender = importedData.metadata[0].gender;
    console.log(gender);
    var location = importedData.metadata[0].location;
    console.log(location);
    var wfreq = importedData.metadata[0].wfreq;
    console.log(wfreq);

    var metaDataPanel = d3.select("#sample-metadata");
    metaDataPanel.append("p").text(`ID : ${metaId}`);
    metaDataPanel.append("p").text(`BBType : ${bbtype}`);
    metaDataPanel.append("p").text(`Ethnicity : ${ethnicity}`);
    metaDataPanel.append("p").text(`Gender : ${gender}`);
    metaDataPanel.append("p").text(`Location : ${location}`);
    metaDataPanel.append("p").text(`WFreq : ${wfreq}`);

    var trace1 = {
      x: samples.reverse(),
      y: otu_id.map(out => `OTU ${out}`).reverse(),
      text: otu_label.reverse(),
      type: "bar",
      orientation: "h"
    };

    // data
    var data = [trace1];

    var CHART = d3.selectAll("#bar").node();

    Plotly.newPlot(CHART, data);
    // Bubble 

    var trace1 = {
      x: otu_id,
      y: samples,
      text: otu_label,
      mode: 'markers',
      marker: {
        size: samples,
        color: otu_id

      }
    };

    var data = [trace1];


    Plotly.newPlot('bubble', data);

    // Gauge

    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        type: "indicator",
        title: {
          text:
            "Belly Button Washing Frequency <br><span style='font-size:0.8em;color:gray'>Scrubs Per Week</span>"
        },
    "labels" : ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
        mode: "gauge",
        gauge: {
          axis: { range: [0, 9], tickwidth: 1, tickcolor: "darkblue"  },
          steps: [
            { range: [0, 1], color: "lightgray" },
            { range: [1, 2], color: "gray" },
            { range: [2, 3], color: "lightgray" },
            { range: [3, 4], color: "gray" },
            { range: [4, 5], color: "lightgray" },
            { range: [5, 6], color: "gray" },
            { range: [6, 7], color: "lightgray" },
            { range: [7, 8], color: "gray" },
            { range: [8, 9], color: "lightgray" },
          ]
        }
      }
    ];

    var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };

    
    Plotly.newPlot('gauge', data, layout);

  });
}


function optionChanged(selection) {
  d3.json("samples.json").then((importedData) => {
    console.log(importedData);

    var filteredData = importedData.samples.filter(item => item.id == selection);

    console.log(filteredData);
    var samples = filteredData[0].sample_values;
    console.log(samples);
    var otu_id = filteredData[0].otu_ids.slice(0, 10);
    console.log(otu_id);
    var otu_label = filteredData[0].otu_labels.slice(0, 10)
    console.log(otu_label)
    var filteredData1 = importedData.metadata.filter(item => item.id == selection);
    console.log(filteredData1);

    var metaId = filteredData1[0].id;
    console.log(metaId);
    var bbtype = filteredData1[0].bbtype;
    console.log(bbtype);
    var ethnicity = filteredData1[0].ethnicity;
    console.log(ethnicity);
    var gender = filteredData1[0].gender;
    console.log(gender);
    var location = filteredData1[0].location;
    console.log(location);
    var wfreq = filteredData1[0].wfreq;
    console.log(wfreq);

    d3.select("#sample-metadata").html("");
    var metaDataPanel = d3.select("#sample-metadata");
    metaDataPanel.append("p").text(`ID : ${metaId}`);
    metaDataPanel.append("p").text(`BBType : ${bbtype}`);
    metaDataPanel.append("p").text(`Ethnicity : ${ethnicity}`);
    metaDataPanel.append("p").text(`Gender : ${gender}`);
    metaDataPanel.append("p").text(`Location : ${location}`);
    metaDataPanel.append("p").text(`WFreq : ${wfreq}`);


    var trace1 = {
      x: samples.reverse(),
      y: otu_id.map(out => `OTU ${out}`).reverse(),
      text: otu_label.reverse(),
      type: "bar",
      orientation: "h"
    };
    var data = [trace1];

    var CHART = d3.selectAll("#bar").node();

    Plotly.newPlot(CHART, data);
    // Bubble

    var trace1 = {
      x: otu_id,
      y: samples,
      text: otu_label,
      mode: 'markers',
      marker: {
        size: samples,
        color: otu_id

      }
    };

    var data = [trace1];


    Plotly.newPlot('bubble', data);

    // Gauge

    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        type: "indicator",
        title: {
          text:
            "Belly Button Washing Frequency <br><span style='font-size:0.8em;color:gray'>Scrubs Per Week</span>"
        },
    "labels" : ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
        mode: "gauge",
        gauge: {
          axis: { range: [0, 9], tickwidth: 1, tickcolor: "darkblue"  },
          steps: [
            { range: [0, 1], color: "lightgray" },
            { range: [1, 2], color: "gray" },
            { range: [2, 3], color: "lightgray" },
            { range: [3, 4], color: "gray" },
            { range: [4, 5], color: "lightgray" },
            { range: [5, 6], color: "gray" },
            { range: [6, 7], color: "lightgray" },
            { range: [7, 8], color: "gray" },
            { range: [8, 9], color: "lightgray" },
          ]
        }
      }
    ];

    var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };

    
    Plotly.newPlot('gauge', data, layout);

  });

}
init();
