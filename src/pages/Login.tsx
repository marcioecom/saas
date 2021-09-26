import { useState, FormEvent } from 'react';
import axios from 'axios';
import logo from '../assets/images/play512.png'

import '../styles/login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const appUrl = process.env.REACT_APP_APP_URL

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (email.trim() === '' || password.trim() === '') {
      return
    }

    axios.post(`${appUrl}/users`, { email, password })
  }

  return (
    <>
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
    </>
  )
}

export default Login
