// Define spreadsheet URL.
var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1OQNHBcDIUSI8Scz_WdXAuRk8ikWJ9trtBt3-cuvid2E/edit#gid=0';

var options = {
  valueNames: [ 'name', 'description', 'departments', 'email', 'website' ],
  page: 1000,
  item:'database'
};


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

//compile the Handlebars template
var HRTemplate = Handlebars.compile($('#hr-template').html());


//truncate description length
var maxdescriplength=300

Handlebars.registerHelper ('truncate', function (str, len) {
    if (str.length > maxdescriplength && str.length > 0) {
        var new_str = str + " ";
        new_str = str.substr (0, maxdescriplength);
        new_str = str.substr (0, new_str.lastIndexOf(" "));
        new_str = (new_str.length > 0) ? new_str : str.substr (0, len);

        return new Handlebars.SafeString ( new_str +'...' );
    }
    return str;
});


// Load Sheetrock.
$('#hr').sheetrock({
  url: mySpreadsheet,
  query: "select *",
  callback: updateResults,
  rowTemplate: HRTemplate,
  reset:true
});
