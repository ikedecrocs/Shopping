import axios from 'axios';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class AndarNovo extends Component {

    andarVazio = {
        codigoAndar: '',
        nomeAndar: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            andar: this.andarVazio
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'novo') {
            axios.get(`http://localhost:8080/andar/get-andar?codigoAndar=${this.props.match.params.id}`)
                .then(res => {
                    this.setState({andar : res.data});
                })
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let andar = {...this.state.andar};
        andar[name] = value;
        this.setState({andar});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {andar} = this.state;

        if (this.props.match.params.id !== 'novo') {
            await axios.post('http://localhost:8080/andar/update-andar', { codigoAndar: andar.codigoAndar, nomeAndar: andar.nomeAndar}, { headers: {'Content-Type': 'application/json'}})
                .then(() => {
                    toast.success("Atualizado com sucesso");
                })
                .catch(() => {
                    toast.error("Erro ao atualizar");
                });
        } else {
            await axios.post('http://localhost:8080/andar/insert-andar', { codigoAndar: andar.codigoAndar, nomeAndar: andar.nomeAndar}, { headers: {'Content-Type': 'application/json'}})
                .then(() => {
                    toast.success("Inserido com sucesso");
                })
                .catch(() => {
                    toast.error("Erro ao inserir");
                });;
        }
        this.props.history.push('/andar');
    }

    render() {
        const operacao = this.props.match.params.id;
        const {andar} = this.state;
        const titulo = <h2>{operacao !== 'novo' ? 'Editar Andar' : 'Adicionar Andar'}</h2>;

        return <div>
            <Container>
                {titulo}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="codigoAndar">Código do andar</Label>
                        <Input type="text" name="codigoAndar" id="codigoAndar" value={andar.codigoAndar || ''}
                                onChange={this.handleChange} autoComplete="codigoAndar" disabled = {operacao !== 'novo'}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="nomeAndar">Nome do andar</Label>
                        <Input type="text" name="nomeAndar" id="nomeAndar" value={andar.nomeAndar || ''}
                               onChange={this.handleChange} autoComplete="nomeAndar"/>
                    </FormGroup>
                    <FormGroup>
                        <ToastContainer />
                        <Button color="primary" type="submit">Salvar</Button>{' '}
                        <Button color="secondary" tag={Link} to="/andar">Cancelar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(AndarNovo);