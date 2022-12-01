import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const minLength = 7;
    const passwordVerify = password.length >= minLength;
    const regex = /\S+@\S+\.\S+/;
    const emailVerify = regex.test(email);
    const btnState = emailVerify && passwordVerify;
    setIsBtnDisabled(!btnState);
  }, [email, password, isBtnDisabled]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailObject = { email };
    localStorage.setItem('user', JSON.stringify(emailObject));
    history.push('/meals');
  };

  return (
    <form>
      <input
        data-testid="email-input"
        placeholder="Digite seu e-mail"
        type="text"
        name="email"
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        data-testid="password-input"
        placeholder="Senha"
        type="password"
        name="password"
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <button
        className="btn-input"
        type="submit"
        data-testid="login-submit-btn"
        onClick={ handleSubmit }
        disabled={ isBtnDisabled }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
