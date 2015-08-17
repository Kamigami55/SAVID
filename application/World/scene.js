///////////////////////////////
// scene.js
///////////////////////////////
//
// Create the scene, the camera, and the renderer.
//	
//////////////////////////




/////////////////////
// Global Variables
/////////////////////



// scene size
var WIDTH = window.innerWidth,
HEIGHT = window.innerHeight;


// scene object variables
var scene, camera, renderer;


var clock = new THREE.Clock();
var controls;


var activeRender = true;



/////////////////////
// DOM Events
/////////////////////



$("body").ready(function(){setup();});



/////////////////////
// Script
/////////////////////



window.addEventListener('resize', function() {

	WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight;
	
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH/HEIGHT;
	camera.updateProjectionMatrix();
	
});



/////////////////////
// Functions
/////////////////////



function createScene() {
		
	// set some camera attributes
	var VIEW_ANGLE = 50,
	ASPECT = WIDTH/HEIGHT,
	NEAR = 0.1,
	FAR = 1000;
	
	// create the scene, camera, and renderer
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	renderer = new THREE.WebGLRenderer();
	
	controls = new THREE.FirstPersonControls( camera );
	controls.movementSpeed = 2;
	controls.lookSpeed = 0.2;
	
	// set camara and renderer
	camera.position.set(0,2,0);
	scene.add(camera);
	renderer.setSize(WIDTH, HEIGHT);
	document.body.appendChild(renderer.domElement);
	
}



function draw() {
	
	requestAnimationFrame(draw);

	if ( activeRender ) {
		renderer.render(scene, camera);
		
		if ( activeControl ) {
			controls.activeLook = activeLook;
			controls.update( clock.getDelta() );	
			cameraJump();
		}
	}
	
}



function setup() {
	
	createScene();
	buildWorld();
	draw();
	
}