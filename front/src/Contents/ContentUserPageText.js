import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { loginState, userIdState } from '../Pages/User/UserAtom';
import Button from '../Components/Button';
import * as Api from '../Commons/Api';
import FixModal from './FixModal';

export const StyledToomuchBox = styled.h1`
	margin: ${param => (param.margin ? param.margin : 'none')};
	padding: ${param => (param.padding ? param.padding : 'none')};
	background-color: green;
	color: white;
	font-size: ${param => (param.fontSize ? param.fontSize : 'none')};
`;
const StyledToomuchText = styled.h1`
	margin: ${param => (param.margin ? param.margin : 'none')};
	padding: ${param => (param.padding ? param.padding : 'none')};
	color: gray;
	font-size: ${param => (param.fontSize ? param.fontSize : 'none')};
`;

const ContentUserPageText = ({}) => {
	const [isShow, setIsShow] = useState(false);
	const userId = useRecoilValue(userIdState);
	const [UserInfo, setUserInfo] = useState();
	const loadingUserInfo = async () => {
		console.log(userId);
		const res = await Api.get(`user/${userId}`);
		console.log(res);
		setUserInfo(res.data);
	};

	useEffect(() => {
		loadingUserInfo();
	}, []);

	return (
		<div style={{ display: 'inline-flex' }}>
			<StyledToomuchBox
				fontSize="30px"
				margin="20px 0px 0px 30px"
				padding="5px 50px 0px 50px"
			>
				사용자 건강정보
			</StyledToomuchBox>
			<StyledToomuchText
				margin="20px 0 10px 30px"
				padding="5px 50px 0px 50px"
				fontSize="30px"
			>
				당신은
				<span style={{ color: 'green' }}>
					{UserInfo?.nickName}님이며 나이는{UserInfo?.age}살 몸무게는 {UserInfo?.weight}
				</span>
				입니다
			</StyledToomuchText>

			<Button onClick={() => setIsShow(true)} style={{ marginTop: '30px', weight: '50px' }}>
				회원정보 수정
			</Button>

			{isShow && (
				<FixModal
					show={isShow}
					setShow={setIsShow}
					UserInfo={UserInfo}
					setUserInfo={setUserInfo}
				/>
			)}
		</div>
	);
};

export default ContentUserPageText;
