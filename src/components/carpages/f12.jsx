import React from "react";

const F12Berlinetta = () => {
    return (
        <div className="p1-container">
            <h1 className="p1-title">Ferrari F12 Berlinetta</h1>
            <img
                src="/static/imgs/ferrari/ferraridriving.jpg"
                alt="Ferrari F12 Berlinetta"
                className="p1-image"
            />
            <p className="p1-description">
                The Ferrari F12 Berlinetta is the embodiment of Italian engineering excellence—an uncompromising grand tourer that blends ferocious V12 power with refined elegance. Built with a focus on both performance and luxury, it’s designed to thrill on the track and seduce on the streets. What sets the F12 Berlinetta apart is its intelligent aerodynamics—featuring innovations like the Aero Bridge, which channels airflow across the hood and along the sides to increase downforce without compromising elegance. Inside, the cockpit is a harmonious blend of driver-focused ergonomics and Italian craftsmanship, with carbon fiber accents, racing seats, and a minimalist layout that prioritizes performance without sacrificing luxury. Whether cruising along scenic roads or unleashing its fury on the track, the F12 delivers a precise and exhilarating experience, reminding the world that naturally aspirated V12 Ferraris are more than machines—they're art in motion.
            </p>

            {/* STATS SECTION */}
            <div className="rr-stats-container">
                <div className="rr-stat-block">
                    <h2 className="rr-stat-value">3.1S</h2>
                    <p className="rr-stat-label">0-100 kmph</p>
                </div>
                <div className="rr-stat-block">
                    <h2 className="rr-stat-value">8.5S</h2>
                    <p className="rr-stat-label">0-200 kmph</p>
                </div>
                <div className="rr-stat-block">
                    <h2 className="rr-stat-value">10.9S</h2>
                    <p className="rr-stat-label">Quarter mile</p>
                </div>
                <div className="rr-stat-block">
                    <h2 className="rr-stat-value">340 KMPH</h2>
                    <p className="rr-stat-label">Top speed</p>
                </div>
            </div>

            <p className="p1-description">
                Under the hood, it boasts a naturally aspirated 6.3-liter V12 engine producing 730 horsepower and 509 lb-ft of torque—delivering relentless performance through a 7-speed dual-clutch transmission. Produced between 2012 and 2017 with around 15,000 units sold, the F12 Berlinetta remains a symbol of Ferrari’s V12 legacy and design artistry.
            </p>

            <p className="p1-description">
                In the world of performance GTs, the Ferrari F12 Berlinetta—affectionately known by fans as the *Red Rossi*—sits in a league of its own. It’s not just a car; it’s a visceral experience sculpted in metal and speed. Balancing blistering acceleration with artistic beauty, the F12 remains one of the most respected and desirable Ferraris ever built.
            </p>
        </div>
    );
};

export default F12Berlinetta;