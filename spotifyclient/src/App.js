import {Route, Switch} from 'react-router-dom'
import Home from './components/home';
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoute from './components/protectedRoute';
import NotFound from './components/NotFound'
import Playsong from './components/Playsong';
import './App.css';

function App() {
  return(
     <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/playsong/:id" component={Playsong} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default App;
