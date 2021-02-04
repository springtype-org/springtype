import { execSync } from 'child_process';

const e2eProjects = ["functional-component", "todo-list", "rating-component"];

const getPackageDir = (dirName: string) => "./e2e/" + dirName;

for (let packageDir of e2eProjects) {
  process.chdir(getPackageDir(packageDir));

  console.log(`[i] Installing e2e project ${packageDir}...`);
  execSync('yarn', {
    stdio: 'inherit',
  });

  console.log(`[i] Building e2e project ${packageDir}...`);
  execSync('yarn build', {
    stdio: 'inherit',
  });

  process.chdir("../../");
}
