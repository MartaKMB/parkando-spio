import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

class WelcomePage extends Component {
    render() {
        return (
            <section>
                <button
                    onClick={(e) => {e.preventDefault(); this.props.history.push(`/choice/${this.props.match.params.userId}`)}}
                >
                    DALEJ
                </button>
            </section>
        )
    }
}

export default withRouter(WelcomePage);
