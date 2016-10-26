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

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send();
    return xmlHttp.responseText;
}

function handler()
{
	window.alert(invocation.responseText);
}


var tech = getUrlParameter('ticket');

var myElement = document.getElementById("listings");

var urlGet = "http://undergradresearch.org:5000/auth";
var x = httpGet(urlGet.concat("Hello Nish"));
console.log(x);


if(tech != undefined)
{
	//myElement.innerHTML = "View Listings";
	//myElement.setAttribute("href", "listings.html");

	//window.alert("End");
}
else
{
	//myElement.innerHTML = "Log In";
	//myElement.setAttribute("href", "https://secure.its.yale.edu/cas/login?service=http%3A%2F%2Fyura.undergradresearch.org/database/listings.html");


	//myElement.setAttribute()
	//window.alert("No parameters");

}
