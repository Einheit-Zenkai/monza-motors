import React, { useEffect, useState } from "react";
import "@/styles/spare-parts.css";
import SearchBar from "@/components/others/SearchBar";

const SpareParts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("name-asc");

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

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <br />
      <br />
      <h1>Spare Parts</h1>
      <p>
        Welcome to the Spare Parts page. Here you can find a variety of parts
        for your vehicle.
      </p>

      {/* 🔍 Search and Dropdown - Updated Styling */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px 0",
          flexWrap: "nowrap",
          width: "100%",
          maxWidth: "800px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* 📂 Dropdown Menu - Orange Button, White Text, Smaller Size */}
        <div
          className="menu"
          style={{
            backgroundColor: "#FF6600", // Orange background
            padding: "6px 10px", // Smaller padding
            borderRadius: "4px 0 0 4px",
            border: "1px solid #FF6600",
            height: "100%",
            display: "flex",
            alignItems: "center",
            minWidth: "100px", // Smaller width
          }}
        >
          <div className="item">
            <a
              href="#"
              className="link"
              style={{ color: "white", fontSize: "14px" }} // White text, smaller font
            >
              <span>Sort By</span>
              <svg
                viewBox="0 0 360 360"
                xml:space="preserve"
                style={{ fill: "white", width: "12px", height: "12px" }} // Smaller icon
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

        {/* SearchBar - Extended to Touch Dropdown */}
        <div style={{ flex: 1 }}>
          <SearchBar
            onSearch={(query) => setSearchTerm(query)}
            containerStyle={{
              width: "100%",
              borderRadius: "0 4px 4px 0",
              marginLeft: "0",
              borderLeft: "none", // Remove left border for seamless connection
            }}
            inputStyle={{
              width: "100%",
              padding: "10px 12px", // Match dropdown height
            }}
          />
        </div>
      </div>

      {/* 🛒 Product Cards (Unchanged) */}
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