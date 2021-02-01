import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  postCatPerson,
  serverAdoptCat,
  deleteCatPerson,
} from '../services/main-service';

export default class DogAdoption extends Component {
  constructor() {
    super();
    this.state = {
      userInput: 0,
      intervalId: 0,
      adoptEnabled: false,
      addPersonDisabled: false,
    };
  }

  onChange(e) {
    this.setState({
      userInput: e.target.value,
    });
  }

  intervalForDemo() {
    let adding = false;
    let newUsers = ['Meet', 'Neel', 'Jay', 'Ayushi', 'Vishal'];
    this.intervalId = setInterval(() => {
      if (adding && this.props.catList.length >= 5) {
        adding = false;
      }
      if (this.props.catList.length === 0) {
        adding = true;
      }

      if (adding) {
        const random = Math.floor(Math.random() * newUsers.length);
        this.addPerson(newUsers[random]);
        this.setState({
          addPersonDisabled: true,
          adoptEnabled: false,
        });
      } else {
        this.handleAdoption();
        this.setState({
          addPersonDisabled: false,
          adoptEnabled: true,
        });
      }
      if (this.props.cats.length <= 0) {
        return clearInterval(this.intervalId);
      }
    }, 5000);
  }
  componentWillUnmount() {
    return clearInterval(this.intervalId);
  }
  handleAdoption = (e) => {
    serverAdoptCat()
      .then((cat) => {
        this.props.adoptCat(cat);
      })
      .then(() => {
        deleteCatPerson().then((person) => {
          this.props.removeCatPerson(person);
        });
      })
      .then(() => {
        if (this.props.catList.length === 2) {
          this.setState({
            adoptEnabled: true,
          });
        } else {
          this.setState({
            adoptEnabled: false,
          });
        }
      });
  };

  addPerson = (name) => {
    postCatPerson(name).then((newPerson) => {
      this.props.catListAdd(newPerson);
      this.intervalForDemo();
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { person } = e.target;
    this.addPerson(person.value);
  };

  render() {
    // maps over the people in the database and prints them in a list
    const catList = this.props.catList;

    const catListMap = catList.map((person, i) => {
      return (
        <div key={i} className='person'>
          <h3>{person}</h3>
        </div>
      );
    });
    let catIndex;
    for (let i = 0; i < this.props.cats.length; i++) {
      catIndex = this.props.cats[i];
    }

    // if there is a list of cats, render them to the page
    let catHTML;
    if (catIndex) {
      let cat = catIndex;
      catHTML = (
        <div key={cat.id} className='animal'>
          <img alt='animal to adopt' src={cat.imageURL} />
          <div className='content'>
            <h4> {cat.name} </h4>
            <p> Age: {cat.age} </p>
            <p> Breed: {cat.breed} </p>
            <p> {cat.description} </p>
            <p> {cat.story} </p>
          </div>
          <button
            disabled={!this.state.adoptEnabled}
            onClick={(e) => this.handleAdoption(e)}
            className='adopt-me'
          >
            {' '}
            Adopt Me!{' '}
          </button>
        </div>
      );
    }
    return (
      <div className='adoption'>
        <Link to='/'>
          <button> Home </button>
        </Link>
        <form className='queue-form' onSubmit={(e) => this.handleSubmit(e)}>
          <input
            name='person'
            id='person'
            type='text'
            placeholder='Enter Name in Queue'
            onChange={(e) => this.onChange(e)}
            value={this.state.people}
          ></input>
          <button disabled={this.state.addPersonDisabled} type='submit'>
            {' '}
            Submit{' '}
          </button>
        </form>

        <h3> Adoptable Cats </h3>
        {this.props.cats.length <= 0 ? <h2> Shelter is empty </h2> : null}
        <div className='list'>{catHTML}</div>
        <div className='queue'>{catListMap}</div>
        {this.props.catList.length <= 0 ? (
          <h2> Congratulations on your new cat! </h2>
        ) : null}
      </div>
    );
  }
}
