import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/spare-parts.css";
import SearchBar from "@/components/others/SearchBar";

const SpareParts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [animatePing, setAnimatePing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/static/backend-databse-lmao/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log("Products fetched:", data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortProducts = (products, sortOrder) => {
    let sortedProducts;
    switch (sortOrder) {
      case "name-asc":
        sortedProducts = [...products].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      case "price-asc":
        sortedProducts = [...products].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedProducts = [...products].sort((a, b) => b.price - a.price);
        break;
      default:
        sortedProducts = products;
    }
    return sortedProducts;
  };

  const sortedProducts = sortProducts(filteredProducts, sortOrder);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    setAnimatePing(true);
    setTimeout(() => setAnimatePing(false), 500);
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };

  const totalBalance = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePurchase = () => {
    navigate("/checkout", {
      state: {
        cartItems,
        total: totalBalance,
      },
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Shopping Cart Icon */}
      <div style={{ position: "fixed", top: "60px", right: "20px", zIndex: 999 }}>
        <div className="cart-container" style={{ position: "relative", display: "inline-block" }}>
          <span
            role="img"
            aria-label="cart"
            onClick={() => setIsCartOpen(!isCartOpen)}
            style={{
              fontSize: "45px",
              color: "yellow",
              cursor: "pointer",
              position: "relative",
            }}
          >
            🛒
            {cartItems.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  animation: animatePing ? "ping 0.5s" : "none",
                }}
              >
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </span>

          {isCartOpen && (
            <div
              className="cart-dropdown"
              style={{
                position: "absolute",
                top: "55px",
                right: 0,
                backgroundColor: "white",
                color: "black",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                minWidth: "250px",
                boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
                zIndex: 9999,
              }}
            >
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {cartItems.map((item, index) => (
                      <li
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <span style={{ fontWeight: "700", fontSize: "15px" }}>
                          {item.name} {item.quantity > 1 ? `x${item.quantity}` : ""} <br />
                          <span style={{ color: "#555", fontWeight: "600" }}>
                            ${item.price * item.quantity}
                          </span>
                        </span>
                        <button
                          onClick={() => removeFromCart(index)}
                          style={{
                            backgroundColor: "#007BFF",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            padding: "2px 6px",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: "10px", textAlign: "center" }}>
                    <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Total: ${totalBalance.toFixed(2)}
                    </p>
                    <button
                      style={{
                        marginTop: "8px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        padding: "6px 12px",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                      onClick={handlePurchase}
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes ping {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.5);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>

      <br />
      <br />
      <h1>Spare Parts</h1>
      <p>
        Welcome to the Spare Parts page. Here you can find a variety of parts
        for your vehicle.
      </p>

      {/* Search and Sort */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          margin: "20px auto",
          flexWrap: "nowrap",
          maxWidth: "800px",
          gap: "0",
        }}
      >
        <div
          className="menu"
          style={{
            backgroundColor: "#007BFF",
            padding: "6px 10px",
            borderRadius: "4px",
            border: "1px solid #007BFF",
            height: "100%",
            display: "flex",
            alignItems: "center",
            minWidth: "100px",
          }}
        >
          <div className="item">
            <a href="#" className="link" style={{ color: "white", fontSize: "14px" }}>
              <span>Sort By</span>
              <svg
                viewBox="0 0 360 360"
                style={{ fill: "white", width: "12px", height: "12px" }}
              >
                <path
                  d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
                    c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150
                    c2.813,2.813,6.628,4.393,10.606,4.393s7.794-1.581,10.606-4.394l149.996-150
                    C331.465,94.749,331.465,85.251,325.607,79.393z"
                />
              </svg>
            </a>
            <div className="submenu">
              <div className="submenu-item">
                <a href="#" className="submenu-link" onClick={() => setSortOrder("name-asc")}>
                  Name (A-Z)
                </a>
              </div>
              <div className="submenu-item">
                <a href="#" className="submenu-link" onClick={() => setSortOrder("price-asc")}>
                  Price (Low to High)
                </a>
              </div>
              <div className="submenu-item">
                <a href="#" className="submenu-link" onClick={() => setSortOrder("price-desc")}>
                  Price (High to Low)
                </a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <SearchBar
            onSearch={(query) => setSearchTerm(query)}
            containerStyle={{
              width: "100%",
              borderRadius: "0 4px 4px 0",
              borderLeft: "none",
            }}
            inputStyle={{
              width: "100%",
              padding: "10px 12px",
            }}
          />
        </div>
      </div>

      {/* Product Cards */}
      <div className="row">
        {sortedProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="product-card">
              <div className="card-body">
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
                <h5 className="card-title">{product.category}</h5>
                <p
                  className="card-text"
                  style={{
                    fontWeight: "bold",
                    fontSize: "2rem",
                    color: "#ff6600",
                    textTransform: "uppercase",
                  }}
                >
                  {product.name}
                </p>
                <p
                  className="card-description"
                  style={{
                    fontSize: "1.2rem",
                    color: "#ff6600",
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  {product.description}
                </p>
                <p className="card-price" style={{ color: "#888", fontWeight: "bold" }}>
                  ${product.price}
                </p>
                <div style={{ textAlign: "center" }}>
                  <button className="btn btn-primary" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
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

