"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.musicBoxClient = void 0;
var rest_1 = require("@octokit/rest");
var node_fetch_1 = __importDefault(require("node-fetch"));
require("dotenv").config();
var _a = process.env, gistID = _a.GIST_ID, ghToken = _a.GH_TOKEN, lfmKey = _a.LASTFM_KEY, lfmUsername = _a.LFMUSERNAME;
var octokit = new rest_1.Octokit({
    auth: "token " + ghToken,
});
var musicBoxClient = /** @class */ (function () {
    function musicBoxClient() {
        this.gistID = gistID;
        this.lfmKey = "da653ea5fb3e7e272516278f265d96be";
        this.lfmUsername = "j9ck";
        this.baseUrl = "http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&format=json&period=7day&user=" + this.lfmUsername + "&api_key=" + this.lfmKey;
        this.resolveFetch = this.resolveFetch.bind(this);
        // if (!this.gistID || !this.lfmKey || !this.lfmUsername) {
        //   throw new Error(
        //     "Missing environment variable. Please check your configuration and try again."
        //   );
        // }
    }
    musicBoxClient.prototype.resolveFetch = function (x) {
        console.log(x);
    };
    musicBoxClient.prototype.getGist = function (gist_id) {
        console.log(gist_id);
        console.log(octokit.auth);
        return octokit.gists.get({ gist_id: gist_id });
    };
    musicBoxClient.prototype.getLfm = function () {
        console.log(this.baseUrl);
        return node_fetch_1.default("" + this.baseUrl).then(function (res) {
            res.json().then(function (res2) {
                res2;
            });
        });
    };
    musicBoxClient.prototype.main = function () {
        return this.getLfm();
    };
    return musicBoxClient;
}());
exports.musicBoxClient = musicBoxClient;
