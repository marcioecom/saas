import { useState, FormEvent } from 'react';
// import { useHistory } from "react-router-dom"
import ReactNotification, { store } from 'react-notifications-component';
import axios from 'axios';

import logo from '../assets/images/play512.png'

import 'react-notifications-component/dist/theme.css'
import '../styles/login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const appUrl = process.env.REACT_APP_APP_URL
  // const history = useHistory()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (email.trim() === '' || password.trim() === '') {
      return store.addNotification({
        title: "Campos Vazios!",
        message: "preencha o Email e Senha",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
    }

    axios.post(`${appUrl}/login`, { email, password }
    ).then((res) => {
      localStorage.setItem('token', res.data)

      store.addNotification({
        title: "Deu certo!",
        message: "entrando no sistema",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
      });

      setTimeout(() => {
        // history.push('/videos')
      }, 2500)
    }).catch((err) => {
      switch (err.message) {
        case 'Request failed with status code 401':
          store.addNotification({
            title: "Dados inválidos!",
            message: "Email ou Senha incorretos",
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true
            }
          });
          break
        default:
          store.addNotification({
            title: "Algo deu errado!",
            message: "tente novamente mais tarde",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true
            }
          });
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
              <button
                type="submit"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
