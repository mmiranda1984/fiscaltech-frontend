import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VeiculoLista from './VeiculoLista';
import VeiculoEdit from './VeiculoEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* Lista de Rotas que mapeadas para a aplicação */}
          <Route path='/' exact={true} component={VeiculoLista}/>
          <Route path='/veiculos/:id' component={VeiculoEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;