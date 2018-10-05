/* https://docs.aws.amazon.com/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html#using-amazon-cognito-identity-user-pools-javascript-example-confirming-user*/

export default parent => {
  return verificationCode => {
    return new Promise((resolve, reject) => {
      parent.cognitoUser.confirmRegistration(
        verificationCode,
        true,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  };
};
