import React, { Component } from 'react';
import AppContext from '../context/context';
import UsersService from '../services/user-service';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
  static contextType = AppContext;

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(this.context.clearError());
    this.context.clearError();
    this.context.clearUserName();
    let name = document.getElementById('name').value;
    this.context.setUserName(name);

    // console.log(name);

    return UsersService.postUser(name).then((results) => {
      const { location, history } = this.props;
      const destination = (location.state || {}).from || '/adopt';
      history.push(destination);
    });
  };

  render() {
    return (
      <main className='landing-fullpage'>
        <div className='landing-page'>
          <h1> Welcome to Petful! </h1>
          <Link to='/adopt'>
            <button>Preview Adoptable Pets</button>{' '}
          </Link>

          <h4>
            {' '}
            We match the first person in the queue to the first pet that arrived
            at the shelter so no pets are left behind.
          </h4>
          <img
            src='https://live.staticflickr.com/65535/50707103271_c9d1f629fc_w.jpg'
            alt='dog-cat-under-blanket'
          ></img>

          <form className='get-started' onSubmit={this.handleSubmit}>
            <h4>
              {' '}
              Add your name to the queue to be matched with your new furry
              friend.
            </h4>
            <h3> Adopt Today </h3>
            <label htmlFor='name'> Name</label>
            <input type='text' name='name' id='name' required />
            <button type='submit'>Submit</button>
          </form>
        </div>
      </main>
    );
  }
}
export default LandingPage;
