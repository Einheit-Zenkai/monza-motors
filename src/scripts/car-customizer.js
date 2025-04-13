import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"; // Import GLTFLoader directly
import { RGBELoader } from "three/addons/loaders/RGBELoader.js"; // Import RGBELoader for HDRI
import { OrbitControls } from "three/addons/controls/OrbitControls.js"; // Import OrbitControls
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { SMAAPass } from "three/addons/postprocessing/SMAAPass.js";



//Default variables
const cars = {
  ferrariF12: {
    path: "static/3D-Models/cars/2013_ferrari_f12_berlinetta.glb",
    exterior_name:
      "bodyKit0_Paint_Geo_lodA_Ferrari_F12berlinetta_2014Paint_Material_0",
    scale: 100,
    offset: { x: 0, y: 0, z: 0 }, // Offset values for Ferrari F12
    default_color: "#ffffff",
  },
  porsche918: {
    path: "static/3D-Models/cars/2015_porsche_918_spyder.glb",
    exterior_name:
      "pKit1_Paint_Geo_lodA_Kit1_Paint_Geo_lodA_Porsche_918SpyderRewardRecycled_2015Paint_Material_pPorsche_918SpyderRewardRecycled_2015Paint_Material1_0",
    scale: 100,
    offset: { x: 0, y: 0, z: 0 }, // Offset values for Porsche 918
    default_color: "#ffffff",
  },
  nissan_skyline_r34_gtr: {
    path: "static/3D-Models/cars/nissan_skyline_r34_gtr.glb",
    exterior_name:
      "Naran_Hyper_Coupe_carobjcarpaint_chassis_UV2_Untitled_030_Default_Carpaint_0",
    scale: 100,
    offset: { x: 0, y: 0, z: 0 }, // Offset values for Naran Hyper Coupe
    default_color: "#ffffff",
  },
  astonMartinVulcan: {
    path: "static/3D-Models/cars/aston_martin_vulcan.glb",
    exterior_name: "LOD_A_HOOD_mm_ext001_CAR_PAINT_0",
    scale: 1,
    offset: { x: 0, y: 0, z: 0 }, // Offset values for Aston Martin Vulcan
    default_color: "#ffffff",
  },
  nuclide: {
    path: "static/3D-Models/cars/nuclide.glb",
    exterior_name: "RLA_miata_headlight_R_popup_RRpbrPaintPrimary_0",
    scale: 1,
    offset: { x: 0, y: -0.1, z: 0 }, // Offset values for Mazda Miata
    default_color: "#ffffff",
  },
  rollsRoyceGhost: {
    path: "static/3D-Models/cars/rolls-royce_ghost.glb",
    exterior_name: {
      1: "rrghost_body_rrghost_paint_0",
      2: "rrghost_fender_R_b_rrghost_paint_0",
    },
    scale: 1,
    offset: { x: 0, y: 0, z: 0 }, // Offset values for Rolls Royce Ghost
    default_color: "#ffffff",
  },
};

let garage_name = "static/3D-Models/garages/home-made-garage.glb";
let current_car = cars[document.getElementById("carSelector").value];

// "3D" Models
let current_car_model;
let garageModel;

// THREE JS BASIC CODE
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
renderer.setClearColor(0x333333); // Set a sky blue background color
document.body.appendChild(renderer.domElement);


//effects
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

// Add OrbitControls for camera interaction
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth movement
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI / 2.2;
controls.minDistance = 2.7;
controls.maxDistance = 5.3;

let brightness = 1;
// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, brightness); // Soft white light
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 10); // Bright directional light
// const directionalLight2 = new THREE.DirectionalLight(0xffffff, 10); // Bright directional light
// directionalLight1.castShadow = true;
// directionalLight2.castShadow = true;
directionalLight1.position.set(0,5, 0); // Position the light
// directionalLight2.position.set(0,0, -5); // Position the light
scene.add(directionalLight1);
// scene.add(directionalLight2);
const lightHelper1 = new THREE.DirectionalLightHelper(directionalLight1, 1); // Size of the helper
// const lightHelper2 = new THREE.DirectionalLightHelper(directionalLight2, 1); // Size of the helper
scene.add(lightHelper1);
// scene.add(lightHelper2);

renderer.toneMappingExposure = 1; // Default is 1.0

// Load HDRI Environment Map
const rgbeLoader = new RGBELoader();
rgbeLoader.load("static/HDR environment/satara_night_no_lamps_4k.hdr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping; // Use reflection mapping
  scene.environment = texture; // Apply the environment map to the scene
  texture.mapping = THREE.EquirectangularReflectionMapping;
  // Apply the texture to the scene environment (for lighting and reflections)
  scene.environment = texture;
  // Set the texture as the scene background
  scene.background = texture;
  
});

// Camera Position
camera.position.set(1.5, 1.5, 2.2);

// Handle Window Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const loader = new GLTFLoader();
loader.load(
  garage_name, // Replace with your garage model path
  (gltf) => {
    garageModel = gltf.scene;
    console.log("Garage model loaded:", garageModel); // Debug log
    garageModel.position.set(0, 1.3, 0);
    garageModel.scale.set(2, 2, 2); // Adjust scale if needed
    garageModel.rotation.y = - Math.PI / 2;
    // garageModel.material.envMapIntensity = 0.5; // Lower = dimmer reflections
    garageModel.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true;
      }
    });
    
    scene.add(garageModel);
  },
  undefined,
  (error) => {
    console.error("Error loading garage model:", error);
  }
);

// OPTIONAL HELPERS
// const gridHelper = new THREE.GridHelper(10, 10);
// gridHelper.position.y = -0.01;
// scene.add(gridHelper);

// IRO CONFIG START 
const colorPicker = new iro.ColorPicker("#colorPickerContainer", {
  width: 200,
  color: "#ffffff",
  layout: [
    { component: iro.ui.Wheel },
    { component: iro.ui.Slider, options: { sliderType: "saturation" } },
    { component: iro.ui.Slider, options: { sliderType: "value" } },
  ],
});
// IRO CONFIG END


// Function to load/unload the current car model
function load_current_car_model(car, scene, loader) {
  if (!car || !car.path) {
    console.error("Invalid car object or missing 'path' property.");
    return;
  }
  // Load the model using the provided loader
  loader.load(
    car.path, // Path to the GLB file
    (gltf) => {
      current_car_model = gltf.scene;
      console.log("Model loaded:", current_car_model);
      current_car_model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      current_car_model.scale.set(car.scale, car.scale, car.scale); // Adjust scale
      current_car_model.position.set(car.offset.x, car.offset.y, car.offset.z); // Adjust position
      scene.add(current_car_model);
    },
    undefined, // Progress callback (not used here)
    (error) => {
      console.error("Error loading model:", error);
    }
  );
}

function unload_current_car_model(scene, current_car_model) {
  if (current_car_model) {
    // Traverse the car model and dispose of its resources
    current_car_model.traverse((child) => {
      if (child.isMesh) {
        // Dispose of geometry
        if (child.geometry) {
          child.geometry.dispose();
        }

        // Dispose of material(s)
        if (child.material) {
          if (Array.isArray(child.material)) {
            // Handle multi-materials
            child.material.forEach((material) => {
              if (material.map) material.map.dispose(); // Dispose of textures
              material.dispose(); // Dispose of material
            });
          } else {
            if (child.material.map) child.material.map.dispose(); // Dispose of texture
            child.material.dispose(); // Dispose of material
          }
        }
      }
    });
    // Remove the car model from the scene
    scene.remove(current_car_model);
    // Clear the reference to the car model
    current_car_model = null;
    console.log("Car model unloaded and resources disposed.");
  }
}

function changeCarColor(car, current_car_model, color) {
  if (!car || !current_car_model) {
    console.error("Invalid car object or car model is not loaded.");
    return;
  }

  // Ensure the color is a valid THREE.Color
  const newColor = new THREE.Color(color);

  // Traverse the car model to find matching materials
  current_car_model.traverse((child) => {
    // Check if the child is a mesh
    if (child.isMesh) {
      let matchesExterior = false;
      if (typeof car.exterior_name === "string") {
        // Single exterior name
        matchesExterior = child.name === car.exterior_name;
      } else if (typeof car.exterior_name === "object") {
        // Multiple exterior names (e.g., { 1: "name1", 2: "name2" })
        matchesExterior = Object.values(car.exterior_name).some(
          (exterior) => child.name === exterior
        );
      }

      if (matchesExterior && child.material) {
        child.material.color.set(newColor); // Apply the new color
        child.material.needsUpdate = true; // Ensure the material updates in the renderer
      }
    }
  });
}

// Function to handle car selection (can be reused for both events)
function handleCarSelection(event) {
  const selectedCarKey = event.target.value; // Get the selected car key
  const selectedCar = cars[selectedCarKey]; // Get the corresponding car object

  if (!selectedCar) {
    console.error("Invalid car selection.");
    return;
  }

  unload_current_car_model(scene, current_car_model); // Unload the current car model
  load_current_car_model(selectedCar, scene, loader); // Load the new car model
  current_car = selectedCar; // Update the current car reference
  console.log(`Switched to car: ${selectedCarKey}`);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update OrbitControls
  renderer.render(scene, camera);
  // composer.render();
}
animate();

// Add event listener for when the user changes the car selection
document.getElementById("carSelector").addEventListener("change", handleCarSelection);

// Automatically load the car based on the initial value of carSelector when the page loads
window.addEventListener("load", () => {
  console.log(current_car)
  load_current_car_model(current_car, scene, loader);
});

colorPicker.on("color:change", (color) => {
  const hexColor = color.hexString;
  if (!current_car_model) {
    console.error("Car model is not loaded yet.");
    return;
  }
  changeCarColor(current_car, current_car_model, hexColor);
});

export {
  load_current_car_model,
  unload_current_car_model,
  changeCarColor,
  handleCarSelection,
};