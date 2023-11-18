import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register (props) {
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
    props.onRegister(formValue.email, formValue.password);
  }

  return (
    <section className="register">
      <h2 className="register__heading">Регистрация</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input className="register__input" name="email" type="email" placeholder="Email" onChange={handleChange} required/>
        <input className="register__input" name="password" type="password" placeholder="Пароль" onChange={handleChange} required/>
        <button className="register__submit-button" type="submit">Зарегистрироваться</button>
      </form>
      <p className="register__text">Уже зарегистрированы? <Link to="/signin" className="register__link">Войти</Link></p>
    </section>
  )
}

export default Register;
