import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super();

    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  decrement = () => {
    this.setState({
      count: this.state.count - 1
    });
  };

  render() {
    return (
      <div style={{ padding: "30px" }}>
        <h1>Counter Application</h1>

        <h2>Count : {this.state.count}</h2>

        <button onClick={this.increment}>
          Increment
        </button>

        <button
          onClick={this.decrement}
          style={{ marginLeft: "10px" }}
        >
          Decrement
        </button>
      </div>
    );
  }
}

export default App;