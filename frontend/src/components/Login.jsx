import { useEffect } from 'react';
import { useFormAndValidation } from '../hooks/useFormAndValidation.js';

function Login({ onLogin }) {

  const { values, handleChange, errors, isValid, setIsValid } = useFormAndValidation();

  const { email, password } = values;

  useEffect(() => {
    if (!email && !password) {
      setIsValid(false)
    }
  }, [email, password])

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  return (
    <div className="authorization">
      <h1 className="authorization__header">Вход</h1>
      <form className="authorization-form" onSubmit={handleSubmit}>
        <input
          className="authorization-form__input"
          name="email"
          type="email"
          required
          placeholder="Email"
          onChange={handleChange}
          value={email || ''}
        ></input>
        <span className="authorization__input-error authorization__input-error_active">
          {errors.email}
        </span>
        <input
          className="authorization-form__input"
          name="password"
          type="password"
          required
          placeholder="Пароль"
          onChange={handleChange}
          value={password || ''}
        ></input>
        <span className="authorization__input-error authorization__input-error_active">
          {errors.password}
        </span>
        <button disabled={!isValid} className={!isValid ? 'authorization-form__button authorization-form__button_disabled' : 'authorization-form__button'}>Войти</button>
      </form>
    </div>
  )
}

export default Login;
