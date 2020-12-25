import React, { Component } from 'react';
import CarouselComponent from './Carousel';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <CarouselComponent/>
        <h1 className="carousel-slider">Carousel Slider</h1>
      </div>
    );
  }
}

export default App;
