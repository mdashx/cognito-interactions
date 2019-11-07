import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

/* https://docs.aws.amazon.com/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html#using-amazon-cognito-identity-user-pools-javascript-example-registering-user*/

export default parent => {
  return (email, password) => {
    const attributeList = [];

    const dataEmail = {
      Name: 'email',
      Value: email,
    };

    const attributeEmail = new CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    const userPool = parent.getUserPool();

    return new Promise((resolve, reject) => {
      userPool.signUp(email, password, attributeList, null, function(
        err,
        result
      ) {
        if (err) {
          parent.notifier(err.message);
          reject(err);
        } else {
          parent.cognitoUser = result.user;
          resolve(parent.cognitoUser);
        }
      });
    });
  };
};
