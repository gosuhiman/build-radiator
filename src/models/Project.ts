import {Branch} from "./Branch";
import {Dictionary} from "lodash";

export class Project {
  branches: Dictionary<Branch> = {};
}