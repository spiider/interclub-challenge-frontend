import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';
import 'whatwg-fetch';

const StyledWrapper = styled.div`
  height: 32px;
`

const SuggestedList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const SuggestionHighlight = styled.li`
  background: lightgrey;
  padding: 10px;
`

const SuggestionLine = styled.li`
  padding: 10px;
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
    data: PropTypes.array.isRequired, // TODO: important remove this and create a shape!
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

  getHighlightedText(text, higlight) {
    // Split on higlight term and include term into parts, ignore case
    let parts = text.split(new RegExp(`(${higlight})`, 'gi'));
    return <span> { parts.map((part, i) =>
        <span key={i} style={part.toLowerCase() === higlight.toLowerCase() ? { fontWeight: 'bold', color: '#c917a0' } : {} }>
            { part }
        </span>)
    } </span>;
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
    const { getHighlightedText } = this;
    const { searchValue } = this.state;
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
              <SuggestedList>
                {this.props.data.map((ent, index) => index === this.state.highLighted ?
                  <SuggestionHighlight>{getHighlightedText(ent.name, searchValue)}</SuggestionHighlight> : <SuggestionLine>{getHighlightedText(ent.name, searchValue)}</SuggestionLine>)}
              </SuggestedList>
            </SuggestionsList>
      </StyledWrapper>
    )
  }

  _handleSearchValueChange = e => {
      const { fetchData } = this.state;
      const { value } = e.target;

      // prevent request without chars
      if (value) {
        fetchData(e.target.value);
      }


      this.setState({
          searchValue: value,
          openList: true,
      });
  }
}

export default onClickOutside(Typeahead);
