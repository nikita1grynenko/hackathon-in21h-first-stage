type DecodedJWTPayload = {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string,
  "AvatarUrl": string,
  "exp": 1739980070,
  "iss": string,
  "aud": string
};

function decodeJWT(token: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, payload] = token.split('.');
  const decodedPayload = JSON.parse(
    atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
  ) as DecodedJWTPayload;

  return {
    id: decodedPayload[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ],
    name: decodedPayload[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
    ],
    email: decodedPayload[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
    ],
    avatarUrl: decodedPayload.AvatarUrl,
    expired: decodedPayload.exp,
  };
}

export default decodeJWT;
