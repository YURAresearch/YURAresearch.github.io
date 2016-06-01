// Define spreadsheet URL.
var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1OQNHBcDIUSI8Scz_WdXAuRk8ikWJ9trtBt3-cuvid2E/edit#gid=0';

// Compile the Handlebars template for HR leaders.
var HRTemplate = Handlebars.compile($('#hr-template').html());

var updateResults = function(error, options, response) {
    console.log("Errors:", error);
    var data = [];
    for (var i=1; i<response["rows"].length; i++) {
        data.push(response["rows"][i]["cells"]);
    }
    var resultsnum = data.length;
    document.getElementById("numberofresults").innerHTML = resultsnum;
    console.log("Total number of labs:", data.length);
    labsList.add(data);

    // make website links clickable
    $("a.website").each( function() {
      $( this ).attr("href", $( this ).text());
    });

}

// Load top five HR leaders.
$('#hr').sheetrock({
  url: mySpreadsheet,
  query: "select *",
  fetchSize: 10,
  callback: updateResults,
  rowTemplate: HRTemplate
});
