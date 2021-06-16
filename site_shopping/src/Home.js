import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { logout } from './services/auth';

class Home extends Component {
    constructor(props) {
        super();
        this.props = props;
    }

    sair() {
        logout();
    }

    render() {
        return <div style={{textAlign: 'center'}}>
            <Button style={{margin: '10px', width: '120px'}} color="primary" tag={Link} to="/andar">Andar</Button><br/>
            <Button style={{margin: '10px', width: '120px'}} color="primary" tag={Link} to="/cliente">Cliente</Button><br/>
            <Button style={{margin: '10px', width: '120px'}} color="primary" tag={Link} to="/funcionario">Funcionário</Button><br/>
            <Button style={{margin: '10px', width: '120px'}} color="primary" tag={Link} to="/loja">Loja</Button><br/>
            <Button style={{margin: '10px', width: '120px'}} color="primary" tag={Link} to="/user">Usuário</Button><br/>
            <Button style={{margin: '20px', width: '120px'}} color="danger" tag={Link} to="/login" onClick={this.sair}>Logout</Button>
        </div>
    }
}

export default withRouter(Home);