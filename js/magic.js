import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';
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

function animate() {
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
      