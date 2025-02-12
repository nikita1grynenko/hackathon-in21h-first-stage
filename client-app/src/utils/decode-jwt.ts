type DecodedJWTPayload = {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
  exp: number;
  iss: string;
  aud: string;
};

function decodeJWT(token: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, payload] = token.split('.');
  const decodedPayload = JSON.parse(
    atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
  ) as DecodedJWTPayload;

  return {
    userName:
      decodedPayload[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ],
    email:
      decodedPayload[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ],
  };
}

export default decodeJWT;
