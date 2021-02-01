import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  postDogPerson,
  serverAdoptDog,
  deleteDogPerson,
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
      if (adding && this.props.dogList.length >= 5) {
        adding = false;
      }
      if (this.props.dogList.length === 0) {
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
      if (this.props.dogs.length <= 0) {
        return clearInterval(this.intervalId);
      }
    }, 5000);
  }

  componentWillUnmount() {
    return clearInterval(this.intervalId);
  }
  handleAdoption = (e) => {
    serverAdoptDog()
      .then((dog) => {
        this.props.adoptDog(dog);
      })
      .then(() => {
        deleteDogPerson().then((person) => {
          this.props.removeDogPerson(person);
        });
      })
      .then(() => {
        if (this.props.dogList.length === 2) {
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
    postDogPerson(name).then((newPerson) => {
      this.props.dogListAdd(newPerson);
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
    const dogList = this.props.dogList;

    const dogListMap = dogList.map((person, i) => {
      return (
        <div key={i} className='person'>
          <h3>{person}</h3>
        </div>
      );
    });
    let dogIndex;
    for (let i = 0; i < this.props.dogs.length; i++) {
      dogIndex = this.props.dogs[i];
    }

    // if there is a list of dogs, render them to the page
    let dogHTML;
    if (dogIndex) {
      let dog = dogIndex;
      dogHTML = (
        <div key={dog.id} className='animal'>
          <img alt='animal to adopt' src={dog.imageURL} />
          <div className='content'>
            <h4> {dog.name} </h4>
            <p> Age: {dog.age} </p>
            <p> Breed: {dog.breed} </p>
            <p> {dog.description} </p>
            <p> {dog.story} </p>
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
        <h3> Adoptable Dogs </h3>
        {this.props.dogs.length <= 0 ? <h2> Shelter is empty </h2> : null}
        <div className='list'>{dogHTML}</div>
        <div className='queue'>{dogListMap}</div>{' '}
        {this.props.dogList.length <= 0 ? (
          <h2> Congratulations on your new dog! </h2>
        ) : null}{' '}
      </div>
    );
  }
}
