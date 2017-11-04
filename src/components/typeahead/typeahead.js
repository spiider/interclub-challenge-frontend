import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';
import { Profile, ListProfiles } from '../profile';

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
    cursor: pointer;
`
const SuggestionLine = styled.li`
    padding: 10px;
    cursor: pointer;
`
const UserNumber = styled.span`
    color: grey;
    font-size: 10px;
    float: right;
`
const ShowAllUser = styled.li`
    padding: 10px;
    font-size: 10px;
    color: #7e58c1;
    cursor: pointer;
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
            showProfile: false,
            user: null,
            showAll: false,
            timeout: props.waitTime,
        };
    }

	componentDidMount() {
		this.timer = null;
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
            <span key={i} style={part.toLowerCase() === higlight.toLowerCase() ? { fontWeight: 'bold', color: '#7e58c1' } : {} }>
                { part }
            </span>)
        } </span>;
    }

    handleSelectClick = (user) => {
        this.setState({
            searchValue: user.name,
            user,
            showProfile: true,
            openList: false,
        });
    }

    handlModelClose = () => {
        this.setState({
            showProfile: false,
        });
    }

    handlModelShowAllClose = () => {
        this.setState({
            showAll: false,
        });
    }

    handleShowAll = () => {
        this.setState({
            openList: false,
            showAll: true,
        })
    }

    _handleKeys = (e) => {
        const { highLighted } = this.state;
        const listSize = this.props.data.length;

        switch(e.keyCode) {
            case 40: // Down key
                this.setState({
                    highLighted: (highLighted + 1 >= listSize) ? 0 : highLighted + 1,
                });
            break;
            case 38: // Up key
                this.setState({
                    highLighted: (highLighted - 1 < 0) ? listSize-1 : highLighted - 1,
                });
            break;
            case 27: // ESC
                this.setState({
                    openList: false,
                });
            break;
            case 13: // Enter
                this.handleSelectClick(this.props.data[highLighted])
            break;
            default:
            // do nothing
        }
    }

    _handleSearchValueChange = e => {
		clearTimeout(this.timer);

        const { fetchData, timeout = 1000 } = this.state;
        const { value } = e.target;

        this.setState({
            searchValue: value,
            openList: true,
        });

		this.timer = setTimeout(() => {
			if (value) {
		   		fetchData(value);
			}
		}, timeout); //TODO: rewrite this initialize a new function isn't good
    }


    render() {
        const { getHighlightedText, openProfile } = this;
        const { searchValue } = this.state;
        return (
            <div>
                <StyledWrapper>
                    <StyledInput
                        type='text'
                        value={this.state.searchValue}
                        onChange={this._handleSearchValueChange}
                        placeholder='Enter Member Name or Number...'
                        onKeyDown={this._handleKeys}
                        openList={this.state.openList}
                    />
                    {/* prevent from show dropdown wihout data need improve */}
                    {this.state.searchValue.length > 0 && this.props.data.length > 0 &&
                        <SuggestionsList openList={this.state.openList} >
                            <SuggestedList>
                                {this.props.data.map((user, index) => index === this.state.highLighted ?
                                    <SuggestionHighlight key={user.id} onClick={this.handleSelectClick.bind(this, user)} >
                                        {getHighlightedText(user.name, searchValue)}<UserNumber># {user.number}</UserNumber>
                                     </SuggestionHighlight> :
                                    <SuggestionLine key={user.id} onClick={this.handleSelectClick.bind(this,  user)} >
                                        {getHighlightedText(user.name, searchValue)}<UserNumber># {user.number}</UserNumber>
                                    </SuggestionLine>)}
                                    <ShowAllUser onClick={this.handleShowAll}>show all users.</ShowAllUser>
                                </SuggestedList>
                            </SuggestionsList>}
                        </StyledWrapper>
                        {this.state.showProfile && <Profile user={this.state.user} onClose={this.handlModelClose} />}
                        {this.state.showAll && <ListProfiles onClose={this.handlModelShowAllClose}/>}
                    </div>

                );
    }
}

export default onClickOutside(Typeahead);
