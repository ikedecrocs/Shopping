import React from 'react';

import axios from 'axios';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default class ClienteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {clientes: [], lojaSelecionada: ''};

        this.handleChange = this.handleChange.bind(this);
    };

    componentDidMount() {
        this.listar();
    }

    async listar() {
        await axios.get('http://localhost:8080/cliente/list-clientes')
            .then(res => {
                this.setState({clientes: res.data});
            })
            .catch(() => {});
    }

    async remover(cpfCliente) {
        axios.delete(`/cliente/delete-cliente?cpfCliente=${cpfCliente}`)
            .then(() => {
                this.listar();
        });
    }

    async adicionarLoja(codigoLoja, cpfCliente) {
        axios.post(`/cliente/enter-loja?codigoLoja=${codigoLoja}&cpfCliente=${cpfCliente}`)
            .then(() => {
                this.listar();
                toast.success("Loja adicionada");
            }).catch(() => {
                toast.error("Loja inválida");
            });
    };

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        let lojaSelecionada = value;
        this.setState({lojaSelecionada});
    }


    render() {
        const listaClientes = this.state.clientes.map(cliente => {
            return <tr key={cliente.cpfCliente}>
                <td>{cliente.cpfCliente}</td>
                <td>{cliente.nomeCliente}</td>
                <td>{cliente.idade}</td>
                <td>{cliente.lojasVisitadas.map(loja => {
                    return loja.codigoLoja + " | ";
                })}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/cliente/" + cliente.cpfCliente}>Editar</Button>
                        <Button size="sm" color="danger" onClick={() => this.remover(cliente.cpfCliente)}>Excluir</Button>
                    </ButtonGroup>
                </td>
                <td>
                    <ToastContainer />
                    <Input type="text" name="codigoLoja" id="codigoLoja" onChange={this.handleChange} autoComplete="codigoLoja"/>
                    <Button size="sm" color="sucess" onClick={() => this.adicionarLoja(this.state.lojaSelecionada, cliente.cpfCliente)}>+</Button>
                </td>
            </tr>
        });

        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="secondary" tag={Link} to="/home">Voltar</Button>
                        <Button color="success" tag={Link} to="/cliente/novo">Adicionar</Button>
                    </div>
                    <h3>Clientes</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="15%">CPF</th>
                            <th width="25%">Nome</th>
                            <th width="10%">Idade</th>
                            <th width="25%">Lojas Visitadas</th>
                            <th width="10%">Ações</th>
                            <th width="15%">Adicionar Loja</th>
                        </tr>
                        </thead>
                        <tbody>
                            {listaClientes}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}