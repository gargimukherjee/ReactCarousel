/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import './CarouselSlider.css';

class CarouselSliderComponent extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.content = document.getElementsByClassName('carousel-content');
    this.tiles = document.getElementsByClassName('carousel-tiles');
    this.props.sendData(this.tiles, this.content);
  }

  selectTile = (e) => {
    console.log(e.target);
    console.log(e.currentTarget);
    let selectedTile = e.currentTarget;
   
    for(let i=0;i<this.content.length;i++){
        this.content[i].classList.remove("carousel-slick-current");
        if(this.content[i] === selectedTile){
            this.selectedIndex = i;
        }
    }
    selectedTile.classList.add("carousel-slick-current");
  }

  render(){
    let levelNames = this.props.levelNames;
    return ( 
      levelNames.map((level) => {
       return(
          <li className="carousel-tiles" key={level}>
          <div className="carousel-box">
              <p className="carousel-content" onClick={this.selectTile}>
              <span className="carousel-slider-text">{level}
              </span>
              </p>
          </div>
      </li>
      )
      })
    );
  };

}

export default CarouselSliderComponent;
