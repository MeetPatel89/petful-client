import React, { Component } from 'react';

const AppContext = React.createContext({
  users: [],
  queue: null,
  userName: '',
  currentCat: {},
  currentDog: {},
  adopted: [],
  error: null,

  setUsers: () => {},
  clearUsers: () => {},

  setQueue: () => {},
  clearQueue: () => {},

  setUserName: () => {},
  clearUserName: () => {},

  setCurrentCat: () => {},
  clearCurrentCat: () => {},

  setCurrentDog: () => {},
  clearCurrentDog: () => {},

  setAdopted: () => {},
  clearAdopted: () => {},

  setError: () => {},
  clearError: () => {},

  randomCatDog: () => {},

  cycleList: () => {},
});

export default AppContext;

export class AppContextProvider extends Component {
  state = {
    users: [],
    queue: null,
    userName: '',
    currentCat: {},
    currentDog: {},
    adopted: [],
    error: null,
  };
  //set + clear user
  setUsers = (users) => {
    this.setState({ users });
  };

  clearUsers = () => {
    this.setState({ users: [] });
  };
  // set + clear queue of users

  setQueue = (queue) => {
    this.setState({ queue });
  };

  clearQueue = () => {
    this.setState({ queue: null });
  };
  // set username + clear
  setUserName = (userName) => {
    this.setState({ userName });
  };

  clearUserName = () => {
    this.setState({ userName: '' });
  };
  //set cat top of queue
  setCurrentCat = (currentCat) => {
    this.setState({ currentCat });
  };

  clearCurrentCat = () => {
    this.setState({ currentCat: {} });
  };
  //set dog top of queue
  setCurrentDog = (currentDog) => {
    this.setState({ currentDog });
  };

  clearCurrentDog = () => {
    this.setState({ currentDog: {} });
  };
  // set error
  setError = (error) => {
    console.log(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };
  //set + clear adopted
  setAdopted = (adopted) => {
    this.setState({ adopted: [...this.state.adopted, adopted] });
  };

  clearAdopted = () => {
    this.setState({ adopted: [] });
  };
  // random cat or dog top of queue
  randomCatDog = () => {
    let coin = Math.floor(Math.random() * 100);
    if (coin < 50) {
      this.handleAdoptCat();
    } else {
      this.handleAdoptDog();
    }
  };
  //cycle list????
  cycleList = () => {
    if (this.context.userName !== this.context.queue.first.value) {
      setTimeout(function () {
        this.randomCatDog();
      }, 5000);
    }
  };

  render() {
    const value = {
      users: this.state.users,
      queue: this.state.queue,
      userName: this.state.userName,
      currentCat: this.state.currentCat,
      currentDog: this.state.currentDog,
      adopted: this.state.adopted,
      error: this.state.error,
      setUsers: this.setUsers,
      clearUsers: this.clearUsers,
      setQueue: this.setQueue,
      clearQueue: this.clearQueue,
      setUserName: this.setUserName,
      clearUserName: this.clearUserName,
      setCurrentCat: this.setCurrentCat,
      clearCurrentCat: this.clearCurrentCat,
      setCurrentDog: this.setCurrentDog,
      clearCurrentDog: this.clearCurrentDog,
      setAdopted: this.setAdopted,
      clearAdopted: this.clearAdopted,
      setError: this.setError,
      clearError: this.clearError,
      randomCatDog: this.randomCatDog,
      cycleList: this.cycleList,
    };

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
