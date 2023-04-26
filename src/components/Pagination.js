import React from "react";

const Pagination = ({ totalCards, cardsPerpage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerpage); i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((page, index) => {
        return <button key={index}>{page}</button>;
      })}
    </div>
  );
};

export default Pagination;
