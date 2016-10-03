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

if(tech != undefined)
{
	myElement.innerHTML = "View Listings";
	myElement.setAttribute("href", "listings.html");
	
	//Temporarily disabled.
	/*
	window.alert(tech);
	var str1 = "https://secure.its.yale.edu/cas/serviceValidate?ticket=";
	var str2 = str1.concat(tech);
	var str3 = str2.concat("&service=http%3A%2F%2Fyuraresearch.github.io/database/index.html");
	window.alert(str3);

	//var data = httpGet("secure.its.yale.edu/cas/serviceValidate");
	var invocation = new XMLHttpRequest();
	var url = 'https://secure.its.yale.edu/cas/serviceValidate';

	if(invocation) 
    {    
		invocation.open('GET', url, true);
		invocation.onreadystatechange = handler;
		invocation.send(); 
	}
	*/

	//window.alert("End");
}
else
{
	myElement.innerHTML = "Log In";
	myElement.setAttribute("href", "https://secure.its.yale.edu/cas/login?service=http%3A%2F%2Fyuraresearch.github.io/database/index.html");

	//myElement.setAttribute()
	//window.alert("No parameters");

}
