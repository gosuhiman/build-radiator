import React, {Component} from 'react';
import './App.scss'
import {CircleCIService} from "./services/CircleCI.service";
import {BranchService} from "./services/Branch.service";
import {BranchPicker} from "./components/BranchPicker.component";
import includes from 'lodash/includes';
import pull from 'lodash/pull';
import {Branch} from "./models/Branch";
import {Dictionary} from 'lodash';

interface Props {
}

interface State {
  branches: Dictionary<Branch>;
  branchNames: string[];
  trackedBranches: string[];
}

class App extends Component<Props, State> {
  state: State = {
    branches: {},
    branchNames: [],
    trackedBranches: []
  };

  constructor(props: Props) {
    super(props);
    const circleCIService = new CircleCIService('wolololo');
    const branchService = new BranchService(circleCIService);

    branchService.branches('wolololo', ['master', 'release/0.39.6'])
    .then((branches: Dictionary<Branch>) => {
      this.setState({
        branches: branches
      });
      console.log(branches);
    })
    .catch((err: Error) => {
      console.log(err);
    });

    branchService.branchNames('wolololo')
    .then((branchNames: string[]) => {
      this.setState({
        branchNames: branchNames
      });
    })
    .catch((err: Error) => {
      console.log(err);
    });
  }

  handleBranchClick(branchName: string) {
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
          handleBranchClick={(branchName: string) => this.handleBranchClick(branchName)}
        />
      </div>
    );
  }
}

export default App;
