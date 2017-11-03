import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { API_BASE } from '../../constants';
import 'whatwg-fetch';

const ModalOverlay  = styled.div`
	z-index: 99;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
`
const Modal = styled.div`
	display: block;
	width: 600px;
	max-width: 100%;
	height: 400px;
	max-height: 100%;
	position: fixed;
	z-index: 100;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background: white;
	-webkit-box-shadow: 0 10px 6px -6px #000;
	-moz-box-shadow: 0 10px 6px -6px #000;
	box-shadow: 0 10px 6px -6px #000;
`
const CloseBtn = styled.div`
	position: absolute;
	z-index: 1;
	top: 10px;
	right: 20px;
	border: 0;
	background: black;
	color: white;
	padding: 5px 10px;
	font-size: 1.3rem;
	cursor: pointer;
`
const ModalGuts = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 20px 50px 20px 20px;
	overflow: auto;
`
const UserCard = styled.div`
	margin: 6px;
	height: 70px;
`
const UserName = styled.p`
	font-size: 16px;
	float: left;
`
const UserNumber = styled.span`
	color: grey;
	float: left;
	padding-right: 10px;
`
const UserPic = styled.img`
	float: left;
	margin-right: 10px;
`

class List extends Component {
	static propTypes = {
		onClose: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
	}

	componentDidMount() {
		fetch(`${API_BASE}/list-members`, { method: 'GET' })
		.then(res => (res.status === 200) ? res.json() : [])
		.then(result => {
			this.setState({
				data: result,
			});
		});
	}

	render() {
		return (
			<div>
				<ModalOverlay></ModalOverlay>
				<ModalOverlay onClick={this.props.onClose}></ModalOverlay>
				<Modal>
					<CloseBtn onClick={this.props.onClose}>x</CloseBtn>
					<ModalGuts>
						{this.state.data.map(user =>
							<UserCard>
								<UserPic src='http://via.placeholder.com/50x50' alt='user picture' />
								<UserName>
									{`${user.first_name} ${user.last_name}`}
									<UserNumber># {user.number}</UserNumber>
								</UserName>
							</UserCard>
						)}
					</ModalGuts>
				</Modal>
			</div>
		)
	}

}

export default List;
