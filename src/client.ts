import { Octokit } from "@octokit/rest";
import fetch, { Response } from "node-fetch";
require("dotenv").config();

const {
  GIST_ID: gistID,
  GH_TOKEN: ghToken,
  LASTFM_KEY: lfmKey,
  LFMUSERNAME: lfmUsername,
} = process.env;

const octokit = new Octokit({
  auth: `token ${ghToken}`,
});

export class musicBoxClient {
  gistID: string | undefined;
  lfmKey: string | undefined;
  lfmUsername: string | undefined;
  baseUrl: string | undefined;
  gist_id: string | undefined;

  constructor() {
    this.gistID = gistID;
    this.lfmKey = lfmKey;
    this.lfmUsername = lfmUsername;
    this.baseUrl = `http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&format=json&period=7day&user=${this.lfmUsername}&api_key=${this.lfmKey}`;

    this.resolveFetch = this.resolveFetch.bind(this);

    if (!this.gistID || !this.lfmKey || !this.lfmUsername) {
      throw new Error(
        "Missing environment variable. Please check your configuration and try again."
      );
    }
  }

  /**
   * dear future jack / probably alistair because god knows i'm gonna need help tomorrow,
   * it's 1:37 am and current jack (now past jack) is unbeliveably tired
   * this is what happens when you take 2 hour naps and wake up at 9 pm
   * don't do that again
   * and maybe actually learn typescript!
   *
   * thanks + love,
   * past jack <3
   */

  // TODO: make this actually do what it's supposed to
  resolveFetch<T>(x: Response): Promise<T | boolean> {
    console.log(x);
    return Promise.resolve(true);
  }

  // TODO: get this working
  getGist(gist_id: string): Promise<any | false> {
    console.log(gist_id);
    console.log(octokit.auth);
    return octokit.gists.get({ gist_id });
  }

  // TODO: not reside in callback hell and get resolveFetch working
  getLfm() {
    console.log(this.baseUrl);
    return fetch(`${this.baseUrl}`).then((res) => {
      res.json().then((res2) => {
        res2;
      });
    });
  }

  // TODO: make this do something
  main() {
    return this.getLfm();
  }
}
