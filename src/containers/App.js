import React, { Component } from 'react';
import { Router, Route, Switch, matchPath} from 'react-router-dom';

import history from './history';

import LoginPage from '../components/LoginPage/LoginPage';
import WelcomePage from '../components/WelcomePage/WelcomePage';
import ChoicePage from '../components/ParkingSpaceChoicePage/ChoicePage';
import ParkingChoicePage from '../components/ParkingChoicePage/ParkingChoicePage';

import ConfirmationPage from '../components/ConfirmationPage/ConfirmationPage';

// const ConfirmationPage = () => <h1>Strona podsumowująca</h1>;

class App extends Component {
  state = {
    user: null,
    userName: '',
    userSurname: '',
    parkingChoice: null
  }

  choiceHandler = (number) => {
    this.setState({
      parkingChoice: number
    })
  }

  logUser = (cardNumber, userName, userSurname) => {
    this.setState({
      user: cardNumber,
      userName: userName,
      userSurname: userSurname
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
        <Route
          path="/welcome/:userId" 
          render={(props) => <WelcomePage {...props} userName={this.state.userName} />}
        />
        <Route
          path='/choicePaking/:userId'
          render={(props) => <ParkingChoicePage {...props} choiceHandler={this.choiceParkingHandler} />}
        />
        <Route
          path='/choice/:userId'
          render={(props) => <ChoicePage {...props} choiceHandler={this.choiceHandler} />}
        />
        <Route
          path="/confirmation/:userId/:parkingId"
          render={(props) => <ConfirmationPage {...props} userName={this.state.userName} userSurname={this.state.userSurname} />}
          // component={ConfirmationPage}
          match={matchPath}/>
      </Switch>
    </main>
  </Router>
  );
  }
}

export default App;
