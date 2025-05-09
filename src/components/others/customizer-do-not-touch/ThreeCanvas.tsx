import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MeshoptDecoder } from 'meshoptimizer';
import cars from "@/static/cars.json"
import CustomizerSidebar from "./CustomizerSidebar";
import LoadingScreen from "@/components/others/LoadingScreen"; // Import the LoadingScreen component

const ThreeCanvas = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null); // Add this line

  const loaderRef = useRef(null);
  const [currentCar, setCurrentCar] = useState(cars["Ferrari F12 Berlinetta"]);
  const [currentCarModel, setCurrentCarModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State to control the loading screen
  const [isInteriorView, setIsInteriorView] = useState(false); // State to control the interior view
  useEffect(() => {

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
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x333333);
    containerRef.current.appendChild(renderer.domElement);

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2.2;
    // controls.minDistance = 2.7;
    controls.minDistance = 0;
    controls.maxDistance = 5.3;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 5, 0);
    scene.add(directionalLight);

    // Load HDRI Environment Map
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(
      "static/HDR environment/satara_night_no_lamps_4k.hdr",
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.background = texture;
      }
    );

    // Camera position
    camera.position.set(1.5, 1.5, 2.2);

    // Handle window resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Load initial garage model
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    let garage_name = "static/3D-Models/garages/home-made-garage.glb";
    let garageModel;
    loader.load(
      garage_name, // Replace with your garage model path
      (gltf) => {
        garageModel = gltf.scene;
        console.log("Garage model loaded:", garageModel); // Debug log
        garageModel.position.set(0, 1.3, 0);
        garageModel.scale.set(2, 2, 2); // Adjust scale if needed
        garageModel.rotation.y = -Math.PI / 2;
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

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    loaderRef.current = loader;
    controlsRef.current = controls; // Add this line

    // loadCarModel(currentCar, scene, loader, setCurrentCarModel);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controlsRef.current.update();
      renderer.render(sceneRef.current, cameraRef.current);
    };
    animate();

    // Cleanup on unmount
    return () => {
      renderer.dispose(); // Cleanup on component unmount
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current || !loaderRef.current) return;

    const scene = sceneRef.current;
    const loader = loaderRef.current;

    const loadCarModel = (car, scene, loader, setCurrentCarModel) => {
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
              child.receiveShadow = true;
              if (child.material) {
                child.material.side = THREE.DoubleSide;
                child.material.needsUpdate = true;

                // Ensure textures are loaded properly
                if (child.material.map) {
                  child.material.map.encoding = THREE.sRGBEncoding;
                  child.material.map.needsUpdate = true;
                }
                if (child.material.emissiveMap) {
                  child.material.emissiveMap.encoding = THREE.sRGBEncoding;
                  child.material.emissiveMap.needsUpdate = true;
                }
              }
            }
          });
          scene.add(model);
          setCurrentCarModel(model);
          // setIsLoading(false); // Hide the loading screen after the model is loaded
        },
        undefined,
        (error) => {
          console.error("Error loading car model:", error);
        }
      );
    };

    const unloadCurrentCarModel = (currentCarModel, scene) => {
      if (currentCarModel) {
        // Traverse the car model and dispose of its resources
        currentCarModel.traverse((child) => {
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
        scene.remove(currentCarModel);
        // Clear the reference to the car model
        setCurrentCarModel(null);
        console.log("Car model unloaded and resources disposed.");
      }
    };

    unloadCurrentCarModel(currentCarModel, scene); // Dispose old car

    loadCarModel(currentCar, scene, loader, setCurrentCarModel); // Load new car


  }, [currentCar]);

  const handleCarChange = (event) => {
    const selectedCar = cars[event.target.value];
    setCurrentCar(selectedCar);
  };

  const handleInside = () => {
    if (isInteriorView) {
      cameraRef.current.position.set(0, 0.9, 0);
      // cameraRef.current.lookAt(0, 1.3, 1);
      controlsRef.current.minDistance = 0;
      controlsRef.current.maxDistance = 5.3;
      controlsRef.current.target.set(0, 1, -0.2);
      controlsRef.current.update();
    } else {
      cameraRef.current.position.set(1.5, 1.5, 0.2);
      controlsRef.current.target.set(0, 0.5, 1);
      controlsRef.current.minDistance = 0;
      controlsRef.current.maxDistance = 5.3;
      controlsRef.current.target.set(0, 1, 0);
      controlsRef.current.update();
    }
    setIsInteriorView(!isInteriorView);
  }

  return (
    <div>
      {!isLoading && <LoadingScreen />}
      <div ref={containerRef} className="w-full h-screen">
        {isInteriorView && <CustomizerSidebar
          currentCar={currentCar}
          currentCarModel={currentCarModel}
          handleCarChange={handleCarChange}
        />}
        <button style={{
          position: 'fixed',
          bottom: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '8px 16px',
          borderRadius: '4px',
          backgroundColor: '#000000',
          border: '1px solid #cccccc'
        }}
          onClick={() => { handleInside(); }}
        >
          Interior View
        </button>

      </div>
    </div>
  );
};

export default ThreeCanvas;
