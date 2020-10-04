import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { FiLogIn } from 'react-icons/fi';

import Logo from '../../assets/logo.svg';
import api from "../../services/api";
import { login } from "../../services/auth";

import './styles.css';

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: "Preencha o campo usuário e senha para continuar!" });
    } else {

      try {
        const response = await api.post("/login", { email, password });
        login(response.data.token);

        this.props.history.push("/profile");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais."
        });
      }
    }
  };

  render() {
    return (
        <div className="logon-container">
            <div className="content">
                <section className="form">
                    <form  onSubmit={this.handleSignIn}>
                        <img className="logo" src={Logo} alt="SakaVault" />
                        {this.state.error && <p>{this.state.error}</p>}

                        <input
                        type="email"
                        placeholder="E-mail"
                        onChange={e => this.setState({ email: e.target.value })}
                        />
                        
                        <input
                        type="password"
                        placeholder="Senha"
                        onChange={e => this.setState({ password: e.target.value })}
                        />
                        <button className="button buttom-margin-top" type="submit">Entrar</button>
                        <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"></FiLogIn>
                        Criar uma conta</Link>
                    </form>
                </section>
            </div>
        </div>
    );
  }
}

export default withRouter(SignIn);