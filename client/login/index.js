import React from 'react';
import agent from 'superagent';
import { Redirect } from 'react-router-dom';
import './login.css';

export class Login extends React.Component {

  submitLoginForm = (e) => {
    e.preventDefault();
    const email = this.emailValue.value;
    const password = this.passwordValue.value;

    agent
    .post('/login')
    .send({
      email: email,
      password: password
    })
    .then( (r) => {
      if (r.body && r.body.token) {
        window.__mars_token__ = r.body.token;
        <Redirect to='/data' />
      }
    })
    .catch( e => {
      console.log('Login Failed - Please share this message with developer ', e);
    })
  }

  render() {
    return(
      <div className="loginBox"> 
        <h2> Welcome </h2>
        <form onSubmit={this.submitLoginForm} className='loginForm'>
          <input 
            placeholder="E Mail"
            ref={ email => this.emailValue = email }
            className='formInputs' />
          <br />
          <input 
            placeholder="Password"
            ref={ password => this.passwordValue = password } 
            className='formInputs' /> 
          <br />
          <input type="submit" className='submitButton'/>
        </form>
      </div>
    )
  }
}

export default Login;