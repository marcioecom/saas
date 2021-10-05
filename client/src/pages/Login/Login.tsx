import { useState, FormEvent } from 'react';
import { Link } from "react-router-dom"
import ReactNotification from 'react-notifications-component';
import { useAuth } from '../../hooks/useAuth';

import createNotification from '../../components/Notification';
import Button from '../../components/Button/Button';

import logo from '../../assets/images/play512.png'

import 'react-notifications-component/dist/theme.css'
import './login.css'

const Login = () => {
  const { handleLogin } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (email.trim() === '' || password.trim() === '') {
      return createNotification({
        title: "Campos Vazios!",
        message: "Preencha o Email e Senha",
        type: "warning",
      })
    }

    await handleLogin({ email, password }
    ).then(() => {
      createNotification({
        title: "Deu certo!",
        message: "Entrando no sistema",
        type: "success",
      })
    }).catch((err) => {
      switch (err.message) {
        case 'Request failed with status code 404':
          createNotification({
            title: "Usuário não existe!",
            message: "Crie sua conta primeiro",
            type: "warning"
          })
          break
        case 'Request failed with status code 401':
          createNotification({
            title: "Dados inválidos!",
            message: "Email ou senha incorretos",
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
            onSubmit={handleSubmit}
          >
            <div className="form-header">
              <img src={logo} className="logo" alt="Logo" />
              <h1 className="text-center">Login</h1>
            </div>
            <div className="line-content">
              <label htmlFor="input-email">Email</label>
              <input
                type="email"
                name="email"
                onChange={event => setEmail(event.target.value)}
                value={email}
                id="input-email"
                placeholder="Digite seu email"
              />
            </div>

            <div className="line-content">
              <label htmlFor="input-email">Senha</label>
              <input
                type="password"
                name="password"
                onChange={event => setPassword(event.target.value)}
                value={password}
                id="input-pass"
                placeholder="Digite sua senha"
              />
            </div>

            <div className="line-content">
              <Button type="submit">
                Entrar
              </Button>
            </div>
            <div className="line-content">
              <p>
                Não tem uma conta? <Link to="/register">Cadastrar</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
