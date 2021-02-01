import React, { Component } from 'react';

export default class Line extends Component {
  render() {
    return (
      <div>
        <ul className='order-list'>
          <h2>Up Next!</h2>
          <li>{this.props.first}</li>
          <li>{this.props.second}</li>
          <li>{this.props.third}</li>
        </ul>
      </div>
    );
  }
}
