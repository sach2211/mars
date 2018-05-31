import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Login from './login';
import Table from './data';
import './App.css';

export default class App extends React.Component {

  render() {
    return (
      <div className='center'>
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/data' component={Table} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
};