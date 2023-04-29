
import React, { useState } from "react";

function SearchBar() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const result = [];
    data.forEach((item) => {
      if (item.name.toLowerCase().includes(value)) {
        result.push(item);
      }
    });
    setFilteredData(result);
  };

  return (
    <div>
      <input type="text" placeholder="Search" onChange={handleSearch} />
      <div>
        {filteredData.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;

