import React from "react";
import { useEffect, useState } from 'react';
import "@/styles/spare-parts.css";
import SearchBar from "@/components/others/SearchBar"
const SpareParts = () => {
    
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/static/backend-databse-lmao/products.json')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .then(console.log("Products fetched:", products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <br />
      <br />
      <h1>Spare Parts</h1>
      <p>
        Welcome to the Spare Parts page. Here you can find a variety of parts
        for your vehicle.
      </p>
      <SearchBar />

      <div className="row">
      {products.map((product) => (
        <div key={product.id} className="col-md-4 mb-4">
          <div className="product-card">
            <div className="card-body">
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '10px'
                }}
              />
              <h5 className="card-title">{product.category}</h5>
              <p
                className="card-text"
                style={{
                  fontWeight: 'bold',
                  fontSize: '2rem',
                  color: '#ff6600',
                  textTransform: 'uppercase'
                }}
              >
                {product.name}
              </p>
              <p
                className="card-description"
                style={{
                  fontSize: '1.2rem',
                  color: '#ff6600',
                  textAlign: 'center',
                  marginBottom: '10px'
                }}
              >
                {product.description}
              </p>
              <p className="card-price" style={{ color: '#888' }}>${product.price}</p>
              <div style={{ textAlign: 'center' }}>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    </div>
  );
};

export default SpareParts;
