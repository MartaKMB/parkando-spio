import React, { Component } from 'react';
import { Router, Route, Switch, matchPath} from 'react-router-dom';

import history from './history';

import LoginPage from '../components/LoginPage/LoginPage';
import WelcomePage from '../components/WelcomePage/WelcomePage';
import ChoicePage from '../components/ParkingSpaceChoicePage/ChoicePage';
import ConfirmationPage from '../components/ConfirmationPage/ConfirmationPage';

// const ConfirmationPage = () => <h1>Strona podsumowująca</h1>;

class App extends Component {
  state = {
    user: null,
    parkingChoice: null
  }

  choiceHandler = (number) => {
    this.setState({
      parkingChoice: number
    })
  }

  logUser = (cardNumber) => {
    this.setState({
      user: cardNumber
    })
  }

  render() {
  return (
    <Router history={history} choiceHandler={this.choiceHandler} >
    <main>
      <Switch>
        <Route
          path="/"
          render={(props) => <LoginPage {...props} logUser={this.logUser} match={matchPath} />}
          exact />
        <Route path="/welcome/:userId" component={WelcomePage} />
        <Route
          path='/choice/:userId'
          render={(props) => <ChoicePage {...props} choiceHandler={this.choiceHandler} />}
        />
        <Route path="/confirmation/:userId/:parkingId" component={ConfirmationPage} match={matchPath}/>
      </Switch>
    </main>
  </Router>
  );
  }
}

export default App;
