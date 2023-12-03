"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const splitwise_node_1 = __importDefault(require("splitwise-node"));
const oauthDetails_json_1 = __importDefault(require("../../oauthDetails.json"));
const axios_1 = __importDefault(require("axios"));
const initialize = (app) => {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // TODO: MongoDB connection
    var userOAuthToken, userOAuthTokenSecret;
    var authApi = new splitwise_node_1.default(oauthDetails_json_1.default[0].consumerKey, oauthDetails_json_1.default[0].consumerSecret);
    // Step 2: Get an authorization URL
    app.get('/centwise/authorize', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { token, secret } = yield authApi.getOAuthRequestToken();
            const userAuthUrl = authApi.getUserAuthorisationUrl(token);
            // Use axios to follow redirects and get the final response
            const response = yield axios_1.default.get(userAuthUrl, { maxRedirects: 0 });
            // Return the final response to the client
            res.json(response.data);
        }
        catch (error) {
            console.error('Error getting authorization URL:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }));
    // Step 3: Handle the callback after the user authorizes
    app.get('/centwise/callback', (req, res) => {
        const { oauth_token, oauth_verifier } = req.query;
        authApi.getOAuthAccessToken(userOAuthToken, userOAuthTokenSecret, oauth_verifier)
            .then(({ oauth_token: accessToken, oauth_token_secret: accessTokenSecret }) => {
            // Now you have the access token and access token secret
            const splitwiseApi = authApi.getSplitwiseApi(accessToken, accessTokenSecret);
            // You can use the 'splitwiseApi' object to make API calls
            // ...
            res.send('Authorization successful!');
        })
            .catch((error) => {
            console.error('Error getting access token:', error.message);
            res.status(500).send('Internal Server Error');
        });
    });
};
exports.default = initialize;
