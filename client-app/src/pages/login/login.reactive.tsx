import React from "react";
import { Link } from "react-router-dom";
import "../auth.style.css";

const Login: React.FC = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Вхід</h2>
        <form>
          <div className="form-group">
            <input type="email" placeholder="Email" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Пароль" />
          </div>
          <button type="submit" className="auth-submit">
            Увійти
          </button>
        </form>
        <p className="auth-link">
          Немає акаунту? <Link to="/register">Зареєструватися</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
