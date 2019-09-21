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

const API_BASE = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&format=json&period=7day&';

async function main() {
  const username = user
  const gistID = gistId;
  const lfm = lfmAPI;

  if (!lfm || !username || !gistID || !githubToken)
    throw new Error('Please check your environment variables, as you are missing one.')
  const API = `${API_BASE}user=${username}&api_key=${lfm}`

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

  const numArtitst = Math.min(5, json.topartists.artist.length);
  let playsTotal = 0;
  for(let i = 0; i < numArtitst; i++) {
    playsTotal += parseInt(json.topartists.artist[i].playcount, 10);
  }

  const lines = [];
  for(let i = 0; i < numArtitst; i++) {
    const name =  json.topartists.artist[i].name;
    const plays = json.topartists.artist[i].playcount;

    lines.push([
      name.substring(0,25).padEnd(26),
      generateBarChart(plays * 100 / playsTotal, 17),
      `${plays.padStart(5)} plays`
    ].join(' '));
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
  const syms = "░▏▎▍▌▋▊▉█";

  const frac = size * 8 * percent / 100;
  const barsFull = Math.floor(frac / 8);
  const semi = frac % 8;
  const barsEmpty = size - barsFull - 1;

  return [
    syms.substring(8,9).repeat(barsFull),
    syms.substring(semi,semi+1),
    syms.substring(0,1).repeat(barsEmpty),
  ].join('');
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
