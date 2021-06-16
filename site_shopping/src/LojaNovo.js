import axios from 'axios';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class LojaNovo extends Component {

    lojaVazio = {
        codigoLoja: '',
        cnpjLoja: '',
        nomeLoja: '',
        numeroFuncionarios: 0,
        andar: null
    };

    constructor(props) {
        super(props);
        this.state = {
            loja: this.lojaVazio,
            codigoAndar: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'novo') {
            axios.get(`http://localhost:8080/loja/get-loja?codigoLoja=${this.props.match.params.id}`)
                .then(res => {
                    this.setState({loja : res.data});
                    this.setState({codigoAndar: this.state.loja.andar.codigoAndar});
                })
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name === 'codigoAndar') {
            this.setState({codigoAndar: value});
        } else {
            let loja = {...this.state.loja};
            loja[name] = value;
            this.setState({loja});
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {loja} = this.state;

        axios.get(`http://localhost:8080/andar/get-andar?codigoAndar=${this.state.codigoAndar}`)
            .then(async response => {
                loja.andar = response.data;
                if (this.props.match.params.id !== 'novo') {
                    await axios.post('http://localhost:8080/loja/update-loja', 
                        { codigoLoja: loja.codigoLoja, cnpjLoja: loja.cnpjLoja, nomeLoja: loja.nomeLoja, numeroFuncionarios: loja.numeroFuncionarios, andar: loja.andar}, { headers: {'Content-Type': 'application/json'}})
                            .then(() => {
                                toast.success("Atualizado com sucesso");
                            })
                            .catch(() => {
                                toast.error("Erro ao atualizar");
                            });
                } else {
                    await axios.post('http://localhost:8080/loja/insert-loja', 
                        { codigoLoja: loja.codigoLoja, cnpjLoja: loja.cnpjLoja, nomeLoja: loja.nomeLoja, numeroFuncionarios: loja.numeroFuncionarios, andar: loja.andar}, { headers: {'Content-Type': 'application/json'}})
                            .then(() => {
                                toast.success("Inserido com sucesso");
                            })
                            .catch(() => {
                                toast.error("Erro ao inserir");
                            });
                }
                this.props.history.push('/loja');
            }).catch(() => {
                toast.error("Andar não encontado");
            })
    }

    render() {
        const operacao = this.props.match.params.id;
        const {loja} = this.state;
        const titulo = <h2>{operacao !== 'novo' ? 'Editar Loja' : 'Adicionar Loja'}</h2>;

        return <div>
            <Container>
                {titulo}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="codigoLoja">Código</Label>
                        <Input type="text" name="codigoLoja" id="codigoLoja" value={loja.codigoLoja || ''}
                                onChange={this.handleChange} autoComplete="codigoLoja" disabled/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="cnpjLoja">CNPJ</Label>
                        <Input type="text" name="cnpjLoja" id="cnpjLoja" value={loja.cnpjLoja || ''}
                               onChange={this.handleChange} autoComplete="cnpjLoja"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="nomeLoja">Nome</Label>
                        <Input type="text" name="nomeLoja" id="nomeLoja" value={loja.nomeLoja || ''}
                               onChange={this.handleChange} autoComplete="nomeLoja"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="numeroFuncionarios">Número de funcionários</Label>
                        <Input type="number" name="numeroFuncionarios" id="numeroFuncionarios" value={loja.numeroFuncionarios || ''}
                               onChange={this.handleChange} autoComplete="numeroFuncionarios"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="codigoAndar">Código do andar</Label>
                        <Input type="text" name="codigoAndar" id="codigoAndar" value={this.state.codigoAndar || ''}
                               onChange={this.handleChange} autoComplete="codigoAndar"/>
                    </FormGroup>
                    <FormGroup>
                        <ToastContainer />
                        <Button color="primary" type="submit">Salvar</Button>{' '}
                        <Button color="secondary" tag={Link} to="/loja">Cancelar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(LojaNovo);