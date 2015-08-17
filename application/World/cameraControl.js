///////////////////////////////
// cameraControl.js
///////////////////////////////
//
// Control the camera.
//	
//////////////////////////




/////////////////////
// Global Variables
/////////////////////



var jumpSpeed = 0,
jumpHeight = 2,
jumping = false;


var activeControl = true;
var activeLook = false;



/////////////////////
// Script
/////////////////////



window.addEventListener('keydown', function() {
	
	if ( Key.isDown(Key.CONTROL) ) {
		activeLook = !activeLook;
	}
	
});



/////////////////////
// Functions
/////////////////////



function cameraJump() {
	
	if ( Key.isDown(Key.SPACE) && !jumping ) {
		jumpSpeed = 0.15;
		jumping = true;
	}
	jumpHeight += jumpSpeed;
	
	if ( jumping && jumpSpeed > -0.15 ) {
		jumpSpeed -= 0.01;
	} else {
		jumping = false;
		jumpSpeed = 0;
		jumpHeight = 2;
	}
	
	camera.position.y = jumpHeight;
	
}