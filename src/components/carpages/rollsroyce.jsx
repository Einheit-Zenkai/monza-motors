import React from "react";

const rollsroyce = () => {
    return (
        <div className="p1-container">
            <h1 className="p1-title">Rolls Royce</h1>
            <img
                src="/static/imgs/RR/rrdriving.jpg"
                alt="Rolls Royce Ghost"
                className="p1-image"
            />
            <p className="p1-description">
                The Rolls-Royce Ghost is the embodiment of modern luxury, seamlessly blending timeless craftsmanship with contemporary innovation. Hand-built in Goodwood, England, the Ghost stands as a symbol of quiet power and refined elegance. Its minimalist design, sculpted with exquisite precision, is both graceful and commanding—engineered to create a sanctuary of calm and sophistication.
            </p>

            {/* STATS SECTION */}
            <div className="rr-stats-container">
                <div className="rr-stat-block">
                    <h2 className="rr-stat-value">4.8S</h2>
                    <p className="rr-stat-label">0-100 kmph</p>
                </div>
                <div className="rr-stat-block">
                    <h2 className="rr-stat-value">11.5S</h2>
                    <p className="rr-stat-label">0-200 kmph</p>
                </div>
                <div className="rr-stat-block">
                    <h2 className="rr-stat-value">12.0S</h2>
                    <p className="rr-stat-label">Quarter mile</p>
                </div>
                <div className="rr-stat-block">
                    <h2 className="rr-stat-value">250 KMPH</h2>
                    <p className="rr-stat-label">Top speed</p>
                </div>
            </div>

            <p className="p1-description">
                Every element of the Rolls-Royce Ghost is carefully curated—from its aluminum spaceframe architecture to its whisper-quiet cabin layered with the finest materials. Limited in production and limitless in presence, the Ghost is an automotive masterpiece, offering an unparalleled blend of bespoke luxury, cutting-edge technology, and the unmistakable grace of a Rolls-Royce.
            </p>
        </div>
    );
};

export default rollsroyce;
