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
	camera.position.setZ(30);
	camera.position.setX(-3);

	const controls = new OrbitControls(camera, renderer.domElement);
	const axesHelper = new THREE.AxesHelper( 5 );
	scene.add( axesHelper );
	renderer.render(scene, camera);

	// Torus

	const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
	const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
	const torus = new THREE.Mesh(geometry, material);

	scene.add(torus);

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


	class Rocket {
		constructor(color) {
			this.shape = new THREE.BoxGeometry( 1, 1, 10 );
			this.wrapper = new THREE.MeshBasicMaterial( {color: color} );
		    
			this.rocket = new THREE.Mesh( this.shape, this.wrapper );


		    
		}
	}
	
	let rocket1 = new THREE.Object3D();

	const rocket2 = new Rocket();

	scene.add( rocket2.rocket );

	const loader = new GLTFLoader();
	let child1;
	let child2;

	loader.load( '../img/three/shit.glb', function ( gltf ) {

		child1 = gltf.scene.children.find((child) => child.name === "exploreHacksRocket_v1");
		// child2 = gltf.scene.children.find((child) => child.name === "exploreHacksRocket_v1");

		child1.rotation.x = -Math.PI / 2;
		// child2.rotation.x = -Math.PI / 2;

		rocket1.add(child1);
		// rocket2.add(child2);

		scene.add(rocket1);

	}, undefined, function ( error ) {

		console.error( error );

	} );

	rocket1.scale.set(0.9,0.9,0.9);
	// rocket2.scale.set(0.9,0.9,0.9);



	let height1 = 0.5;

	let height2 = 5;
	

	const radius = 60;
	function moveCamera()
	{
	const theta = document.body.getBoundingClientRect().top; 

	camera.position.x = radius * Math.sin( theta * Math.PI / 360 );
	camera.position.z = radius * Math.cos( theta * Math.PI / 360 );

	camera.lookAt(torus.position)
				
	camera.updateMatrix();

	}

	document.body.onscroll = moveCamera;
	moveCamera();

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
	let delta2 = -Math.atan(height2 / r2);


	// const planet1Shape = new THREE.SphereGeometry(3, 24, 24);
	// const bluePlanet = new THREE.TextureLoader().load('../img/custom/Planet1.png');
	// const planet1Material = new THREE.MeshStandardMaterial({ map: bluePlanet});
	// const planet1 = new THREE.Mesh(planet1Shape, planet1Material);
	// planet1.position.x = -30;
	// planet1.position.y = 4;
	// planet1.position.z = -40;


	// scene.add(planet1);

	function animate() {
		requestAnimationFrame(animate);
		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;

		torus.rotation.x += 0.01;
		torus.rotation.y += 0.005;
		torus.rotation.z += 0.01;

		child1.rotation.y += 0.05;

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
		rocket2.rocket.position.copy(r2_pos)
		let r2_pos_2 = new THREE.Vector3(0, -r2 * Math.cos(-theta), r2 * Math.sin(-theta));
		velocity2 = r2_pos_2.applyEuler(r2_euler);

		let temp2 = new THREE.Vector3(0, 0, 0);
		rocket2.rocket.lookAt(temp2.copy(rocket2.rocket.position).add(velocity2.normalize()));
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
	
	animate();
}
      