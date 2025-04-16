import React from "react";

const Porsche918 = () => {
    return (
        <div className="carstats-container">
            <h1 className="carstats-title">Porsche 918 Spyder</h1>
            <img
                src="/static/imgs/porsche/rp-porsche-scotland-45.jpg"
                alt="Porsche 918 Spyder"
                className="p1-image"
            />
            <p className="carstats-description">
                The Porsche 918 Spyder redefined the hybrid supercar, uniting cutting-edge electric innovation with the raw spirit of racing heritage. Assembled in Stuttgart with obsessive attention to detail, the 918 Spyder delivers explosive performance in a beautifully sculpted package that is as efficient as it is exhilarating.
            </p>

            {/* STATS SECTION */}
            <div className="carstats-stats-container">
                <div className="carstats-stat-block">
                    <h2 className="carstats-stat-value">2.6S</h2>
                    <p className="carstats-stat-label">0-100 kmph</p>
                </div>
                <div className="carstats-stat-block">
                    <h2 className="carstats-stat-value">7.2S</h2>
                    <p className="carstats-stat-label">0-200 kmph</p>
                </div>
                <div className="carstats-stat-block">
                    <h2 className="carstats-stat-value">10.0S</h2>
                    <p className="carstats-stat-label">Quarter mile</p>
                </div>
                <div className="carstats-stat-block">
                    <h2 className="carstats-stat-value">345 KMPH</h2>
                    <p className="carstats-stat-label">Top speed</p>
                </div>
            </div>

            <p className="carstats-description">
                With a naturally aspirated 4.6L V8 engine paired to dual electric motors, the 918 Spyder produces a combined 887 horsepower. Designed with lightweight carbon fiber-reinforced polymer, active aerodynamics, and an advanced hybrid system, it delivers a driving experience that balances brutal acceleration with responsible efficiency. The Porsche 918 Spyder is not just a car—it’s a glimpse into the future of performance.
            </p>
        </div>
    );
};

export default Porsche918;
