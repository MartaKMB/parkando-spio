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
    parkingChoice: null,
    studentType: 'Dzienny',
    occupiedSpacesForDaily: [],
    occupiedSpacesForWeekends: [],
  }

  choiceHandler = (number) => {
    this.setState({
      parkingChoice: number
    })
  }

  logUser = (cardNumber, userName, userSurname, studentType) => {
    this.setState({
      user: cardNumber,
      userName: userName,
      userSurname: userSurname,
      studentType: studentType
    })
  }

  componentWillMount() {
    let daily = [];
    let weekends = [];

    users.parkandoUsers.map(a => {
      if(a.park_place_id !== null) {
        a.user_type === "Dzienny"
          ? daily.push(a.park_place_id)
          : weekends.push(a.park_place_id)
      }
    });

    this.setState({
      occupiedSpacesForDaily: daily,
      occupiedSpacesForWeekends: weekends,
    });
  }

  render() {      
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
            exact 
          />
          <Route
            path="/welcome/:userId" 
            render={(props) => <WelcomePage {...props} userName={this.state.userName} />}
          />
          <Route
            path='/choicePaking/:userId'
            render={
              (props) =>
                <ParkingChoicePage
                  {...props}
                  choiceHandler={this.choiceParkingHandler}
                  occupiedSpaces={
                    this.state.studentType === 'Dzienny'
                    ? this.state.occupiedSpacesForDaily
                    : this.state.occupiedSpacesForWeekends
                  }
                />}
          />
          <Route
            path='/choice/:userId'
            render={
              (props) =>
                <ChoicePage
                  {...props}
                  choiceHandler={this.choiceHandler}
                  occupiedSpaces={
                    this.state.studentType === 'Dzienny'
                    ? this.state.occupiedSpacesForDaily
                    : this.state.occupiedSpacesForWeekends
                  }
                />
            }
          />
          <Route
            path="/confirmation/:userId/:parkingId"
            render={(props) => <ConfirmationPage {...props} userName={this.state.userName} userSurname={this.state.userSurname} />}
            match={matchPath}
          />
          <Route
            path="/final-confirmation/:userId/:parkingId"
            render={
              (props) =>
              <FinalConfirmationPage
                {...props}
                userName={this.state.userName}
                userSurname={this.state.userSurname}
                userType={this.state.studentType}
              />
            }
            match={matchPath}
          />
        </Switch>
      </main>
    </Router>
    );
  }
}

export default App;
