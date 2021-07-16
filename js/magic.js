import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/mode=imports,min/optimized/three.js';
import gsap from "../node_modules/gsap/index.js"
export function run(){
	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#Totally_Not_Suspicious_Random_Canvas_😏🤫'),
	});

	renderer.setPixelRatio(window.devicePixelRatio);
	camera.position.setZ(30);
	camera.position.setX(-3);

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


	const space = new THREE.TextureLoader().load('../img/three/space.jpeg');
	scene.background = space;

	const shape = new THREE.BoxGeometry( 1, 1, 1 );
	const wrapper = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
	const rocket = new THREE.Mesh( shape, wrapper );
	scene.add( rocket );


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

	const createSmoke = (rocket) => {
		let p = getParticle();
		dropParticle(p);
	};

	const particleArray = []

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
		  recycleParticle(this);
		}
	      }

	const getParticle = function() {
		let p;
		if(particleArray.length){
			p = particleArray.pop();
		} else {
			p = new Particle();
		}
		return p;
	}
	const recycleParticle = (p) => {
		p.mesh.rotation.x = Math.random() * Math.PI * 2;
		p.mesh.rotation.y = Math.random() * Math.PI * 2;
		p.mesh.rotation.z = Math.random() * Math.PI * 2;
		particleArray.push(p);
	}

	const dropParticle = (p) => {
		scene.add(p.mesh);
		var s = Math.random(0.2) + 0.35;
		p.mesh.scale.set(s * 0.02, s* 0.02, s*0.02);
		p.mesh.position.y = -1;
		p.mesh.material.opacity = 1;
		gsap.to(p.mesh.position, {
			duration: 1.5,
			y: -10,
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
			duration: 1,
			opacity: 0,
			ease: "none"
		})

	}


	function animate() {
		createSmoke();
		requestAnimationFrame(animate);
		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;

		torus.rotation.x += 0.01;
		torus.rotation.y += 0.005;
		torus.rotation.z += 0.01;
		if (canvas.width !== width || canvas.height !== height)
		{
		renderer.setSize(width, height, false);
		
		}
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	
		renderer.render(scene, camera);
	
	
	
		// controls.update();
	
		renderer.render(scene, camera);
	}
	
	animate();
}
      