import find from 'lodash/find';
import pickBy from 'lodash/pickBy';
import includes from 'lodash/includes';
import transform from 'lodash/transform';

class BranchService {
  circleCiService = null;

  constructor(circleCiService) {
    this.circleCiService = circleCiService;
  }

  branches(projectName, branchNames) {
    return this.circleCiService.projects()
      .then(projects => find(projects, {reponame: projectName}))
      .then(project => {
        return pickBy(project.branches, (branch, branchName) => {
          return includes(branchNames, decodeURIComponent(branchName));
        });
      })
      .then(branches => transform(branches, (r, v, k) => r[decodeURIComponent(k)] = v));
  }

  branchNames(projectName) {
    return this.circleCiService.projects()
      .then(projects => find(projects, {reponame: projectName}))
      .then(project => Object.keys(project.branches).map(name => decodeURIComponent(name)).sort());
  }
}

export {
  BranchService
};