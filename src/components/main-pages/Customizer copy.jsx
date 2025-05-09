import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MeshoptDecoder } from 'meshoptimizer';
import iro from "@jaames/iro"; // Assuming iro.js is installed
import LoadingScreen from "@/components/others/LoadingScreen"; // Import the LoadingScreen component
import cars from "@/static/cars.json";

const Customizer = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const loaderRef = useRef(null);
  const [currentCar, setCurrentCar] = useState(cars["Ferrari F12 Berlinetta"]);
  const [currentCarModel, setCurrentCarModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State to control the loading screen

  useEffect(() => {
    // Initialize Three.js scene
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
    controls.minDistance = 2.7;
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
    // loadCarModel(currentCar, scene, loader, setCurrentCarModel);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
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
    const colorPicker = new iro.ColorPicker("#colorPickerContainer", {
      width: 200,
      color: currentCar.default_color,
      layout: [
        { component: iro.ui.Wheel },
        { component: iro.ui.Slider, options: { sliderType: "saturation" } },
        { component: iro.ui.Slider, options: { sliderType: "value" } },
      ],
    });

    colorPicker.on("color:change", (color) => {
      handleColorChange(color.hexString);
    });

    // Cleanup function to destroy the previous color picker
    return () => {
      colorPicker.off("color:change"); // Remove event listener
      document.getElementById("colorPickerContainer").innerHTML = ""; // Clear DOM element
    };
  }, [currentCarModel]);

  return (
    <div>
    <CustomizerSidebar currentCar={currentCar} currentCarModel={currentCarModel} />
      {isLoading && <LoadingScreen />}
      <div ref={containerRef} style={{ width: "100%", height: "100vh" }}></div>
      <div className="position-fixed top-50 end-0 translate-middle-y me-3">
        <div
          className="bg-secondary bg-opacity-75 rounded-3 p-3 shadow-sm"
          style={{ width: "240px" }}
        >
          <div>
            <label htmlFor="carSelector" style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
              Select Car:
            </label>
            <select
              id="carSelector"
              onChange={handleCarChange}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "14px",
                marginBottom: "10px",
              }}
            >
              {Object.keys(cars).map((carKey) => (
                <option key={carKey} value={carKey}>
                  {carKey}
                </option>
              ))}
            </select>
          </div>
          <div
            id="colorPickerContainer"
            style={{ width: "300px", marginTop: "10px", marginBottom: "0px" }}
          ></div>
        </div>
      </div>
      <style>
        {`
          #carSelector:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
          }
          #carSelector option {
            padding: 5px;
          }
        `}
      </style>
    </div>
  );
};

export default Customizer;
