/*****************
 * Initialize List
 *****************/

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
  page: 2000,
  item: 'databaseitem'
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
    for (i = 1; i < response["rows"].length; i++) {
        response["rows"][i]["cells"]["web1"] = response["rows"][i]["cells"]["website"];
        response["rows"][i]["cells"]["web2"] = response["rows"][i]["cells"]["website"];
        response["rows"][i]["cells"]["email2"] = "mailto:" + response["rows"][i]["cells"]["email"];
        response["rows"][i]["cells"]["departments"] = response["rows"][i]["cells"]["departments"].replace(/; /g, "<br/>");
        data.push(response["rows"][i]["cells"]);
    }
    console.log("Total number of entries:", i-1);
    $("#numberofresults").text(i-1 + " results matching your query");
    labsList.add(data);

    $("#loader").hide();
    $("#hr").show();
    $("#list li").slice(10).hide();

    // truncate text with expand functionality
    $(function() {
      var $truncateme = $('.truncateme');
      $truncateme.append( ' <a class="toggle" href="#"><span class="openericon">[ + ]</span><span class="closericon">[ - ]</span></a>' );
      $('.truncateme').children().children('.closericon').hide();

      function createDots(element)
      {
        element.dotdotdot({
          after: 'a.toggle'
        });
        element.children().children('.closericon').hide();
        element.children().children('.openericon').show();
      }
      function destroyDots(element) {
        element.trigger( 'destroy' );
        element.children().children('.openericon').hide();
        element.children().children('.closericon').show();
      }

      $truncateme.dotdotdot({
        after: 'a.toggle'
      });

      $truncateme.on(
        'click',
        'a.toggle',
        function() {
          $(this).parent().toggleClass( 'opened' );

          if ( $(this).parent().hasClass( 'opened' ) ) {
            destroyDots($(this).parent());

          } else {
            createDots($(this).parent());
          }
          return false;
        }
      );

    });
}

var params = {
  url: 'https://docs.google.com/spreadsheets/d/1hJSYPwbuKZiVFaqV2a1yIEkjrjbZ_Mz9XM4xSK0j-WQ/edit#gid=806509658',
  query: "select A,B,C,D,E",
  callback: updateResults,
  reset: true
};

$("#hr").hide();
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

// // Lazy scroll
var mincount = 10;
var maxcount = 20;
$(window).scroll(function()
  {if($(window).scrollTop() + $(window).height() >= $(document).height() - 500)
    {
      $("#list li").slice(mincount,maxcount).fadeIn(1500);
      mincount = mincount+10;
      maxcount = maxcount+10;
    }
  });