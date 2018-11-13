import React, { Component } from 'react';
import styled from 'styled-components';

export default class VerticalSliderElements extends Component {
	constructor(props) {
		super(props);
		this.state = {
			touchStartPosition: null
		}
	}

	// Проверяем разницу между стартовой и конечной точками свайпа
	// Если разница больше 100px - определяем в каком направлении был свайп и вызываем родительский метод changeSection(direction)
	// true - наверх
	// false - вниз
	touchEnds(event) {
		const difference = event.nativeEvent.changedTouches[0].clientY - this.state.touchStartPosition;

		if (difference > 0 && difference > 100) {
			this.props.changeSection(true);
		} else if (difference < 0 && difference < -100) {
			this.props.changeSection(false);
		}
	}

	touchStarted(event) {
		const touchYPosition = event.nativeEvent.touches[0].clientY;
		this.setState({touchStartPosition: touchYPosition});
	}

	render() {
		const paginationDots = makeDots(
			this.props.numberOfSections, 
			this.props.currentSection
		);
		const bottomMessage = makeSwipeBottomMessage(
			this.props.currentSection
		);

		return (
			<StyledSliderElements onTouchStart={this.touchStarted.bind(this)}
														onTouchEnd={this.touchEnds.bind(this)}>
				<StyledPagination>
					{paginationDots}	
				</StyledPagination>
				{bottomMessage}
			</StyledSliderElements>
		);
	}
}

/* CREATING ELEMENTS */
function makeDots(maxDots, activeDot) {
	const dots = [];

	for (let i = 0; i < maxDots; i++) {
		if (i === activeDot) 
			dots.push((<div key={i} className="dot dot_current"></div>));
		else 
			dots.push((<div key={i} className="dot"></div>));
	}

	return dots
}

function makeSwipeBottomMessage(currentSection) {
	if (currentSection === 0) {
		return (
			<StyledSwipeBottom>
				<div className="forward-layer">
					<span>Листайте вниз</span>
					<div className="arrow-down"></div>
				</div>
				<div className="backward-elipse"></div>
			</StyledSwipeBottom>
		);
	}
}
/* END CREATING ELEMENTS */

const StyledSliderElements = styled.div`
	width: 100%;
	height: 100vh;
	position: fixed;
	left: 0px;
	top: 0px;
	z-index: 5;
`;

const StyledPagination = styled.div`
	width: 14px;
	height: 56px;
	position: absolute;
	top: calc(50% - 28px);
	right: 27px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.dot {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background-color: white;
		transition: 0.5s;

		&_current {
			background-color: #f78b1f;
		}
	}
`;

const StyledSwipeBottom = styled.div`
	width: 100%;
	height: 85px;
	position: absolute;
	left: 0px;
	bottom: 0px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow-y: hidden;

	.forward-layer {
		position: relative;
		z-index: 2;

		span {
			font-family: 'Lato', sans-serif;
			font-size: 15px;
			line-height: 15px;
			color: white;
		}

		.arrow-down {
			width: 42px;
			height: 20px;
			margin: 15px auto 0;
			background: url('../assets/arrow-down.svg') center no-repeat;
			background-size: contain;
		}
	}

	.backward-elipse {
		width: 630px;
		height: 46px;
		position: absolute;
		left: calc(50% - 315px);
		bottom: -30px;
		border-radius: 50%;
		background-color: rgba(248, 148, 38, 1);
		box-shadow: 0px 0px 30px 15px rgba(248, 148, 38, 1);
	}
`;