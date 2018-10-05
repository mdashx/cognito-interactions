import {
  AuthenticationDetails,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUser,
} from 'amazon-cognito-identity-js';

import checkLogin from './checkLogin';
import getAttributes from './getAttributes';
import getCredentials from './getCredentials';
import login from './login';
import logout from './logout';
import mfa from './mfa';
import newPassword from './newPassword';
import register from './register';
import verifyRegistration from './verifyRegistration';

import { validatePassword as checkPassword } from './validate';

export default (
  userPoolId,
  clientId,
  notifier = undefined,
  awsRegion = 'us-east-1',
  identityPoolId = undefined
) => {
  if (notifier == undefined) {
    notifier = msg => {
      console.log(msg);
    };
  }

  const interactions = {
    userPoolId: userPoolId,
    clientId: clientId,
    cognitoUser: null,
    notifier: notifier,
    awsRegion: awsRegion,
    identityPoolId: identityPoolId,

    getUserPool() {
      return new CognitoUserPool({
        UserPoolId: userPoolId,
        ClientId: clientId,
      });
    },

    getCognitoUser() {
      const userPool = this.getUserPool();
      return userPool.getCurrentUser();
    },
  };

  interactions.getAttributes = getAttributes(interactions);
  interactions.getCredentials = getCredentials(interactions);
  interactions.checkLogin = checkLogin(interactions);
  interactions.login = login(interactions);
  interactions.logout = logout(interactions);
  interactions.mfa = mfa(interactions);
  interactions.newPassword = newPassword(interactions);
  interactions.register = register(interactions);
  interactions.verifyRegistration = verifyRegistration(interactions);

  return interactions;
};

export const validatePassword = checkPassword;
