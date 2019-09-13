import React from "react";
import WordCard from "./WordCard";

function WordCardList(props) {
  return (
    <div className="WordCardList-container">
      {props.words.map(w => (
        <WordCard key={w.word} word={w.word} score={w.score} />
      ))}
    </div>
  );
}

export default WordCardList;
