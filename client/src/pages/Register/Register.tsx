import { FormEvent, useState } from 'react';
import { Link } from "react-router-dom"
import ReactNotification from "react-notifications-component"
import { useAuth } from '../../hooks/useAuth';

import Button from '../../components/Button/Button';
import createNotification from '../../components/Notification';

import logo from '../../assets/images/play512.png'

import "./register.css"
import api from '../../services/api';

const Register = () => {
  const { handleLogin } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSignIn(event: FormEvent) {
    event.preventDefault()

    api.post('/users', { name, email, password }
    ).then(async () => {
      createNotification({
        title: "Cadastro feito!",
        message: "Entrando no sistema",
        type: "success",
      })

      await handleLogin({ email, password })
    }).catch((err) => {
      switch (err.message) {
        case 'Request failed with status code 400':
          createNotification({
            title: "Usuário já existe!",
            message: "Tente entrar na sua conta",
            type: "warning",
          })
          break
        default:
          createNotification({
            title: "Algo deu errado!",
            message: "Tente novamente mais tarde",
            type: "danger",
          })
          break;
      }
    })
  }

  return (
    <>
      <ReactNotification />
      <div className="content">
        <div className="container">
          <form
            className="form-container"
            onSubmit={handleSignIn}
          >
            <div className="form-header">
              <img src={logo} className="logo" alt="Logo" />
              <h1 className="text-center">Cadastro</h1>
            </div>
            <div className="line-content">
              <label htmlFor="input-name">Nome</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="input-name"
                placeholder="Digite seu nome"
                required
              />
            </div>

            <div className="line-content">
              <label htmlFor="input-email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="input-email"
                placeholder="Digite seu email"
                required
              />
            </div>

            <div className="line-content">
              <label htmlFor="input-password">Senha</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="input-password"
                placeholder="Digite sua senha"
                required
              />
            </div>

            <div className="line-content">
              <Button type="submit">
                Cadastrar
              </Button>
            </div>

            <div className="line-content">
              <p>
                Já tem uma conta? <Link to="/login">Entrar</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register;