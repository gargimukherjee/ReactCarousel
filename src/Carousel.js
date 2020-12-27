/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import CarouselSliderComponent from './CarouselSlider';
import './Carousel.css';

class CarouselComponent extends Component {
  constructor(){  
    super()
    this.previousBtn = React.createRef();
    this.nextBtn = React.createRef();
    this.carousel = React.createRef();
    this.carouselSlider = React.createRef();

    this.state = {
      levelNames : [
      'Manufacturing Strategy & Footprint',
      'Facility Asset Build, Acquisition and Disposal',
      'Produce/Manufacture',
      'Inventory and Warehouse Management',
      'Food Safety, Quality and Regulatory Management',
      'Build and Manufacturing Strategy & Footprint',
      'Build and Manufacturing Strategy & Footprint2',
      'Produce/Manufacture/Co-operative',
      ]
    }

  this.gapMargin = 1;
  this.visibleTileCount = 1;
  this.containerWidth = 0;
  this.firstVisibleTileIndex = 0;
  this.tileWidth;
  this.minTileWidth = 200;
  this.debouce;
    
  this.tiles;
  this.selectedIndex = 0;
  this.content;   
}

componentDidMount(){
  this.previousBtn.current.style.opacity = 0.5;
  this.previousBtn.current.disabled = true;
  this.debouce = setTimeout(function(){
    this.firstVisibleTileIndex = this.selectedIndex;
    this.setTiles();
  }.bind(this), 200)

  window.addEventListener('resize', this.callOnResizeStop);
}

/**
 * Function to be called when window resizing stops
 */
callOnResizeStop = () => {
  clearTimeout(this.debouce)
  this.debouce = setTimeout(function(){
      this.firstVisibleTileIndex = this.selectedIndex;
      this.setTiles();
  }.bind(this), 200)
}

/**
 * Set the tiles in the viewport 
 */
setTiles = () => {
  this.containerWidth = this.carouselSlider.current.clientWidth;
  this.minTileWidth = (this.containerWidth > 200) ? 200 : this.containerWidth;
  this.tileWidth = this.assessTileWidthAsPerContainerWidth();
  this.updateTilesWidth(this.tileWidth)
  this.assessFirstVisibleIndex();
  this.updateTranslateX();
  this.assessNextButtonVisibility();
}

/**
 * Set width of each tile as per window resizing
 */
assessTileWidthAsPerContainerWidth(){
  let tileVisibleCount = 1;
  let tileWidthWithPadingAndMargin = this.minTileWidth + this.gapMargin;
  let visibleTilesCumilativeWidth = tileWidthWithPadingAndMargin;
  while(true){
      if(visibleTilesCumilativeWidth + tileWidthWithPadingAndMargin > this.containerWidth){
          break;
      }
      tileVisibleCount += 1;
      visibleTilesCumilativeWidth += this.minTileWidth
  }
  this.visibleTileCount = tileVisibleCount
  let extraSpace = this.containerWidth - visibleTilesCumilativeWidth;
  let increaseTileWithBy = extraSpace / tileVisibleCount;
  let tileWidthShouldBe = Math.round(this.minTileWidth + increaseTileWithBy);
  return tileWidthShouldBe -  this.gapMargin;
}

/**
 * Show previous tile on click of previous button
 */
showPreviousTile = () => {
    this.firstVisibleTileIndex -=1;
    this.assessNextButtonVisibility();
    this.updateTranslateX();
    if(this.firstVisibleTileIndex === 0){
        this.previousBtn.current.style.opacity = 0.5; 
        this.previousBtn.current.disabled = true;
    }
}

/**
 * Show next tile on click of next button
 */
showNextTile = () => {
  this.firstVisibleTileIndex +=1;
  this.previousBtn.current.style.opacity = 1;
  this.previousBtn.current.disabled = false;
    this.assessNextButtonVisibility();
    this.updateTranslateX();
}

/**
 * Translate animation and calculations for each slide
 */
updateTranslateX(){
   this.carousel.current.style.transform = "translateX(" + (-1*this.tileWidth)*this.firstVisibleTileIndex + "px)";
}

/**
 * Determines the visibility of next button
 */
assessNextButtonVisibility(){
    let nextMove = this.visibleTileCount + this.firstVisibleTileIndex;
    if(nextMove < this.state.levelNames.length){
      this.nextBtn.current.style.opacity = 1; 
      this.nextBtn.current.disabled = false;
    } else {
      this.nextBtn.current.style.opacity = 0.5; 
      this.nextBtn.current.disabled = true;
    }
}

/**
 * 
 * @param {*} tiles 
 * @param {*} content 
 * Get Data from the server or local data
 */
getData = (tiles,content) => {
  this.tiles = tiles;
  this.content = content;
}

/**
 * Updates tiles width
 * @param {*} width 
 */
updateTilesWidth(width){
  let iLen = this.tiles.length
  for(let i = 0; i < iLen; i++){
      let ele = this.tiles[i]
      ele.style.width = width + "px";
  }
  this.carousel.current.style.width = (width * iLen)+"px";
}


/**
 * Determines the position and visibility of the card at the first index
 */
assessFirstVisibleIndex(){
  if(this.visibleTileCount + this.firstVisibleTileIndex > this.state.levelNames.length) {
      this.firstVisibleTileIndex = this.state.levelNames.length - this.visibleTileCount;
  }
}

render() {
  return (
        <div className="container">
          <div className="carousel-component">
              <button className="carousel-slick-prev" ref={this.previousBtn} id="previousBtn" onClick={this.showPreviousTile}></button>
              <div className="carousel-tile-container" ref={this.carouselSlider} id="carouselSlider">
              <ul ref={this.carousel} id="carousel">
                <CarouselSliderComponent levelNames={this.state.levelNames} sendData={this.getData}
                  />  
              </ul>
              </div>
              <button className="carousel-slick-next" ref={this.nextBtn} id="nextBtn" onClick={this.showNextTile}></button>
          </div>
      </div>
  );
  }};

export default CarouselComponent;
