import { getInput, setOutput, setFailed } from '@actions/core';
import { getOctokit, context } from '@actions/github';

try {
    const token = getInput('github-token');
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
    const octokit = getOctokit(token)
    const owner = context.payload.repository.owner;
    const repo = context.payload.repository.name;
    console.log(`Fetching info for '${owner}/${repo}'`);

    const info = await octokit.request(`GET /repos/${owner}/${repo}/releases`, {
        owner,
        repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    console.log('Info: ', JSON.stringify(info, null, 2));

    // core.setOutput("time", time);
} catch (error) {
    setFailed(error.message);
}

