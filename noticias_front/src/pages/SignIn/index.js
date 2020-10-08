import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { USER_LOGIN, ROTA_SIGN_UP, ROTA_LIST } from '../../resources/constants'

import api from "../../services/api";
import { login } from "../../services/auth";

import { Form, Container } from "./styles";

import { ALERT_OPTIONS } from '../../resources/constants'
import { alertService } from '../../resources/alert.service';

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
      alertService.error('Preencha e-mail e senha para continuar!', ALERT_OPTIONS)
    } else {
      try {
        const response = await api.post(USER_LOGIN, { email, password });
        login(response.data.token);
        this.props.history.push(ROTA_LIST);
      } catch (err) {
        alertService.error('Houve um problema com o login, verifique suas credenciais e tente novamente.', ALERT_OPTIONS)
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          <h3>Login</h3>
          <input className="form-control"
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <button style={{ marginTop: "20px"}}>
            <Link to={ROTA_SIGN_UP}>Criar conta</Link>
          </button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);
