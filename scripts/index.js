import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.144.0/build/three.module.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/loaders/OBJLoader.js';
bridge = '/models/bridge.obj'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
const loader = new OBJLoader();
var speed = 0.5
var goFast = 0
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
onWindowResize();
window.addEventListener('resize', onWindowResize);


document.getElementById("b1").addEventListener("click", myFunction);
function myFunction(){
    document.getElementById("txtbox").classList.add("squish");
    goFast = 1
}




loader.load(bridge,function (object) {scene.add(object); },function (xhr) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); },function (error ) { console.log( 'An error happened' );});
const light = new THREE.AmbientLight( 0x000000 );
scene.add( light );

scene.background = new THREE.Color( 0xffffff );
scene.fog = new THREE.Fog(0xffffff, 0, 200);
camera.position.z = 2.5;
camera.position.y = 10
camera.position.x = -100
camera.lookAt(1000000,400000,0)


function animate() {
    if(goFast == 1){
        speed = speed * 1.004
        camera.fov = camera.fov+((120-camera.fov)/100);
        camera.updateProjectionMatrix();
        scene.fog.near = scene.fog.near - 0.1
    }

    if(speed > 20){
        window.location.replace("/entrance/the_door");
    }

    camera.position.x = camera.position.x + speed;
    if (camera.position.x > 200){
        camera.position.x = -100;
    };
    renderer.render( scene, camera ); }
