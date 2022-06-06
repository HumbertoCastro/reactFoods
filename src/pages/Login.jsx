import React from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

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
      if (name.length > 3 && email.length > 5) {
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
        <input type="text" placeholder="name" 
        onChange={ this.handleChange } value={ this.state.name } name="name" />
        <input type="text" placeholder="email" 
        onChange={ this.handleChange } value={ this.state.email } name="email" />
        <button type="button" onClick={ this.logar } disabled={ disebled }  >login</button>
      </div>
    )
  }
}

export default Login;