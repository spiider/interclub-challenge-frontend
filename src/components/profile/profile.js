import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';

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
  height: 186px;
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
  overflow: none;
`
const UserPic = styled.div`
  width: 30%;
  float: left;
`
const UserInfo = styled.div`
  width: 68%;
  float: left;
`

const UserNumber = styled.h4`
  color: grey;
  margin-top: -18px;
`
const SomeExtraInfo = styled.p`

`

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
    };
  }

  handleClickOutside = () => {
    this.props.onClose();
  }

  render() {
    const { user } = this.state;
    return (
    <div>
        <ModalOverlay></ModalOverlay>
        <Modal>
            <CloseBtn onClick={this.props.onClose}>x</CloseBtn>
          <ModalGuts>
            <UserPic>
              <img src='http://via.placeholder.com/150x150' alt='user picture' />
            </UserPic>
            <UserInfo>
              <h1>{user.name}</h1>
              <UserNumber># {user.number}</UserNumber>
              <SomeExtraInfo>
                Inquietude simplicity terminated she compliment remarkably few her nay. The weeks are ham asked jokes. Neglected perceived shy nay concluded.
              </SomeExtraInfo>
            </UserInfo>
          </ModalGuts>
        </Modal>
    </div>
    )
  }
}

export default onClickOutside(Profile);
