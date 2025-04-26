import React, { useEffect, useState } from "react";
import "@/styles/spare-parts.css";
import SearchBar from "@/components/others/SearchBar";

const SpareParts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [cartItems, setCartItems] = useState(0); // 🛒 cart count state

  useEffect(() => {
    fetch("/static/backend-databse-lmao/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log("Products fetched:", data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToCart = () => {
    setCartItems(cartItems + 1); // ➕ increment cart items
  };

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

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", position: "relative" }}>
      {/* 🛒 Cart Icon */}
      <div style={{ position: "absolute", top: "80px", right: "30px", cursor: "pointer" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="32"
          viewBox="0 0 24 24"
          width="32"
          fill="#FFD700"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 
          0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 
          2-2-.9-2-2-2zM7.16 14l.84-2h7.45c.75 
          0 1.41-.41 1.75-1.03l3.58-6.49a1 
          1 0 00-.89-1.48H5.21L4.27 2H1v2h2l3.6 
          7.59-1.35 2.44C4.52 14.37 5.48 16 7 
          16h12v-2H7.42c-.14 0-.25-.11-.26-.25z" />
        </svg>
        {cartItems > 0 && (
          <div
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              background: "#FFD700",
              color: "black",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {cartItems}
          </div>
        )}
      </div>

      <br />
      <br />
      <h1>Spare Parts</h1>
      <p>
        Welcome to the Spare Parts page. Here you can find a variety of parts
        for your vehicle.
      </p>

      {/* 🔍 Search and Dropdown */}
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          margin: "20px auto",
          flexWrap: "nowrap",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        {/* 📂 Dropdown Menu */}
        <div
          className="menu"
          style={{
            backgroundColor: "#007bff",
            padding: "0 20px",
            borderRadius: "6px 0 0 6px",
            border: "1px solid #007bff",
            borderRight: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "130px",
            height: "48px",
            cursor: "pointer",
          }}
        >
          <div className="item" style={{ display: "flex", alignItems: "center" }}>
            <a
              href="#"
              className="link"
              style={{ color: "white", fontSize: "14px", textDecoration: "none" }}
            >
              <span>Sort By</span>
              <svg
                viewBox="0 0 360 360"
                xmlSpace="preserve"
                style={{ fill: "white", width: "12px", height: "12px", marginLeft: "5px" }}
              >
                <g id="SVGRepo_iconCarrier">
                  <path
                    id="XMLID_225_"
                    d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
                      c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150
                      c2.813,2.813,6.628,4.393,10.606,4.393s7.794-1.581,10.606-4.394l149.996-150
                      C331.465,94.749,331.465,85.251,325.607,79.393z"
                  ></path>
                </g>
              </svg>
            </a>
            <div className="submenu">
              <div className="submenu-item">
                <a
                  href="#"
                  className="submenu-link"
                  onClick={() => setSortOrder("name-asc")}
                >
                  Name (A-Z)
                </a>
              </div>
              <div className="submenu-item">
                <a
                  href="#"
                  className="submenu-link"
                  onClick={() => setSortOrder("price-asc")}
                >
                  Price (Low to High)
                </a>
              </div>
              <div className="submenu-item">
                <a
                  href="#"
                  className="submenu-link"
                  onClick={() => setSortOrder("price-desc")}
                >
                  Price (High to Low)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 🔎 SearchBar */}
        <div style={{ flex: 1 }}>
          <SearchBar
            onSearch={(query) => setSearchTerm(query)}
            containerStyle={{
              width: "100%",
              borderRadius: "0 6px 6px 0",
              marginLeft: "0",
            }}
            inputStyle={{
              width: "100%",
              padding: "10px 12px",
              height: "48px",
              borderLeft: "none",
            }}
          />
        </div>
      </div>

      {/* 🛒 Product Cards */}
      <div className="row">
        {sortedProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="product-card">
              <div className="card-body">
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "300px",
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
                <p className="card-price" style={{ color: "#888" }}>
                  ${product.price}
                </p>
                <div style={{ textAlign: "center" }}>
                  <button className="btn btn-primary" onClick={addToCart}>
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
