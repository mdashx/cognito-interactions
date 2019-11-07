import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

export const loginResponses = {
  mfa: 'MFA',
  newPasswordRequired: 'NEW PASSWORD',
};

export default parent => {
  return (email, password) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userPool = parent.getUserPool();

    parent.cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    window.cognitoUser = parent.cognitoUser;

    return new Promise((resolve, reject) => {
      parent.cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
          console.log('====', result);
          resolve(result);
        },
        totpRequired: function(result) {
          resolve({
            type: 'software_token_mfa',
          });
        },
        mfaRequired: function(result) {
          resolve({
            type: loginResponses.mfa,
            session: parent.cognitoUser.Session,
          });
        },
        newPasswordRequired: function(userAttributes, requiredAttributes) {
          resolve({
            type: loginResponses.newPasswordRequired,
            session: parent.cognitoUser.Session,
          });
        },
        onFailure: function(err) {
          parent.notifier(err.message);
          reject(err);
        },
      });
    });
  };
};
