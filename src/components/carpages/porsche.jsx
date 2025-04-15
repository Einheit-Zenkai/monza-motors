import React from "react";

const P1 = () => {
    return (
        <div className="p1-container">
            <h1 className="p1-title">McLaren P1</h1>
            <img
                src="https://example.com/mclaren-p1.jpg" // Replace with an actual image URL
                alt="McLaren P1"
                className="p1-image"
            />
            <p className="p1-description">
                The McLaren P1 is a hybrid hypercar that combines cutting-edge
                technology with breathtaking performance. Powered by a 3.8L twin-turbo
                V8 engine paired with an electric motor, it produces a combined output
                of 903 horsepower. With a top speed of 217 mph and a 0-60 mph time of
                just 2.8 seconds, the P1 is a masterpiece of engineering and design.
            </p>
            <ul className="p1-specs">
                <li><strong>Engine:</strong> 3.8L Twin-Turbo V8 + Electric Motor</li>
                <li><strong>Horsepower:</strong> 903 hp</li>
                <li><strong>Top Speed:</strong> 217 mph</li>
                <li><strong>0-60 mph:</strong> 2.8 seconds</li>
                <li><strong>Production:</strong> Limited to 375 units</li>
            </ul>
        </div>
    );
};

export default porsche;