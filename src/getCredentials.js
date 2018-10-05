import AWS from 'aws-sdk/global';

export const getCognitoTokens = () => {
  const tokens = {};
  for (const item of Object.keys(window.localStorage)) {
    if (item.includes('CognitoIdentityServiceProvider')) {
      const key = item.split('.').pop();
      const value = window.localStorage.getItem(item);
      tokens[key] = value;
    }
  }
  return tokens;
};

/* https://docs.aws.amazon.com/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html#using-amazon-cognito-user-identity-pools-javascript-examples-user-pool-identity-pool*/

/* https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentity.html#getCredentialsForIdentity-property*/
export default parent => {
  return () => {
    return new Promise((resolve, reject) => {
      const cognitoUser = parent.getCognitoUser();
      if (cognitoUser != null) {
        cognitoUser.getSession((err, result) => {
          if (result) {
            const loginUrl = `cognito-idp.${parent.awsRegion}.amazonaws.com/${
              parent.userPoolId
            }`;
            const logins = {};
            logins[loginUrl] = result.getIdToken().getJwtToken();

            AWS.config.region = parent.awsRegion;
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
              IdentityPoolId: parent.identityPoolId,
              Logins: logins,
            });

            AWS.config.credentials.refresh(error => {
              if (error) {
                parent.notifier(error.msg);
                reject(error);
              } else {
                parent.awsCredentials = AWS.config.credentials;
                /* console.log(parent.awsCredentials);*/
                resolve(parent.awsCredentials);
              }
            });
          }
        });
      }
    });
  };
};
