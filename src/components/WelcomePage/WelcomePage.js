import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

class WelcomePage extends Component {
    render() {
        return (
            <section className="welcome-container">
                Witaj,
                <div className="welcome-container__user-name">{this.props.userName}</div>
                <button
                    className="welcome-container__go-btn"
                    onClick={(e) => {e.preventDefault(); this.props.history.push(`/choice/${this.props.match.params.userId}`)}}
                >
                    Wybierz miejsce
                </button>
            </section>
        )
    }
}

export default withRouter(WelcomePage);
