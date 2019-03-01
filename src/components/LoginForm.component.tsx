import React, {ChangeEvent, Component} from 'react';
import './LoginForm.scss'
import {Redirect} from "react-router";

interface Props {
}

interface State {
  apiKey: string;
  loggedIn: boolean;
}

export class LoginForm extends Component<Props, State> {
  state: State = {
    apiKey: '',
    loggedIn: false
  };

  login() {
    this.setState({
      loggedIn: true
    });
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      apiKey: event.target.value
    });
  }

  render() {
    if (this.state.loggedIn) return <Redirect to="/settings"/>;

    return (
      <div className="LoginForm">
        <form>
          <div className="form-group">
            <label htmlFor="api-key">CircleCI API KEY</label>
            <input
              type="password"
              className="form-control"
              id="api-key"
              placeholder="Enter API KEY"
              value={this.state.apiKey}
              onChange={(event) => this.handleChange(event)}
            />
          </div>
          <div className="form-group">
            <button onClick={() => this.login()} type="button" className="btn btn-primary">Log in</button>
          </div>
        </form>
      </div>
    );
  }
}


