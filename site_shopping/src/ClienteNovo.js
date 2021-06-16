import axios from 'axios';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class ClienteNovo extends Component {

    clienteVazio = {
        cpfCliente: '',
        nomeCliente: '',
        idade: '',
        lojasVisitadas: []
    };

    constructor(props) {
        super(props);
        this.state = {
            cliente: this.clienteVazio
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'novo') {
            axios.get(`http://localhost:8080/cliente/get-cliente?cpfCliente=${this.props.match.params.id}`)
                .then(res => {
                    this.setState({cliente : res.data});
                })
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let cliente = {...this.state.cliente};
        cliente[name] = value;
        this.setState({cliente});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {cliente} = this.state;

        if (this.props.match.params.id !== 'novo') {
            await axios.post('http://localhost:8080/cliente/update-cliente', 
                { cpfCliente: cliente.cpfCliente, nomeCliente: cliente.nomeCliente, idade: cliente.idade, lojasVisitadas: cliente.lojasVisitadas}, { headers: {'Content-Type': 'application/json'}})
                    .then(() => {
                        toast.success("Atualizado com sucesso");
                    })
                    .catch(() => {
                        toast.error("Erro ao atualizar");
                    });
        } else {
            await axios.post('http://localhost:8080/cliente/insert-cliente', 
                { cpfCliente: cliente.cpfCliente, nomeCliente: cliente.nomeCliente, idade: cliente.idade, lojasVisitadas: cliente.lojasVisitadas}, { headers: {'Content-Type': 'application/json'}})
                    .then(() => {
                        toast.success("Inserido com sucesso");
                    })
                    .catch(() => {
                        toast.error("Erro ao inserir");
                    });
        }
        this.props.history.push('/cliente');
    }

    render() {
        const operacao = this.props.match.params.id;
        const {cliente} = this.state;
        const titulo = <h2>{operacao !== 'novo' ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>;

        return <div>
            <Container>
                {titulo}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="cpfCliente">CPF</Label>
                        <Input type="text" name="cpfCliente" id="cpfCliente" value={cliente.cpfCliente || ''}
                                onChange={this.handleChange} autoComplete="cpfCliente" disabled = {operacao !== 'novo'}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="nomeCliente">Nome do cliente</Label>
                        <Input type="text" name="nomeCliente" id="nomeCliente" value={cliente.nomeCliente || ''}
                               onChange={this.handleChange} autoComplete="nomeCliente"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="idade">Idade</Label>
                        <Input type="number" name="idade" id="idade" value={cliente.idade || ''}
                               onChange={this.handleChange} autoComplete="idade"/>
                    </FormGroup>
                    <FormGroup>
                        <ToastContainer />
                        <Button color="primary" type="submit">Salvar</Button>{' '}
                        <Button color="secondary" tag={Link} to="/cliente">Cancelar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(ClienteNovo);