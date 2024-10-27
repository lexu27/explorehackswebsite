import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from "gsap"

export function run(){
	let colorsArray = [
		"63b598", "ce7d78", "ea9e70", "a48a9e", "c6e1e8", "648177", "0d5ac1",
		"f205e6", "1c0365", "14a9ad", "4ca2f9", "a4e43f", "d298e2", "6119d0",
		"d2737d", "c0a43c", "f2510e", "651be6", "79806e", "61da5e", "cd2f00",
		"9348af", "01ac53", "c5a4fb", "996635", "b11573", "4bb473", "75d89e",
		"2f3f94", "2f7b99", "da967d", "34891f", "b0d87b", "ca4751", "7e50a8",
		"c4d647", "e0eeb8", "11dec1", "289812", "566ca0", "ffdbe1", "2f1179",
		"935b6d", "916988", "513d98", "aead3a", "9e6d71", "4b5bdc", "0cd36d",
		"250662", "cb5bea", "228916", "ac3e1b", "df514a", "539397", "880977",
		"f697c1", "ba96ce", "679c9d", "c6c42c", "5d2c52", "48b41b", "e1cf3b",
		"5be4f0", "57c4d8", "a4d17a", "225b8", "be608b", "96b00c", "088baf",
		"f158bf", "e145ba", "ee91e3", "05d371", "5426e0", "4834d0", "802234",
		"6749e8", "0971f0", "8fb413", "b2b4f0", "c3c89d", "c9a941", "41d158",
		"fb21a3", "51aed9", "5bb32d", "807fb", "21538e", "89d534", "d36647",
		"7fb411", "0023b8", "3b8c2a", "986b53", "f50422", "983f7a", "ea24a3",
		"79352c", "521250", "c79ed2", "d6dd92", "e33e52", "b2be57", "fa06ec",
		"1bb699", "6b2e5f", "64820f", "1c271", "21538e", "89d534", "d36647",
		"7fb411", "0023b8", "3b8c2a", "986b53", "f50422", "983f7a", "ea24a3",
		"79352c", "521250", "c79ed2", "d6dd92", "e33e52", "b2be57", "fa06ec",
		"1bb699", "6b2e5f", "64820f", "1c271", "9cb64a", "996c48", "9ab9b7",
		"06e052", "e3a481", "0eb621", "fc458e", "b2db15", "aa226d", "792ed8",
		"73872a", "520d3a", "cefcb8", "a5b3d9", "7d1d85", "c4fd57", "f1ae16",
		"8fe22a", "ef6e3c", "243eeb", "1dc18", "dd93fd", "3f8473", "e7dbce",
		"421f79", "7a3d93", "635f6d", "93f2d7", "9b5c2a", "15b9ee", "0f5997",
		"409188", "911e20", "1350ce", "10e5b1", "fff4d7", "cb2582", "ce00be",
		"32d5d6", "17232", "608572", "c79bc2", "00f87c", "77772a", "6995ba",
		"fc6b57", "f07815", "8fd883", "060e27", "96e591", "21d52e", "d00043",
		"b47162", "1ec227", "4f0f6f", "1d1d58", "947002", "bde052", "e08c56",
		"28fcfd", "bb09b", "36486a", "d02e29", "1ae6db", "3e464c", "a84a8f",
		"911e7e", "3f16d9", "0f525f", "ac7c0a", "b4c086", "c9d730", "30cc49",
		"3d6751", "fb4c03", "640fc1", "62c03e", "d3493a", "88aa0b", "406df9",
		"615af0", "4be47", "2a3434", "4a543f", "79bca0", "a8b8d4", "00efd4",
		"7ad236", "7260d8", "1deaa7", "06f43a", "823c59", "e3d94c", "dc1c06",
		"f53b2a", "b46238", "2dfff6", "a82b89", "1a8011", "436a9f", "1a806a",
		"4cf09d", "c188a2", "67eb4b", "b308d3", "fc7e41", "af3101", "ff065",
		"71b1f4", "a2f8a5", "e23dd0", "d3486d", "00f7f9", "474893", "3cec35",
		"1c65cb", "5d1d0c", "2d7d2a", "ff3420", "5cdd87", "a259a4", "e4ac44",
		"1bede6", "8798a4", "d7790f", "b2c24f", "de73c2", "d70a9c", "25b67",
		"88e9b8", "c2b0e2", "86e98f", "ae90e2", "1a806b", "436a9e", "0ec0ff",
		"f812b3", "b17fc9", "8d6c2f", "d3277a", "2ca1ae", "9685eb", "8a96c6",
		"dba2e6", "76fc1b", "608fa4", "20f6ba", "07d7f6", "dce77a", "77ecca"]

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

	const pointLight2 = new THREE.PointLight(0xffffff);
	pointLight2.intensity = 0.5;
	pointLight2.position.set(0, 0, 200);

	const pointLight3 = new THREE.PointLight(0xffffff);
	pointLight3.intensity = 0.3;
	pointLight3.position.set(-5, -5, -5);

	const pointLight4 = new THREE.PointLight(0xffffff);
	pointLight4.intensity = 0.6;
	pointLight4.position.set(0, 0, -200);



	const ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(pointLight, pointLight2, ambientLight, pointLight3, pointLight4);


	function addStar() {
		const geometry = new THREE.SphereGeometry(0.25, 24, 24);
		const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
		const star = new THREE.Mesh(geometry, material);

		const [x, y, z] = Array(3)
		.fill()
		.map(() => THREE.MathUtils.randFloatSpread(1000));

		star.position.set(x, y, z);
		scene.add(star);
	}

	Array(1000).fill().forEach(addStar);

	const r1 = 20;
	const r2 = 24;
	scene.background = new THREE.Color(0x011C33);

	
	let rocket1 = new THREE.Object3D();

	const rocket2 = new THREE.Object3D();

	const loader = new GLTFLoader();
	let child1;
	let child2;

	let disk;

	loader.load( 'img/three/disk.glb', function ( gltf ) {
		console.log(gltf.scene.children);
		disk = gltf.scene.children.find((child) => child.name === "exploreHacksLogo_v1");
		disk.scale.set(0.18,0.18,0.18);
		disk.position.set(0,0,0);
		disk.rotation.x = Math.PI / 2;
		scene.add(disk);

	}, undefined, function ( error ) {

		console.error( error );

	} );



	loader.load( 'img/three/rocket.glb', function ( gltf ) {
		child1 = gltf.scene.children.find((child) => child.name === "exploreHacksRocket_v1");
		
		child1.rotation.x = -Math.PI / 2;

		rocket1.add(child1);

		scene.add(rocket1);

	}, undefined, function ( error ) {

		console.error( error );

	} );

	loader.load('img/three/rocket.glb', function ( gltf ) {
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


	const planet1Shape = new THREE.SphereGeometry(3, 24, 24);
	const bluePlanet = new THREE.TextureLoader().load('img/three/p1.png');
	const planet1Material = new THREE.MeshStandardMaterial({ map: bluePlanet});
	const planet1 = new THREE.Mesh(planet1Shape, planet1Material);
	planet1.position.x = 30;
	planet1.position.y = 4;
	planet1.position.z = -40;

	const planet2Shape = new THREE.SphereGeometry(8, 24, 24);
	const Planet = new THREE.TextureLoader().load('img/three/p2.png');
	const planet2Material = new THREE.MeshStandardMaterial({ map: Planet});
	const planet2 = new THREE.Mesh(planet2Shape, planet2Material);
	planet2.position.x = -40;
	planet2.position.y = 4;
	planet2.position.z = -30;

	const planet3Shape = new THREE.SphereGeometry(8, 24, 24);
	const Planete = new THREE.TextureLoader().load('img/three/earth.jpg');
	const planet3Material = new THREE.MeshStandardMaterial({ map: Planete});
	const planet3 = new THREE.Mesh(planet3Shape, planet3Material);
	planet3.position.x = 50;
	planet3.position.y = -30;
	planet3.position.z = 20;


	scene.add(planet1, planet2, planet3);

	var text = new THREE.FontLoader();
	text.load( 'Helvetica_Regular.typeface.json', function ( font ) {
    
	  var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x555555, shininess: 30 } );
	
	  const geometry = new THREE.TextGeometry( 'You found the last Easter Egg!', {
	    font: font,
	    size: 8,
	    height: 1,
	  } );
	
	  var mesh = new THREE.Mesh( geometry, material );
	  mesh.position.x = -75;
	  mesh.position.y = 45;
	  mesh.position.z = 0;
	  scene.add(mesh);
	
	} );
	text.load( 'Helvetica_Regular.typeface.json', function ( font ) {
    
		var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x555555, shininess: 30 } );
	      
		const geometry = new THREE.TextGeometry( 'Hope you had fun! Click our logo below :)', {
		  font: font,
		  size: 8,
		  height: 1,
		} );
	      
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = -103;
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
  		finger.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
  		finger.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;
	}
	// var audio = new Audio('./img/three/db.mp3');
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
			let color = `0x${colorsArray[Math.floor(Math.random() * colorsArray.length)]}`

			ambientLight.color.setHex(color);
			let _1 = new Firework();
			let _2 = new Firework();
			let _3 = new Firework();
		}
		// var audio = new Audio('./img/three/db.mp3');
		// audio.play();
		// audio.addEventListener('ended', function() {
		// 	this.currentTime = 0;
		// 	this.play();
		// }, false);

		// if (audio.paused)
		// {
		// 	audio.play();
		// }
	}
	var launch = (firework) => {
		gsap.to(firework.firework.position, {
			duration: 2,
			y: firework.height,
			ease: "power3",
			onComplete : explode,
			onCompleteParams: [firework]

		})
	} 

	var explode = (firework) => {
		remove(firework.firework, firework.geometry, firework.material);
		for (let i = 0; i < firework.sub_particles; i++)
		{
			let particle_geo = new THREE.SphereGeometry( 0.3, 32, 32 );
			let particle_mat = new THREE.MeshBasicMaterial( {color: firework.color} );
			let particle = new THREE.Mesh(particle_geo, particle_mat);
			particle.position.copy(firework.firework.position);
			particle.material.opacity = 1;
			scene.add(particle);

			
			gsap.to(particle.position, {
				duration: 2,
				x: firework.firework.position.x + 20 * Math.sin(Math.random() * Math.PI * 2) * Math.cos(Math.acos(2 * Math.random() - 1)),
				y: firework.height + 20 * Math.sin(Math.random() * Math.PI * 2) * Math.cos(Math.acos(2 * Math.random() - 1)),
				z: firework.firework.position.z + 20 * Math.cos(Math.acos(2 * Math.random() - 1)),
				ease: "power3",
				onComplete: remove,
				onCompleteParams: [particle, particle_geo, particle_mat]
			});


			
		}
	}

	class Firework {
		constructor() {
			this.geometry = new THREE.SphereGeometry( 0.3, 32, 32 );
			this.sub_particles = 80;
			this.color = new THREE.Color();
			this.color.setHex(`0x${colorsArray[Math.floor(Math.random() * colorsArray.length)]}`);
			this.material = new THREE.MeshBasicMaterial( {color: this.color} );
			this.firework = new THREE.Mesh(this.geometry, this.material);
			this.firework.position.setY(-200);
			this.firework.position.setZ(THREE.MathUtils.randFloat(-20, -100));
			this.firework.position.setX(THREE.MathUtils.randFloat(-100, 100));
			this.height = THREE.MathUtils.randFloat(0, 50);

			scene.add(this.firework);
			launch(this);
		}
	}

	var remove = (obj, geo, mat) => {
		geo.dispose();
		mat.dispose();
		scene.remove(obj);
		renderer.renderLists.dispose();
	}
	function animate() {
		requestAnimationFrame(animate);
		planet1.rotation.y = theta;
		planet2.rotation.y = theta;
		planet3.rotation.y = -theta;

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
      