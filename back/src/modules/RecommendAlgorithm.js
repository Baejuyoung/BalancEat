// 알고리즘의 원리 및 구조도는 같은 이름의 md파일로 저장되있습니다. 참고 바랍니다.
import { Nutrition, Recommend_nutrition } from '../DB/index.js';

class Recommend {
	static async recommendSystem(age, sex, weight, eat, isLogin) {
		let eatNutrition = [0, 0, 0];
		eat.forEach(food => {
			eatNutrition[0] += food.carbon;
			eatNutrition[1] += food.protein;
			eatNutrition[2] += food.fat;
		});

		let ageRange;
		if (age >= 15 && age <= 18) {
			ageRange = '15-18';
		} else if (age >= 19 && age <= 29) {
			ageRange = '19-29';
		} else if (age >= 30 && age <= 49) {
			ageRange = '30-49';
		} else if (age >= 50 && age <= 64) {
			ageRange = '50-64';
		} else if (age >= 65 && age <= 74) {
			ageRange = '65-74';
		} else if (age >= 75) {
			ageRange = '>75';
		}

		let result = [];

		if (isLogin) {
			// const userInfo = await UserModel.findById({ User_id: login });
			console.log('로그인 후 사용가능한 기능입니다.');
			const ErrorMessage = '로그인 기능 아직 없음. 나오면 이상한거임.';
			return ErrorMessage;
		}
		const personInfo = await Recommend_nutrition.getinfo({ ageRange, sex });

		let temp = [
			personInfo.carbon * weight,
			personInfo.protein * weight,
			personInfo.fat * weight,
		];
		const temp2 = [temp[0] / 10, temp[1] / 10, temp[2] / 10];

		temp = [
			Math.max(0, temp[0] - eatNutrition[0]),
			Math.max(0, temp[1] - eatNutrition[1]),
			Math.max(0, temp[2] - eatNutrition[2]),
		];

		const nutrientTable = [
			[
				Math.max(0, temp[0] + temp2[0]),
				Math.max(0, temp[1] + temp2[1]),
				Math.max(0, temp[2] + temp2[2]),
			],
			temp,
			[
				Math.max(0, temp[0] - temp2[0]),
				Math.max(0, temp[1] - temp2[1]),
				Math.max(0, temp[2] - temp2[2]),
			],
		];

		let recommendFood = [];
		let isResult = false;

		if (nutrientTable[2].reduce((x, y) => x + y) <= 0) {
			const randomFood = await Nutrition.findFood();

			result.push('충분한 음식을 섭취하셨습니다. 내일 이걸 드셔보시는 것은 어떨까요?');
			result.push(randomFood[parseInt(Math.random() * randomFood.length)]);
			isResult = true;
		} else {
			recommendFood = await Nutrition.findManyByNutrition([
				nutrientTable[2][0],
				nutrientTable[2][1],
				nutrientTable[2][2],
				nutrientTable[1][0],
				nutrientTable[1][1],
				nutrientTable[1][2],
			]);
			// console.log('leng =', recommendFood.length);
		}

		if (isResult === true) {
		} else if (recommendFood.length === 1) {
			result.push(recommendFood[parseInt(Math.random() * recommendFood.length)]);
			isResult = true;
		} else if (recommendFood.length > 1) {
			result.push(recommendFood[parseInt(Math.random() * recommendFood.length)]);
			result.push(recommendFood[parseInt(Math.random() * recommendFood.length)]);
			isResult = true;
		} else {
			recommendFood = await Nutrition.findManyByNutrition([
				nutrientTable[2][0],
				nutrientTable[2][1],
				nutrientTable[2][2],
				nutrientTable[0][0],
				nutrientTable[0][1],
				nutrientTable[0][2],
			]);
			// console.log('leng2 = ', recommendFood.length);
		}

		if (isResult === true) {
		} else if (recommendFood.length === 1) {
			result.push(recommendFood[parseInt(Math.random() * recommendFood.length)]);
		} else if (recommendFood.length > 1) {
			result.push(recommendFood[parseInt(Math.random() * recommendFood.length)]);
			result.push(recommendFood[parseInt(Math.random() * recommendFood.length)]);
		} else {
			recommendFood = await Nutrition.findManyByNutrition2([
				nutrientTable[0][0],
				nutrientTable[0][1],
				nutrientTable[0][2],
			]);
			result.push(
				'영양소 섭취가 매우 부족합니다. 많은 음식을 섭취할 필요가 있는 것 같습니다.', //! 경고메세지는 일도님과 상의 후 결정.
			);
			result.push(recommendFood[parseInt(Math.random() * recommendFood.length)]);
		}

		// console.log(result);

		return { personInfo, result };
	}
}
export { Recommend };
