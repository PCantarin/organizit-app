import React, { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { AxiosError } from "axios";

function Login() {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function formHandle(event: React.SubmitEvent) {
    event.preventDefault();

    try {
      const data = await login(user, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user))
      navigate("/home");
    }
    catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 401) {
        setErrorMessage("Usuário ou senha incorretos.")
      }
    }
    
  }

  return (
    <div className="login-body">
    <section
      className="login-container justify-content-center d-flex shadow-lg"
      id="content"
    >
      <div className="col-md-6 login-left-box">
        <img src="/src/assets/img/organizit_vertical_logo.png"></img>
        <h2>Bem-Vindo!</h2>
      </div>

      <div className="col-md-6 login-right-box">
        <h1>Login</h1>

        <form onSubmit={formHandle}>
          <div className="input-group mb-3">
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              type="text"
              placeholder="Usuário"
              className="form-control form-control-lg fs-6"
            ></input>
          </div>

          <div className="input-group mb-3">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Senha"
              className="form-control form-control-lg fs-6"
            ></input>
          </div>

          <div className="input-group mb-3 justify-content-center">
            <button type="submit" className="btn text-white">
              Entrar
            </button>
          </div>

          <p>{errorMessage}</p>
        </form>
      </div>
    </section>
    </div>
  );
}

export default Login;
