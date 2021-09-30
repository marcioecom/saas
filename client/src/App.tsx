import { Router, Switch, Route } from "react-router-dom"
import { createBrowserHistory } from "history"
import { AuthProvider } from "./contexts/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";

const history = createBrowserHistory()

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
