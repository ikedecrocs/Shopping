import axios from 'axios';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class FuncionarioNovo extends Component {

    funcionarioVazio = {
        cpfFuncionario: '',
        nomeFuncionario: '',
        dataNascimento: '',
        email: '',
        cep: '',
        loja: null
    };

    constructor(props) {
        super(props);
        this.state = {
            funcionario: this.funcionarioVazio,
            codigoLoja: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'novo') {
            axios.get(`http://localhost:8080/funcionario/get-funcionario?cpfFuncionario=${this.props.match.params.id}`)
                .then(res => {
                    this.setState({funcionario : res.data});
                    this.setState({codigoLoja: this.state.funcionario.loja.codigoLoja});
                })
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name === 'codigoLoja') {
            this.setState({codigoLoja: value});
        } else {
            let funcionario = {...this.state.funcionario};
            funcionario[name] = value;
            this.setState({funcionario});
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {funcionario} = this.state;

        axios.get(`http://localhost:8080/loja/get-loja?codigoLoja=${this.state.codigoLoja}`)
            .then(async response => {
                funcionario.loja = response.data;
                if (this.props.match.params.id !== 'novo') {
                    await axios.post('http://localhost:8080/funcionario/update-funcionario', 
                        { cpfFuncionario: funcionario.cpfFuncionario, nomeFuncionario: funcionario.nomeFuncionario, dataNascimento: funcionario.dataNascimento, email: funcionario.email, cep: funcionario.cep, loja: funcionario.loja}, { headers: {'Content-Type': 'application/json'}})
                            .then(() => {
                                toast.success("Atualizado com sucesso");
                            })
                            .catch(() => {
                                toast.error("Erro ao atualizar");
                            });
                } else {
                    await axios.post('http://localhost:8080/funcionario/insert-funcionario', 
                        { cpfFuncionario: funcionario.cpfFuncionario, nomeFuncionario: funcionario.nomeFuncionario, dataNascimento: funcionario.dataNascimento, email: funcionario.email, cep: funcionario.cep, loja: funcionario.loja}, { headers: {'Content-Type': 'application/json'}})
                            .then(() => {
                                toast.success("Inserido com sucesso");
                            })
                            .catch(() => {
                                toast.error("Erro ao inserir");
                            });
                }
                this.props.history.push('/funcionario');
            }).catch(() => {
                toast.error("Loja não encontada");
            })
    }

    render() {
        const operacao = this.props.match.params.id;
        const {funcionario} = this.state;
        const titulo = <h2>{operacao !== 'novo' ? 'Editar Funcionário' : 'Adicionar Funcionário'}</h2>;

        return <div>
            <Container>
                {titulo}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="cpfFuncionario">CPF</Label>
                        <Input type="text" name="cpfFuncionario" id="cpfFuncionario" value={funcionario.cpfFuncionario || ''}
                                onChange={this.handleChange} autoComplete="cpfFuncionario" disabled = {operacao !== 'novo'}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="nomeFuncionario">Nome do funcionário</Label>
                        <Input type="text" name="nomeFuncionario" id="nomeFuncionario" value={funcionario.nomeFuncionario || ''}
                               onChange={this.handleChange} autoComplete="nomeFuncionario"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="dataNascimento">Data de nascimento</Label>
                        <Input type="text" name="dataNascimento" id="dataNascimento" value={funcionario.dataNascimento || ''}
                               onChange={this.handleChange} autoComplete="dataNascimento"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={funcionario.email || ''}
                               onChange={this.handleChange} autoComplete="email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="cep">CEP</Label>
                        <Input type="text" name="cep" id="cep" value={funcionario.cep || ''}
                               onChange={this.handleChange} autoComplete="cep"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="codigoLoja">Código da loja</Label>
                        <Input type="text" name="codigoLoja" id="codigoLoja" value={this.state.codigoLoja || ''}
                               onChange={this.handleChange} autoComplete="codigoLoja"/>
                    </FormGroup>
                    <FormGroup>
                        <ToastContainer />
                        <Button color="primary" type="submit">Salvar</Button>{' '}
                        <Button color="secondary" tag={Link} to="/funcionario">Cancelar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(FuncionarioNovo);