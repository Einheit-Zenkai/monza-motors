import React from 'react';
import '../../public/static/styles/spare-parts.css';

const SpareParts = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <br />
            <br />
            <h1>Spare Parts</h1>
            <p>Welcome to the Spare Parts page. Here you can find a variety of parts for your vehicle.</p>
            <div className="mb-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for Spare Parts"
                    style={{
                        maxWidth: '400px',
                        marginRight: '0',
                        height: '40px' // Same height as the button
                    }}
                />
                <button
                    className="btn btn-primary"
                    style={{
                        height: '40px', // Same height as the input
                        padding: '0 20px', // Padding for the button text
                        fontSize: '1rem'
                    }}
                >
                    Go
                </button>
            </div>
            <div className="row">
                {/* Part 1 with image and quality description */}
                <div className="col-md-4 mb-4">
                    <div className="product-card">
                        <div className="card-body">
                            <img
                                src="/static/imgs/otherimages/pirelli.jpg"
                                alt="Spare Part 1"
                                style={{
                                    width: '100%',
                                    height: '300px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    marginBottom: '10px'
                                }}
                            />
                            <h5 className="card-title">Part 1</h5>
                            <p
                                className="card-text"
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '2rem',
                                    color: '#ff6600', // Orange
                                    textTransform: 'uppercase'
                                }}
                            >
                                Race Tyres
                            </p>
                            <p className="card-description" style={{ fontSize: '1.2rem', color: '#ff6600', textAlign: 'center', marginBottom: '10px' }}>
                                Premium grip, excellent durability, and engineered for high-speed performance.
                            </p>
                            <p className="card-price" style={{ color: '#888' }}>$29.99</p>
                            <div style={{ textAlign: 'center' }}>
                                <button className="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Part 2 - Suspension with visible text */}
                <div className="col-md-4 mb-4">
                    <div className="product-card">
                        <div className="card-body">
                            <img
                                src="/static/imgs/otherimages/suspension.jpg"
                                alt="Suspension"
                                style={{
                                    width: '100%',
                                    height: '300px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    marginBottom: '10px'
                                }}
                            />
                            <h5 className="card-title">Part 2</h5>
                            <p
                                className="card-text"
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '2rem',
                                    color: '#ff6600', // Orange
                                    textTransform: 'uppercase'
                                }}
                            >
                                Suspension
                            </p>
                            <p className="card-description" style={{ fontSize: '1.2rem', color: '#ff6600', textAlign: 'center', marginBottom: '10px' }}>
                                Designed for smooth rides, stability, and superior handling on any terrain.
                            </p>
                            <p className="card-price" style={{ color: '#888' }}>$49.99</p>
                            <div style={{ textAlign: 'center' }}>
                                <button className="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Part 3 - Brake Caliper with image and description */}
                <div className="col-md-4 mb-4">
                    <div className="product-card">
                        <div className="card-body">
                            <img
                                src="/static/imgs/otherimages/calipers.jpg" // Add your image path here
                                alt="Brake Caliper"
                                style={{
                                    width: '100%',
                                    height: '300px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    marginBottom: '10px'
                                }}
                            />
                            <h5 className="card-title">Part 3</h5>
                            <p
                                className="card-text"
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '2rem',
                                    color: '#ff6600', // Orange
                                    textTransform: 'uppercase'
                                }}
                            >
                                Brake Caliper
                            </p>
                            <p className="card-description" style={{ fontSize: '1.2rem', color: '#ff6600', textAlign: 'center', marginBottom: '10px' }}>
                                High-performance brake caliper, built for maximum stopping power and safety.
                            </p>
                            <p className="card-price" style={{ color: '#888' }}>$69.99</p>
                            <div style={{ textAlign: 'center' }}>
                                <button className="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpareParts;
