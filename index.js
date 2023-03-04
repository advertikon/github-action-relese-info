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
        const { data } = info;
        setOutput('tag', data.tag_name);
        setOutput('author', data.author.login);
        setOutput('url', data.assets[0].browser_download_url);
        setOutput('name', data.assets[0].name);
        // console.log('Info: ', JSON.stringify(info, null, 2));

    } else {
        setFailed('Fetch error');
    }
} catch (error) {
    setFailed(error.message);
}

