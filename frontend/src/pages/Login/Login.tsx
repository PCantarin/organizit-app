import React, { useState } from "react";
import { login } from "../../services/authService";
import "./Login.css";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  async function formHandle(e: React.SubmitEvent) {
    e.preventDefault();
    try {
      const data = await login(user, password);
      localStorage.setItem("token", data.token);
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <section
      className="content justify-content-center d-flex shadow-lg"
      id="content"
    >
      <div className="col-md-6 left-box">
        <img src="/src/assets/img/organizit_vertical_logo.png"></img>
        <h2>Bem-Vindo!</h2>
      </div>

      <div className="col-md-6 right-box">
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
        </form>
      </div>
    </section>
  );
}

export default Login;
