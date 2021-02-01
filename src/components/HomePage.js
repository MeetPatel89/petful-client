import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  render() {
    return (
      <div className='home'>
        <h1> FIFO Pet Adoption </h1>
        <p>
          {' '}
          FIFO is a pet adoption agency that takes a 'first-in-first-out'
          approach to adoption.
        </p>{' '}
        <p>
          {' '}
          The first animal that gets admitted to our shelter is the first one
          that gets adopted.
        </p>
        <img
          alt='adopt a pet'
          src='../images/animals-adoption.jpg'
        />
        <Link to='/cat-adopt'>
          <button> View Cats </button>
        </Link>
        <Link to='/dog-adopt'>
          <button> View Dogs </button>
        </Link>
      </div>
    );
  }
}
