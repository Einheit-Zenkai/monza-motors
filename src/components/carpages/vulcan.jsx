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
        </div>
    );
};

export default Vulcan;
