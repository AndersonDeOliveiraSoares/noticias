import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class TableRow extends Component {

  render() {
    return (
      <div>
      <div className="card"  >
        <div className="card-header d-flex justify-content-between">
          <span>
            <strong>Titulo: </strong>{this.props.obj.titulo}
          </span>
          <div>
            <button>
              <Link to={"/editar/"+this.props.obj.id} >Editar</Link>
            </button> 
          </div>
        </div>
        <div className="card-body">
          {this.props.obj.conteudo}
        </div>
        <div className="card-footer d-flex justify-content-between">
          <span>
              <strong>Data: </strong> 
                  <Moment format="DD/MM/YYYY">
                    {this.props.obj.data_publicacao}
                  </Moment>            
          </span>
          <div>
            <button className="btn btn-danger btn-sm">
              <Link to={"/apagar/"+this.props.obj.id} >Deletar</Link>
            </button>
          </div>
        </div>
        
      </div>
      <div>&nbsp;</div>
      </div>
    );
  }
}

export default TableRow;