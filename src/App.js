import React, { useEffect, useState } from "react";
import axios from "axios";
import "./sass/_app.scss";

import pokemon1Image from "./images/bulbasaur.png";
import pokemon2Image from "./images/charizard.jpg";
import pokemon3Image from "./images/charmander.jpg";
import pokemon4Image from "./images/pikachu.jpg";

function App() {
  // const [abilities, setAbilities] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage, setImagesPerPage] = useState(16);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then((response) => {
        setPokemon(response.data.results);
      });
  }, []);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = pokemon.slice(indexOfFirstImage, indexOfLastImage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pokemonImages = [
    pokemon1Image,
    pokemon2Image,
    pokemon3Image,
    pokemon4Image,
  ];

  return (
    <>
      <div className="container">
        <h2 className="title">POKEMON CARDS:</h2>
        <div className="cardContainer">
          {currentImages.map((poke, index) => (
            <div className="card" key={index}>
              <img src={pokemonImages[index % 4]} alt="Pokemon" />
              <div>
                <h3>{poke.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
        )}

        {[...Array(Math.ceil(pokemon.length / imagesPerPage)).keys()]
          .slice(0, 3)
          .map((index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}

        {currentPage < 3 && (
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        )}
      </div>
    </>
  );
}

export default App;
