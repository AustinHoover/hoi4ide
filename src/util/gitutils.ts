

export const saveProject = (projectDir: string) => {
    const child_process = window.require('child_process');

    const addResult = child_process.execSync("git add .", {cwd:projectDir});

    const commitResult = child_process.execSync("git commit -a --allow-empty-message -m ''", {cwd:projectDir});
}