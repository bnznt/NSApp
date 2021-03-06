"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_oauth2_1 = require("nativescript-oauth2");
var providers_1 = require("nativescript-oauth2/providers");
var client = null;
function configureOAuthProviders() {
    var microsoftProvider = configureOAuthProviderMicrosoft();
    var googleProvider = configureOAuthProviderGoogle();
    var facebookProvider = configureOAuthProviderFacebook();
    nativescript_oauth2_1.configureTnsOAuth([microsoftProvider, googleProvider, facebookProvider]);
}
exports.configureOAuthProviders = configureOAuthProviders;
function configureOAuthProviderGoogle() {
    var googleProviderOptions = {
      openIdSupport: "oid-full",
      // clientId: "932931520457-buv2dnhgo7jjjjv5fckqltn367psbrlb.apps.googleusercontent.com",
      // redirectUri: "com.googleusercontent.apps.932931520457-buv2dnhgo7jjjjv5fckqltn367psbrlb:/auth",
      // urlScheme: "com.googleusercontent.apps.932931520457-buv2dnhgo7jjjjv5fckqltn367psbrlb",
      clientId: '77327077496-i05f79631hr06csi3si3hli2f4eptm2s.apps.googleusercontent.com',
      redirectUri: 'com.googleusercontent.apps.77327077496-i05f79631hr06csi3si3hli2f4eptm2s:/auth',
      urlScheme: 'com.googleusercontent.apps.77327077496-i05f79631hr06csi3si3hli2f4eptm2s',
      scopes: ["https://www.googleapis.com/auth/youtube"]
    };
    var googleProvider = new providers_1.TnsOaProviderGoogle(googleProviderOptions);
    return googleProvider;
}
function configureOAuthProviderFacebook() {
    var facebookProviderOptions = {
      openIdSupport: "oid-none",
      clientId: "691208554415645",
      clientSecret: "d8725ac416fa1bb1917ccffd1670e3c6",
      redirectUri: "https://www.facebook.com/connect/login_success.html",
      scopes: ["email"]
    };
    var facebookProvider = new providers_1.TnsOaProviderFacebook(facebookProviderOptions);
    return facebookProvider;
}
function configureOAuthProviderMicrosoft() {
    var microsoftProviderOptions = {
      openIdSupport: "oid-full",
      clientId: "f376fa87-64a9-49a1-8b56-e0d48fc0810b",
      // redirectUri: "urn:ietf:wg:oauth:2.0:oob",
      redirectUri: "msalf376fa87-64a9-49a1-8b56-e0d48fc0810b://auth",
      urlScheme: "msalf376fa87-64a9-49a1-8b56-e0d48fc0810b",
      scopes: ["https://outlook.office.com/mail.read"]
    };
    var microsoftProvider = new providers_1.TnsOaProviderMicrosoft(microsoftProviderOptions);
    return microsoftProvider;
}
async function tnsOauthLogin(providerType, callback) {
  client = new nativescript_oauth2_1.TnsOAuthClient(providerType);
  await client.loginWithCompletion(function (tokenResult, error) {
    if (error) {
      console.error("back to main page with error: ");
      console.error(error);
    }
    else {
      console.log("back to main page with access token: ");
      callback(tokenResult);
    }
  });
}
exports.tnsOauthLogin = tnsOauthLogin;
function tnsOauthLogout() {
    if (client) {
      client.logout();
    }
}
exports.tnsOauthLogout = tnsOauthLogout;