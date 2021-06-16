import React from 'react';

import axios from 'axios';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';

export default class LojaList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {lojas: []};
    };

    componentDidMount() {
        this.listar();
    }

    async listar() {
        await axios.get('http://localhost:8080/loja/list-lojas')
            .then(res => {
                this.setState({lojas: res.data});
            })
            .catch(() => {});
    }

    async remover(codigoLoja) {
        axios.delete(`/loja/delete-loja?codigoLoja=${codigoLoja}`)
            .then(() => {
                this.listar();
        });
    }

    render() {
        const listaLoja = this.state.lojas.map(loja => {
            return <tr key={loja.codigoLoja}>
                <td>{loja.codigoLoja}</td>
                <td>{loja.cnpjLoja}</td>
                <td>{loja.nomeLoja}</td>
                <td>{loja.numeroFuncionarios}</td>
                <td>{loja.andar.nomeAndar}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/loja/" + loja.codigoLoja}>Editar</Button>
                        <Button size="sm" color="danger" onClick={() => this.remover(loja.codigoLoja)}>Excluir</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="secondary" tag={Link} to="/home">Voltar</Button>
                        <Button color="success" tag={Link} to="/loja/novo">Adicionar</Button>
                    </div>
                    <h3>Lojas</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="10%">Código</th>
                            <th width="15%">CNPJ</th>
                            <th width="25%">Nome</th>
                            <th width="10%">Número de funcionários</th>
                            <th width="25%">Andar</th>
                            <th width="15%">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                            {listaLoja}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}