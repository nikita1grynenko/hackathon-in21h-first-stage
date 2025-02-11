type DecodedJWTPayload = {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
  exp: number;
  iss: string;
  aud: string;
};

function decodeJWT(token: string) {
  const [header, payload, signature] = token.split('.');
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
