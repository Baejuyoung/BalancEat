import React, { useState, useContext } from 'react';

import { RecommandContext } from './RecommandContext';
import { FoodDataContext } from './ContentRecommand';

import FoodCard from '../../Components/FoodCard';
import ContentLabel from '../../Components/ContentLabel';
import ModalComp from '../../ModalComp';
import { SubContainer, LargeButton, CardContainerRow } from '../../Contents/Styles/styleContents';
import FoodInformationForm from './FoodInformationForm';
import { ValidateArray } from '../../Commons/consts';

/* 데이터 수신은 inputForm 상태에서 진행. 데이터수신 후 파싱까지 마치고 RecsysOutput이 로딩  */
/* 파싱된 데이터 prop으로 전달..? */
const RecsysOutput = ({}) => {
	const title = '식단 추천';
	const subtitle = '균형 잡힌 영양을 위한 식단입니다';
	const [showDialog, setShowDialog] = useState(false);
	const [selectedFoodData, setSelectedFoodData] = useState(null);
	const { foodData } = useContext(FoodDataContext);
	const { dispatch } = useContext(RecommandContext);

	const handleClick = () => {
		dispatch({ type: 'RESET' });
	};
	/*예도 리팩토링. foodName을 id로 사용, FoodCard 자동으로 뿌리도록 변경. */
	const handleDetail = e => {
		e.preventDefault();
		console.log(e.target, e.target.id);
		setSelectedFoodData(foodData[e.target.id]);
		setShowDialog(true);
	};

	const drawFoodCards = foodData => {
		if (ValidateArray(foodData)) {
			return foodData.map((el, i) => (
				<FoodCard key={i} id={i} clickHandler={handleDetail} foodData={el} />
			));
		}
		return;
	};

	return (
		<SubContainer fluid>
			<ContentLabel title={title} subtitle={subtitle} />

			<CardContainerRow>
				{drawFoodCards(foodData)}
				{/* <FoodCard id="0" clickHandler={handleDetail} foodData={foodData[0]} />
				<FoodCard id="1" clickHandler={handleDetail} foodData={foodData[1]} />
				<FoodCard id="2" clickHandler={handleDetail} foodData={foodData[2]} /> */}
			</CardContainerRow>
			<LargeButton variant="success" onClick={handleClick}>
				<h3>돌아가기 {'>'}</h3>
			</LargeButton>
			<ModalComp
				show={showDialog}
				setShow={setShowDialog}
				title={'음식정보'}
				main={<FoodInformationForm FoodData={selectedFoodData} />}
			/>
		</SubContainer>
	);
};

export default RecsysOutput;
