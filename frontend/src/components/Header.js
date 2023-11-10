import React from 'react';
import logo from '../images/logo.svg';
import { Routes, Route, Link } from 'react-router-dom';

function Header (props) {
    return (
      <header className="header">
        <img src={logo} alt="Логотип Места" className="logo" />

        <Routes>
          <Route path="/" element={
            <nav className="header__nav">
              <p className="header__nav-email">{props.email}</p>
              <Link to="/sign-in" className="header__nav-link" onClick={props.onClick}>Выйти</Link>
            </nav>
          }/>

          <Route path="/sign-in" element={
            <nav className="header__nav">
              <Link to="/sign-up" className="header__nav-link">Регистрация</Link>
            </nav>
          }/>

          <Route path="/sign-up" element={
            <nav className="header__nav">
              <Link to="/sign-in" className="header__nav-link">Войти</Link>
            </nav>
          }/>
        </Routes>
      </header>
    );
}

export default Header;
