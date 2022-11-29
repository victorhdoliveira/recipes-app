import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isBtnDisabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.buttonVerify());
  };

  buttonVerify = () => {
    const { email, password } = this.state;
    const minLength = 7;
    const passwordVerify = password.length >= minLength;
    const regex = /\S+@\S+\.\S+/;
    const emailVerify = regex.test(email);
    const btnState = emailVerify && passwordVerify;
    this.setState({ isBtnDisabled: !(btnState) });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { email } = this.state;
    const emailObject = { email };
    localStorage.setItem('user', JSON.stringify(emailObject));
    history.push('/meals');
  };

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <form>
        <input
          data-testid="email-input"
          placeholder="Digite seu e-mail"
          type="text"
          name="email"
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          placeholder="Senha"
          type="password"
          name="password"
          onChange={ this.handleChange }
        />
        <button
          className="btn-input"
          type="submit"
          data-testid="login-submit-btn"
          onClick={ this.handleSubmit }
          disabled={ isBtnDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
