import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import {USER_CREATE} from '../../resources/constants'

import api from "../../services/api";

import {ALERT_OPTIONS, ROTA_SIGN_IN} from '../../resources/constants'
import { alertService } from '../../resources/alert.service';

import { Form, Container } from "./styles";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      alertService.error('Preencha todos os dados para se cadastrar.', ALERT_OPTIONS)
    } else {
      try {
        await api.post(USER_CREATE, { email, password });
        this.props.history.push(ROTA_SIGN_IN);
        alertService.success('Usuário criado com sucesso! Você ja pode logar.', ALERT_OPTIONS)
      } catch (err) {
        console.log(err);
        alertService.error('Ocorreu um erro ao registrar sua conta. tente mais tarde.', ALERT_OPTIONS)
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          <h3>Criar novo usuário</h3>
          <br/>
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Cadastrar</button>
          <hr />
          <button style={{ marginTop: "20px"}}>
            <Link to={ROTA_SIGN_IN}>Login</Link>
          </button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);
