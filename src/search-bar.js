import React, { Component } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`

`

const StyledInput = styled.input`
    border-radius: 2px;
    width: 300px;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #c917a0;

    &:focus {
        outline: none;
    }
`

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: ''
        }
    }

    render() {
        return (
            <StyledWrapper>
                <StyledInput
                    type='text'
                    value={this.state.searchValue}
                    onChange={this._handleSearchValueChange}
                    placeholder='Enter Member Name or Number...' />
            </StyledWrapper>
        )
    }

    _handleSearchValueChange = e => {
        this.setState({
            searchValue: e.target.value
        });
    }
}
