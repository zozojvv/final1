import './style.css';
import * as THREE from 'three';
import { addLight } from './addLights';
import { videoMesh1 } from './addVideo';
import { monitorModel, emptyRoom } from './Model'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({ antialias: true })
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)
camera.position.set(0, 0, 5)
// raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


//Globals
// const meshes = {}
const lights = {}
const controls = new OrbitControls(camera, renderer.domElement)
const monitor = new monitorModel(scene);
const roomModel = new emptyRoom(scene);
const videoMesh = videoMesh1();

init()


function init() {
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	//meshes

	//lights
	lights.defaultLight = addLight()

	//changes

	//scene operations
	scene.background = new THREE.Color(0x0000fff)
	scene.add(lights.defaultLight)
	scene.add(videoMesh)
	
	// more light
	const ambientLight = new THREE.AmbientLight(0x87CEFA, 0.5) // soft blue light
	scene.add(ambientLight)

	resize()
	animate()
}

function resize() {
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
		controls.update()
		controls.enableRotate = false;
		controls.enablePan = true;
		controls.enableDamping = true;
	})
}

function animate() {
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
}

// video appears and plays after clicking the model
const monitorMesh = monitor.mesh;
console.log(monitorMesh)
document.addEventListener('click', onMouseClick, false);

function onMouseClick(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
	console.log(monitor.mesh)
    // make video visible
	
    for (let i = 0; i < intersects.length; i++) {
		console.log(intersects[i].object);
        if (intersects[i].object === monitor.mesh) {  
			console.log('yay')
			videoVisibility();
            break;
        }
    }
}



function videoVisibility() {
    videoMesh.visible = !videoMesh.visible; 
    if (videoMesh.visible) video.play();
    else video.pause();
}