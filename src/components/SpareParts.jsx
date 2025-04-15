import React from 'react';
import '../../public/static/styles/spare-parts.css';
const SpareParts = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <br></br>
            <br></br>
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
                <div className="col-md-4 mb-4">
                    <div className="product-card">
                        <div className="card-body">
                            <h5 className="card-title">Part 1</h5>
                            <p className="card-text">Description of Part 1.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="product-card">
                        <div className="card-body">
                            <h5 className="card-title">Part 2</h5>
                            <p className="card-text">Description of Part 2.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="product-card">
                        <div className="card-body">
                            <h5 className="card-title">Part 3</h5>
                            <p className="card-text">Description of Part 3.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpareParts;