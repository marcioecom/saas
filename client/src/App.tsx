import React from "react"
import { Router, Switch, Route, Redirect, RouteProps } from "react-router-dom"
import history from "./services/history"
import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./contexts/AuthContext";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Videos from "./pages/Videos/Videos";

import loadingGif from "./assets/load.gif"
import Embeded from "./pages/Embeded/Embeded";
import SideBar from "./components/SideBar/SideBar";

interface ICustomRoute extends RouteProps {
  isPrivate?: boolean;
}

function CustomRoute({ isPrivate, ...rest }: ICustomRoute) {
  const { loading, authenticated } = useAuth()

  if (loading) {
    return (
      <div className="img-center">
        <img
          src={loadingGif}
          className="img-center"
          alt="loading gif"
        />
      </div>
    )
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />
  }

  return <Route {...rest} />
}

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <Switch>
          <CustomRoute path="/login" component={Login} />
          <CustomRoute path="/register" component={Register} />
          <CustomRoute path="/embeded" component={Embeded} />
          <div style={{ display: "flex" }}>
            <SideBar />
            <CustomRoute isPrivate path="/videos" component={Videos} />
          </div>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
