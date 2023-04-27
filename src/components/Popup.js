import React, { useState } from "react";

const Modal = ({ text, closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{text}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

const Card = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const getRandomText = () => {
    const textArray = [
      "Lorem ipsum dolor sit amet",
      "consectetur adipiscing elit",
      "sed do eiusmod tempor incididunt",
      "ut labore et dolore magna aliqua",
      "Ut enim ad minim veniam",
      "quis nostrud exercitation ullamco",
      "laboris nisi ut aliquip ex ea commodo consequat",
    ];
    const randomIndex = Math.floor(Math.random() * textArray.length);
    return textArray[randomIndex];
  };

  const handleClick = () => {
    setModalText(getRandomText());
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="card" onClick={handleClick}>
        <button>Click me!</button>
      </div>
      {isModalOpen && <Modal text={modalText} closeModal={closeModal} />}
    </>
  );
};

export default Card;
