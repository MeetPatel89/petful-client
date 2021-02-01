
import React, { Component } from 'react';
import CatAdoption from './components/CatAdoption';
import DogAdoption from './components/DogAdoption';
import HomePage from './components/HomePage';
import {
  fetchPeople,
  fetchPets,
  fetchDogs,
  fetchCats,
  fetchDogList,
  fetchCatList,
} from './services/main-service';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class App extends Component {
  state = {
    people: [],
    pets: [],
    catList: [],
    dogList: [],
    cats: [],
    dogs: [],
    error: null,
  };

  removeDogPerson = () => {
    fetchDogList().then((value) =>
      this.setState({
        dogList: value,
      })
    );
  };

  removeCatPerson = () => {
    fetchCatList().then((value) =>
      this.setState({
        catList: value,
      })
    );
  };

  dogListAdd = (newPerson) => {
    this.setState({
      dogList: [...this.state.dogList, newPerson],
    });
  };

  catListAdd = (newPerson) => {
    this.setState({
      catList: [...this.state.catList, newPerson],
    });
  };

  adoptCat = () => {
    this.setState({ cats: this.state.cats.slice(1) });
    fetchCats().then((value) =>
      this.setState({
        cats: value,
      })
    );
  };

  adoptDog = () => {
    this.setState({ dogs: this.state.dogs.slice(1) });
    fetchDogs().then((value) =>
      this.setState({
        dogs: value,
      })
    );
  };

  componentDidMount() {
    let promises = [
      fetchPeople(),
      fetchPets(),
      fetchDogs(),
      fetchCats(),
      fetchDogList(),
      fetchCatList(),
    ];

    Promise.all(promises)
      .then((values) =>
        this.setState({
          people: values[0],
          pets: values[1],
          dogs: values[2],
          cats: values[3],
          dogList: values[4],
          catList: values[5],
        })
      )
      .catch((error) => {
        this.setState({
          error,
        });
      });
  }
  render() {
    return (
      <Router>
        <div className='App'>
          <Route exact path='/' component={HomePage} />
          <Route
            path='/cat-adopt'
            render={(props) => (
              <CatAdoption
                {...props}
                adoptCat={this.adoptCat}
                removeCatPerson={this.removeCatPerson}
                catListAdd={this.catListAdd}
                catList={this.state.catList}
                cats={this.state.cats}
              />
            )}
          />
          <Route
            path='/dog-adopt'
            render={(props) => (
              <DogAdoption
                {...props}
                adoptDog={this.adoptDog}
                removeDogPerson={this.removeDogPerson}
                dogListAdd={this.dogListAdd}
                dogList={this.state.dogList}
                dogs={this.state.dogs}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}
