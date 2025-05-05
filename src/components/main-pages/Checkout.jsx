// pages/checkout.jsx or src/pages/Checkout.jsx

import React, { useState } from "react";

const Checkout = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    // You can also redirect or clear cart here
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "20px" }}>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input name="fullName" type="text" onChange={handleChange} required style={inputStyle} />

        <label>Email</label>
        <input name="email" type="email" onChange={handleChange} required style={inputStyle} />

        <label>Address</label>
        <input name="address" type="text" onChange={handleChange} required style={inputStyle} />

        <label>City</label>
        <input name="city" type="text" onChange={handleChange} required style={inputStyle} />

        <label>ZIP Code</label>
        <input name="zip" type="text" onChange={handleChange} required style={inputStyle} />

        <label>Card Number</label>
        <input name="cardNumber" type="text" onChange={handleChange} required style={inputStyle} />

        <label>Expiry Date</label>
        <input name="expiry" type="text" placeholder="MM/YY" onChange={handleChange} required style={inputStyle} />

        <label>CVV</label>
        <input name="cvv" type="text" onChange={handleChange} required style={inputStyle} />

        <button type="submit" style={buttonStyle}>Place Order</button>
      </form>
    </div>
  );
};

// Simple styling
const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};



export default Checkout;