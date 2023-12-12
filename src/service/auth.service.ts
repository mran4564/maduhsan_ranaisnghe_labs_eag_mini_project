import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoRefreshToken,
} from 'amazon-cognito-identity-js';
import config from '../config/config';
import { UserCreateDTO } from '../model/auth.model';
import axios from 'axios';
import { isValidStatus } from '../helpers/validator';
import { v4 as uuidv4 } from 'uuid';

class CognitoService {
  private userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: config.cognitoUserPoolId,
      ClientId: config.cognitoClientId,
    });
  }

  async signUp(userRequest: UserCreateDTO) {
    if (!isValidStatus(userRequest.role)) {
      throw new Error(`Not a valid user type ${userRequest.role} }`);
    }
    userRequest.role = userRequest.role.toUpperCase();
    const userId = uuidv4();
    const attributeList = [
      new CognitoUserAttribute({ Name: `custom:role`, Value: userRequest.role }),
      new CognitoUserAttribute({ Name: `custom:userId`, Value: userId }),
    ];
    await new Promise<CognitoUser>((resolve, reject) => {
      this.userPool.signUp(userRequest.email, userRequest.password, attributeList, [], (err, result) => {
        if (err) {
          console.log('auth ' + err);
          reject(err);
        } else {
          if (result?.user) {
            resolve(result?.user);
          }
          reject(result);
        }
      });
    });
    const { name, email, role } = userRequest;
    const savedUser = await axios.post(config.authApi, { userId, name, email, role });
    return savedUser.data;
  }

  async signIn(email: string, password: string): Promise<any> {
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
        onSuccess: (session) => {
          const idToken = session.getIdToken().getJwtToken();
          const idTokenPayload = session.getIdToken().payload;
          const refreshToken = session.getRefreshToken().getToken();
          const userRole = idTokenPayload['custom:role'];
          const userId = idTokenPayload['custom:userId'];
          resolve({ userId, userRole, idToken, refreshToken });
        },
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
        const retObj = {
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
