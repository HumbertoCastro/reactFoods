import React from "react";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    redirecionar: false,
    disebled: true,
  }
  
  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { name, email } = this.state;
      if (name.length > 2
          && email.split('@').length === 2 
          && email.split('@')[1].split('.').length > 1
          && email.split('@')[1].split('.')[1].length > 1
        ) {
        this.setState({
          disebled: false,
        })
      } else {
        this.setState({
          disebled: true,
        })
      }
    });
  }

  logar = () => {
    const { name, email } = this.state;
    this.setState({
      redirecionar: true,
    })
  }

  render() {
    const { redirecionar, disebled } = this.state;
    if (redirecionar) return <Redirect to="/home" />
    return(
      <div>

        <label htmlFor="nameInput">
          Name
          <input 
            id="nameInput" 
            name="name" 
            type="text" 
            placeholder="name"
            onChange={ this.handleChange } 
            value={ this.state.name } 
            />
        </label>  

       
        <label htmlFor="emailInput">
          Email
          <input
            id="emailInput"
            type="text" 
            placeholder="email" 
            onChange={ this.handleChange } 
            value={ this.state.email } 
            name="email" 
          />
        </label>

        <button 
          type="button" 
          onClick={ this.logar } 
          disabled={ disebled }  >
          login
          </button>

      </div>
    )
  }
}

export default Login;