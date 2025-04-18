import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div
      className="mb-4"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        className="form-control"
        placeholder="Search for Spare Parts"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{
          maxWidth: "400px",
          marginRight: "0",
          height: "40px",
        }}
      />
      <button
        className="btn btn-primary"
        onClick={handleSearch}
        style={{
          height: "40px",
          padding: "0 20px",
          fontSize: "1rem",
        }}
      >
        Go
      </button>
    </div>
  );
};

export default SearchBar;

// ✅ How to use in your product page:

// import SearchBar from "./SearchBar";

// const ProductPage = () => {
//   const handleSearch = (query) => {
//     console.log("Search query:", query);
//     // You can use this to filter your products!
//   };

//   return (
//     <div>
//       <SearchBar onSearch={handleSearch} />
//       {/* Product list goes here */}
//     </div>
//   );
// };

