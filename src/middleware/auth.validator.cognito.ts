import { Request, Response, NextFunction } from 'express';
import jwt, { JwtHeader, SigningKeyCallback } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import config from '../config/config';

const REGION = config.cognitoRegion;
const USER_POOL_ID = config.cognitoUserPoolId;
const CLIENT_ID = config.cognitoClientId;

type DecodedToken = {
  header: JwtHeader;
  payload: any;
  signature: string;
};

async function validateToken(token: string): Promise<any> {
  // Decode the JWT token without verifying to get kid for key lookup
  const decodedToken: DecodedToken = jwt.decode(token, { complete: true }) as DecodedToken;
  if (!decodedToken?.header) {
    throw new Error('Invalid token');
  }

  const jwksUri = `https://cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}/.well-known/jwks.json`;

  const client = jwksClient({
    cache: true,
    jwksUri: jwksUri,
  });

  // Get signing key
  const getSigningKey = (header: JwtHeader, callback: SigningKeyCallback) => {
    return client.getSigningKey(header.kid as string, (error, key) => {
      if (error) {
        callback(error, undefined);
      } else {
        const signingKey = key?.getPublicKey();
        callback(null, signingKey);
      }
    });
  };

  // Verify the token
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getSigningKey,
      {
        audience: CLIENT_ID,
        issuer: `https://cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`,
        algorithms: ['RS256'],
      },
      (error, decoded) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded);
        }
      },
    );
  });
}

export const authorize = function (roles: string[] = []) {
  if (!Array.isArray(roles)) roles = [roles];

  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
      const resultValidation = await validateToken(token);

      //resultValidation returns current user data
      req.user = {
        id: resultValidation.sub,
        name: resultValidation.name,
        email: resultValidation.email,
        roles: resultValidation['cognito:groups'],
      };

      const userRole: any = resultValidation['custom:role'];
      console.log(resultValidation);

      if (roles.indexOf(userRole) === -1) return res.status(401).json({ message: 'Not Autherized for this Action' });
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };
};

//Typescript way to define user field under the express Request.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: { name: string; email: string; id: string; roles: Array<string> };
    }
  }
}

export const Roles = {
  Supplier: ['SUPPLIER'],
  Customer: ['CUSTOMER'],
  Admin: ['ADMIN'],
  All: ['SUPPLIER', 'CUSTOMER', 'ADMIN'],
};

// export { validateTokenMiddleware };
