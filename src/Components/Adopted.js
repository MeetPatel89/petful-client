import React, { Component } from 'react';

export default class Adopted extends Component {
  render() {
    const { imgSrc, name, owner } = this.props;

    // console.log(this.props);
    return (
      <>
        <img src={imgSrc} alt='pet' />
        <p>Name: {name}</p>
        <p>Owner: {owner}</p>
      </>
    );
  }
}
