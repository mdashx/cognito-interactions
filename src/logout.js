import { CognitoUser } from 'amazon-cognito-identity-js';

export default parent => {
  return () => {
    parent.cognitoUser = parent.getCognitoUser();

    if (parent.cognitoUser != null) {
      parent.cognitoUser.getSession((err, session) => {
        if (err === undefined || err === null) {
          parent.cognitoUser.signOut();
        }
      });
    }
  };
};
