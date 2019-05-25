import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

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
        return (
            <section className="confirmation-container">
                Wybrałeś miejsce:
                <div className="confirmation-container__number">{this.props.match.params.parkingId}</div>
                {
                    this.state.confirm ?
                        <button
                            className="buttons-section__log-out-btn"
                            onClick={(e) => {e.preventDefault(); this.props.history.push(`/`)}}
                        >
                            WYLOGUJ
                        </button>
                        : <div className="confirmation-container__buttons-section buttons-section">
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
                }
            </section>
        )
    }
}

export default withRouter(ConfirmationPage);
