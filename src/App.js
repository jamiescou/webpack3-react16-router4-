import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 1 };
  }
  add() {
    this.setState({ count: this.state.count + 1 });
  }
  render() {
    return (
      <div>
        <h1>112222your number is {this.state.count}</h1>
        <button onClick={() => this.add()}>点击+1</button>
      </div>
    );
  }
}
