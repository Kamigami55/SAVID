///////////////////////////////
// talker.js
///////////////////////////////
//
// Functions of talker
//	
//////////////////////////



/////////////////////
// DOM Events
/////////////////////



$("#message").focus(function(){
	activeControl = false;
	activeLook = false;
}).blur(function(){
	activeControl = true;
	activeLook = false;
}).keypress(function(){
	if ( Key.isDown(Key.ENTER) ) {
		putText();
	}
});
$("#submitMessage").click(function(){ putText(); });

$("#talker").resizeable();



/////////////////////
// Script
/////////////////////



setInterval(function(){ getText(); }, 1500);



/////////////////////
// Functions
/////////////////////



function putText() {
	
	$.post("php/Talker/putText.php",
	{
		text: $("#message").val(), //todo security problem
		username: getCookie("username")
	},
	function() {
		$("#message").val("");
	});
	
}

function getText() {
	
	$.post("php/Talker/getText.php",
	null,
	function(text) {
		$("#display").html(text);
	});
	
}