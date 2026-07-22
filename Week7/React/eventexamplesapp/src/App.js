import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super();

    this.state = {
      rupees: "",
      euro: ""
    };
  }

  convertCurrency = () => {

    const euroValue =
      parseFloat(this.state.rupees) / 90;

    this.setState({
      euro: euroValue.toFixed(2)
    });
  };

  render() {

    return (
      <div style={{ padding: "20px" }}>

        <h1>Currency Converter</h1>

        <input
          type="number"
          placeholder="Enter Rupees"
          onChange={(e) =>
            this.setState({
              rupees: e.target.value
            })
          }
        />

        <br /><br />

        <button onClick={this.convertCurrency}>
          Convert
        </button>

        <h2>Euro : {this.state.euro}</h2>

      </div>
    );
  }
}

export default App;