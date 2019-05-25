import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

class ChoicePage extends Component {
    handleClick = (e) => {
        e.preventDefault();
        const number = e.target.id;
        this.props.choiceHandler(number);
        console.log('wybrałeś:', number);
        this.props.history.push(`/confirmation/${this.props.match.params.userId}/${number}`)
    }

    render() {
        return (
            <section>
                <input type="button" value="miejsce 1" id={1} onClick={this.handleClick}></input>
                <input type="button" value="miejsce 2" id={2} onClick={this.handleClick}></input>
                <input type="button" value="miejsce 3" id={3} onClick={this.handleClick}></input>
            </section>
        )
    }
}

export default withRouter(ChoicePage);
