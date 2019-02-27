import React, {Component} from 'react';
import './BranchPicker.scss'
import includes from 'lodash/includes';

interface Props {
  branchNames: string[];
  trackedBranches: string[];
  handleBranchClick: (branchName: string) => void;
}

export class BranchPicker extends Component<Props> {
  getBranchClassName(branchName: string) {
    return 'Branch' + (includes(this.props.trackedBranches, branchName) ? ' picked' : '');
  }

  render() {
    return (
      <div className="BranchPicker">
        <div className="Label">Please pick branches you want to track</div>
        <div className="BranchList">
          {this.props.branchNames.map(branchName => <div
            key={branchName}
            className={this.getBranchClassName(branchName)}
            onClick={() => this.props.handleBranchClick(branchName)}
          >{branchName}</div>)}
        </div>
      </div>
    );
  }
}
