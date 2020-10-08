import React, { Component } from 'react';
import TableRow from './card.component';

import {API_URL} from '../resources/constants'

import api from "../services/api";

export default class List extends Component {

  constructor(props) {
      super(props);
      this.state = {noticias: []};
    }
    componentDidMount(){
      api.get(API_URL)
        .then(response => {
          this.setState({ noticias: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    tabRow(){
      return this.state.noticias.map(function(object, i){
          return <TableRow obj={object} key={i}/>;
      });
    }

    render() {
      return (
        <div>
          <h3 align="center">Lista de Notícias</h3>
          
              { this.tabRow() }
            
        </div>
      );
    }
  }