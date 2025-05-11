import React, { useEffect } from "react";
import iro from "@jaames/iro"; // Assuming iro.js is installed
import * as THREE from "three";
import cars from "@/static/cars.json";

interface CustomizerSidebarProps {
  currentCar: {
    default_color: string;
    exterior_name: string | { [key: number]: string };
  };
  currentCarModel: THREE.Object3D | null;
  handleCarChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const CustomizerSidebar = ({ currentCar, currentCarModel, handleCarChange }: CustomizerSidebarProps) => {
  useEffect(() => {
    // Initialize iro.js color picker
    const colorPicker = iro.ColorPicker("#colorPickerContainer", {
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
      // Store the callback function reference to be able to remove it
      const handleChange = (color) => {
        handleColorChange(color.hexString);
      };
      colorPicker.off("color:change", handleChange); // Remove event listener
      const container = document.getElementById("colorPickerContainer");
      if (container) {
        container.innerHTML = ""; // Clear DOM element
      }
    };
  }, [currentCarModel]);


  const handleColorChange = (color) => {
    if (!currentCarModel) return;
    const newColor = new THREE.Color(color);
    currentCarModel.traverse((child) => {
      if (child.isMesh) {
        if (typeof currentCar.exterior_name === 'string') {
          if (child.name === currentCar.exterior_name) {
          child.material.color.set(newColor);
          child.material.needsUpdate = true;
          }
        } else {
          // Handle case when exterior_name is an object with multiple parts
          const exteriorParts = currentCar.exterior_name;
          Object.keys(exteriorParts).forEach(key => {
            const partName = exteriorParts[key];
            if (child.name === partName) {
              child.material.color.set(newColor);
              child.material.needsUpdate = true;
            }
          });
        }
      }
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      right: 0,
      transform: 'translateY(-50%)',
      marginRight: '0.75rem',
      zIndex: 50,
      backgroundColor: 'rgba(64,64,64, 0.6)',
      padding: '1rem',
      borderRadius: '0.5rem',
    }}>
      
        <div id="carSelectorContainer">
          <label htmlFor="carSelector" className="font-bold mb-1 block">
        Select Car:
          </label>
            <select
            id="carSelector"
            onChange={handleCarChange}
            className="form-select form-select-sm mb-2"
            >
            {Object.keys(cars).map((carKey) => (
              <option key={carKey} value={carKey}>
              {carKey}
              </option>
            ))}
            </select>
        </div>

<div className="d-flex justify-content-center align-items-center">
  <div
    id="colorPickerContainer"
    className="mt-4"
    style={{ width: "min-content" }}
  ></div>
</div>
      </div>

  );
}

export default CustomizerSidebar;