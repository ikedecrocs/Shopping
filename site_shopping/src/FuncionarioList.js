import React from 'react';

import axios from 'axios';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';

export default class FuncionarioList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {funcionarios: []};
    };

    componentDidMount() {
        this.listar();
    }

    async listar() {
        await axios.get('http://localhost:8080/funcionario/list-funcionarios')
            .then(res => {
                this.setState({funcionarios: res.data});
            })
            .catch(() => {});
    }

    async remover(cpfFuncionario) {
        axios.delete(`/funcionario/delete-funcionario?cpfFuncionario=${cpfFuncionario}`)
            .then(() => {
                this.listar();
        });
    }

    render() {
        const listaFuncionario = this.state.funcionarios.map(funcionario => {
            return <tr key={funcionario.cpfFuncionario}>
                <td>{funcionario.cpfFuncionario}</td>
                <td>{funcionario.nomeFuncionario}</td>
                <td>{funcionario.dataNascimento}</td>
                <td>{funcionario.email}</td>
                <td>{funcionario.cep}</td>
                <td>{funcionario.loja.nomeLoja}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/funcionario/" + funcionario.cpfFuncionario}>Editar</Button>
                        <Button size="sm" color="danger" onClick={() => this.remover(funcionario.cpfFuncionario)}>Excluir</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="secondary" tag={Link} to="/home">Voltar</Button>
                        <Button color="success" tag={Link} to="/funcionario/novo">Adicionar</Button>
                    </div>
                    <h3>Funcionarios</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="15%">CPF</th>
                            <th width="25%">Nome</th>
                            <th width="10%">Data de nascimento</th>
                            <th width="20%">Email</th>
                            <th width="10%">CEP</th>
                            <th width="10">Loja</th>
                            <th width="10%">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                            {listaFuncionario}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}