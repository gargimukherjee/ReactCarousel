import React, { Component } from 'react';
import './Carousel.css';

class CarouselComponent extends Component {
  constructor(){  
    super()

    this.state = [
      'Manufacturing Strategy & Footprint',
      'Facility Asset Build, Acquisition and Disposal',
      'Produce/Manufacture',
      'Inventory and Warehouse Management',
      'Food Safety, Quality and Regulatory Management',
      'Build and Manufacturing Strategy & Footprint',
      'Produce/Manufacture/Co-operative',
      'Inventory and Warehouse',
      'Produce/Manufacture/Co-operative',
      'Inventory and Warehouse',
    ]
  }

  render() {
    let levelNames = this.state.map(function(level){
      return <li class="carousel-tiles">
      <div class="carousel-box">
          <p class="carousel-content">
          <span class="carousel-slider-text">{level}
          </span>
          </p>
      </div>
    </li>
    })

    return (
      <div className="App">
         <div class="container">
          <div class="banner">
            <div class="banner-headings">
                <p class="sub-heading">Make</p>
                <p class="heading">Schedule to Produce</p>
            </div>
            <div class="carousel-component">
                <button class="carousel-slick-prev" id="previousBtn"></button>

                <div class="carousel-tile-container" id="carouselSlider">
                <ul id="carousel">
                  { levelNames }  
                </ul>
                </div>

                <button class="carousel-slick-next" id="nextBtn"></button>

            </div>
        </div>
      </div>
      </div>
    );
  }
}

export default CarouselComponent;
