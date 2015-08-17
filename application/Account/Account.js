///////////////////////////////
// account.js
///////////////////////////////
//
// Provide functions to manipulate accounts.
//	
//////////////////////////




/////////////////////
// Global Variables
/////////////////////



var timeout;



/////////////////////
// Functions
/////////////////////



function login() {

	$.post("php/Account/login.php",
	{
		username: $("#username").val(),
		password: $("#password").val()
	},
	function(result){
		if ( result ) {					
			setCookie("username", $("#username").val(), 1);
			window.open("savid.html", "_self");
		} else {
			$("#loginErr").fadeIn();
			clearTimeout(timeout);
			timeout = setTimeout(function(){$("#loginErr").fadeOut();}, 3000);
		}
	});
	
}



function logout() {
	
	leavePage();
	setCookie("username", "", -1);
	window.open("index.html", "_self");
	
}



function enter_as_guest() {
	
	var name
	var pattern = new RegExp("^[a-zA-Z0-9_]+$");
	
	if ( name = prompt("你的暱稱？ (英文或數字)") ) { 
		if ( pattern.test(name) ) {
			setCookie("username", name+"_GUEST");
			window.open("savid.html", "_self");
		} else {
			alert("有不被允許的符號");
		}
	}

}



function register() {  // todo: it's not neccesary
}



function enterPage() {
	
	if ( !checkCookie("username") ) {
		window.open("index.html", "_self");
	} else {
		
		var username = getCookie("username");
		
		$("#userID").text(username);
		
		$.post("php/Account/enterPage.php",
		{
			username: username
		});
		
		if ( username.search("_GUEST") != -1 ) {
			$.post("php/Request/addGuestFile.php",
			{
				username: username
			});
		}
		
		document.body.onbeforeunload = function(){ leavePage(); };
		
	}
	
}



function leavePage() {
	
	username = getCookie("username");
	$.post("php/Account/leavePage.php",
	{
		username: username
	});

	if ( username.search("_GUEST") != -1 ) {
		$.post("php/Request/removeGuestFile.php",
		{
			username: username
		});
	}
	
}