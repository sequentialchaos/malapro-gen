import React from "react";
import "../css/WordCard.css";

function WordCard(props) {
  return (
    <div className="WordCard-container">
      <p className="WordCard-word">{props.word}</p>
      <p className="WordCard-score">{props.score + "%"} match</p>
    </div>
  );
}

export default WordCard;
