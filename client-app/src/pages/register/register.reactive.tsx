import React from "react";
import { Link } from "react-router-dom";
import "../auth.style.css";

const Register: React.FC = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Реєстрація</h2>
        <form>
          <div className="form-group">
            <input type="text" placeholder="Ім'я користувача" />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Пароль" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Підтвердіть пароль" />
          </div>
          <button type="submit" className="auth-submit">
            Зареєструватися
          </button>
        </form>
        <p className="auth-link">
          Вже є акаунт? <Link to="/login">Увійти</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
