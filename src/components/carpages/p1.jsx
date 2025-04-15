import React from "react";

const P1 = () => {
    return (
        <div className="p1-container">
            <br></br>
            <br></br>
            <h1 className="p1-title">McLaren P1</h1>
            <img
                src="/static/imgs/p1/mclaren_p1_concept-wide.webp" // Corrected the image path
                alt="McLaren P1"
                className="p1-image"
            />
            <p className="p1-description">
                The McLaren P1 is a revolutionary hybrid hypercar that epitomizes the pinnacle of automotive engineering and design. Born in Woking, England, the P1 is a testament to McLaren's rich racing heritage and relentless pursuit of innovation. Its aerodynamic body, sculpted with precision, is not only visually stunning but also engineered to maximize downforce and minimize drag.
            </p>
            <p className="p1-description">
                At the heart of the P1 lies a 3.8L twin-turbocharged V8 engine, seamlessly paired with an advanced electric motor. This hybrid powertrain delivers an astonishing combined output of 903 horsepower, ensuring unparalleled performance. The P1 accelerates from 0 to 60 mph in a blistering 2.8 seconds, with a top speed electronically limited to 217 mph, making it one of the fastest cars ever produced.
            </p>
            <p className="p1-description">
                Every detail of the McLaren P1 is meticulously crafted, from its lightweight carbon fiber monocoque chassis to its cutting-edge active aerodynamics. Limited to just 375 units worldwide, the P1 is a rare masterpiece that offers an unparalleled driving experience, blending raw power with advanced hybrid technology.
            </p>
            <ul className="p1-specs">
                <li><strong>Origin:</strong> Woking, England</li>
                <li><strong>Engine:</strong> 3.8L Twin-Turbo V8 + Electric Motor</li>
                <li><strong>Horsepower:</strong> 903 hp</li>
                <li><strong>Top Speed:</strong> 217 mph</li>
                <li><strong>0-60 mph:</strong> 2.8 seconds</li>
                <li><strong>Production:</strong> Limited to 375 units</li>
            </ul>
        </div>
    );
};

export default P1;