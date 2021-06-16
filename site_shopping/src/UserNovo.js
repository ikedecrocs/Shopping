import axios from 'axios';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class UserNovo extends Component {

    userVazio = {
        login: '',
        password: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            user: this.userVazio
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'novo') {
            axios.get(`http://localhost:8080/user/get-user?login=${this.props.match.params.id}`)
                .then(res => {
                    this.setState({user : res.data});
                })
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let user = {...this.state.user};
        user[name] = value;
        this.setState({user});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {user} = this.state;

        if (this.props.match.params.id !== 'novo') {
            await axios.post('http://localhost:8080/user/update-user', { login: user.login, password: user.password}, { headers: {'Content-Type': 'application/json'}})
                .then(() => {
                    toast.success("Atualizado com sucesso");
                })
                .catch(() => {
                    toast.error("Erro ao atualizar");
                });
        } else {
            await axios.post('http://localhost:8080/user/insert-user', { login: user.login, password: user.password}, { headers: {'Content-Type': 'application/json'}})
                .then(() => {
                    toast.success("Inserido com sucesso");
                })
                .catch(() => {
                    toast.error("Erro ao inserir");
                });;
        }
        this.props.history.push('/user');
    }

    render() {
        const operacao = this.props.match.params.id;
        const {user} = this.state;
        const titulo = <h2>{operacao !== 'novo' ? 'Editar Usuário' : 'Adicionar Usuário'}</h2>;

        return <div>
            <Container>
                {titulo}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="login">Login</Label>
                        <Input type="text" name="login" id="login" value={user.login || ''}
                                onChange={this.handleChange} autoComplete="user" disabled = {operacao !== 'novo'}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Senha</Label>
                        <Input type="password" name="password" id="password"
                               onChange={this.handleChange} autoComplete="password"/>
                    </FormGroup>
                    <FormGroup>
                        <ToastContainer />
                        <Button color="primary" type="submit">Salvar</Button>{' '}
                        <Button color="secondary" tag={Link} to="/user">Cancelar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(UserNovo);