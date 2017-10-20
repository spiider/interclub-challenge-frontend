import React, {Component} from 'react';
import styled from 'styled-components';

import SearchBar from './search-bar';

const StyledWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledMask = styled.div`
    background-color: #FFF;
    display: block;
    width: 100%;
    height: 50vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    &::after {
        background-color: #7E57C2;
        content: '';
        display: block;
        width: 100%;
        height: 50vh;
        position: absolute;
        top: 50vh;
        z-index: -1;
    }
`;

const StyledLogoLink = styled.a`
    position: absolute;
    z-index: 2;
    top: 50px;
    left: 50px;
    width: 48px;
    height: 48px;
`;

export default class App extends Component {
    render() {
        return (
            <StyledWrapper>
                <StyledMask />
                <StyledLogoLink href='https://interclub.io' target='_blank'>
                    <img src='/assets/logo_48x48.png' />
                </StyledLogoLink>
                <SearchBar />
            </StyledWrapper>
        );
    }
}
