require('dotenv').config();
const Octokit = require("@octokit/rest");
const fetch = require("node-fetch");

const {
    GIST_ID: gistId,
    GITHUB_TOKEN: githubToken,
    LASTFM_KEY: lfmAPI,
    LFMUSERNAME: user
} = process.env


const octokit = new Octokit({
    auth: `token ${githubToken}`
});

async function main() {

    const username = user
    const gistID = gistId;
    const lfm = lfmAPI;

    if (!lfm || !username || !gistID || !githubToken) throw new Error('Please check your environment variables, as you are missing one.')
    const API = `http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${lfm}&format=json&period=7day`

    const data = await fetch(API);
    const json = await data.json();

    let gist;
    try {
        gist = await octokit.gists.get({
            gist_id: gistID
        });
    } catch (error) {
        console.error(`music-box ran into an issue getting your Gist:\n${error}`);
    }

    const lines = [];
    
    for(let i = 0; i < 5; i++) {
        const name =  json.topartists.artist[i].name;
        const plays = json.topartists.artist[i].playcount;

        lines.push(
            [
                name.substring(0,13).padEnd(15),
                generateBarChart(plays, 31).substring(0, 27),
                `${plays.padStart(6)} plays`,
             ].join(' ')
        );
        
    }

    try {
        // Get original filename to update that same file
        const filename = Object.keys(gist.data.files)[0];
        await octokit.gists.update({
            gist_id: gistID,
            files: {
                [filename]: {
                    filename: `🎵 My last week in music`,
                    content: lines.join("\n")
                }
            }
        });
    } catch (error) {
        console.error(`Unable to update gist\n${error}`);
    }
}

function generateBarChart(percent, size) {
    const empty = "░";
    const full = "█";
    const barsFull = Math.round(size * (percent / 100));
    return full.repeat(barsFull).padEnd(size, empty);
}

async function updateGist() {
    let gist;
    try {
        gist = await octokit.gists.get({
            gist_id: gistID
        })
    } catch (error) {
        console.error(`music-box ran into an issue:\n${error}`);
    }
}

(async () => {
    await main();
})();
