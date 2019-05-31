import React, { Component } from 'react';
import { Router, Route, Switch, matchPath} from 'react-router-dom';
import moment from 'moment';

import history from '../modules/history';

import users from '../mocks/users.js';

import LoginPage from '../components/LoginPage/LoginPage';
import WelcomePage from '../components/WelcomePage/WelcomePage';
import ChoicePage from '../components/ParkingChoicePage/ChoicePage';
import ParkingChoicePage from '../components/ParkingChoicePage/ParkingChoicePage';
import ConfirmationPage from '../components/ConfirmationPage/ConfirmationPage';
import FinalConfirmationPage from '../components/ConfirmationPage/FinalConfirmationPage';

import DayChoicePage from '../components/DayChoicePage/DayChoicePage';

class App extends Component {
  state = {
    card_id: null,
    park_place_id: null,
    user_type: '',
    expiration_date: moment().add(6, 'd').format('DD.MM.YYYY'),
    userName: '',
    userSurname: '',
    occupiedSpacesForDaily: [],
    occupiedSpacesForWeekends: [],
    // TODO remove when backend is in
    test: []
  }

  choiceHandler = (number) => {
    this.setState({
      park_place_id: number
    })
  }

  logUser = (cardNumber, userName, userSurname, userType) => {
    this.setState({
      card_id: cardNumber,
      user_type: userType,
      userName: userName,
      userSurname: userSurname
    });    
  }

  componentWillMount() {
    // TODO remove when backend is in
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

  componentDidMount() {
    // TODO remove when backend is in
    fetch("https://randomuser.me/api/?format=json&results=5")
      .then(res => res.json())
      .then(json => this.setState({ test: json.results }));
  }

  render() {
    // TODO remove when backend is in
    this.state.test.map(e => console.log(e));    
    console.log('TYPE IN APP:', this.state.user_type);
  
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
            path="/welcome/:card_id" 
            render={(props) => <WelcomePage {...props} userName={this.state.userName} />}
          />
          <Route
            path='/choicePaking/:card_id/:extra_place'
            render={
              (props) =>
                <ParkingChoicePage
                  {...props}
                  choiceHandler={this.choiceParkingHandler}
                  occupiedSpaces={
                    this.state.user_type === 'Dzienny'
                    ? this.state.occupiedSpacesForDaily
                    : this.state.occupiedSpacesForWeekends
                  }
                />}
          />
          <Route
            path='/choice/:card_id/:extra_place'
            render={
              (props) =>
                <ChoicePage
                  {...props}
                  choiceHandler={this.choiceHandler}
                  occupiedSpaces={
                    this.state.user_type === 'Dzienny'
                    ? this.state.occupiedSpacesForDaily
                    : this.state.occupiedSpacesForWeekends
                  }
                />
            }
          />
          <Route
            path="/confirmation/:card_id/:extra_place/:park_place_id"
            render={(props) => <ConfirmationPage {...props} userName={this.state.userName} userSurname={this.state.userSurname} />}
            match={matchPath}
          />
          <Route
            path="/final-confirmation/:card_id/:extra_place/:park_place_id"
            render={
              (props) =>
              <FinalConfirmationPage
                {...props}
                userName={this.state.userName}
                userSurname={this.state.userSurname}
                userType={this.state.user_type}
                expirationDate={this.state.expiration_date}
              />
            }
            match={matchPath}
          />
          <Route
            path="/day-choice/:card_id"
            render={
              (props) =>
              <DayChoicePage
                {...props}
                userType={this.state.user_type}
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
