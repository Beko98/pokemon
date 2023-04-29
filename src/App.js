import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./sass/_app.scss";

import pokemon1Image from "./images/bulbasaur.png";
import pokemon2Image from "./images/charizard.jpg";
import pokemon3Image from "./images/charmander.jpg";
import pokemon4Image from "./images/pikachu.jpg";
import Search from "./components/Search"

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage, setImagesPerPage] = useState(16);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [getData, setGetData] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState(null);

  const modalRef = useRef();

  const handleCardClick = (card) => {
    setSelectedCard(card);
    axios.get(card.url).then((response) => {
      setPokemonDetails(response.data);
      setShowModal(true);
    });
  };

  const handleClosePopup = () => {
    setSelectedCard(null);
    setShowModal(false);
  };

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then((response) => {
        setPokemon(response.data.results);
      })
      .catch((error) => {
        console.log(error);
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

  const handleEscape = (event) => {
    if (event.keyCode === 27 && selectedCard) {
      handleClosePopup();
    }
  };

  const handleBackdropClick = (event) => {
    if (modalRef.current === event.target && selectedCard) {
      handleClosePopup();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [selectedCard]);

  useEffect(() => {
    document.addEventListener("click", handleBackdropClick, false);
    return () => {
      document.removeEventListener("click", handleBackdropClick, false);
    };
  }, [selectedCard]);

  return (
    <>
      <div className="container">
        <h2 className="title">POKEMON CARDS:</h2>

        <Search />
        <div className="cardContainer">
          {currentImages.map((poke, index) => (
            <div
              className="card"
              key={index}
              onClick={() => handleCardClick(poke)}
            >
              <img src={pokemonImages[index % 4]} alt="Pokemon" />
              <div>
                <h3>{poke.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={selectedCard ? "backdrop" : ""} ref={modalRef}></div>

      {selectedCard && (
        <div className="modal">
          <button className="close-modal" onClick={handleClosePopup}>
            X
          </button>
          <h3>{selectedCard.name}</h3>
          {pokemonDetails && (
            <>
              <div>
                <span className="everySpan">Species:</span> {pokemonDetails.species.name}
              </div>
              <div>
                <span className="everySpan">Weight:</span> {pokemonDetails.weight} kg
              </div>
              <div>
                <span className="everySpan">Stats:</span>
                {pokemonDetails.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </div>
                ))}
              </div>
              <div>
                <span className="everySpan">Types:</span>
                {pokemonDetails.types.map((type) => (
                  <div key={type.slot}>{type.type.name}</div>
                ))}
              </div>
              <div>
                <span className="everySpan">Moves:</span>
                {pokemonDetails.moves.slice(0, 5).map((move) => (
                  <div key={move.move.name}>{move.move.name}</div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

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
