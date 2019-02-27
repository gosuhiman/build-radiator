import find from 'lodash/find';
import pickBy from 'lodash/pickBy';
import includes from 'lodash/includes';
import transform from 'lodash/transform';
import {CircleCIService} from "./CircleCI.service";
import {Project} from "../models/Project";
import {Branch} from "../models/Branch";
import {Dictionary} from 'lodash';

export class BranchService {
  circleCiService: CircleCIService;

  constructor(circleCiService: CircleCIService) {
    this.circleCiService = circleCiService;
  }

  branches(projectName: string, branchNames: string[]): Promise<Dictionary<Branch>> {
    return this.circleCiService.projects()
    .then((projects: Project[]) => {
      const project: Project = <Project>find(projects, {reponame: projectName});
      if (!project) throw new Error(`Project ${projectName} does not exist`);
      if (!project.branches) throw new Error(`No branches in project ${projectName}`);
      return pickBy(project.branches, (branch, branchName) => {
        return includes(branchNames, decodeURIComponent(branchName));
      });
    })
    .then((branches: Dictionary<Branch>) => transform(branches, (r, v, k) => r[decodeURIComponent(k)] = v));
  }

  branchNames(projectName: string): Promise<string[]> {
    return this.circleCiService.projects()
    .then((projects: Project[]) => {
      const project: Project = <Project>find(projects, {reponame: projectName});
      if (!project) throw new Error(`Project ${projectName} does not exist`);
      return Object.keys(project.branches).map((name: string) => decodeURIComponent(name)).sort();
    });
  }
}
