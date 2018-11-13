import React, { Component } from 'react';
import styled from 'styled-components';

import VerticalSliderElements from './blocks/VerticalSliderElements';
import TopSection from './blocks/TopSection';
import MiddleSection from './blocks/MiddleSection';
import BottomSection from './blocks/BottomSection/';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfSections: 3,
      currentSection: 0,
      viewElement: null,
      parallaxLayer: null
    }
  }

  componentDidMount() {
    this.setState({
      viewElement: document.getElementById('main'),
      parallaxLayer: document.getElementById('vertical-slider__parallax-layer')
    });
  }

  changeSection(direction) {
    // обернул if в promise так как setState - асинхронный метод, а нам требуется сначала изменить состояние и только после этого сдвинуть view
    new Promise((resolve, reject) => {
      if (direction && this.state.currentSection > 0) {
        resolve(
          this.setState((prevState) => ({
            currentSection: prevState.currentSection - 1
          }))
        );
      } else if (!direction && this.state.currentSection < 2) {
        resolve(
          this.setState((prevState) => ({
            currentSection: prevState.currentSection + 1
          }))
        )
      } else {
        reject();
      }
    }).then(res => {
      this.changeViewPosition();
      this.changeParallaxLayerPosition();
    }).catch(err => {});
  }

  changeParallaxLayerPosition() {
    const element = this.state.parallaxLayer;
    const shift = 998 + (-this.state.currentSection * 200);

    element.style.top = shift + 'px';
  }

  changeViewPosition() {
    const element = this.state.viewElement;
    const shift = this.state.currentSection * 768;

    element.style.top = -shift + 'px';
  }

  render() {
    return (
      <StyledMain id="main">
        <VerticalSliderElements numberOfSections={this.state.numberOfSections}
                                currentSection={this.state.currentSection}
                                changeSection={this.changeSection.bind(this)} />
        <TopSection />
        <MiddleSection />
        <StyledParallaxLayer src="../assets/parallax-layer@2x.png" 
                          alt="parallax-layer"
                          id="vertical-slider__parallax-layer"/>
        <BottomSection />
      </StyledMain>
    );
  }
}

/* STYLES */
const StyledMain = styled.div`
  width: 1024px;
  height: 2304px;
  position: fixed;
  top: 0px;
  left: 0px;
  overflow-y: hidden;
  background: url('../assets/background.png') no-repeat;
  background-size: contain;
  transition: 0.5s;
  overflow: hidden;
`;

const StyledParallaxLayer = styled.img`
  width: 1010px;
  height: 627px;
  position: absolute;
  left: 82px;
  top: 998px;
  transition: 0.5s;
`;
/* END STYLES */