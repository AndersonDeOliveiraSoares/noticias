import React from "react";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";

import { isAuthenticated } from "./services/auth";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import Home from './components/home.component.js'
import Create from './components/cadastra.component';
import Edit from './components/editar.component';
import Delete from './components/delete.component';
import List from './components/list.component';
import { Alert } from './components/alert.component';

import { ROTA_HOME, ROTA_CREATE, ROTA_LIST, ROTA_EDIT, ROTA_DELETE, ROTA_SIGN_IN, ROTA_SIGN_UP, ROTA_NOT_FOUND} 
        from './resources/constants'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: ROTA_SIGN_IN, state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
        <div className="container" >
          <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-nav">
            <Link to={ROTA_LIST} className="navbar-brand">
            Listar
            </Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="nav navbar-nav ml-auto">
                {/* <li className="nav-item active">
                  <Link to={ROTA_LIST} className="nav-link">Listar</Link>
                </li> */}
                <li className="nav-item">
                  <Link to={ROTA_CREATE} className="navbar-brand">Cadastrar</Link>
                </li>
              </ul>
            </div>
          </nav> 

          <Alert />

          <Switch>
              <Route exact path={ROTA_SIGN_IN} component={SignIn} />
              <Route path={ROTA_SIGN_UP} component={SignUp} />

              <PrivateRoute path={ROTA_HOME} component={ Home } />
              <PrivateRoute path={ROTA_CREATE} component={ Create } />
              <PrivateRoute path={ROTA_EDIT} component={ Edit } />
              <PrivateRoute path={ROTA_DELETE} component={ Delete } />
              <PrivateRoute path={ROTA_LIST} component={ List } />
              <PrivateRoute path={ROTA_NOT_FOUND} component={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
);

export default Routes;
