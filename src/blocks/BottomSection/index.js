import React, { Component } from 'react';
import styled from 'styled-components';

import HorizontalSlidesNavigation from './HorizontalSlidesNavigation';

export default class BottomSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      sliderElement: null,
      clientWidth: null
    }
  }

  componentDidMount() {
    this.setState({
      sliderElement: document.getElementById('horizontal-slider'),
      clientWidth: document.body.clientWidth
    });
  }

  changeCurrentSlide(number) {
    // Использует конструкцию Promise().then() чтобы гарантированно дождаться обновления состояния и только потом изменить слайд
    new Promise((resolve) => {
      resolve(
        this.setState((prevState) => ({
          currentSlide: prevState.currentSlide + number
        }))
      )
    }).then(() => {
      const slider = this.state.sliderElement;
      const shift = -(this.state.currentSlide * this.state.clientWidth);
      slider.style.left = shift + 'px';
    });
  }

	render() {
		return (
			<StyledSection>
				<StyledSlides id="horizontal-slider">
          <div className="slide slide_1">
            <h2>Звенья патогенеза СД2</h2>
            <div className="slide__scheme_1"></div>
            <div className="slide__shards_1"></div>
          </div>
          <div className="slide slide_2">
            <h2>Смертельный октет</h2>
            <div className="slide__scheme_2"></div>
            <div className="slide__shards_2"></div>
          </div>
          <div className="slide slide_3">
            <h2>Звенья патогенеза СД2</h2>
            <div className="slide__scheme_3"></div>
            <div className="slide__shards_3"></div>
          </div>
				</StyledSlides>
				<HorizontalSlidesNavigation currentSlide={this.state.currentSlide}                            changeCurrentSlide={this.changeCurrentSlide.bind(this)} />
			</StyledSection>
		);
	}
}

const StyledSection = styled.div`
	width: 100%;
	height: 100vh;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`;

const StyledSlides = styled.div`
	width: 3072px;
	height: 100vh;
	position: absolute;
	left: 0px;
  top: 0px;
  transition: 0.5s;

  h2 {
    width: max-content;
    margin: 115px 0 0 84px;
    font-size: 30px;
    font-family: 'Gotham Pro';
    font-weight: 300;
    text-align: center;
    color: white;
  }
  
  .slide {
    width: 1024px;
    height: 100vh;
    position: absolute;
    top: 0px;

    &_1 {
      left: 0px;
    }

    &_2 {
      left: 1024px;
    }

    &_3 {
      left: 2048px;
    }

    &__scheme {
      &_1 {
        width: 578px;
        height: 329px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: url('../assets/horizontal-slider__slide_1@2x.png') no-repeat;
        background-size: contain; 
      }

      &_2 {
        width: 756px;
        height: 472px;
        position: absolute;
        left: 160px;
        bottom: 139px;
        background: url('../assets/horizontal-slider__slide_2@2x.png') no-repeat;
        background-size: contain; 
      }

      &_3 {
        width: 909px;
        height: 503px;
        position: absolute;
        left: 53px;
        bottom: 117px;
        background: url('../assets/horizontal-slider__slide_3@2x.png') no-repeat;
        background-size: contain; 
      }
    }

    &__shards {
      &_1 {
        width: 928px;
        height: 647px;
        position: absolute;
        left: 21px;
        bottom: 11px;
        background: url('../assets/horizontal-slider__shards_1@2x.png') no-repeat;
        background-size: contain;
      }

      &_2 {
        width: 928px;
        height: 647px;
        position: absolute;
        left: 21px;
        bottom: 11px;
        transform: scaleX(-1);
        background: url('../assets/horizontal-slider__shards_3@2x.png') no-repeat;
        background-size: contain;
      }

      &_3 {
        width: 1048px;
        height: 683px;
        position: absolute;
        left: 0px;
        bottom: -23px;
        background: url('../assets/horizontal-slider__shards_3@2x.png') no-repeat;
        background-size: contain;
      }
    }
  }
`;