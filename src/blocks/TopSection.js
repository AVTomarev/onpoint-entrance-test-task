import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

export default class TopSection extends Component {
	render() {
		return (
			<StyledSection>
				<StyledHeader>Всегда ли цели терапии СД2 на поверхности?</StyledHeader>

				<StyledList>
					<div className="item item_1">
						<Circle radius="51px" />
						<span>Цель по HbA1c</span>
					</div>
					<div className="item item_2">
						<span>Гипогликемия</span>
						<Circle radius="27px" />
					</div>
					<div className="item item_3">
						<span>Осложнения СД</span>
						<Circle radius="16px" />
					</div>
					<div className="item item_4">
						<span>СС риски</span>
						<Circle radius="16px" />
					</div>
				</StyledList>
			</StyledSection>
		);
	}
}


/* ELEMENTS */
function Circle(props) {
	return (
		<StyledCircle radius={props.radius}>
			<div></div>
		</StyledCircle>
	);
}
/* END ELEMENTS */

/* STYLES */
const StyledSection = styled.div`
	width: 100%;
	height: 100vh;
	position: relative;
`;

const StyledHeader = styled.h2`
	width: 715px;
	position: absolute;
	margin: 132px 0 0 74px;
	font-size: 50px;
	font-family: 'Lato', sans-serif;
	color: #0d319c;
`; 

const StyledList = styled.div`
	.item {
		position: absolute;
		display: flex;
		font-family: 'Lato', sans-serif;
		font-size: 20px;
		color: #0d319c;
	
		&_1 {
			left: 561px;
    	top: 260px;
			align-items: center;

			span {
				padding-left: 12px;
			}
		}

		&_2 {
			left: 224px;
    	top: 393px;
			flex-direction: column;
			align-items: center;

			span {
				padding-bottom: 8px;
			}
		}

		&_3 {
			left: 373px;
    	top: 502px;
			flex-direction: column;
			align-items: center;

			span {
				padding-bottom: 8px;
			}

			& > div {
				margin-left: 80px;
			}
		}

		&_4 {
			left: 788px;
    	top: 487px;
			flex-direction: column;
			align-items: center;

			span {
				padding-bottom: 8px;
			}
		}
	}
`;

const pulse = keyframes`
  from { 
		transform: translate(-50%, -50%) scale(0);	
		background-color: rgba(247, 139, 31, 1); 
	}
  to { 
		transform: translate(-50%, -50%) scale(1);
		background-color: rgba(247, 139, 31, 0); 
	}
`;

const StyledCircle = styled.div`
  width: ${props => props.radius};
  height: ${props => props.radius};
  position: relative;
  border: 2px solid #d74829;
  border-radius: 50%;
  background-color: rgba(247, 139, 31, 0.4);

  &:after,
  &:before,
  & > div {
    content: '';
    width: ${props => props.radius};
    height: ${props => props.radius};
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    display: block;
    border: 2px solid #d74829;
    border-radius: 50%;
    background-color: rgba(247, 139, 31, 0.4);
    animation: ${pulse} 3s linear infinite;
  }

	&:before {
    animation-delay: 1s;
  }

  & > div {
    animation-delay: 2s;
  }
`;
/* END STYLES */