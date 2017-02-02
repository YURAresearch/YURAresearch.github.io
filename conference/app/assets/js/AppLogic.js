var rows;
var rowsP;
            //This line makes sure the initial search page is loaded with
            //all entries
            $(document).ready(SearchPageLogic);

            //sets up the plenary speakers table
            $(document).ready(loadPlenarySpeakers);

            /*
            $("#textField")
            function (event) {
                if (event.which == 13 || event.keyCode == 13) {
                    //code to execute here
                    return false;
                }
                return true;
            };

            $("#id_of_textbox").keyup(function(event){
                if(event.which == 13 || event.keyCode == 13) {
                    $("#id_of_button").click();
                }
            });
            */

            //actually populates the table
            function loadPlenarySpeakers()
            {
                var TableKey = "1p4tH2Y2FbFx5HbAp-20M4F6h-6Mjoi6V6GHVlEZc";
                var ApiKey = "AIzaSyARQKyU_0bhbxyqmiKVOzPXgXMKcIzOB5U";
                var searchCategory = "Plenary Speaker";
                var searchText = "Plenary Speaker";

                //formulating the actual query that will be sent
                var searchQuery = "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT * FROM " + TableKey + " WHERE '" + searchCategory +"' CONTAINS IGNORING CASE '" + searchText + "' ORDER BY '" + searchCategory + "'&key=" + ApiKey;

                xmlHttp = new XMLHttpRequest();
                xmlHttp.open( "GET",
                searchQuery,
                false );
                xmlHttp.send( null );

                //Code to process JSON results from xmlHttp
                var obj = JSON.parse(xmlHttp.responseText);
                //console.log(obj);

                //var obj = temp1;
                var columns = obj.columns;
                rowsP = obj.rows;
                for (var i = 0; i < rowsP.length; i++) {
                    var row = rowsP[i];
                }
                rowsP = rowsP.map(function(row) {
                    var i = 0;
                    for (i = 0; i< columns.length; i++) {
                        key = columns[i];
                        row[key] = row[i];
                    }
                    return row;
                })

                // Find a <table> element with id="myTable":
                var table = document.getElementById("plenaryTable");

                i = 0;
                for(i = 0; i < rowsP.length; i++) {

                    // Create an empty <tr> element and add it to the 1st position of the table:
                    var newRow = table.insertRow();

                    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                    var cell1 = newRow.insertCell(0);
                    var cell2 = newRow.insertCell(1);
                    var cell3 = newRow.insertCell(2);

                    // Add some text to the new cells:
                    cell1.innerHTML = rowsP[i].Field;
                    cell2.innerHTML = rowsP[i].Name;

                    //creates a link which opens the next page
                    var link = document.createElement("a");
                    link.setAttribute("href", "#seven")
                    //link.className = "someCSSclass";
                    var linkText = document.createTextNode(rowsP[i]['Project Title']);
                    link.addEventListener("click", ViewPageLogicPlenary(i));
                    link.appendChild(linkText);
                    cell3.appendChild(link);

                }

            }

            //Gets rid of the search query and shows all entries again
            function ClearFilter() {
                var searchTextField = document.getElementById('textField');
                searchTextField.value = "";
                SearchPageLogic();
            }

            //Populates plenary spearker view page (Page "seven") with values of project info
            function ViewPageLogicPlenary(i) {
                return function(){
                    //abstrInd = i;
                    var title = document.getElementById("ABSTitleP");
                    var name = document.getElementById("ABSNameP");
                    var field = document.getElementById("ABSFieldP");
                    var mentor = document.getElementById("ABSMentorP");
                    //var lab = document.getElementById("ABSLabP");
                    var inst = document.getElementById("ABSInstP");
                    var abstract = document.getElementById("ABSAbstractP");

                    name.innerHTML = rowsP[i].Name;
                    title.innerHTML = rowsP[i]['Project Title'];
                    field.innerHTML = "Field: " + rowsP[i].Field;
                    mentor.innerHTML = "Mentor(s): " + rowsP[i].Mentor;
                    //lab.innerHTML = rowsP[i].Laboratory;
                    inst.innerHTML = rowsP[i]["Research Institution"];
                    abstract.innerHTML = "Abstract:\n" + rowsP[i].Abstract;
                    console.log(i);
                }
            }

           //Populates view page (Page "six") with values of project info
            function ViewPageLogic(i) {
                return function(){
                    $('.desc').show();
                    //abstrInd = i;
                    var title = document.getElementById("ABSTitle");
                    var name = document.getElementById("ABSName");
                    var field = document.getElementById("ABSField");
                    var email = document.getElementById("ABSEmail");
                    var college = document.getElementById("ABSCollege")
                    var session = document.getElementById("ABSSession");
                    //var year = document.getElementById("ABSYear");


                    //var mentor = document.getElementById("ABSMentor");
                    //var lab = document.getElementById("ABSLab");
                    //var inst = document.getElementById("ABSInst");
                    var abstract = document.getElementById("ABSAbstract");

                    name.innerHTML = rows[i].Name + ", "+ rows[i].Year;
                    title.innerHTML = rows[i]['Project Title'];
                    field.innerHTML = "Field: " + rows[i].Field;
                    email.innerHTML = rows[i].Email;
                    college.innerHTML = rows[i].College;
                    session.innerHTML = rows[i].Session;
                    //lab.innerHTML = rows[i].Laboratory;
                    //year.innerHTML = "Year: " + rows[i].Year;
                    abstract.innerHTML = "Abstract:\n" + rows[i].Abstract;
                    console.log(i);
                    $('.query').hide();
                }
            }


            //clears off the values in the table
            function clearTable()
            {
                var table = document.getElementById("myTable");
                table.innerHTML = "";
            }

            //recreates the table header rows
            function newTableHeader(tableName)
            {
                var table = document.getElementById(tableName);
                var newRow = table.insertRow();
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                var cell3 = newRow.insertCell(2);
                var cell4 = newRow.insertCell(3);
                cell1.innerHTML = "Field";
                cell2.innerHTML = "Name";
                cell3.innerHTML = "Project Title";
                cell4.innerHTML = "Session";

            }

            function dontsubmitform()
            {
                alert("Testing");
                return false;
            }


            //actually performs search filtering based on text
            //and radio button and updates table with entries
			function SearchPageLogic() {
                clearTable();
                newTableHeader("myTable");
				var searchText = document.getElementById('textField').value;
    			//document.getElementById("demo").style.color = "red";
    			var TableKey ="1KLVF6YaVQIbTl6ENbc6FP9OqYLBCQOUy5S3QTCjI";// "1p4tH2Y2FbFx5HbAp-20M4F6h-6Mjoi6V6GHVlEZc";

                var ApiKey = "AIzaSyB7Rs6aCgwbT9mfxtRar-hBbL3wI-IJgpY";//"AIzaSyARQKyU_0bhbxyqmiKVOzPXgXMKcIzOB5U";

                var searchCategory = "Name";

                //dealing with radio buttons
                if(document.getElementById("radio-choice-1").checked) {
                        searchCategory = "Name";
                    }
                else if(document.getElementById("radio-choice-2").checked) {
                        searchCategory = "Field";
                    }
                else if(document.getElementById("radio-choice-3").checked) {
                    searchCategory = "Project Title";
                }
                else {
                    searchCategory = "Session";
                }

                //formulating the actual query that will be sent
                var searchQuery = "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT * FROM " + TableKey + " WHERE '" + searchCategory +"' CONTAINS IGNORING CASE '" + searchText + "' ORDER BY '" + searchCategory + "'&key=" + ApiKey;

     			xmlHttp = new XMLHttpRequest();
    			xmlHttp.open( "GET",
    			searchQuery,
    			false );
    			xmlHttp.send( null );

                //Code to process JSON results from xmlHttp
    			var obj = JSON.parse(xmlHttp.responseText);
                console.log(obj);

                //var obj = temp1;
                var columns = obj.columns;
                rows = obj.rows;
                if(rows == undefined)
                {
                    return false;
                }
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                }
                rows = rows.map(function(row) {
                    var i = 0;
                    for (i = 0; i< columns.length; i++) {
                        key = columns[i];
                        row[key] = row[i];
                    }
                    return row;
                })

                // Find a <table> element with id="myTable":
                var table = document.getElementById("myTable");

                i = 0;
                for(i = 0; i < rows.length; i++) {

                    // Create an empty <tr> element and add it to the 1st position of the table:
                    var newRow = table.insertRow();

                    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                    var cell1 = newRow.insertCell(0);
                    var cell2 = newRow.insertCell(1);
                    var cell3 = newRow.insertCell(2);
                    var cell4 = newRow.insertCell(3);

                    // Add some text to the new cells:
                    cell1.innerHTML = rows[i].Field;
                    cell2.innerHTML = rows[i].Name;

                    cell4.innerHTML= rows[i].Session;

                    //creates a link which opens the next page
                    var link = document.createElement("a");
                    link.setAttribute("href", "#desc")
                    //link.className = "someCSSclass";
                    var linkText = document.createTextNode(rows[i]['Project Title']);
                    link.addEventListener("click", ViewPageLogic(i));
                    link.appendChild(linkText);
                    cell3.appendChild(link);

                }

                return false;

			}


        function handleIt() {
            alert("hello");
        }

        $( ".go-back" ).click(function() {
          window.location.replace("abstracts.html");
        });
