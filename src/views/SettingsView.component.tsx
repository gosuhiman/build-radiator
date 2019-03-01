import React, {Component} from 'react';
import './SettingsView.scss'
import {BranchPicker} from "../components/BranchPicker.component";
import {CircleCIService} from "../services/CircleCI.service";
import {CIRCLE_CI_API_KEY, PROJECT_NAME} from "../constants";
import {BranchService} from "../services/Branch.service";
import {Branch} from "../models/Branch";
import includes from "lodash/includes";
import pull from "lodash/pull";
import {Dictionary} from 'lodash';

interface Props {
}

interface State {
  branches: Dictionary<Branch>;
  branchNames: string[];
  trackedBranches: string[];
}

export class SettingsView extends Component<Props, State> {
  state: State = {
    branches: {},
    branchNames: [],
    trackedBranches: []
  };

  constructor(props: Props) {
    super(props);
    const circleCIService = new CircleCIService(CIRCLE_CI_API_KEY);
    const branchService = new BranchService(circleCIService);

    branchService.branches(PROJECT_NAME, ['master', 'release/0.39.6'])
    .then((branches: Dictionary<Branch>) => {
      this.setState({
        branches: branches
      });
      console.log(branches);
    })
    .catch((err: Error) => {
      console.log(err);
    });

    branchService.branchNames(PROJECT_NAME)
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
      <div className="SettingsView View">
        <div className="container">
          <BranchPicker
            branchNames={this.state.branchNames}
            trackedBranches={this.state.trackedBranches}
            handleBranchClick={(branchName: string) => this.handleBranchClick(branchName)}
          />
        </div>
      </div>
    );
  }
}


