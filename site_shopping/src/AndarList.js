import React from 'react';

import axios from 'axios';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class AndarList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {andares: []};
    };

    componentDidMount() {
        this.listar();
    }

    async listar() {
        axios.get('http://localhost:8080/andar/list-andares')
            .then(res => {
                this.setState({andares : res.data});
            })
            .catch(() => {});
    }

    async remover(codigoAndar) {
        axios.delete(`/andar/delete-andar?codigoAndar=${codigoAndar}`)
            .then(() => {
                this.listar();
        });
    }

    render() {
        const listaAndares = this.state.andares.map(andar => {
            return <tr key={andar.codigoAndar}>
                <td>{andar.codigoAndar}</td>
                <td>{andar.nomeAndar}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/andar/" + andar.codigoAndar}>Editar</Button>
                        <Button size="sm" color="danger" onClick={() => this.remover(andar.codigoAndar)}>Excluir</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="secondary" tag={Link} to="/home">Voltar</Button>
                        <Button color="success" tag={Link} to="/andar/novo">Adicionar</Button>
                    </div>
                    <h3>Andares</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Código</th>
                            <th width="30%">Nome</th>
                            <th width="40%">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                            {listaAndares}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}