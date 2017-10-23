import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';

const mockData = [
  {
    id: 1,
    name: 'Kitty',
  }, {
    id: 2,
    name: 'Maria',
  }, {
    id: 3,
    name: 'Nala',
  }, {
    id: 4,
    name: 'Claudia',
  }, {
    id: 5,
    name: 'Pixie',
  }, {
    id: 6,
    name: 'Odie',
  }, {
    id: 7,
    name: 'Doggie',
  }, {
    id: 8,
    name: 'Rabo',
  }, {
    id: 10,
    name: 'Lacinho',
  },
];


const StyledWrapper = styled.div`
  margin-top: 174px;
`
const SuggestionHighlight = styled.li`
  background: lightgrey;
`

const SuggestionsList = styled.div`
  visibility: ${props => props.openList ? 'visible' : 'hidden'};
  background: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid rgba(0, 0, 0, .1);
  max-height: 300px;
`

const StyledInput = styled.input`
  border-radius: 4px;
  border-bottom-left-radius: ${props => props.openList ? 0 : '4px'};
  border-bottom-right-radius: ${props => props.openList ? 0 : '4px'};
  width: 300px;
  font-size: 12px;
  padding: 8px 10px 6px;
  height: 32px;
  font-size: 12px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, .1);
  outline: 0!important;

    &:focus {
        outline: none;
        border: 2px solid #c917a0;
    }
`

class Typeahead extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
  }

  constructor(props) {
      super(props);

      this.state = {
          searchValue: '',
          openList: false,
          highLighted: -1,
          fetchData: props.fetchData,
      };
  }

  // close list when click out side component
  handleClickOutside = evt => {
    if (this.state.openList) {
      this.setState({
        openList: !this.state.openList,
      })
    }
  }

  _handleKeys = (e) => {
    const { highLighted } = this.state;
    switch(e.keyCode) {
      case 40: // Down key
        this.setState({
          highLighted: +highLighted + 1
        });
        break;
      case 38: // Up key
        this.setState({
          highLighted: +highLighted - 1
        });
        break;
      case 27: // ESC
        this.setState({
          openList: false,
        });
        break;
      default:
        // do nothing
    }
  }

  render() {
      return (
          <StyledWrapper>
              <StyledInput
                  type='text'
                  value={this.state.searchValue}
                  onChange={this._handleSearchValueChange}
                  placeholder='Enter Member Name or Number...'
                  onKeyDown={this._handleKeys}
                  openList={this.state.openList}
                />
                  <SuggestionsList openList={this.state.openList} >
                    <ul>
                      {mockData.map((ent, index) => index === this.state.highLighted ? <SuggestionHighlight>{ent.name}</SuggestionHighlight> : <li>{ent.name}</li>)}
                    </ul>
                  </SuggestionsList>
          </StyledWrapper>
      )
  }

  _handleSearchValueChange = e => {
      this.setState({
          searchValue: e.target.value,
          openList: true,
      });
  }
}

export default onClickOutside(Typeahead);
