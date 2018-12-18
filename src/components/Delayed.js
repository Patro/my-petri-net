import React, { Component } from 'react';

class Delayed extends Component {
  constructor(props) {
    super(props);
    this.state = { display: false }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ display: true }), 0);
  }

  render() {
    if (this.state.display === false) {
      return null;
    }

    return (
      <>
        {this.props.children}
      </>
    )
  }
}

export default Delayed;
