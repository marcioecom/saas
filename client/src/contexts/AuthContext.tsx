import React, {
  createContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import api from "../services/api"
import history from "../services/history"

type AuthContextType = {
  loading: boolean;
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: ({ email, password }: UserRequest) => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode;
}

type UserRequest = {
  email: string;
  password: string;
}

const AuthContext = createContext({} as AuthContextType);

function AuthProvider({ children }: AuthProviderProps) {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true)
    }

    setLoading(false)
  }, [])

  async function handleLogin({ email, password }: UserRequest) {
    const { data } = await api.post('/login', { email, password })

    localStorage.setItem('token', data)
    api.defaults.headers.Authorization = `Bearer ${data}`;
    setAuthenticated(true)

    setTimeout(() => {
      history.push('/videos')
    }, 2000)
  }

  return (
    <AuthContext.Provider value={{
      loading, authenticated, setAuthenticated, handleLogin
    }}>
      {children}
    </ AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }