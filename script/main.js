// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.JS Scene
const scene = new THREE.Scene();

// Create a new camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 100;

// Global variable to store the 3D object
let object;
let ambientLight = new THREE.AmbientLight(0x333333, 13); // Default light intensity
scene.add(ambientLight); // Add light initially

// Default model to render
let objToRender = "sun";

// Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

// Function to load the model
function loadModel(modelName) {
  if (object) scene.remove(object); // Remove previous object

  loader.load(
    `./models/${modelName}/scene.gltf`,
    function (gltf) {
      object = gltf.scene;
      object.scale.set(
        modelName === "sun" ? 3 : 1,
        modelName === "sun" ? 3 : 1,
        modelName === "sun" ? 3 : 1
      );
      camera.position.z = modelName === "sun" ? 100 : 300;
      scene.add(object);

      // Adjust ambient light dynamically instead of removing/adding it
      ambientLight.intensity = modelName === "moon" ? 5 : 13;
    },
    function (xhr) {
      if (xhr.total) {
        console.log(`${((xhr.loaded / xhr.total) * 100).toFixed(2)}% loaded`);
      } else {
        console.log(`${xhr.loaded} bytes loaded`);
      }
    },
    function (error) {
      console.error("Error loading model:", error);
    }
  );
}

// Create renderer and attach it to the DOM
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const container3D = document.getElementById("container3D");
if (container3D) {
  container3D.appendChild(renderer.domElement);
} else {
  console.error("Error: container3D element not found!");
}

// Add directional light
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

// Enable orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth movement
controls.dampingFactor = 0.05;

// Render function
function animate() {
  requestAnimationFrame(animate);
  if (object) {
    object.rotation.y += 0.002;
    object.rotation.x += 0.001;
  }
  controls.update(); // Smooth camera movement
  renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);

// Detect dark mode toggle switch
const darkModeToggle = document.getElementById("darkmode-toggle");
if (darkModeToggle) {
  darkModeToggle.addEventListener("change", function () {
    objToRender = this.checked ? "moon" : "sun";
    loadModel(objToRender);
  });
} else {
  console.error("Error: darkmode-toggle element not found!");
}

// Start rendering
loadModel(objToRender);
animate();
