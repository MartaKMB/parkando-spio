import React, { Component } from 'react';
import { Router, Route, Switch, matchPath} from 'react-router-dom';

import history from './history';

import users from '../mocks/users.js';

import LoginPage from '../components/LoginPage/LoginPage';
import WelcomePage from '../components/WelcomePage/WelcomePage';
import ChoicePage from '../components/ParkingSpaceChoicePage/ChoicePage';
import ParkingChoicePage from '../components/ParkingChoicePage/ParkingChoicePage';
import ConfirmationPage from '../components/ConfirmationPage/ConfirmationPage';
import FinalConfirmationPage from '../components/ConfirmationPage/FinalConfirmationPage';

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
    // console.log('USERS', users.parkandoUsers.map(a => a));    
  return (
    <Router history={history} choiceHandler={this.choiceHandler} >
    <main>
      <Switch>
        <Route
          path="/"
          render={
            (props) => 
              <LoginPage
                {...props}
                logUser={this.logUser} 
                match={matchPath}
                users={users.parkandoUsers}
              />
          }
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
          match={matchPath}
        />
        <Route
          path="/final-confirmation/:userId/:parkingId"
          render={(props) => <FinalConfirmationPage {...props} userName={this.state.userName} userSurname={this.state.userSurname} />}
          match={matchPath}
        />
      </Switch>
    </main>
  </Router>
  );
  }
}

export default App;
