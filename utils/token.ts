// https://developer.apple.com/documentation/applemusicapi

import jwt from 'jsonwebtoken';

// Constants
const {TEAM_ID, KEY_ID, PUBLIC_KEY, PRIVATE_KEY} = process.env;

// Generate, sign, and verify Apple Music Developer token
export const generateToken = (): string => {
  const developerToken = jwt.sign({}, `-----BEGIN PRIVATE KEY-----\n` + PRIVATE_KEY + `\n-----END PRIVATE KEY-----`, { algorithm: 'ES256', keyid: KEY_ID, issuer: TEAM_ID, expiresIn: '5s' });
  
  return developerToken;
}

export const verifyToken = (token: string): boolean => {
  let verified = false;
    const verify = jwt.verify(token, `-----BEGIN PUBLIC KEY-----\n` + PUBLIC_KEY + `\n-----END PUBLIC KEY-----`, { algorithms: ['ES256'] }, (err, decoded) => err ? verified = false : verified = true );
    console.info("Verifying token: ", verify)
    return verified;
}

export const decodeToken = (token: string) => {
    const decoded = jwt.decode(token, {complete: true});
    return decoded;
}

// Fetch Apple Music user token

// Refresh the Developer token

// Refresh the User token
