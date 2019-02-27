import React, {Component} from 'react';
import './LoginForm.scss'

interface Props {
}

export class LoginForm extends Component<Props> {
  render() {
    return (
      <div className="LoginForm">
        <form>
          <div className="form-group">
            <label htmlFor="api-key">CircleCI API KEY</label>
            <input type="password" className="form-control" id="api-key" placeholder="Enter API KEY" />
          </div>
        </form>
      </div>
    );
  }
}


