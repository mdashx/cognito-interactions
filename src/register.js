import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

import { validatePhone } from './validate.js';

/* https://docs.aws.amazon.com/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html#using-amazon-cognito-identity-user-pools-javascript-example-registering-user*/

export default parent => {
  return (email, phone, password) => {
    const attributeList = [];
    const phoneEdited = validatePhone(phone);
    if (phoneEdited === false) {
      notify('Submit a 10 digit phone number.');
      return;
    }

    const dataEmail = {
      Name: 'email',
      Value: email,
    };
    const dataPhoneNumber = {
      Name: 'phone_number',
      Value: phoneEdited,
    };
    const attributeEmail = new CognitoUserAttribute(dataEmail);
    const attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);

    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);

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
