import React, { Component } from 'react';
import styled from 'styled-components';

/* !!! 
  Некоторые методы усложнены чтобы была возможность их переиспользовать.
  Например, метод setBreakPoints сделан под использование с любым количеством breakPoints 
!!! */

let interval;

export default class HorizontalSlidesNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderElement: null,
      progressElement: null,
      maxPositions: 3,
      scaleIndent: null,
      scaleWidth: 597,
      scaleBreakpoints: []
    }
  }

  componentDidMount() {
    this.setState({
      sliderElement: document.getElementById('navigation__slider'),
      progressElement: document.getElementById('navigation__progress'),
      scaleIndent: (document.body.clientWidth - this.state.scaleWidth) / 2,
    });

    this.setBreakPoints();
  }

  setBreakPoints() {
    const breakPoints = [];
    const fullPointRange = this.state.scaleWidth / (this.state.maxPositions - 1);

    // Задаем первую точку вручную так как она будет и точкой, и сдвигом, который пригодится для вывода остальных точек в цикле
    const firstPoint = fullPointRange / 2;
    breakPoints.push(firstPoint);

    for (let i = 0; i < this.state.maxPositions - 2; i++) {
      const newBreakPoint = firstPoint + ((i + 1) * fullPointRange);
      breakPoints.push(newBreakPoint);
    }

    this.setState({scaleBreakpoints: breakPoints});
  }

  findNearestPosition(point) {
    const positions = [];

    for (let i = 0; i < this.state.maxPositions; i++) {
      const pointPosition = Math.round((this.state.scaleWidth / (this.state.maxPositions - 1)) * i);
      positions.push(pointPosition);
    }

    const nearestPosition = positions.reduce((currentNearest, position) => {
      const sum1 = (position > point) ? (position - point) : (point - position);
      const sum2 = (currentNearest > point) ? (currentNearest - point) : (point - currentNearest);

      return (sum2 > sum1) ? position : currentNearest;
    });

    return nearestPosition;
  }

  handleTouchStart() {
    clearInterval(interval);
  }

  handleTouchEnd(event) {
    const touchPosition = Math.floor(event.nativeEvent.changedTouches[0].clientX); 
    
    // Если тач закончился за пределами шкалы, то курсор уже находится в конечном положении и анимация возвращения не нужна
    if (touchPosition >  (this.state.scaleIndent + this.state.scaleWidth) ) { 
      return;
    } else if ((touchPosition - this.state.scaleIndent) < 0) { 
      return;
    }

    let newPosition = Math.round(touchPosition - this.state.scaleIndent);
    const nearestPoint = this.findNearestPosition(newPosition);

    interval = setInterval(() => {
      if (newPosition > nearestPoint) {
        console.log(newPosition);
        this.animateSlider(--newPosition);
      } else if (newPosition < nearestPoint) {
        this.animateSlider(++newPosition);
      }
      else {
        clearInterval(interval);
      }
    }, 5);
  }

  handleTouchMove(event) {
    clearInterval(interval);
    const touchPosition = Math.floor(event.nativeEvent.changedTouches[0].clientX); 

    // Проверяем, что курсор не вышел за правую или левую часть шкалы чтобы пользователь не смог увести бегунок за ее пределы.
    if (touchPosition >  (this.state.scaleIndent + this.state.scaleWidth) ) { 
      return;
    } else if ((touchPosition - this.state.scaleIndent) < 0) { 
      return;
    }

    let newPosition = touchPosition - this.state.scaleIndent;
    this.animateSlider(newPosition);
    this.changeNavigationState(newPosition);
  }

  changeNavigationState(newPosition) {
    if (this.props.currentSlide < this.state.maxPositions - 1 &&
        this.state.scaleBreakpoints[this.props.currentSlide] < newPosition) {
      this.props.changeCurrentSlide(1);
    } 
    else if (this.props.currentSlide > 0 &&
              this.state.scaleBreakpoints[this.props.currentSlide  - 1] > newPosition) {
      this.props.changeCurrentSlide(-1);
    }
  }

  animateSlider(newPosition) {
    const slider = this.state.sliderElement;
    const progressBar = this.state.progressElement;

    slider.style.left = newPosition + 'px';
    progressBar.style.width = newPosition + 'px';
  }

	render() {
		return (
			<StyledHorizontalSlidesNavigation>
					<div className="navigation">
						<div className="navigation__scale"></div>
						<div className="navigation__progress"
												id="navigation__progress"></div>
						<div className="navigation__slider"
												id="navigation__slider"
                        onTouchMove={this.handleTouchMove.bind(this)}
                        onTouchEnd={this.handleTouchEnd.bind(this)}
                        onTouchStart={this.handleTouchStart.bind(this)}></div>
					</div>

					<ul className="navigation-headers">
						<li>1988</li>
						<li>2009</li>
						<li>2016</li>
					</ul>
			</StyledHorizontalSlidesNavigation>
		);
	}
}

const StyledHorizontalSlidesNavigation = styled.div`
	width: 646px;
	position: absolute;
	bottom: 30px;
  left: calc(50% - 323px);
  z-index: 10;

	.navigation {
		width: 597px;
		height: 11px;
		margin: 0 auto;
		position: relative;

		&__scale {
			width: 100%;
			height: 100%;
			background: #d1eaff;
			opacity: 0.3;
		}

		&__progress {
			width: 0px;
			height: 100%;
			position: absolute;
			left: 0px;
			top: 0px;
			background: #d1eaff;
		}

		&__slider {
			width: 43px;
			height: 56px;
			position: absolute;
			left: 0px;
      top: -22px;
      transform: translateX(-50%);
			background: url('../assets/slider@2x.png') no-repeat;
			background-size: contain;
		}
	}

	.navigation-headers {
		width: 100%;
		margin: 30px 0 0;
		display: flex;
		justify-content: space-between;

		li {
			font-size: 20px;
			font-family: 'Gotham Pro', sans-serif;
			color: white;
		}
	}
`;