import React, { Component } from 'react';
import AppContext from '../context/context';
import CatsService from '../services/cat-service';
import DogsService from '../services/dog-service';
import UsersService from '../services/user-service';
import Line from '../Components/Line';
import PetInfo from '../Components/Petinfo';
import Adopted from '../Components/Adopted';
import Queue from '../services/queue';

class AdoptionPage extends Component {
  static contextType = AppContext;

  componentDidMount() {
    this.context.clearError();
    this.context.clearQueue();
    this.context.clearCurrentCat();
    this.context.clearCurrentDog();

    //set interval line 22
    this.interval = setInterval(this.cycleList.bind(this), 15000);
    Promise.all([
      CatsService.getCat(),
      DogsService.getDog(),
      UsersService.getUsers(),
    ])
      .then((res) => {
        this.context.setCurrentCat(res[0]);
        this.context.setCurrentDog(res[1]);
        let userQueue = new Queue();
        res[2].forEach((user) => userQueue.enqueue(user));
        this.context.setQueue(userQueue);
      })
      .catch((e) => console.error(e));
  }

  cycleList = () => {
    if (this.context.userName !== this.context.queue.first.value) {
      let coin = Math.floor(Math.random() * 100);
      if (coin < 50) {
        this.handleAdoptCat();
      } else {
        this.handleAdoptDog();
      }
    }
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderLine() {
    // console.log(this.context.queue.first.value)

    return (
      <Line
        first={this.context.queue.first.value}
        second={this.context.queue.first.next.value}
        third={this.context.queue.first.next.next.value}
      />
    );
  }

  renderCat() {
    return (
      <PetInfo
        animal={this.context.currentCat}
        animalType={'cat'}
        handleAdoptClick={this.handleAdoptCat}
      />
    );
  }
  renderDog() {
    return (
      <PetInfo
        animal={this.context.currentDog}
        animalType={'dog'}
        handleAdoptClick={this.handleAdoptDog}
      />
    );
  }
  // arrow function makes context global instead of the context being a part of
  // in a constructor func the context would look directly to handleAdoptCat instead of to context. so must
  // use an arrow function in this case.
  handleAdoptCat = () => {
    return CatsService.deleteCat()
      .then((res) => {
        let owner = this.context.queue.requeue();
        res.owner = owner;
        this.context.setAdopted(res);
      })
      .then((res) => {
        CatsService.getCat().then((res) => this.context.setCurrentCat(res));
        this.setState({ nowAdopting: this.context.queue.first.value });
      });
  };

  handleAdoptDog = () => {
    return DogsService.deleteDog()
      .then((res) => {
        let owner = this.context.queue.requeue();
        res.owner = owner;
        this.context.setAdopted(res);
      })
      .then((res) => {
        DogsService.getDog().then((res) => this.context.setCurrentDog(res));
        this.setState({ nowAdopting: this.context.queue.first.value });
      });
  };

  render() {
    const petAdopted = this.context.adopted.map((animal, index) => (
      <div className='adopted' key={index}>
        <Adopted
          imgSrc={animal.imageURL}
          name={animal.name}
          owner={animal.owner}
        />
      </div>
    ));

    return (
      <div>
        <h1>Your Fur Baby Awaits</h1>
        {this.context.queue ? this.renderLine() : 'Loading Pets! ...'}

        <div className='Pets-available'>
          <h2>Available Pets</h2>
          <div className='cat'>
            <h3>Cat</h3>
            {this.renderCat()}
          </div>
          <div className='dog'>
            <h3>Dog</h3>
            {this.renderDog()}
          </div>
        </div>
        <div className='Pets-adopted'>
          <h3>Adopted</h3>
          {petAdopted}
        </div>
      </div>
    );
  }
}
export default AdoptionPage;
