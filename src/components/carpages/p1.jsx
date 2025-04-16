import React from "react";

const P1 = () => {
    return (
        <div className="carstats-container">
            <h1 className="carstats-title">McLaren P1</h1>
            <img
                src="/static/imgs/p1/mclaren_p1_concept-wide.webp"
                alt="McLaren P1"
                className="p1-image"
            />
            <p className="carstats-description">
                The McLaren P1 is a revolutionary hybrid hypercar that epitomizes the pinnacle of automotive engineering and design. Born in Woking, England, the P1 is a testament to McLaren's rich racing heritage and relentless pursuit of innovation. Its aerodynamic body, sculpted with precision, is not only visually stunning but also engineered to maximize downforce and minimize drag.
            </p>

            {/* STATS SECTION */}
            <div className="carstats-stats-container">
                <div className="carstats-stat-block">
                    <h2 className="carstats-stat-value">2.7S</h2>
                    <p className="carstats-stat-label">0-100 KMPH</p>
                </div>
                <div className="carstats-stat-block">
                    <h2 className="carstats-stat-value">6.5S</h2>
                    <p className="carstats-stat-label">0-200 KMPH</p>
                </div>
                <div className="carstats-stat-block">
                    <h2 className="carstats-stat-value">8.9S</h2>
                    <p className="carstats-stat-label">Quarter Mile</p>
                </div>
                <div className="carstats-stat-block">
                    <h2 className="carstats-stat-value">350 KMPH</h2>
                    <p className="carstats-stat-label">Top Speed</p>
                </div>
            </div>

            <p className="carstats-description">
                At the heart of the P1 lies a 3.8L twin-turbocharged V8 engine, seamlessly paired with an advanced electric motor. This hybrid powertrain delivers an astonishing combined output of 903 horsepower, ensuring unparalleled performance. The P1 accelerates from 0 to 100 kmph in a mere 2.7 seconds and achieves a top speed of 350 kmph, making it one of the fastest and most technologically advanced hypercars ever built.
            </p>
        </div>
    );
};

export default P1;
