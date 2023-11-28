import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
  CognitoRefreshToken,
} from 'amazon-cognito-identity-js';
import config from '../config/config';

class CognitoService {
  private userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: config.cognitoUserPoolId,
      ClientId: config.cognitoClientId,
    });
  }

  async signUp(email: string, password: string) {
    const attributeList = [new CognitoUserAttribute({ Name: 'custom:role', Value: 'customer' })];
    const result = await new Promise<CognitoUser | undefined>((resolve, reject) => {
      this.userPool.signUp(email, password, attributeList, [], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result?.user);
        }
      });
    });
    return result;
  }

  async signIn(email: string, password: string): Promise<CognitoUserSession> {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => resolve(session),
        onFailure: (err) => reject(err),
      });
    });
  }

  async renewToken(refresh_token: string, username: string): Promise<void> {
    const RefreshToken = new CognitoRefreshToken({ RefreshToken: refresh_token });

    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.refreshSession(RefreshToken, (err, session) => {
      if (err) {
        console.log(err);
      } else {
        let retObj = {
          access_token: session.accessToken.jwtToken,
          id_token: session.idToken.jwtToken,
          refresh_token: session.refreshToken.token,
        };
        console.log(retObj);
      }
    });
  }
}

export default CognitoService;
