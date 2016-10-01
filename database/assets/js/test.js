/*****************
 * Initialize List
 *****************/

// Break up multiple departments into separate lines for easier reading
function breakItUp(depts) {
  depts = depts.replace(/; /g, "<br/>");
  return depts;
}

// valueNames: class names for the different values of each list item
// page: how many items that should be visible at the same time. Default 200
// item: ID of item template element
var options = {
  valueNames: [
    'name',
    'departments',
    'website',
    'email',
    'description',
    {name: 'web1', attr: 'href'},
    {name: 'web2', attr: 'href'},
    {name: 'email2', attr: 'href'}
  ],
  page: 20,
  item: 'database',
  plugins: [ ListPagination({}) ]
};

var labsList = new List('labs', options);

/***************************************
 * Retrieve Data from Google Spreadsheet
 ***************************************/

var updateResults = function(error, options, response) {
    if(error){
      console.log("Errors:", error);
    }
    var data = [];
    var i;
    for (i=1; i<response["rows"].length; i++) {
        response["rows"][i]["cells"]["web1"] = response["rows"][i]["cells"]["website"];
        response["rows"][i]["cells"]["web2"] = response["rows"][i]["cells"]["website"];
        response["rows"][i]["cells"]["email2"] = "mailto:" + response["rows"][i]["cells"]["email"];
        response["rows"][i]["cells"]["departments"] = breakItUp(response["rows"][i]["cells"]["departments"]);
        data.push(response["rows"][i]["cells"]);
    }
    console.log("Total number of entries:", i-1);
    labsList.add(data);
}

var params = {
  url: 'https://docs.google.com/spreadsheets/d/1hJSYPwbuKZiVFaqV2a1yIEkjrjbZ_Mz9XM4xSK0j-WQ/edit#gid=806509658',
  query: "select A,B,C,D,E",
  callback: updateResults,
  reset: true
};

sheetrock(params);

/***********
 * Filtering
 ***********/

$('#reset-button-id').click(function() {
   $('#searchbox').val('');
   var selectize1 = $("#categories")[0].selectize;
   selectize1.clear();
   labsList.search();
   labsList.filter();
});