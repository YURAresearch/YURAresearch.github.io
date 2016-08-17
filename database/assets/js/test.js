/*****************
 * Initialize List
 *****************/

// valueNames: class names for the different values of each list item
// page: how many items that should be visible at the same time. Default 200
// item: ID of item template element
var options = {
  valueNames: ['name','departments', 'email', 'website', 'description'],
  page: 5,
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

    $('#truncate_me').each(function(){
      $(this).truncate({lines: 2});
    });
}

var params = {
  url: 'https://docs.google.com/spreadsheets/d/1OQNHBcDIUSI8Scz_WdXAuRk8ikWJ9trtBt3-cuvid2E/edit#gid=0',
  query: "select *",
  callback: updateResults,
  reset: true
};

sheetrock(params);

/***********
 * Filtering
 ***********/
$('#categories').change(function () {
  var selection = this.value;
  if (selection != "") {

    $('#subcats').change(function () {
          var selection2 = this.value;
          if (selection2) {
              labsList.filter(function(item) {
                return (item.values().departments.indexOf(selection2) != -1);
              });
            } else {
            labsList.filter();
          }
      });
  } else {
  labsList.filter();
  }
});

$('#reset-button-id').click(function() {
   $('#searchbox').val('');
   $('#categories').val('');
   $('#subcats').val('');
   labsList.search();
   labsList.filter();
});
