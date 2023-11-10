import React, { useState } from 'react';

function Login (props) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  function handleChange (e) {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit (e) {
    e.preventDefault();
    props.onLogin(formValue.email, formValue.password);
    props.handleLogin();
  }

  return (
    <section className="login">
      <h2 className="login__heading">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input className="login__input"  name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input className="login__input"  name="password" type="password" placeholder="Пароль" onChange={handleChange} required />
        <button className="login__submit-button" type="submit">Войти</button>
      </form>
    </section>
  )
}

export default Login;
