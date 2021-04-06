
function buildMetaData(sampleID) {
    
    d3.json("samples.json").then((data) => {
    console.log(data)

    var metadata = data.metadata;
    var filterdata = metadata.filter(d => d.id == 940);    
    console.log (filterdata);
    }
 
    
  



});

