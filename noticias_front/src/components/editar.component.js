import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import api from "../services/api";

import {API_URL, ROTA_LIST} from '../resources/constants'
import {ALERT_OPTIONS} from '../resources/constants'
import { alertService } from '../resources/alert.service';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitulo = this.onChangeTitulo.bind(this);
    this.onChangeConteudo = this.onChangeConteudo.bind(this);
    this.onChangeDataPublicacao = this.onChangeDataPublicacao.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      titulo: '',
      conteudo: '',
      data_publicacao:''
    }
  }

  componentDidMount() {
        api.get(API_URL + '/' + this.props.match.params.id)
          .then(response => {
            console.log(response)
              this.setState({ 
                titulo: response.data.titulo, 
                conteudo: response.data.conteudo,
                data_publicacao: response.data.data_publicacao });
          }).catch(error => {
            alertService.error('Erro carregando a notícia.', ALERT_OPTIONS)
            console.log(error)
          })
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
  onChangeDataPublicacao(e) {
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
    api.put(API_URL + '/' + this.props.match.params.id, obj)
        .then(res => {
          alertService.success('Notícia atualizada com sucesso.', ALERT_OPTIONS)
          console.log('Notícia atualizada com sucesso.', res.data)
          this.props.history.push(ROTA_LIST);
        }).catch(error => {
          alertService.error('Erro atualizando a notícia.', ALERT_OPTIONS)
          console.log(error)
        })
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Alterar Notícia</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group required">
                    <label className="control-label">Título</label>
                    <input 
                      type="text" 
                      className="form-control"
                      required
                      value={this.state.titulo}
                      onChange={this.onChangeTitulo}
                      />
                </div>
                <div className="form-group required">
                    <label className="control-label">Conteúdo</label>
                    <textarea type="text" 
                      className="form-control"
                      rows="4"
                      required
                      value={this.state.conteudo}
                      onChange={this.onChangeConteudo}
                      />
                </div>
                <div className="form-group required">
                    <label className="control-label">Data Publicação</label>
                    <input type="date"
                      max="9999-12-31" 
                      className="form-control"
                      required
                      value={this.state.data_publicacao}
                      onChange={this.onChangeDataPublicacao}
                      />
                </div>
                <div className="form-group" id="buttons">
                    <button type="submit" style={{background: "#054f77", color: "#fff", marginLeft: 20}}
                      className="btn button-margin">
                        salvar
                    </button>
                    <Route render={({ history}) => (
                      <button style={{background: "#054f77", color: "#fff", marginLeft: 20}}
                        type='button'
                        onClick={() => { history.push(ROTA_LIST) }}
                        className="btn btn-outline-dark">
                          Cancelar
                      </button>
                    )}/>
                </div>
            </form>
        </div>
    )
  }
}