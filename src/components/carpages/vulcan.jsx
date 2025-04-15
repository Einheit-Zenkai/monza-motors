import React from "react";

const vulcan = () => {
    return (
        <div className="vulcan-container">
            <h1 className="vulcan-title">Aston Martin Vulcan</h1>
            <img
                src="https://example.com/aston-martin-vulcan.jpg" // Replace with an actual image URL
                alt="Aston Martin Vulcan"
                className="vulcan-image"
            />
            <p className="vulcan-description">
                The Aston Martin Vulcan is a track-only supercar that showcases
                Aston Martin's engineering prowess and design excellence. Powered by
                a naturally aspirated 7.0L V12 engine, it delivers an astonishing
                820 horsepower. With its lightweight carbon fiber construction and
                advanced aerodynamics, the Vulcan offers an unparalleled driving
                experience on the track.
            </p>
            <ul className="vulcan-specs">
                <li><strong>Engine:</strong> 7.0L Naturally Aspirated V12</li>
                <li><strong>Horsepower:</strong> 820 hp</li>
                <li><strong>Top Speed:</strong> Over 200 mph</li>
                <li><strong>0-60 mph:</strong> Approximately 3 seconds</li>
                <li><strong>Production:</strong> Limited to 24 units</li>
            </ul>
        </div>
    );
};

export default vulcan;