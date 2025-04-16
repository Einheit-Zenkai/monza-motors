import React from "react";

const vulcan = () => {
    return (
        <div className="vulcan-container">
            <h1 className="vulcan-title">Aston Martin Vulcan</h1>
            <img
                src="/static/imgs/vulcan/rp-vulcan-fr-21.jpg" // Replace with an actual image URL
                alt="Aston Martin Vulcan"
                className="vulcan-image"
            />
            <p className="vulcan-description">
                <em>
                    The Aston Martin Vulcan is a track-only supercar that showcases
                    Aston Martin's engineering prowess and design excellence. Powered by
                    a naturally aspirated 7.0L V12 engine, it delivers an astonishing
                    820 horsepower. With its lightweight carbon fiber construction and
                    advanced aerodynamics, the Vulcan offers an unparalleled driving
                    experience on the track.
                </em>
            </p>
            <ul className="vulcan-specs">
                <li><strong>Engine:</strong> <em>7.0L Naturally Aspirated V12</em></li>
                <li><strong>Horsepower:</strong> <em>820 hp</em></li>
                <li><strong>Top Speed:</strong> <em>Over 200 mph</em></li>
                <li><strong>0-60 mph:</strong> <em>Approximately 3 seconds</em></li>
                <li><strong>Production:</strong> <em>Limited to 24 units</em></li>
            </ul>
        </div>
    );
};

export default vulcan;