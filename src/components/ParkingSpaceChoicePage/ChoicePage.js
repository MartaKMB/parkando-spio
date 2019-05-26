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
            <section className="choice-page-container">
                <div className="choice-page-container__map-details map-details">
                {/* TODO! */}
                    <input className="map-details__btn-place btn-place btn-place--7" type="button" value="7" id={7} onClick={this.handleClick}></input>
                    <input className="map-details__btn-place btn-place btn-place--6" type="button" value="6" id={6} onClick={this.handleClick}></input>
                    <input className="map-details__btn-place btn-place btn-place--5" type="button" value="5" id={5} onClick={this.handleClick}></input>
                    <input className="map-details__btn-place btn-place btn-place--4" type="button" value="4" id={4} onClick={this.handleClick}></input>
                    <input className="map-details__btn-place btn-place btn-place--3" type="button" value="3" id={3} onClick={this.handleClick}></input>
                    <input className="map-details__btn-place btn-place btn-place--2" type="button" value="2" id={2} onClick={this.handleClick}></input>
                    <input className="map-details__btn-place btn-place btn-place--1" type="button" value="1" id={1} onClick={this.handleClick}></input>
                </div>
            </section>
        )
    }
}

export default withRouter(ChoicePage);
