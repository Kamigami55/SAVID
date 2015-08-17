///////////////////////////////
// Request.js
///////////////////////////////
//
// Sending and getting requests between server ane client
//	
//////////////////////////




/////////////////////
// Global variables
/////////////////////



var username;



/////////////////////
// Script
/////////////////////



$(document).ready(function() {
	username = getCookie("username");
    setInterval(getRequest( username ), 1500);
});



/////////////////////
// Function
/////////////////////



function getRequest( username ) {
	
	xmldoc = loadXMLDoc(username);
	
	while ( xmldoc.documentElement.chileNodes.length != 0 ) {
	
		var request = xmldoc.getElementByTagName("request")[0];
		var application = request.getElementByTagName("application")[0];
		
		switch ( application.chileNode[0].nodeValue ) {
			case 'Checkmate':
				checkmateRequest(request);
				break;
		}
		
		xmldoc.documentElement.removeChild(request);
	
	}
	
	//upload the xml?
	
}



function loadXMLDoc( filename ) {
	
	if (window.XMLHttpRequest)
	  {
	  xhttp=new XMLHttpRequest();
	  }
	else // code for IE5 and IE6
	  {
	  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xhttp.open("GET","data/Request/"+filename+".xml",false);
	xhttp.send();
	return xhttp.responseXML;

}