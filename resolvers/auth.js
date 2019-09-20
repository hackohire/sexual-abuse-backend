const connectToMongoDB = require('./../helpers/db');
const CognitoIdentityServiceProvider = require('aws-sdk');
global.fetch = require('node-fetch');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const { AWS_COGNITO_USERPOOL_ID } = process.env;
const { AWS_COGNITO_CLIENT_ID } = process.env;


async function login(_, { username, password }, { db }) {
    var authenticationData = {
        Username : username,
        Password : password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var poolData = { 
        UserPoolId : AWS_COGNITO_USERPOOL_ID,
        ClientId : AWS_COGNITO_CLIENT_ID
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username : username,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                var accessToken = result.getAccessToken().getJwtToken();
                
                /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
                var idToken = result.idToken.jwtToken;

                console.log(idToken);
                resolve(idToken);
            },
    
            onFailure: function(err) {
                alert(err);
            },
        });
      });
}

module.exports = {
    login
};