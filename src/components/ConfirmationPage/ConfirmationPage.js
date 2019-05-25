import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

class ConfirmationPage extends Component {
    render() {
        return (
            <section>
                Użytkownik z kartą o numerze: {this.props.match.params.userId} ma przypisane miejsce: {this.props.match.params.parkingId}
                <button
                    onClick={(e) => {e.preventDefault(); this.props.history.push(`/`)}}
                >
                    WYLOGUJ
                </button>
            </section>
        )
    }
}

export default withRouter(ConfirmationPage);
