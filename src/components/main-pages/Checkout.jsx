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
    // Clear cartItems from localStorage
    localStorage.removeItem("cartItems");
    alert("Order placed successfully!");
    navigate("/");
  };

  return (
    <div style={pageWrapper}>
      <h2 style={{ color: "#fff", textAlign: "center", marginBottom: "30px" }}>Checkout</h2>

      <div style={layoutStyle}>
        {/* Left: Cart */}
        <div style={cartBoxStyle}>
          <h3 style={{ color: "orange", fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
            Your Cart
          </h3>
          {cartItems.length === 0 ? (
            <p style={{ color: "#fff" }}>Your cart is empty.</p>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Item</th>
                  <th style={tableHeaderStyle}>Quantity</th>
                  <th style={tableHeaderStyle}>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td style={{ ...tableCellStyle, fontWeight: "600" }}>{item.name}</td>
                    <td style={{ ...tableCellStyle, fontWeight: "600", textAlign: "center" }}>{item.quantity || 1}</td>
                    <td style={{ ...tableCellStyle, fontWeight: "600" }}>${item.price}</td>
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

        {/* Right: Form */}
        <form style={formStyle} onSubmit={handleSubmit}>
          <label style={labelStyle}>Full Name</label>
          <input name="fullName" type="text" onChange={handleChange} required style={inputStyle} />

          <label style={labelStyle}>Email</label>
          <input name="email" type="email" onChange={handleChange} required style={inputStyle} />

          <label style={labelStyle}>Address</label>
          <input name="address" type="text" onChange={handleChange} required style={inputStyle} />

          <label style={labelStyle}>City</label>
          <input name="city" type="text" onChange={handleChange} required style={inputStyle} />

          <label style={labelStyle}>ZIP Code</label>
          <input name="zip" type="number" onChange={handleChange} required style={inputStyle} />

          <label style={labelStyle}>Card Number</label>
          <input name="cardNumber" type="tel" onChange={handleChange} required style={inputStyle} inputMode="numeric" pattern="[0-9\s]{13,19}" autoComplete="cc-number" />

          <label style={labelStyle}>Expiry Date</label>
          <input name="expiry" type="text" placeholder="MM/YY" onChange={handleChange} required style={inputStyle} inputMode="numeric" pattern="\d{2}/\d{2}" title="Enter date as MM/YY" />

          <label style={labelStyle}>CVV</label>
          <input name="cvv" type="tel" onChange={handleChange} required style={inputStyle} inputMode="numeric" pattern="\d{3,4}" title="Enter 3 or 4 digit CVV" />

          <button type="submit" style={buttonStyle}>Place Order</button>
        </form>
      </div>
    </div>
  );
};

// --- Styles ---
const pageWrapper = {
  backgroundColor: "#121212",
  minHeight: "100vh",
  padding: "40px 20px",
  fontFamily: "Arial, sans-serif",
};

const layoutStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "30px",
  justifyContent: "center",
  alignItems: "flex-start",
  maxWidth: "1100px",
  margin: "0 auto",
};

const cartBoxStyle = {
  flex: "1",
  minWidth: "300px",
  maxWidth: "500px",
  backgroundColor: "#2e2e2e",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
};

const formStyle = {
  flex: "1",
  minWidth: "300px",
  maxWidth: "500px",
  backgroundColor: "#1f1f1f",
  padding: "20px",
  borderRadius: "10px",
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
  fontWeight: "bold",
};

const tableCellStyle = {
  padding: "10px",
  borderBottom: "1px solid #444",
  color: "#fff",
  fontSize: "16px",
};

const inputStyle = {
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
  fontWeight: "bold",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};

export default Checkout;
