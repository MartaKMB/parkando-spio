import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

class DayChoicePage extends Component {
    handleClick = (e) => {
        e.preventDefault();
        // set day in App
        this.props.history.push(`/choice/${this.props.match.params.card_id}`)
    }

    render() {
        return (
            <section className="day-choice-container">
                Wybierz dzień
                <div className="day-choice-container__day-buttons day-buttons">
                    <button className="day-buttons__day-btn" id={1} onClick={this.handleClick}>
                        PONIEDZIAŁEK
                    </button>
                    <button className="day-buttons__day-btn" id={2} onClick={this.handleClick}>
                        WTOREK
                    </button>
                    <button className="day-buttons__day-btn" id={3} onClick={this.handleClick}>
                        ŚRODA
                    </button>
                    <button className="day-buttons__day-btn" id={4} onClick={this.handleClick}>
                        CZWARTEK
                    </button>
                    <button className="day-buttons__day-btn" id={5} onClick={this.handleClick}>
                        PIĄTEK
                    </button>
                    <button className="day-buttons__day-btn" id={6} onClick={this.handleClick}>
                        SOBOTA
                    </button>
                    <button className="day-buttons__day-btn" id={7} onClick={this.handleClick}>
                        NIEDZIELA
                    </button>
                </div>
            </section>
        )
    }
}

export default withRouter(DayChoicePage);
