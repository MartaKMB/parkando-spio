import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import dayPlacesMap from '../../mocks/dayPlacesMap.js';

import SpaceInput from './SpaceInput.js';

class ChoicePage extends Component {
    handleClick = (e) => {
        //TODO POST
        e.preventDefault();
        const number = e.target.id;
        this.props.choiceHandler(number);
        const occupiedSlot = this.checkIfParkingIsOccupied(Number(number));
        if(!occupiedSlot) {
            this.props.history.push(`/confirmation/${this.props.match.params.card_id}/${this.props.match.params.extra_place}/${number}`)    
        } else {
            console.log('miejsce jest zajęte: ', number);
        }        
    }

    checkIfParkingIsOccupied = (number) => {
        return Number(this.props.match.params.extra_place) === 0
        ? this.props.occupiedSpaces.some(space => space === number)
        : this.getOccupiedPlaces(Number(this.props.match.params.extra_place)).some(space => space === number)
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
        console.log('TEST', this.props.match.params);
        return (
            <section className="choice-page-container">
                {Number(this.props.match.params.extra_place) === 0
                    ? <div className="choice-page-container__map-details map-details">
                        <SpaceInput
                            number={7}
                            occupiedSpaces={this.props.occupiedSpaces}
                            handleClick={this.handleClick}
                            occupied={this.checkIfParkingIsOccupied(7)}
                        />
                        <SpaceInput
                            number={6}
                            occupiedSpaces={this.props.occupiedSpaces}
                            handleClick={this.handleClick}
                            occupied={this.checkIfParkingIsOccupied(6)}
                        />
                        <SpaceInput
                            number={5}
                            occupiedSpaces={this.props.occupiedSpaces}
                            handleClick={this.handleClick}
                            occupied={this.checkIfParkingIsOccupied(5)}
                        />
                        <SpaceInput
                            number={4}
                            occupiedSpaces={this.props.occupiedSpaces}
                            handleClick={this.handleClick}
                            occupied={this.checkIfParkingIsOccupied(4)}
                        />
                        <SpaceInput
                            number={3}
                            occupiedSpaces={this.props.occupiedSpaces}
                            handleClick={this.handleClick}
                            occupied={this.checkIfParkingIsOccupied(3)}
                        />
                        <SpaceInput
                            number={2}
                            occupiedSpaces={this.props.occupiedSpaces}
                            handleClick={this.handleClick}
                            occupied={this.checkIfParkingIsOccupied(2)}
                        />
                        <SpaceInput
                            number={1}
                            occupiedSpaces={this.props.occupiedSpaces}
                            handleClick={this.handleClick}
                            occupied={this.checkIfParkingIsOccupied(1)}
                        />
                    </div>
                    : <div className="choice-page-container__map-details map-details map-details--extra-places">
                        <SpaceInput
                            number={8}
                            occupiedSpaces={this.props.occupiedSpaces}
                            handleClick={this.handleClick}
                            occupied={this.checkIfParkingIsOccupied(8)}
                        />
                        <SpaceInput
                            number={9}
                            occupiedSpaces={this.props.occupiedSpaces}
                            handleClick={this.handleClick}
                            occupied={this.checkIfParkingIsOccupied(9)}
                        />
                        <SpaceInput
                            number={10}
                            occupiedSpaces={this.props.occupiedSpaces}
                            handleClick={this.handleClick}
                            occupied={this.checkIfParkingIsOccupied(10)}
                        />
                    </div>
                }
                
            </section>
        )
    }
}

export default withRouter(ChoicePage);
