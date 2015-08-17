///////////////////////////////
// world.js
///////////////////////////////
//
// Create the world.
//	
//////////////////////////




/////////////////////
// Functions
/////////////////////



function buildWorld() {
	
	// global light and sun light
	var globalLight = new THREE.AmbientLight(0x404040);
	scene.add(globalLight);
	
	var sunLight = new THREE.DirectionalLight(0xffffff, 1);
	sunLight.position.set(1, 2, 0);
	scene.add(sunLight);


	// WordPad and MusicPlayer cube
	var book = new THREE.Mesh( new THREE.BoxGeometry(2,1,2),
		 new THREE.MeshBasicMaterial({color:0xB85C00}));
	scene.add(book);
	book.position.set(5,0.5,5);
	
	var audio = new THREE.Mesh( new THREE.BoxGeometry(1,2,1),
		 new THREE.MeshBasicMaterial({color:0x2222EE}));
	scene.add(audio);
	audio.position.set(7,1,-4);
	
	
	// set domevents of wordpad and musicplayer
	var domEvents = new THREEx.DomEvents(camera, renderer.domElement);
	domEvents.addEventListener(book, 'click', function(){toggleWordpad();}, false);
	domEvents.addEventListener(audio, 'click', function(){playMusic();}, false);

	domEvents.addEventListener(book, 'mouseover', 
		function(){book.material.color.set(0xDEC03B);}, false);
	domEvents.addEventListener(book, 'mouseout', 
		function(){book.material.color.set(0xB85C00);}, false);
	domEvents.addEventListener(audio, 'mouseover', 
		function(){audio.material.color.set(0x66CCFF);}, false);
	domEvents.addEventListener(audio, 'mouseout', 
		function(){audio.material.color.set(0x2222EE);}, false);
	

	// set sky color to blue
	renderer.setClearColor( 0xBCE6E6, 1);


	// load the terrain from terrain.JSON
	var loader = new THREE.JSONLoader();          

	loader.load('application/World/model/terrain.js', function (geometry, materials) {
    	var terrain = new THREE.SkinnedMesh(geometry,
			 new THREE.MeshFaceMaterial(materials));

		terrain.receiveShadow = true;
    	scene.add(terrain);
		
	});

}
