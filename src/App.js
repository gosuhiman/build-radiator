import React, { Component } from 'react';
import './App.scss'
import { CircleCIService } from "./services/CircleCI.service";
import { BranchService } from "./services/Branch.service";
import { BranchPicker } from "./components/BranchPicker.component";
import includes from 'lodash/includes';
import pull from 'lodash/pull';

class App extends Component {
  constructor(props) {
    super(props);
    const circleCIService = new CircleCIService('wolololo');
    const branchService = new BranchService(circleCIService);
    this.state = {
      branches: [],
      branchNames: [],
      trackedBranches: []
    };

    branchService.branches('wolololo', ['master', 'release/0.39.6'])
      .then(branches => {
        this.setState({
          branches: branches
        });
        console.log(branches);
      });

    branchService.branchNames('optiondriver-api')
      .then(branchNames => {
        this.setState({
          branchNames: branchNames
        });
      });
  }

  handleBranchClick(branchName) {
    const trackedBranches = this.state.trackedBranches.slice();
    if (includes(trackedBranches, branchName)) {
      pull(trackedBranches, branchName);
    } else {
      trackedBranches.push(branchName);
    }
    this.setState({
      trackedBranches: trackedBranches
    });
  }

  render() {
    return (
      <div className="App">
        <BranchPicker
          branchNames={this.state.branchNames}
          trackedBranches={this.state.trackedBranches}
          handleBranchClick={(branchName) => this.handleBranchClick(branchName)}
        />
      </div>
    );
  }
}

export default App;
