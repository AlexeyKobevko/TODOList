import './Header.scss';
import React, { Component } from "react";
import { logout } from "actions/user";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


class Header extends Component {
  constructor(props) {
    super(props);

  }

  handleLogin = () => {
    const { logout, isLoggedIn } = this.props;
    if (isLoggedIn) {
      logout();
    }
  };

  render() {
    const { isLoggedIn } = this.props;

    return (
      <header>
        <div>LOGO</div>
        <div>
          <Link onClick={this.handleLogin} to={isLoggedIn ? '/' : '/login'} className="login-btn">
            {isLoggedIn ? 'Выйти' : 'Войти'}
          </Link>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    loading: state.user.loading,
    isLoggedIn: state.user.isLoggedIn,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  }
}

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);