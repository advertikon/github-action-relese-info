import { getInput, setOutput, setFailed } from '@actions/core';
import { getOctokit, context } from '@actions/github';

try {
    const token = getInput('github-token');
    // const payload = JSON.stringify(context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
    const octokit = getOctokit(token)
    const owner = context.payload.repository.owner.name;
    const repo = context.payload.repository.name;
    console.log(`Fetching info for '${owner}/${repo}'`);

    const info = await octokit.request(`GET /repos/${owner}/${repo}/releases/latest`, {
        owner,
        repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    if (info.status === 200) {
        // setOutput('tag', info.tag_name);
        // setOutput('body', info.body);
        // setOutput('author', info.author.login);
        console.log('Info: ', JSON.stringify(info, null, 2));

    } else {
        setFailed('Fetch error');
    }
} catch (error) {
    setFailed(error.message);
}

