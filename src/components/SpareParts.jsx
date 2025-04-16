import React from 'react';
import '../../public/static/styles/spare-parts.css';

const SpareParts = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <br />
            <br />
            <h1>Spare Parts</h1>
            <p>Welcome to the Spare Parts page. Here you can find a variety of parts for your vehicle.</p>
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for spare parts..."
                    style={{ maxWidth: '400px', margin: '0 auto' }}
                />
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
                            <p className="card-description" style={{ fontSize: '1rem', color: '#000', marginBottom: '10px' }}>
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
                            <p className="card-description" style={{ fontSize: '1rem', color: '#000', marginBottom: '10px' }}>
                                Designed for smooth rides, stability, and superior handling on any terrain.
                            </p>
                            <p className="card-price" style={{ color: '#888' }}>$49.99</p>
                            <div style={{ textAlign: 'center' }}>
                                <button className="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Part 3 */}
                <div className="col-md-4 mb-4">
                    <div className="product-card">
                        <div className="card-body">
                            <h5 className="card-title">Part 3</h5>
                            <p className="card-text">Description of Part 3.</p>
                            <p className="card-price" style={{ color: '#888' }}>$29.99</p>
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
