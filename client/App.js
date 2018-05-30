import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Login from './login';
import Table from './data';
import './App.css';

const Dumb = () => (<div> Hello World </div>);

export default class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/data' component={Table} />
        </Switch>
      </BrowserRouter>
    );
  }
};