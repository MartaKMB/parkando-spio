import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import bigLogo from '../../images/parkando.png';

class LoginPage extends Component {
  state = {
    userName: '',
    userSurname: '',
    cardNumber: '',
    userType: '',
    message: '',
    
      errors: {
        userName: false,
        userSurname: false,
        cardNumber: false,
        userInDB: false,
      }
    }
    
    messages = {
      userNameIncorrect: 'Nazwa musi być dłuższa niż 3 znaki i nie może zawierać spacji',
      userSurnameIncorrect: 'Nazwa musi być dłuższa niż 3 znaki',
      cardNumberIncorrect: 'Numer karty musi zawierać 3 cyfry',
      noUserInDB: 'Błędny numer karty lub dane użytkownika',
    }
    
    handleChange = e => {
      const name = e.target.name;
      const type = e.target.type;
    
      if(type === "text") {
        const value = e.target.value;
        this.setState({
          [name]: value
        })
      }
    }
    
    handleSubmit = e => {
      e.preventDefault();
      const validation = this.formValidation();
      const finddUser = this.finddUser(this.state.cardNumber, this.state.userName, this.state.userSurname);
      const userPlace = this.userPlaceValidation();
      const userType = this.userStudentType();
    
      if(validation.correct) {
        if(finddUser.length > 0) {
          this.setState({
            userName: '',
            userSurname: '',
            cardNumber: '',
            message: 'Logowanie...',
            userType: userType,
            errors: {
              userName: false,
              userSurname: false,
              cardNumber: false,
            }
          })

          this.props.logUser(this.state.cardNumber, this.state.userName, this.state.userSurname);
          
          if(userPlace === null) {
            this.props.history.push(`/welcome/${this.state.cardNumber}`);
          } else {
            this.props.history.push(`/final-confirmation/${this.state.cardNumber}/${userPlace}`)
          }

          this.setState({
            errors: {
              userInDB: false,
            }
          })          
        } else {
          this.setState({
            errors: {
              userInDB: true,
            }
          })
        }
      } else {
          this.setState({
            errors: {
              userName: !validation.userName,
              userSurname: !validation.userSurname,
              cardNumber: !validation.cardNumber,
            }
          })
        }
      }
    
    formValidation = () => {
      let userName = false;
      let userSurname = false;
      let cardNumber = false;
      let correct = false;
    
      if(this.state.userName.length > 3 && this.state.userName.indexOf(' ') === -1) {
        userName = true;
      }
      if(this.state.userSurname.length > 3) {
        userSurname = true;
      }
      if(this.state.cardNumber.length === 3 && !isNaN(this.state.cardNumber)) {
        cardNumber = true;
      }
      if(userName && userSurname && cardNumber) {
        correct = true;
      }
    
      return ({
        correct,
        userName,
        userSurname,
        cardNumber,
      })
    }

    finddUser(cardNumber, userName, userSurname) {
      return this.props.users.filter(user => user.name === userName && user.surname === userSurname && user.card_id === Number(cardNumber));      
    }

    userPlaceValidation() {
      const user = this.finddUser(this.state.cardNumber, this.state.userName, this.state.userSurname);
      let place = null; 
      user.map(el => place = el.park_place_id)
      return place;
    }

    userStudentType() {
      const user = this.finddUser(this.state.cardNumber, this.state.userName, this.state.userSurname);
      let type = ''; 
      user.map(el => type = el.user_type)
      console.log('TYPE', type);
      return type;
    }
    
    componentDidUpdate() {
      if(this.state.message !== '') {
        setTimeout(() => this.setState({message: ''}), 2000);
      }
    }

    render() {
      return (
        <div className="login-container">
          <div className="login-container__logo">
            <img src={bigLogo} alt="parkando-logo"/>
          </div>
          <form className="login-container__form form" onSubmit={this.handleSubmit} noValidate>
            {this.state.errors.userInDB && <span className="simple-label__error error--top">{this.messages.noUserInDB}</span>}
            <label htmlFor="number" className="form__simple-label simple-label">Podaj nr karty: 
              <input
                type="text"
                id="number"
                name="cardNumber"
                value={this.state.cardNumber}
                onChange={this.handleChange}
                className="simple-label__input"
              />
              {this.state.errors.cardNumber && <span className="simple-label__error">{this.messages.cardNumberIncorrect}</span>}
            </label>
            <label htmlFor="name" className="form__simple-label simple-label">Imię: 
              <input
                type="text"
                id="name"
                name="userName"
                value={this.state.userName}
                onChange={this.handleChange}
                className="simple-label__input"
              />
              {this.state.errors.userName && <span className="simple-label__error">{this.messages.userNameIncorrect}</span>}
            </label>
            <label htmlFor="surname" className="form__simple-label simple-label">Nazwisko: 
              <input
                type="text"
                id="surname"
                name="userSurname"
                value={this.state.userSurname}
                onChange={this.handleChange}
                className="simple-label__input"
              />
              {this.state.errors.userSurname && <span className="simple-label__error">{this.messages.userSurnameIncorrect}</span>}
            </label>
            <button className="form__login-btn">Zaloguj</button>
          </form>
          {this.state.message && <h3>{this.state.message}</h3>}
        </div>
  )}
}

export default withRouter(LoginPage);
