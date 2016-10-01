/*****************
 * Initialize List
 *****************/

// valueNames: class names for the different values of each list item
// page: how many items that should be visible at the same time. Default 200
// item: ID of item template element
var options = {
  valueNames: ['name','departments', 'email', 'website', 'description'],
  page: 20,
  item: 'database',
  plugins: [ ListPagination({}) ]
};

var labsList = new List('labs', options);

/***************************************
 * Retrieve Data from Google Spreadsheet
 ***************************************/

var updateResults = function(error, options, response) {
    console.log("Errors:", error);
    var data = [];
    for (var i=1; i<response["rows"].length; i++) {
        data.push(response["rows"][i]["cells"]);
    }
    console.log("Total number of labs:", data.length);
    labsList.add(data);
}

var params = {
  url: 'https://docs.google.com/spreadsheets/d/1hJSYPwbuKZiVFaqV2a1yIEkjrjbZ_Mz9XM4xSK0j-WQ/edit#gid=806509658',
  query: "select *",
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
