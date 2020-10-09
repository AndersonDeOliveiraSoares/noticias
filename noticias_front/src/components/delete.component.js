import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import api from "../services/api";

import { alertService } from '../resources/alert.service';
import {API_URL, ROTA_LIST} from '../resources/constants'
import {ALERT_OPTIONS} from '../resources/constants'

export default class Delete extends Component {
  constructor(props) {
    super(props);
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
              this.setState({ 
                titulo: response.data.titulo, 
                conteudo: response.data.conteudo,
                data_publicacao: response.data.data_publicacao });
          }).catch(error => {
            alertService.error('Erro carregando a notícia.', ALERT_OPTIONS)
            console.log(error)
          })
  }

  onSubmit(e) {
    e.preventDefault();
    api.delete(API_URL + '/' + this.props.match.params.id)
          .then(response => {
            alertService.success('Notícia excluída com sucesso.', ALERT_OPTIONS)
            console.log('Deleted')
            this.props.history.push(ROTA_LIST);
          })
          .catch(err => {
            alertService.error('Erro excluindo a notícia.', ALERT_OPTIONS)
            console.log(err)
          })
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Deletar Notícia</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Título</label>
                    <input 
                      type="text" 
                      disabled
                      className="form-control"
                      value={this.state.titulo}
                      />
                </div>
                <div className="form-group">
                    <label>Conteúdo</label>
                    <textarea type="text" 
                      disabled
                      className="form-control"
                      rows="4"
                      value={this.state.conteudo}
                      />
                </div>
                <div className="form-group">
                    <label>Data Publicação</label>
                    <input type="date"
                      disabled
                      className="form-control"
                      value={this.state.data_publicacao}
                      />
                </div>
                <div className="form-group" id="buttons">
                    <button 
                      onClick={this.delete} 
                      className="btn button-margin" style={{background: "#054f77", color: "#fff", margin: 20}}>
                        Confirmar
                    </button>
                    <Route render={({ history}) => (
                      <button style={{background: "#054f77", color: "#fff", margin: 20}}
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