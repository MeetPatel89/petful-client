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
          src='https://i.redd.it/q2cbr86p8je61.jpg'
          alt='adopt a pet'
          className='responsive'
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
