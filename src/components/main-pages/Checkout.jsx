import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

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
    navigate("/");
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "20px", textAlign: "center", color: "#fff" }}>Checkout</h2>

      {/* Styled Cart Box */}
      <div style={cartBoxStyle}>
        <h3 style={{ color: "orange", fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
          Your Cart
        </h3>
        {cartItems.length === 0 ? (
          <p style={{ textAlign: "center", color: "#fff" }}>Your cart is empty.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Item</th>
                <th style={tableHeaderStyle}>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td style={tableCellStyle}>{item.name}</td>
                  <td style={tableCellStyle}>${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p
          style={{
            fontWeight: "bold",
            color: "orange",
            fontSize: "18px",
            marginTop: "16px",
            textAlign: "right",
          }}
        >
          Total: ${total.toFixed(2)}
        </p>
      </div>

      {/* Checkout form */}
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Full Name</label>
        <input name="fullName" type="text" onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>Email</label>
        <input name="email" type="email" onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>Address</label>
        <input name="address" type="text" onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>City</label>
        <input name="city" type="text" onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>ZIP Code</label>
        <input name="zip" type="text" onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>Card Number</label>
        <input name="cardNumber" type="text" onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>Expiry Date</label>
        <input name="expiry" type="text" placeholder="MM/YY" onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>CVV</label>
        <input name="cvv" type="text" onChange={handleChange} required style={inputStyle} />

        <button type="submit" style={buttonStyle}>Place Order</button>
      </form>
    </div>
  );
};

// --- Styles ---
const containerStyle = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#121212", // Dark background for overall page
  borderRadius: "8px",
};

const cartBoxStyle = {
  backgroundColor: "#2e2e2e", // ChatGPT-style grey
  border: "1px solid #444",
  borderRadius: "10px",
  padding: "20px",
  marginBottom: "30px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const tableHeaderStyle = {
  borderBottom: "2px solid #555",
  padding: "8px",
  textAlign: "left",
  color: "orange",
  fontSize: "16px",
};

const tableCellStyle = {
  padding: "10px",
  borderBottom: "1px solid #444",
  color: "#fff",
  fontSize: "16px",
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const labelStyle = {
  color: "#fff",
  marginBottom: "5px",
  display: "block",
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
