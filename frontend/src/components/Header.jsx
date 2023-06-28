import { Link, Route, Routes } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in" >
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up" >
              Регистрация
            </Link>
          }
        />
        <Route />
        <Route
          path="/"
          element={
            <div className="header__user-info">
              <p className="header__user-email">{email}</p>
              <button className="header__btn-sign-out" to="/sign-in" onClick={onSignOut}>
                Выйти
              </button>
            </div>
          }
        />
        <Route />
      </Routes>
    </header>
  )
}
