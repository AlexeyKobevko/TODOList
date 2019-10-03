import './Auth.scss';

import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import { checkUser } from 'actions/user';
import { BtnSpinner } from "components/BtnSpiner";

export class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      error: false,
      errorText: '',
    };
  }

  handleSignIn = () => {
    const { login, password } = this.state;
    const { checkUser, loading } = this.props;

    if (!login || !password) {
      this.setState({
        error: true,
        errorText: 'Неверно заполнены поля',
      });
      return;
    }

    if (!loading) {
      checkUser(login, password);
      this.setState({
        login: '',
        password: '',
        error: false,
        errorText: '',
      });
    }
};

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { login, password } = this.state;
    const {isLoggedIn, loading, errorTextPassword, error, token } = this.props;

    if (token) return <Redirect to={'/'}/>;

    return (
      <div className="login-page">
        <div className="form">
          <div className="login-form">
            <input onChange={this.handleTextChange} autoFocus name="login" type="text" placeholder="Имя пользователь" value={login} required/>
            <input onChange={this.handleTextChange} name="password" type="password" placeholder="Пароль" value={password} required />
            {
              !loading ? <button className="btn login-btn" onClick={this.handleSignIn} >
              sign in
              </button> : <BtnSpinner/>
            }
          </div>
        </div>
        {error && <div className="error-field">
          {errorTextPassword}
        </div>}
        {this.state.error && <div className="error-field">
          {this.state.errorText}
          </div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.user.loading,
    isLoggedIn: state.user.isLoggedIn,
    error: state.user.error,
    errorTextLogin: state.user.errorTextLogin,
    errorTextPassword: state.user.errorTextPassword,
    token: state.user.token,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    checkUser: (email, pass) => dispatch(checkUser(email, pass)),
  }
}

export const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth);