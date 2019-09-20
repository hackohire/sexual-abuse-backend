
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const jwt_set = require('../jwt_set.json');


const { AWS_COGNITO_REGION } = process.env;
const { AWS_COGNITO_USERPOOL_ID } = process.env;


const userPool_Id = `https://cognito-idp.${AWS_COGNITO_REGION}.amazonaws.com/${AWS_COGNITO_USERPOOL_ID}`;



const pems = {}
for (let i = 0; i < jwt_set.keys.length; i++) {
    // take the jwt_set key and create a jwk object for conversion into PEM
    const jwk = {
        kty: jwt_set.keys[i].kty,
        n: jwt_set.keys[i].n,
        e: jwt_set.keys[i].e
    }

    // convert jwk object into PEM
    const pem = jwkToPem(jwk);

    // append PEM to the pems object, with the kid as the identifier
    pems[jwt_set.keys[i].kid] = pem
}

// Reusable Authorizer function, set on `authorizer` field in serverless.yml

async function auth(headers) {
    // console.log(headers);
    const p = new Promise((res, rej) => {

        if (!headers.Authorization) {
            return rej('Unauthorized');
        }
        const jwtToken = headers.Authorization;

        // PART 1: Decode the JWT token
        const decodedJWT = jwt.decode(jwtToken, { complete: true });

        // PART 2: Check if its a valid JWT token
        if (!decodedJWT) {
            console.log("Not a valid JWT token")
            rej("Not a valid JWT token")
        }

        // PART 3: Check if ISS matches our userPool Id
        if (decodedJWT.payload.iss != userPool_Id) {
            console.log("invalid issuer")
            rej({
                message: "invalid issuer",
                iss: decodedJWT.payload
            })
        }

        // PART 4: Check that the jwt is an AWS 'Access Token'
        if (decodedJWT.payload.token_use != 'id') {
            console.log("Not an access token")
            rej("Not an access token")
        }
        // PART 5: Match the PEM against the request KID
        const kid = decodedJWT.header.kid;
        const pem = pems[kid];
        if (!pem) {
            console.log('Invalid access token');
            rej('Invalid access token');
        }
        console.log("Decoding the JWT with PEM!");

        // PART 6: Verify the signature of the JWT token to ensure its really coming from your User Pool
        jwt.verify(jwtToken, pem, { issuer: userPool_Id }, function (err, payload) {
            if (err) {
                console.log("Unauthorized signature for this JWT Token")
                rej("Unauthorized signature for this JWT Token")
            } else {
                // if payload exists, then the token is verified!
                res(payload)
            }
        });
    });
    return p
    //    }
}


module.exports = {
    auth,
};

