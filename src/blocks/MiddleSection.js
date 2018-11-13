import React, { Component } from 'react';
import styled from 'styled-components';

export default class MiddleSection extends Component {
	render() {
		return (
			<StyledSection>
				<h2>Основа терапии — патогенез СД2</h2>
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
	
	h2 {
		width: 460px;
		margin-bottom: 120px;
		font-size: 50px;
		font-family: 'Lato', sans-serif;
		font-weight: 300;
		text-align: center;
		color: white;
	}
`;