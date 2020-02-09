export type GitCommit = {
  date: Date;
  message: string;
  sha: string;
};

export interface GitTag {
  date: Date;
  name: string;
  sha: string;
}
