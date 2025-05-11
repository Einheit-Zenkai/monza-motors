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
  let devMode = false;

  const loaderRef = useRef(null);
  const [currentCar, setCurrentCar] = useState(cars["Ferrari F12 Berlinetta"]);
  const [currentCarModel, setCurrentCarModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State to control the loading screen
  const [isInteriorView, setIsInteriorView] = useState(false); // State to control the interior view

  useEffect(() => {
    if (!containerRef.current) {
      return; 
    }
    const currentContainer = containerRef.current; // Capture for cleanup

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
    currentContainer.appendChild(renderer.domElement);

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
        // if (!devMode) 
        scene.background = texture;
      }
    );

    // Camera position
    camera.position.set(1.5, 1.5, 2.2);
    // Add grid helpers
    const gridHelper = new THREE.GridHelper(20, 20, 0xffffff, 0x888888);
    if(devMode) scene.add(gridHelper);
    
    // Add axes helper
    const axesHelper = new THREE.AxesHelper(3);
    if(devMode)  scene.add(axesHelper);

    // Add camera helper if needed
    const cameraHelperInstance = new THREE.CameraHelper(camera); // Renamed to avoid conflict
    if(devMode) scene.add(cameraHelperInstance);

    // Controls target point visualization
    const targetGeometry = new THREE.SphereGeometry(0.05);
    const targetMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const targetPoint = new THREE.Mesh(targetGeometry, targetMaterial);
    targetPoint.position.copy(controls.target);
    if(devMode) scene.add(targetPoint);

    // Update target visualization when controls change
    const handleControlsChange = () => { // Define for removal
      if (targetPoint && controls) {
        targetPoint.position.copy(controls.target);
      }
    };
    controls.addEventListener('change', handleControlsChange);

    // Handle window resize
    const handleResize = () => { // Define for removal
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    // Load initial garage model
    const gltfLoaderInstance = new GLTFLoader(); // Renamed to avoid conflict with loaderRef
    gltfLoaderInstance.setMeshoptDecoder(MeshoptDecoder);
    let garage_name = "static/3D-Models/garages/home-made-garage.glb";
    let garageModel;
    if (!devMode) gltfLoaderInstance.load(
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
    loaderRef.current = gltfLoaderInstance; // Assign the loader instance used for garage/cars
    controlsRef.current = controls;

    // loadCarModel(currentCar, scene, loader, setCurrentCarModel);

    // Animation loop
    let animationFrameId; // Declare for cleanup
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (controlsRef.current && rendererRef.current && sceneRef.current && cameraRef.current) { // Check refs
        controlsRef.current.update();
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Cleanup on unmount
    return () => {
      console.log("ThreeCanvas: Cleaning up main useEffect resources.");
      cancelAnimationFrame(animationFrameId);

      window.removeEventListener("resize", handleResize);
      
      if (controls) {
        controls.removeEventListener('change', handleControlsChange);
        controls.dispose();
      }
      
      // Dispose of scene-specific objects created in this effect
      if (scene) {
        scene.remove(gridHelper);
        scene.remove(axesHelper);
        scene.remove(cameraHelperInstance); // Use the correct variable name
        scene.remove(targetPoint);
        if (garageModel) { 
            scene.remove(garageModel);
            // Optionally, traverse and dispose garageModel resources if not handled elsewhere
            // For GLTF models, disposing geometry/material is often handled by the car unloading logic
            // or if the model is simple and not re-used, direct disposal here might be okay.
        }
      }
      if (targetGeometry) targetGeometry.dispose();
      if (targetMaterial) targetMaterial.dispose();
      // THREE.GridHelper, AxesHelper, CameraHelper manage their own internal geometries/materials upon removal.

      // Dispose renderer and remove its DOM element
      if (renderer) {
        renderer.dispose();
      }
      if (currentContainer && renderer && renderer.domElement) {
        if (currentContainer.contains(renderer.domElement)) {
          currentContainer.removeChild(renderer.domElement);
        }
      }
      
      // Clear refs
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      controlsRef.current = null;
      loaderRef.current = null; // Clear the loader ref as well
    };
  }, []); // Keep devMode out if it doesn't require full re-init, or add if it does.

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
    console.log("Value of IsInteriorView: ", isInteriorView);
    if (isInteriorView) {
      //exterior view 
      cameraRef.current.position.set(currentCar.exterior_cam_pos.x, currentCar.exterior_cam_pos.y, currentCar.exterior_cam_pos.z);
      controlsRef.current.minDistance = 0;
      controlsRef.current.maxDistance = 5.3;
      controlsRef.current.target.set(0, 0, 0); //orbit ball
      controlsRef.current.update();
    } else {
      //interior view
      cameraRef.current.position.set(0,0,0);
      cameraRef.current.position.set(currentCar.driver_cam_pos.x + 0.3,currentCar.driver_cam_pos.y - 0.2 , currentCar.driver_cam_pos.z - 2);
      // controlsRef.current.target.set();
      controlsRef.current.minDistance = 0;
      controlsRef.current.maxDistance = 0.1;
      controlsRef.current.target.set(currentCar.driver_cam_pos.x, currentCar.driver_cam_pos.y, currentCar.driver_cam_pos.z); //orbit ball
      controlsRef.current.update();
    }
    setIsInteriorView(!isInteriorView);
  }

  console.log("Value of IsInteriorView: ", isInteriorView);
  return (
    <div>
      {!isLoading && <LoadingScreen />}
      <div ref={containerRef} className="w-full h-screen">
        {!isInteriorView && <CustomizerSidebar
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
          {isInteriorView ? 'Exterior' : 'Interior'} View
        </button>

      </div>
    </div>
  );
};

export default ThreeCanvas;
