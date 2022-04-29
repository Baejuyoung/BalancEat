import styled from 'styled-components';
import { Container, Navbar, Row, Col, Nav, NavDropdown } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import LoginForm from '../component/user/LoginForm';
import Button from '../Components/Button';

const StyledHeaderContainer = styled(Container)`
	color: #ffffff;
	background-color: #075f3a;
	.nav-link {
		font-family: 'Roboto', sans-serif;
		color: #ffffff !important;
	}
`;

/*

	.navbar.scrolling-navbar.top-nav-collapse {
		background: #ff0000;
	}
	.navbar-toggler {
		color: #ffffff;
		background: #ff0000;
	}
*/

const Header = () => {
	const isLogin = true;
	const [show, setShow] = useState(false);

	const createLink = (url, title) => {
		return (
			<Nav.Link href={url} style={{ textDecoration: 'none', color: '#fcfbfa' }}>
				{title}
			</Nav.Link>
		);
	};

	useEffect(() => {
		return () => setShow(false);
	}, []);

	return (
		<>
			<StyledHeaderContainer fluid>
				<Navbar collapseOnSelect expand="md" color="white">
					<Container>
						<Navbar.Brand href="/">
							<img src="/balanceatLogo.png" />
						</Navbar.Brand>{' '}
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						<Nav className="me-auto"> </Nav>
						<Nav>
							<Navbar.Collapse id="navbar-dark responsive-navbar-nav">
								<Nav className="me-auto"></Nav>
								<Nav>
									{createLink('/', '메인페이지')}
									{createLink('/balanceat', 'BalancEat')}
									<Nav.Link href="/recommand">오늘 뭐 먹지?</Nav.Link>
									{isLogin ? (
										<Nav.Link href="/userpage">사용자페이지</Nav.Link>
									) : (
										<Nav visibility="hidden">사용자페이지</Nav>
									)}
								</Nav>
							</Navbar.Collapse>

							<Button
								variant="outline-light"
								onClick={() => setShow(true)}
								style={{ marginLeft: '1em' }}
							>
								Sign in
							</Button>
						</Nav>
					</Container>
				</Navbar>
			</StyledHeaderContainer>

			{show && <LoginForm show={show} setShow={setShow} />}
		</>
	);
};

export default Header;
