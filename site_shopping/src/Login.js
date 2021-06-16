import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { login } from './services/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class Login extends Component {

    usuarioVazio = {
        username: '',
        password: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            usuario: this.usuarioVazio,
            erroLogin: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        if (localStorage.getItem("token") !== null) {
            this.props.history.push("/home");
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let usuario = {...this.state.usuario};
        usuario[name] = value;
        this.setState({usuario});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {usuario} = this.state;

        await axios.post('http://localhost:8080/login', { username: usuario.username, password: usuario.password}, { headers: {'Content-Type': 'application/json'}})
            .then(res => {
                login(res.data.token);
                this.props.history.push('/home');
            })
            .catch(() => {
                toast.error("Erro ao efetuar login")
            });
    }

    render() {
        return <div>
            <Container>
                <h2>Login</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username">Usuário</Label>
                        <Input type="text" name="username" id="username" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Senha</Label>
                        <Input type="password" name="password" id="password" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Entrar</Button>
                        <ToastContainer />
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(Login);