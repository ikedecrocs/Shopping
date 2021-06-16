import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AndarList from './AndarList';
import AndarNovo from './AndarNovo';
import Login from './Login';
import Home from'./Home';
import ClienteList from './ClienteList';
import ClienteNovo from './ClienteNovo';
import FuncionarioList from './FuncionarioList';
import FuncionarioNovo from './FuncionarioNovo';
import LojaList from './LojaList';
import LojaNovo from './LojaNovo';
import UserList from './UserList';
import UserNovo from './UserNovo';

class App extends React.Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/andar' exact={true} component={AndarList}/>
            <Route path='/andar/:id' component={AndarNovo}/>
            <Route path='/login' component={Login} />
            <Route path='/home' component={Home} />
            <Route path='/cliente' exact={true} component={ClienteList} />
            <Route path='/cliente/:id' component={ClienteNovo}/>
            <Route path='/funcionario' exact={true} component={FuncionarioList} />
            <Route path='/funcionario/:id' component={FuncionarioNovo}/>
            <Route path='/loja' exact={true} component={LojaList} />
            <Route path='/loja/:id' component={LojaNovo}/>
            <Route path='/user' exact={true} component={UserList} />
            <Route path='/user/:id' component={UserNovo}/>
          </Switch>
        </Router>
    )
  }
}

export default App;
