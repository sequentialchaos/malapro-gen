import React from "react";
import "./css/App.css";
import WordCardList from "./components/WordCardList";
import Suggestion from "./components/Suggestion";

async function getWords(input) {
  const response = await fetch(`https://api.datamuse.com/words?sl=${input}`);
  const json = await response.json();
  return json.filter(
    w =>
      w.numSyllables === json[0].numSyllables &&
      w.word !== input &&
      w.score >= 20
  );
}

async function getSuggestions(input) {
  const response = await fetch(`https://api.datamuse.com/sug?s=${input}`);
  const json = await response.json();
  return json;
}

class App extends React.Component {
  state = { words: [], userInput: "ever dance", suggestions: [] };

  render() {
    return (
      <div className="App">
        {/* <h1 className="App-header">Malapropism Generator</h1> */}
        <div className="App-search-container">
          <h2 id="words-that">Words that sound like </h2>
          <form onSubmit={this.handleSubmit} id="form-input">
            <label>
              <input
                type="text"
                id="user-input"
                onChange={this.handleChange}
                list="suggestions"
              />
              <datalist id="suggestions" required>
                {this.state.suggestions.map(s => (
                  <Suggestion key={s.word} word={s.word} />
                ))}
              </datalist>
            </label>
            <button type="submit" className="find-button">
              Find
            </button>
          </form>
        </div>
        <WordCardList words={this.state.words} />
      </div>
    );
  }
  async componentDidMount() {
    this.setState({ words: await getWords(this.state.userInput) });
  }
  componentDidUpdate() {
    console.log(this.state);
  }
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ words: await getWords(this.state.userInput) });
  };
  handleChange = async e => {
    this.setState({ userInput: e.target.value });
    this.setState({ suggestions: await getSuggestions(this.state.userInput) });
  };
}

export default App;
