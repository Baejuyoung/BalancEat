import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
	width: 623px;
	height: 230px;
	border: 2px solid #c8c8c8;
	margin-top: 70px;
	padding: 30px;
`;

const StyledInput = styled.input`
	width: 50px;
	height: 20px;
	border: 1px solid #cecfcd;
`;

const StyledButton = styled.button`
	width: 70px;
	background-color: ${props => (props.color ? props.color : 'none')};
	border: 1px solid ${props => (props.color ? props.color : 'none')};
	color: white;
	font-size: 1rem;
	margin: ${props => (props.margin ? props.margin : 'none')};
	cursor: pointer;
`;

const BmiCalculator = () => {
	const [cm, setCm] = useState(0);
	const [kg, setKg] = useState(0);
	const [bmi, setBmi] = useState(0);

	useEffect(() => {
		if (!isNaN(bmi) && kg !== 0 && cm !== 0) {
			setBmi((kg / (cm / 100) ** 2).toFixed(2));
		} else if (isNaN(bmi) && kg === 0 && cm === 0) {
			setBmi(0);
		} else if (bmi === 'Infinity') {
			setKg(0);
			setCm(0);
		}

		if (kg === 0 || cm === 0) {
			setBmi(0);
		}

		if (cm === '') {
			setCm(0);
		} else if (cm < 0) {
			setCm(0);
		}
		if (kg === '') {
			setKg(0);
		} else if (kg < 0) {
			setKg(0);
		}
	}, [kg, cm, bmi]);

	const resetBMI = () => {
		setCm(0);
		setKg(0);
	};

	return (
		<>
			<StyledContainer>
				<form onSubmit={evt => evt.preventDefault()}>
					신장{' '}
					<StyledInput
						type="number"
						min="0"
						value={cm}
						onChange={evt => setCm(Number(evt.target.value))}
					/>{' '}
					cm / 체중{' '}
					<StyledInput
						type="number"
						min="0"
						value={kg}
						onChange={evt => setKg(Number(evt.target.value))}
					/>{' '}
					kg
					<StyledButton
						type="submit"
						onClick={resetBMI}
						color="#3b3d3b"
						margin="0 0 0 240px"
					>
						초기화
					</StyledButton>
				</form>
				<br />
				당신의 BMI 지수는 {bmi} 입니다.
				<img src="/bmi.png" style={{ maxWidth: '560px' }} />
			</StyledContainer>
		</>
	);
};

export default BmiCalculator;
