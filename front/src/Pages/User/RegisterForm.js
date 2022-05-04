import { Form } from 'react-bootstrap';

import React, { useState } from 'react';
import { StyledText } from '../../Contents/styleContents';
import { StyledButton } from '../../Components/Styles/styleButton';
import * as Api from '../../Commons/Api';

const RegisterForm = () => {
	const [email, setEmail] = useState('');
	const [pw, setPw] = useState('');
	const [confirmPw, setConfirmPw] = useState('');
	const [name, setName] = useState('');

	const submitRegisterForm = evt => {
		evt.preventDefault();
	};

	const validateEmail = email => {
		return email
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			);
	};

	const isEmailValid = validateEmail(email);
	const isPwValid = pw.length >= 4;
	const isPwSame = pw === confirmPw;
	const isNameValid = name.length >= 2;
	const isFormValid = isEmailValid && isPwValid && isPwSame && isNameValid;

	return (
		<Form onSubmit={submitRegisterForm}>
			<Form.Label>Email</Form.Label>
			<Form.Group style={{ marginBottom: '10px' }}>
				<Form.Control
					type="email"
					placeholder="이메일을 입력하세요"
					autoComplete="off"
					value={email}
					onChange={evt => setEmail(evt.target.value)}
				/>
				{!isEmailValid ? (
					<StyledText color="red" size="1rem">
						이메일 형식이 올바르지 않습니다
					</StyledText>
				) : (
					<StyledText color="red" size="1rem" style={{ visibility: 'hidden' }}>
						이메일 형식이 올바르지 않습니다
					</StyledText>
				)}
			</Form.Group>
			<Form.Group style={{ marginBottom: '10px' }}>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="비밀번호를 입력하세요"
					autoComplete="off"
					value={pw}
					onChange={evt => setPw(evt.target.value)}
				/>
				{!isPwValid ? (
					<StyledText color="red" size="1rem">
						비밀번호는 4글자 이상이어야 합니다.
					</StyledText>
				) : (
					<StyledText color="red" size="1rem" style={{ visibility: 'hidden' }}>
						비밀번호는 4글자 이상이어야 합니다.
					</StyledText>
				)}
			</Form.Group>
			<Form.Group style={{ marginBottom: '10px' }}>
				<Form.Label>Confirm Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="비밀번호를 한 번 더 입력하세요"
					autoComplete="off"
					value={confirmPw}
					onChange={evt => setConfirmPw(evt.target.value)}
				/>
				{!isPwSame ? (
					<StyledText color="red" size="1rem">
						비밀번호가 일치하지 않습니다.
					</StyledText>
				) : (
					<StyledText color="red" size="1rem" style={{ visibility: 'hidden' }}>
						비밀번호가 일치하지 않습니다.
					</StyledText>
				)}
			</Form.Group>
			<Form.Group style={{ marginBottom: '10px' }}>
				<Form.Label>User Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="회원님의 이름을 알려주세요."
					autoComplete="off"
					value={name}
					onChange={evt => setName(evt.target.value)}
				/>
				{!isNameValid ? (
					<StyledText color="red" size="1rem">
						이름은 두 글자 이상이어야 합니다.
					</StyledText>
				) : (
					<StyledText color="red" size="1rem" style={{ visibility: 'hidden' }}>
						이름은 두 글자 이상이어야 합니다.
					</StyledText>
				)}
			</Form.Group>
			<StyledButton
				type="submit"
				disabled={!isFormValid}
				margin="0 0 0 386px"
				variant="primary"
			>
				Sign Up
			</StyledButton>
		</Form>
	);
};

export default RegisterForm;
