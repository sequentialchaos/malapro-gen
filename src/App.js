import React from "react";
import "./App.css";

async function getWords(input) {
  const response = await fetch(`https://api.datamuse.com/words?sl=${input}`);
  const json = await response.json();
  return json;
}

class App extends React.Component {
  state = { words: [], userInput: "" };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type="text" id="userInput" onChange={this.handleChange} />
          <button type="submit">Find</button>
        </form>
        {this.state.words.map(w => (
          <Word key={w.word} word={w.word} />
        ))}
      </div>
    );
  }
  async componentDidMount() {
    this.setState({ words: await getWords("ever dance") });
  }
  componentDidUpdate() {
    console.log(this.state);
  }
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ words: await getWords(this.state.userInput) });
  };
  handleChange = e => {
    this.setState({ userInput: e.target.value });
  };
}

function Word(props) {
  return <p>{props.word}</p>;
}

export default App;
