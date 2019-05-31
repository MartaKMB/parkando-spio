import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import dayPlacesMap from '../../mocks/dayPlacesMap.js';

import emptyPin from '../../images/pusty_pin.png';

class ParkingChoicePage extends Component {
    handleClick = (e) => {
        e.preventDefault();
        // zależy skąd się przyszło? 0 lub 1-7
        this.props.history.push(`/choice/${this.props.match.params.card_id}/${this.props.match.params.extra_place}`)
    }

    getOccupiedPlaces = (day) => {
        let occupiedExtraSpaces;
        switch(day) {
            case 1: 
                occupiedExtraSpaces = dayPlacesMap.pon;
                break;
            case 2:
                occupiedExtraSpaces = dayPlacesMap.wt;
                break;
            case 3:
                occupiedExtraSpaces = dayPlacesMap.sr;
                break;
            case 4:
                occupiedExtraSpaces = dayPlacesMap.czw;
                break;
            case 5:
                occupiedExtraSpaces = dayPlacesMap.pt;
                break;
            case 6:
                occupiedExtraSpaces = dayPlacesMap.sob;
                break;
            case 7:
                occupiedExtraSpaces = dayPlacesMap.niedz;
                break;
            default:
                occupiedExtraSpaces = [];
                break;
        }
        
        return occupiedExtraSpaces;
    }

    render() {
        // console.log('extra:', this.props.match.params.extra_place);
        const occupiedSpaces = this.getOccupiedPlaces(Number(this.props.match.params.extra_place));
        console.log('occupiedSpaces: ', occupiedSpaces);
        
        return (
            <section className="parking-choice-container">
                <div className="parking-choice-container__map map">
                    <button className="map__parking-btn parking-btn parking-btn--active parking-btn--active-1" id={1} onClick={this.handleClick}>
                        <span className="parking-btn__number">{
                            Number(this.props.match.params.extra_place) === 0
                            ? 7 - this.props.occupiedSpaces.length
                            : 3 - occupiedSpaces.length
                        }</span>
                        <img src={emptyPin} alt='pin wyboru parkingu' />
                    </button>
                    <button className="map__parking-btn parking-btn parking-btn--disabled parking-btn--disabled-1" id={2}>
                        <span className="parking-btn__number">0</span>
                        <img src={emptyPin} alt='pin wyboru parkingu' />
                    </button>
                    <button className="map__parking-btn parking-btn parking-btn--disabled parking-btn--disabled-2" id={3}>
                        <span className="parking-btn__number">0</span>
                        <img src={emptyPin} alt='pin wyboru parkingu' />
                    </button>
                </div>
            </section>
        )
    }
}

export default withRouter(ParkingChoicePage);
