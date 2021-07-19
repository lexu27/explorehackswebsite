import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from "gsap"

export function run(){
	const scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 2000);

	const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#Totally_Not_Suspicious_Random_Canvas_😏🤫'),
	});


	renderer.setPixelRatio(window.devicePixelRatio);
	camera.position.setZ(150);
	camera.rotation.y += 40;


	const controls = new OrbitControls(camera, renderer.domElement);
	renderer.render(scene, camera);


	const pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.set(5, 5, 5);

	const ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(pointLight, ambientLight);


	function addStar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	const star = new THREE.Mesh(geometry, material);

	const [x, y, z] = Array(3)
	.fill()
	.map(() => THREE.MathUtils.randFloatSpread(100));

	star.position.set(x, y, z);
	scene.add(star);
	}

	Array(200).fill().forEach(addStar);

	const r1 = 20;
	const r2 = 24;
	scene.background = new THREE.Color(0x011C33);

	
	let rocket1 = new THREE.Object3D();

	const rocket2 = new THREE.Object3D();

	const loader = new GLTFLoader();
	let child1;
	let child2;

	let disk;

	loader.load( '../img/three/cock7.glb', function ( gltf ) {
		disk = gltf.scene.children.find((child) => child.name === "exploreHacksLogo_v1");
		disk.scale.set(0.18,0.18,0.18);
		disk.position.set(0,0,0);
		disk.rotation.x = Math.PI / 2;
		disk.rotation.y = -Math.PI / 4;
		scene.add(disk);

	}, undefined, function ( error ) {

		console.error( error );

	} );



	loader.load( '../img/three/shit.glb', function ( gltf ) {
		child1 = gltf.scene.children.find((child) => child.name === "exploreHacksRocket_v1");
		
		child1.rotation.x = -Math.PI / 2;

		rocket1.add(child1);

		scene.add(rocket1);

	}, undefined, function ( error ) {

		console.error( error );

	} );

	loader.load( '../img/three/shit.glb', function ( gltf ) {
		child2 = gltf.scene.children.find((child) => child.name === "exploreHacksRocket_v1");

		child2.rotation.x = Math.PI / 2;

		rocket2.add(child2);

		scene.add(rocket2);

	}, undefined, function ( error ) {

		console.error( error );

	} );

	rocket1.scale.set(0.9,0.9,0.9);
	rocket2.scale.set(0.9,0.9,0.9);




	let height1 = 0.5;

	let height2 = 0.5;
	
	

	const radius = 150;


	const createSmoke = (d, r) => {
		let p = getParticle();
		dropParticle(p, d, r);
	};

	let theta = 0;
	let particles = [];

	class Particle {
		constructor() {
		  this.isFlying = false;
	      
		  var scale = 20 + Math.random() * 20;
		  var nLines = 3 + Math.floor(Math.random() * 5);
		  var nRows = 3 + Math.floor(Math.random() * 5);
		  this.geometry = new THREE.SphereGeometry(scale, nLines, nRows);
	      
		  this.material = new THREE.MeshLambertMaterial({
		    color: 0xe3e3e3,
		    shading: THREE.FlatShading,
		    transparent: true
		  });
	      
		  this.mesh = new THREE.Mesh(this.geometry, this.material);
		}
	      }

	const getParticle = function() {
		if (particles.length)
		{
			return particles.pop()
		} 
		return new Particle();
	}
	const recycleParticle = (p) => {

		p.mesh.rotation.x = Math.random() * Math.PI * 2;
		p.mesh.rotation.y = Math.random() * Math.PI * 2;
		p.mesh.rotation.z = Math.random() * Math.PI * 2;
		particles.push(p)

	}

	const dropParticle = (p, d, r) => {
		scene.add(p.mesh);
		
		let length = Math.sqrt(Math.pow(5,2) + Math.pow(r, 2));
		var transformation = 0;
		if (d === "one") {
			var smokeVector = new THREE.Vector3(0, length * Math.sin(delta1),length * Math.cos(delta1))
			var pre_smokeVector = new THREE.Vector3(0, length * Math.sin(delta1-0.01),length * Math.cos(delta1-0.01))
			delta1 += 0.02;
			transformation = 45;

		} else if (d === "two") {
			var smokeVector = new THREE.Vector3(0, length * Math.sin(-delta2),length * Math.cos(-delta2))
			var pre_smokeVector = new THREE.Vector3(0, length * Math.sin(-delta2-0.01),length * Math.cos(-delta2-0.01))
			delta2 += 0.02;
			transformation = -45;
		}

		const smoke_euler = new THREE.Euler(
			THREE.MathUtils.degToRad(0),
			THREE.MathUtils.degToRad(transformation));
			THREE.MathUtils.degToRad(0), 
		smokeVector = smokeVector.applyEuler(smoke_euler)

		pre_smokeVector = pre_smokeVector.applyEuler(smoke_euler)


		p.mesh.position.copy(smokeVector);


		var s = Math.random(0.2) + 0.35;
		p.mesh.scale.set(s * 0.01, s* 0.01, s*0.01);
		p.mesh.material.opacity = 1;

		gsap.to(p.mesh.position, {
			duration: 2,
			x: pre_smokeVector.x,
			y: pre_smokeVector.y,
			z: pre_smokeVector.z,
			ease: "none",
			onComplete : recycleParticle,
			onCompleteParams : [p],
		})
		gsap.to(p.mesh.scale, {
			x: s * 0.03,
			y: s* 0.03,
			z: s* 0.03,
			ease: "power3.inOut"
		})
		gsap.to(p.mesh.material, {
			duration: 2,
			opacity: 0,
			ease: "none"
		})

	}
	let velocity1 = new THREE.Vector3();
	let velocity2 = new THREE.Vector3();
	let delta1 = -Math.atan(height1 / r1);
	let delta2 = Math.atan(height2 / r2);


	// const planet1Shape = new THREE.SphereGeometry(3, 24, 24);
	// const bluePlanet = new THREE.TextureLoader().load('../img/custom/Planet1.png');
	// const planet1Material = new THREE.MeshStandardMaterial({ map: bluePlanet});
	// const planet1 = new THREE.Mesh(planet1Shape, planet1Material);
	// planet1.position.x = -30;
	// planet1.position.y = 4;
	// planet1.position.z = -40;


	// scene.add(planet1);

	var text = new THREE.FontLoader();
	text.load( 'Helvetica_Regular.typeface.json', function ( font ) {
    
	  var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x555555, shininess: 30 } );
	
	  const geometry = new THREE.TextGeometry( 'You found the last Easter Egg!', {
	    font: font,
	    size: 8,
	    height: 3,
	  } );
	
	  var mesh = new THREE.Mesh( geometry, material );
	  mesh.position.x = -75;
	  mesh.position.y = 45;
	  mesh.position.z = 0;
	  scene.add(mesh);
	
	} );
	text.load( 'Helvetica_Regular.typeface.json', function ( font ) {
    
		var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x555555, shininess: 30 } );
	      
		const geometry = new THREE.TextGeometry( 'Hope you had fun!', {
		  font: font,
		  size: 8,
		  height: 3,
		} );
	      
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = -45;
		mesh.position.y = 35;
		mesh.position.z = 0;
		scene.add(mesh);
	      
	      } );

	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();
	var finger = new THREE.Vector2();
	var selectedObject;


	function isMobile() { 
	// credit to Timothy Huang for this regex test: 
	// https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		return true
	}
	else{
		return false
	}

	} 
	function touchReaction(event)
	{
		event.stopPropagation(); 
 		event.preventDefault();
 		console.log(event)
  		finger.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
  		finger.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;
	}
	function onClick(event)
	{


 		if (isMobile())
  		{
    			raycaster.setFromCamera(finger, camera);
  		} else{
   			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    			raycaster.setFromCamera(mouse, camera);
  		}
 		let intersects = raycaster.intersectObjects(scene.children);
		console.log(intersects);
  		if (intersects.length > 0)
  		{
    			selectedObject = intersects[0].object
 		}


		if (disk.id === selectedObject.id)
		{
			
			gsap.to(selectedObject.rotation, {
				duration: 1,
				x: selectedObject.rotation.x + 4 * Math.PI,
				ease: "power3",
				onComplete: () => {selectedObject = null}
				}
			)
		}
	}
	

	(function() {
    
		var _w = window,
		    _s = window.screen,
		    _b = document.body,
		    _d = document.documentElement;
		
		window.Utils = {
		
		    // screen info 
		    screen: function() 
		    {
			var width  = Math.max( 0, _w.innerWidth || _d.clientWidth || _b.clientWidth || 0 );
			var height = Math.max( 0, _w.innerHeight || _d.clientHeight || _b.clientHeight || 0 );
			
			return {
			    width   : width, 
			    height  : height, 
			    centerx : width / 2, 
			    centery : height / 2, 
			    ratio   : width / height, 
			};
		    }, 
		    // mouse info 
		    mouse: function( e ) 
		    {
			var x = Math.max( 0, e.pageX || e.clientX || 0 ); 
			var y = Math.max( 0, e.pageY || e.clientY || 0 );
			var s = this.screen(); 
			
			return {
			    x : x, 
			    y : y, 
			    centerx : ( x - s.centerx ), 
			    centery : ( y - s.centery ), 
			}; 
		    }, 
		}; 
	    })();
	    
	    /**
	     * Firework object
	     */ 
	    (function() {
		
		// constructor 
		var Firework = function( scene ) 
		{
		    this.scene    = scene; 
		    this.done     = false; 
		    this.dest     = []; 
		    this.colors   = []; 
		    this.geometry = null;
		    this.points   = null;
		    this.material = new THREE.PointsMaterial({
			size: 16,
			color: 0xffffff,
			opacity: 1,
			vertexColors: true,
			transparent: true,
			depthTest: false,
		    });
		    this.launch(); 
		}; 
		
		// prototype 
		Firework.prototype = {
		    constructor: Firework, 
		    
		    // reset 
		    reset: function()
		    {
			this.scene.remove( this.points );  
			this.dest     = []; 
			this.colors   = []; 
			this.geometry = null;
			this.points   = null;
		    }, 
		    
		    // launch
		    launch: function() 
		    {
			var s = Utils.screen(); 
			var x = THREE.MathUtils.randInt( -s.width, s.width ); 
			var y = THREE.MathUtils.randInt( 100, 800 );
			var z = THREE.MathUtils.randInt( -1000, -3000 ); 
			
			var from = new THREE.Vector3( x, -800, z ); 
			var to   = new THREE.Vector3( x, y, z ); 
			
			var color = new THREE.Color();
			color.setHSL( THREE.MathUtils.randFloat( 0.1, 0.9 ), 1, 0.9 );
			this.colors.push( color ); 
			
			this.geometry = new THREE.BufferGeometry();
			this.points = new THREE.Points( this.geometry, this.material );
			
			this.geometry.colors = this.colors;
			this.geometry.setFromPoints( from ); 
			this.dest.push( to ); 
			this.colors.push( color ); 
			this.scene.add( this.points );  
		    }, 
		
		    // explode
		    explode: function( vector ) 
		    {
			this.scene.remove( this.points );  
			this.dest     = []; 
			this.colors   = []; 
			this.geometry = new THREE.BufferGeometry();
			this.points   = new THREE.Points( this.geometry, this.material );
			
			for( var i = 0; i < 80; i++ )
			{
			    var color = new THREE.Color();
			    color.setHSL( THREE.MathUtils.randFloat( 0.1, 0.9 ), 1, 0.5 );
			    this.colors.push( color ); 
			    
			    var from = new THREE.Vector3( 
				THREE.MathUtils.randInt( vector.x - 10, vector.x + 10 ), 
				THREE.MathUtils.randInt( vector.y - 10, vector.y + 10 ), 
				THREE.MathUtils.randInt( vector.z - 10, vector.z + 10 )
			    ); 
			    var to = new THREE.Vector3( 
				THREE.MathUtils.randInt( vector.x - 1000, vector.x + 1000 ), 
				THREE.MathUtils.randInt( vector.y - 1000, vector.y + 1000 ), 
				THREE.MathUtils.randInt( vector.z - 1000, vector.z + 1000 )
			    ); 
			    this.geometry.setFromPoints( from ); 
			    this.dest.push( to ); 
			}
			this.geometry.colors = this.colors;
			this.scene.add( this.points );  
		    }, 
		    
		    // update
		    update: function() 
		    {
			// only if objects exist
			if( this.points && this.geometry )
			{
			    var total = this.geometry.attributes.position.count; 
	    
			    // lerp particle positions 
			    for( var i = 0; i < total; i++ )
			    {
				this.geometry.attributes.position[i].x += ( this.dest[i].x - this.geometry.attributes.position[i].x ) / 20;
				this.geometry.attributes.position[i].y += ( this.dest[i].y - this.geometry.attributes.position[i].y ) / 20;
				this.geometry.attributes.position[i].z += ( this.dest[i].z - this.geometry.attributes.position[i].z ) / 20;
				this.geometry.verticesNeedUpdate = true;
			    }
			    // watch first particle for explosion 
			    if( total === 1 ) 
			    {
				if( Math.ceil( this.geometry.attributes.position[0].y ) > ( this.dest[0].y - 20 ) )
				{
				    this.explode( this.geometry.attributes.position[0] ); 
				    return; 
				}
			    }
			    // fade out exploded particles 
			    if( total > 1 ) 
			    {
				this.material.opacity -= 0.015; 
				this.material.colorsNeedUpdate = true;
			    }
			    // remove, reset and stop animating 
			    if( this.material.opacity <= 0 )
			    {
				this.reset(); 
				this.done = true; 
				return; 
			    }
			}
		    }, 
		}; 
		
		// export 
		window.Firework = Firework;  
	    })();
	    
	    /**
	     * Stage setup 
	     */
	    (function() {
		
		var screen    = Utils.screen(), 
		    renderer  = null, 
		    camera    = null, 
		    scene     = null, 
		    to        = { px: 0, py: 0, pz: 500 }, 
		    fireworks = []; 
		
		try {
		    renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } ); 
		    camera   = new THREE.PerspectiveCamera( 60, screen.ratio, 0.1, 20000 );
		    scene    = new THREE.Scene();
		}
		catch( e ) {
		    alert( "THREE.JS Error: " + e.toString() ); 
		    return; 
		} 
		
		// on screen resize 
		function onResize( e ) 
		{
		    var s = Utils.screen();
		    renderer.setSize( s.width, s.height );
		    camera.aspect = s.ratio;
		    camera.updateProjectionMatrix(); 
		};
		
		// on mouse move
		function onMouse( e ) 
		{
		    var mouse = Utils.mouse( e ); 
		    to.px =  ( mouse.centerx * 0.95 );
		    to.py = -( mouse.centery * 0.95 );
		};
		
		// on click/tap 
		function onPress( e ) 
		{
		    to.pz -= 1000; 
		};
		
		// on click/tap release
		function onRelease( e ) 
		{
		    to.pz += 1000; 
		};
		
		
		// animation loop 
		function draw() 
		{
		    requestAnimationFrame( draw );
		    
		    // if( !document.hasFocus() ) return; 
		    
		    // add fireworks 
		    if( THREE.MathUtils.randInt( 1, 20 ) === 10 )
		    {
			fireworks.push( new Firework( scene ) ); 
		    }
		    // update fireworks 
		    for( var i = 0; i < fireworks.length; i++ )
		    {
			if( fireworks[ i ].done ) // cleanup 
			{
			    fireworks.splice( i, 1 ); 
			    continue; 
			}
			fireworks[ i ].update();
		    }
		    
		    // lerp camera position 
		    camera.position.x += ( to.px - camera.position.x ) / 40;
		    camera.position.y += ( to.py - camera.position.y ) / 40;
		    camera.position.z += ( to.pz - camera.position.z ) / 40;
		    
		    // render 
		    renderer.render( scene, camera );
		};
		
		// run 
		onResize();
		draw(); 
	    })(); 
	    

	function animate() {
		requestAnimationFrame(animate);
		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;

		if (child1) {
			child1.rotation.y += 0.05;
		}
		if (child2) {
			child2.rotation.y += 0.05;
		}


		let r1_pos = new THREE.Vector3(0, r1 * Math.sin(theta), r1 * Math.cos(theta))

		const r1_euler = new THREE.Euler(
			THREE.MathUtils.degToRad(0),
			THREE.MathUtils.degToRad(45));
			THREE.MathUtils.degToRad(0), 
		r1_pos = r1_pos.applyEuler(r1_euler)
		rocket1.position.copy(r1_pos)

		let r2_pos_1 = new THREE.Vector3(0, -r1 * Math.cos(theta), r1 * Math.sin(theta));
		velocity1 = r2_pos_1.applyEuler(r1_euler);
 
		let temp1 = new THREE.Vector3(0, 0, 0);
		rocket1.lookAt(temp1.copy(rocket1.position).add(velocity1.normalize()));
		

		createSmoke("one", r1);




		let r2_pos = new THREE.Vector3(0, r2 * Math.sin(-theta), r2 * Math.cos(-theta))
		const r2_euler = new THREE.Euler(
			THREE.MathUtils.degToRad(0),
			THREE.MathUtils.degToRad(-45));
			THREE.MathUtils.degToRad(0), 
		r2_pos = r2_pos.applyEuler(r2_euler)
		rocket2.position.copy(r2_pos)
		let r2_pos_2 = new THREE.Vector3(0, -r2 * Math.cos(-theta), r2 * Math.sin(-theta));
		velocity2 = r2_pos_2.applyEuler(r2_euler);

		let temp2 = new THREE.Vector3(0, 0, 0);
		rocket2.lookAt(temp2.copy(rocket2.position).add(velocity2.normalize()));
		createSmoke("two", r2);


		theta += 0.02;

		if (canvas.width !== width || canvas.height !== height)
		{
		renderer.setSize(width, height, false);
		
		}
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	
		controls.update();
		renderer.render(scene, camera);
	
	

	}
	window.addEventListener('click', onClick)
	window.addEventListener('touchstart', touchReaction, false)
	animate();
}
      