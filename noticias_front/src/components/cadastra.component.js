import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import api from "../services/api";

import { alertService } from '../resources/alert.service';
import { API_URL, ROTA_HOME, ROTA_LIST } from '../resources/constants'
import { ALERT_OPTIONS } from '../resources/constants'

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitulo = this.onChangeTitulo.bind(this);
    this.onChangeConteudo = this.onChangeConteudo.bind(this);
    this.onChangePublicacao = this.onChangePublicacao.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      titulo: '',
      conteudo: '',
      data_publicacao: new Date()
    }
  }
  onChangeTitulo(e) {
    this.setState({
      titulo: e.target.value
    });
  }
  onChangeConteudo(e) {
    this.setState({
      conteudo: e.target.value
    })
  }
  onChangePublicacao(e) {
    this.setState({
      data_publicacao: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      titulo: this.state.titulo,
      conteudo: this.state.conteudo,
      data_publicacao: this.state.data_publicacao
    };

    api.post(API_URL, obj)
      .then(response => {
        alertService.success('Notícia incluída com sucesso.', ALERT_OPTIONS)
        this.setState({
          titulo: '',
          conteudo: '',
          data_publicacao: ''
        })
      })
      .catch(error => {
        alertService.error('Erro incluindo a notícia.', ALERT_OPTIONS)
        console.log(error)
      })
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h4>Nova Notícia</h4>
        <form onSubmit={this.onSubmit}>
          <div className="form-group required">
            <label className="control-label">Título</label>
            <input
              type="text"
              className="form-control"
              required="required"
              value={this.state.titulo}
              onChange={this.onChangeTitulo}
            />
          </div>
          <div className="form-group required">
            <label className="control-label">Conteúdo</label>
            <textarea
              className="form-control"
              rows="4"
              required="required"
              value={this.state.conteudo}
              onChange={this.onChangeConteudo}
            />
          </div>
          <div className="form-group required">
            <label className="control-label">Data Publicação</label>
            <input type="date"
              max="9999-12-31"
              className="form-control"
              required="required"
              value={this.state.data_publicacao}
              onChange={this.onChangePublicacao}
            />
          </div>
          <div className="form-group" id="buttons">
            <button type="submit"
              className="button-margin" style={{ background: "#054f77",  marginLeft: 20 }} >
              Salvar
                </button>
            <Route render={({ history }) => (
              <button
                type='button'
                onClick={() => { history.push(ROTA_LIST) }}
                className="btn btn-outline-dark" style={{ background: "#054f77", color: "#fff" }}>
                Cancelar
              </button>
            )} />
          </div>
        </form>
      </div>
    )
  }
}