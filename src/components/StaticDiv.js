import React, { Component } from 'react';

class StaticDiv extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {divRef, ...rest} = this.props;

    return (
      <div ref={divRef} {...rest} />
    );
  }
}

export default StaticDiv;
