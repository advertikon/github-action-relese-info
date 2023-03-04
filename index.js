const core = require('@actions/core');
const github = require('@actions/github');

try {
    const token = core.getInput('github-token');
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
    const octokit = github.getOctokit(token)

    // await octokit.request('GET /repos/{owner}/{repo}/releases', {
    //     owner: 'OWNER',
    //     repo: 'REPO',
    //     headers: {
    //         'X-GitHub-Api-Version': '2022-11-28'
    //     }
    // })
} catch (error) {
    core.setFailed(error.message);
}
