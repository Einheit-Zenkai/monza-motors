import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import iro from '@jaames/iro'; // Assuming iro.js is installed
import LoadingScreen from './LoadingScreen'; // Import the LoadingScreen component

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

const Customizer = () => {
  const containerRef = useRef(null);
  const [currentCar, setCurrentCar] = useState(cars.ferrariF12);
  const [currentCarModel, setCurrentCarModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State to control the loading screen

  useEffect(() => {
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x333333);
    containerRef.current.appendChild(renderer.domElement);

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2.2;
    controls.minDistance = 2.7;
    controls.maxDistance = 5.3;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(0, 5, 0);
    scene.add(directionalLight);

    // Load HDRI Environment Map
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load('static/HDR environment/satara_night_no_lamps_4k.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.background = texture;
    });

    // Camera position
    camera.position.set(1.5, 1.5, 2.2);

    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Load initial car model
    const loader = new GLTFLoader();
    let garage_name = "static/3D-Models/garages/home-made-garage.glb";
    let garageModel;
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
    const loadCarModel = (car) => {
      loader.load(
        car.path,
        (gltf) => {
          if (currentCarModel) {
            scene.remove(currentCarModel);
          }
          const model = gltf.scene;
          model.scale.set(car.scale, car.scale, car.scale);
          model.position.set(car.offset.x, car.offset.y, car.offset.z);
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
            }
          });
          scene.add(model);
          setCurrentCarModel(model);
          // setIsLoading(false); // Hide the loading screen after the model is loaded
        },
        undefined,
        (error) => {
          console.error('Error loading car model:', error);
        }
      );
    };

    loadCarModel(currentCar);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount
    return () => {
      if (currentCarModel) {
        scene.remove(currentCarModel);
      }
      renderer.dispose();
    };
  }, [currentCar]);

  const handleCarChange = (event) => {
    const selectedCar = cars[event.target.value];
    setCurrentCar(selectedCar);
  };

  const handleColorChange = (color) => {
    if (!currentCarModel) return;
    const newColor = new THREE.Color(color);
    currentCarModel.traverse((child) => {
      if (child.isMesh && child.name === currentCar.exterior_name) {
        child.material.color.set(newColor);
        child.material.needsUpdate = true;
      }
    });
  };
  useEffect(() => {
    // Initialize iro.js color picker
    const colorPicker = new iro.ColorPicker('#colorPickerContainer', {
      width: 200,
      color: currentCar.default_color,
    });
  
    colorPicker.on('color:change', (color) => {
      handleColorChange(color.hexString);
    });
  
    // Cleanup function to destroy the previous color picker
    return () => {
      colorPicker.off('color:change'); // Remove event listener
      document.getElementById('colorPickerContainer').innerHTML = ''; // Clear DOM element
    };
  }, [currentCarModel]);
  return (
    <div>
      {isLoading && <LoadingScreen />}
      <div ref={containerRef} style={{ width: '100%', height: '100vh' }}></div>
      <div>
        <label htmlFor="carSelector">Select Car:</label>
        <select id="carSelector" onChange={handleCarChange}>
          {Object.keys(cars).map((carKey) => (
            <option key={carKey} value={carKey}>
              {carKey}
            </option>
          ))}
        </select>
      </div>
      <div className="position-fixed top-50 end-0 translate-middle-y me-3">
      <div
        className="bg-secondary bg-opacity-75 rounded-3 p-3 shadow-sm"
        style={{ width: "240px" }}
      >
        <div
          id="colorPickerContainer"
          style={{ width: "300px", height: "300px" }}
        ></div>
      </div>  
    </div>
        
    </div>
  );
};

export default Customizer;