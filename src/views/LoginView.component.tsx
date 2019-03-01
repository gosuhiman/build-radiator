import React, {Component} from 'react';
import './LoginView.scss'
import {LoginForm} from "../components/LoginForm.component";

interface Props {
}

export class LoginView extends Component<Props> {
  render() {
    return (
      <div className="LoginView View">
        <LoginForm/>
      </div>
    );
  }
}


