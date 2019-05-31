import React, { Component } from 'react';
import classNames from 'classnames';

import { withRouter } from "react-router-dom";

import dayPlacesMap from '../../mocks/dayPlacesMap.js';

class DayChoicePage extends Component {
    state = {
        pon: [],
        wt: [],
        sr: [],
        czw: [],
        pt: [],
        sob: [],
        niedz: [],
        selectedDay: '',
        noPlace: false,
    }

    componentWillMount() {
        //TODO GET from DB, backend
        console.log('dayPlacesMap: ', dayPlacesMap.pon);
        const isAnyFreePlace = this.props.userType === "Dzienny"
            ? dayPlacesMap.sob.length + dayPlacesMap.niedz.length === 6
            : dayPlacesMap.pon.length + dayPlacesMap.wt.length + dayPlacesMap.sr.length + dayPlacesMap.czw.length + dayPlacesMap.pt.length === 15;
        this.setState({
            pon: dayPlacesMap.pon,
            wt: dayPlacesMap.wt,
            sr: dayPlacesMap.sr,
            czw: dayPlacesMap.czw,
            pt: dayPlacesMap.pt,
            sob: dayPlacesMap.sob,
            niedz: dayPlacesMap.niedz,
            noPlace: isAnyFreePlace
        })
    }

    handleClick = (e) => {
        e.preventDefault();
        // set day in App
        console.log('KLIK', e.target.id);
        this.setState({
            selectedDay: e.target.id
        })
        this.props.history.push(`/choice/${e.target.id}/${this.props.match.params.card_id}`)
    }

    render() {
        return (
            <section className="day-choice-container">
                Wybierz dzień
                {this.props.userType === "Dzienny"
                    ? <div className="day-choice-container__day-buttons day-buttons">
                        <button
                            className={classNames('day-buttons__day-btn', 'day-btn', {'day-btn--disabled' : 3 - this.state.sob.length === 0})}
                            id={6}
                            onClick={this.handleClick}
                        >
                            SOBOTA
                        </button>
                        <button className="day-buttons__day-btn" id={7} onClick={this.handleClick}>
                            NIEDZIELA
                        </button>
                    </div>
                    : <div className="day-choice-container__day-buttons day-buttons">
                        <button
                            className={classNames('day-buttons__day-btn', 'day-btn', {'day-btn--disabled' : 3 - this.state.pon.length === 0})}
                            id={1}
                            onClick={this.handleClick}
                        >
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
                    </div>
                }
                {this.state.noPlace && <span>PRZYKRO NAM NIE MA JUŻ WOLNYCH MIEJSC</span>}
            </section>
        )
    }
}

export default withRouter(DayChoicePage);
