<p align='center'> 
  <img src="https://github.com/jacc/music-box/blob/master/branding/musicbox-preview.png">
  <h3 align="center">music-box</h3>
  <p align="center">Update a gist to contain your weekly plays on Last.fm</p>
</p>

---
> 📌✨ For more pinned-gist projects like this one, check out: https://github.com/matchai/awesome-pinned-gists

## ✨ Inspiration
This code was heavily inspired by [@JohnPhamous's strava-box](https://github.com/JohnPhamous/strava-box).

## 🎒 Prep Work
1. Create a new public GitHub Gist (https://gist.github.com/)
1. Create a token with the `gist` scope and copy it. (https://github.com/settings/tokens/new)
1. Create a Last.fm Application (https://www.last.fm/api/account/create)
1. Copy the `API token`.

## 🖥 Project Setup
1. Fork this repo
1. Create a `.github/workflows/music-box.yml` file like this:
```yml
name: music-box

on:
  schedule:
    - cron: '*/10 * * * *'

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v1
      - uses: jacc/music-box@master
        env:
          LASTFM_KEY: ${{ secrets.LASTFM_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          LFMUSERNAME: <Last.fm username>
          GIST_ID: <GitHub Gist ID>
```

## 🤫 Environment Secrets
- **GIST_ID:** The ID portion from your gist url `https://gist.github.com/<github username>/`**`6d5f84419863089a167387da62dd7081`**.
- **GITHUB_TOKEN:** The GitHub token generated above.
- **LASTFM_KEY:** The API key you got from creating a Last.fm API account.
- **LFMUSERNAME:** Your Last.fm username.

## 💸 Donations

Feel free to use the GitHub Sponsor button to donate towards my work if you're feeling generous <3
