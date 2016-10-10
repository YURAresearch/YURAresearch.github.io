/// *** Initialize List *** (using List.js)

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var tech = getUrlParameter('ticket');
if(tech != undefined)
{
  
}
else
{
  $("#rdbcontent").hide();
}

// Pagination parameters (List.js plugin)
var paginationParams = {
  name: "listPages",
  paginationClass: "pagination",
  innerWindow: 2,
  outerWindow: 1
};

// Entries list parameters (List.js)
var options = {
  // valueNames: class names for the different values of each list item
  // page: how many items that should be visible at the same time. Default 200
  // item: ID of item template element
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
  item: 'databaseitem',
  plugins:[ListPagination(paginationParams)]
};

// Make list (List.js)
var labsList = new List('labs', options);

/// *** Retrieve Data from Google Spreadsheet *** (using sheetrock.js)

function toggleTruncationEvent(){
  $('.truncateme').dblclick(function(){
    $(this).toggleClass("truncateme-active");
  });
}

// Update entries (sheetrock call)
var updateResults = function(error, options, response) {
  // Report error
  if(error){
    console.log("Errors: ", error);
  }

  // Parse response from sheet, curate, and load
  var data = [];
  var i;
  // var dotdotdotButton = "<a class='toggle' href='#''><span class='openericon'>[ + ]</span><span class='closericon'>[ - ]</span></a>";
  for (i = 1; i < response["rows"].length; i++) {
    response["rows"][i]["cells"]["web1"] = response["rows"][i]["cells"]["website"];
    response["rows"][i]["cells"]["web2"] = response["rows"][i]["cells"]["website"];
    response["rows"][i]["cells"]["email2"] = "mailto:" + response["rows"][i]["cells"]["email"];
    response["rows"][i]["cells"]["departments"] = "<span>" + response["rows"][i]["cells"]["departments"].replace(/; /g, "</span><span>") + "</span>";
    data.push(response["rows"][i]["cells"]);
  }
  console.log("Total number of entries:", i-1);
  // $("#numberofresults").text(i-1 + " results matching your query");
  labsList.add(data);

  // Ready to present the entries!
  $("#loader").hide();
  $("#hr, .pager").show();

  console.log(labsList.size());

  // Update entry number count (TODO)
  // labsList.on('sortComplete',updateCount);
  // labsList.on('searchComplete',updateCount);
  // labsList.on('filterComplete',updateCount);

  // Toggle truncation events
  $(document).ready(toggleTruncationEvent);
  $('.btn, .pager').click(toggleTruncationEvent);
  $('#categories, #searchbox').change(toggleTruncationEvent);

  // Page buttons back up
  $('.pager').click(function() {
    $('html,body').scrollTop(0);
  });
};

// Parameters for sheetrock.js
var params = {
  url: 'https://docs.google.com/spreadsheets/d/1hJSYPwbuKZiVFaqV2a1yIEkjrjbZ_Mz9XM4xSK0j-WQ/edit#gid=806509658',
  query: "select A,B,C,D,E,F",
  callback: updateResults,
  reset: true
};

// Hide entries while load entries (sheetrock)
$("#hr, .pager").hide();
sheetrock(params);

/// *** Filtering *** (using List.js)
// Reset filters
$('#reset-button-id').click(function() {
  $('#searchbox').val('');
  $("#categories")[0].selectize.clear();
  console.log(labsList.search());
  labsList.filter();
});


///*** Misc ***
// Scroll to top button
$(document).ready(function(){
  $('#back-top').hide();
  $(window).scroll(function(){
    if($(this).scrollTop() > 400){
      $('#back-top').fadeIn(300);
    }
    else{
      $('#back-top').fadeOut(300);
    }
  });

  $('#back-top').click(function(){
    $('body,html').animate({scrollTop:0}, 400);
  });
});

// results count (TODO)
// function updateCount(){
//   // labsList.update();
//   console.log(labsList.size());
// }
