import React from "react";

const Vulcan = () => {
    return (
        <div className="carstats-container">
            <h1 className="carstats-title">Aston Martin Vulcan</h1>
            <img
                src="/static/imgs/vulcan/rp-vulcan-fr-21.jpg" // Replace with actual Vulcan image
                
                alt="Aston Martin Vulcan"
                className="p1-image"
            />
            <p className="carstats-description">
                The Aston Martin Vulcan is a rare, track-only hypercar that pushes the limits of performance and exclusivity. Designed with an uncompromising focus on speed and precision, the Vulcan fuses extreme power with elegant aggression. Its striking aerodynamic form and thunderous V12 engine represent the ultimate expression of Aston Martin's racing DNA.
            </p>

            {/* STATS SECTION */}
            <div className="carstats-stats-container">
                <div className="carstats-stat-block">
                    <h2 className="carstats-stat-value">3.0S</h2>
                    <p className="carstats-stat-label">0-100 KMPH</p>
                </div>
                <div className="carstats-stat-block">
                    <h2 className="carstats-stat-value">8.6S</h2>
                    <p className="carstats-stat-label">0-200 KMPH</p>
                </div>
                <div className="carstats-stat-block">
                    <h2 className="carstats-stat-value">10.3S</h2>
                    <p className="carstats-stat-label">Quarter Mile</p>
                </div>
                <div className="carstats-stat-block">
                    <h2 className="carstats-stat-value">322 KMPH</h2>
                    <p className="carstats-stat-label">Top Speed</p>
                </div>
            </div>

            <p className="carstats-description">
                Beneath its sculpted carbon fiber body lies a 7.0L naturally aspirated V12 engine producing 820 horsepower, delivering immense acceleration and visceral sound. Limited to just 24 units worldwide, the Vulcan is a collector’s dream and a race-bred weapon, offering a raw, unfiltered driving experience reserved for the elite few.
            </p>
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

export default Vulcan;
