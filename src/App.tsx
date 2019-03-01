import React, {Component} from 'react';
import './App.scss'
import {Route, Router} from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";
import {LoginView} from "./views/LoginView.component";
import {SettingsView} from "./views/SettingsView.component";

interface Props {
}

interface State {
}

class App extends Component<Props, State> {

  render() {
    return (
      <Router history={createBrowserHistory()}>
        <div className="App">
          <Route exact path="/" component={LoginView}/>
          <Route path="/settings" component={SettingsView}/>
        </div>
      </Router>
    );
  }
}

export default App;
