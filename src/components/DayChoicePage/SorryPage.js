import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

class SorryPage extends Component {
    render() {
        return (
            <section className="sorry-page-container">
                Przykro nam, nie ma już wolnych miejsc.
            </section>
        )
    }
}

export default withRouter(SorryPage);
