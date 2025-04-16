import React from "react";

const Skyline = () => {
    return (
        <div className="carstats-container">
            <h1 className="carstats-title">Nissan Skyline GT-R R34</h1>
            <img
                src="/static/imgs/skyline/purplskylineoutdoor.jpg" // Replace with actual Skyline image
                alt="Nissan Skyline GT-R R34"
                className="p1-image"
            />
            <p className="carstats-description">
                The Nissan Skyline GT-R R34 is a legendary icon born from Japan’s golden era of performance engineering. Revered by enthusiasts and celebrated in motorsports, the R34 delivers a perfect harmony of raw power and advanced technology. With aggressive styling and race-bred DNA, it remains a symbol of tuner culture and JDM excellence.
            </p>

            {/* STATS SECTION */}
            <div className="carstats-stats-container">
                <div className="carstats-stat-block">
                    <h2 className="carstats-stat-value">4.9S</h2>
                    <p className="carstats-stat-label">0-100 KMPH</p>
                </div>
                <div className="carstats-stat-block">
                    <h2 className="carstats-stat-value">12.7S</h2>
                    <p className="carstats-stat-label">0-200 KMPH</p>
                </div>
                <div className="carstats-stat-block">
                    <h2 className="carstats-stat-value">13.1S</h2>
                    <p className="carstats-stat-label">Quarter Mile</p>
                </div>
                <div className="carstats-stat-block">
                    <h2 className="carstats-stat-value">250 KMPH</h2>
                    <p className="carstats-stat-label">Top Speed</p>
                </div>
            </div>

            <p className="carstats-description">
                Powered by the iconic RB26DETT 2.6L twin-turbo inline-six, the R34 GT-R produces 276 horsepower in stock trim and delivers power through the advanced ATTESA E-TS all-wheel-drive system. Its reputation was cemented by its performance on both track and street, and today, it remains one of the most sought-after and beloved Japanese sports cars of all time.
            </p>
        </div>
    );
};

export default Skyline;
