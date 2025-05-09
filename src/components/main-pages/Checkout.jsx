import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // Get cartItems and total from the state passed during navigation
  const { cartItems, total } = state || { cartItems: [], total: 0 };

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
    // Optionally redirect or clear cart here
    navigate("/"); // Redirect to home or cart page after order is placed
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "20px" }}>Checkout</h2>

      {/* Cart details */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Your Cart:</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {cartItems.map((item, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>
                <span>{item.name} (${item.price})</span>
              </li>
            ))}
          </ul>
        )}
        <div>
          <p style={{ fontWeight: "bold" }}>Total: ${total.toFixed(2)}</p>
        </div>
      </div>

      {/* Checkout form */}
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
