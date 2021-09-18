import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "./pages/Login/index";
import Signup from './pages/Signup';
import Header from './components/header';
import Home from './pages/Home';
import Describe from './pages/Describe';
import {useAuth} from './context/auth';
import React ,{useState} from 'react'
import ListSeries from './pages/ListSeries'
function App() {
  const { token } = useAuth();
  return (
    <Router>
          <Header />
          <Switch>
            {token ?
            
              <>
                <Route exact path='/' component={Home} />
                <Route exact path='/list' component={ListSeries} />
                <Route exact path='/describe/:id' component={Describe} />
              </>
            :
              <>
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
              </>
            }
              
             
          </Switch>
      </Router>
  );
}

export default App;
