import React from 'react';

import axios from 'axios';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: []};
    };

    componentDidMount() {
        this.listar();
    }

    async listar() {
        axios.get('http://localhost:8080/user/list-users')
            .then(res => {
                this.setState({users : res.data});
            })
            .catch(() => {});
    }

    async remover(login) {
        axios.delete(`/user/delete-user?login=${login}`)
            .then(() => {
                this.listar();
        });
    }

    render() {
        const listaUser = this.state.users.map(user => {
            return <tr key={user.login}>
                <td>{user.login}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/user/" + user.login}>Editar</Button>
                        <Button size="sm" color="danger" onClick={() => this.remover(user.login)}>Excluir</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="secondary" tag={Link} to="/home">Voltar</Button>
                        <Button color="success" tag={Link} to="/user/novo">Adicionar</Button>
                    </div>
                    <h3>Usuários</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="60%">Login</th>
                            <th width="40%">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                            {listaUser}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}