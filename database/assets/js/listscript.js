// Javascript for listings page

// Hiding when not logged in
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
if(tech === undefined)
{
    $("#rdbcontent").hide();
    $("#login-warning").show();
}


/// *** Initialize List *** (using List.js)
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
    page: 15,
    item: 'databaseitem',
    plugins:[ListPagination(paginationParams)]
};

// Make list (List.js)
var labsList = new List('labs', options);


/// *** Functions for various js work after entries have loaded; called after list.js call to add
function checkPrevNext() {
    // Take care of hiding prev or next buttons
    if($('.active').next().length === 0){
        $('#next').css('visibility','hidden');
    }
    else{
        $('#next').css('visibility','visible');
    }
    if($('.active').prev().length === 0){
        $('#prev').css('visibility','hidden');
    }
    else{
        $('#prev').css('visibility','visible');
    }
}
function postEntryWork() {
    // Checking page buttons and add events
    checkPrevNext();
    $('.pager ul').click(function() {
        checkPrevNext();
        $('html, body').scrollTop(200);
    });
    $('#prev').click(function(){
        $('.active').prev().trigger('click');
        checkPrevNext();
    });
    $('#next').click(function(){
        $('.active').next().trigger('click');
        checkPrevNext();
    });

    // Scroll to top button
    $('#back-top').hide();
    $(window).scroll(function(){
        if($(this).scrollTop() > 300){
            $('#back-top').fadeIn(300);
        }
        else{
            $('#back-top').fadeOut(300);
        }
    });
    $('#back-top').click(function(){
        $('body,html').animate({scrollTop:0}, 400);
    });

    // Reset filters
    $('#reset-button-id').click(function() {
        $('#searchbox').val('');
        $("#categories")[0].selectize.clear();
        labsList.search();
        labsList.filter();
    });
}

/// *** Retrieve and load Data from Google Spreadsheet *** (using sheetrock.js)
// Update entries (sheetrock call)
var updateResults = function(error, options, response) {
    // Report error
    if(error){console.log("Errors: ", error);}

    // Parse response from sheet, curate, and load
    var data = [];
    var i;
    var id_num = 0;
    var deptTemp = "";
    for (i = 1; i < response["rows"].length; i++) {
        response["rows"][i]["cells"]["web1"] = response["rows"][i]["cells"]["website"];
        response["rows"][i]["cells"]["web2"] = response["rows"][i]["cells"]["website"];
        id_num = Math.floor((Math.random()*10000)+1);
        response["rows"][i]["cells"]["description"] =
            "<input type='checkbox' class='hiddentrig' id='item"+id_num+"'><span class='desc-text'>" +
            response["rows"][i]["cells"]["description"] +
            "</span><label class='show-text' for='item"+id_num+"'>";
        response["rows"][i]["cells"]["email2"] = "mailto:" + response["rows"][i]["cells"]["email"];
        deptTemp = "<span>" + response["rows"][i]["cells"]["departments"].replace(/;\s*/g, "</span><span>");
        response["rows"][i]["cells"]["departments"] = deptTemp.slice(0,deptTemp.length-6);
        data.push(response["rows"][i]["cells"]);
    }
    // Load entries by relaying to list.js code
    labsList.add(data);

    // Ready to present the entries!
    $("#loader").hide();
    $("#hr, .pager").show();

    // Note: by this points the entries are all set
    // Take care of all events and js work etc
    postEntryWork();
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

$('#searchbox').keyup(function() {
   var searchString = $(this).val();
   var searchArray = searchString.split(" ");
   console.log(searchArray);
   labsList.filter(function(item) {
     var isTrue = true;
     for (i = 0; i < searchArray.length; i++) {
        if (item.values().description.indexOf(searchArray[i]) == -1) {
          isTrue=false;
        }
      }
      return isTrue;
   });
});


$('#categories').selectize({
    sortField: 'text'
});
$('#categories').change(function(){
    var selection = "<span>" + this.value + "</span>";
    if (selection) {
        labsList.filter(function(item) {
            return (item.values().departments.indexOf(selection) != -1);
        });
    }
    else {
        labsList.filter();
    }
});
