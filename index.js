const core = require('@actions/core');
const github = require('@actions/github');

try {
    const token = core.getInput('github-token');
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
    const octokit = github.getOctokit(token)
    const owner = github.context.payload.repository.owner;
    const repo = github.context.payload.repository.name;
    console.log(`Fetching info for '${owner}/${repo}'`);

    await octokit.request(`GET /repos/${owner}/${repo}/releases`, {
        owner,
        repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    // core.setOutput("time", time);
} catch (error) {
    core.setFailed(error.message);
}
