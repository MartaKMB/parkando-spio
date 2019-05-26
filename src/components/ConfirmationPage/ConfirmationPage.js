import React, { Component } from 'react';

import { withRouter } from "react-router-dom";
import moment from 'moment';

class ConfirmationPage extends Component {
    state = {
        confirm: false,
    }

    setConfirm = () => {
        this.setState({
          confirm: true
        })
      }

    render() {
        const date = moment().format('DD.MM.YYYY');
        const userName = this.props.userName;
        const userSurname = this.props.userSurname;
        
        return (
            !this.state.confirm
                ? <section className="confirmation-container">
                    Wybrałeś miejsce:
                    <div className="confirmation-container__number">{this.props.match.params.parkingId}</div>
                    <div className="confirmation-container__buttons-section buttons-section">
                        <button
                            className="buttons-section__log-out-btn"
                            onClick={this.setConfirm}
                        >
                            ZATWIERDŹ
                        </button>
                        <button
                            className="buttons-section__back-btn"
                            onClick={(e) => {e.preventDefault(); this.props.history.push(`/choicePaking/${this.props.match.params.userId}`)}}
                        >
                            COFNIJ
                        </button>
                    </div>
                </section>
                : <section className="confirmation-container confirmation-container--final-view">
                    <div className="confirmation-container__place place">
                        Miejsce <span className="place__number">{this.props.match.params.parkingId}</span>
                    </div>
                    <div className="confirmation-container__user">
                        zostało zarezerwowane dla: 
                        <div>{`${userName} ${userSurname}`}</div>
                    </div>
                    <div className="confirmation-container__expiration expiration">
                        Rezerwacja jest ważna do
                        <div className="expiration__date">{date}</div> 
                    </div>
                    <div className="confirmation-container__enjoy">Miłego parkowania!</div>
                    <button
                        className="buttons-section__log-out-btn"
                        onClick={(e) => {e.preventDefault(); this.props.history.push(`/`)}}
                    >
                        WYLOGUJ
                    </button>
                </section>
        )
    }
}

export default withRouter(ConfirmationPage);
