export default parent => {
  return newPwd => {
    return new Promise((resolve, reject) => {
      parent.cognitoUser.completeNewPasswordChallenge(
        newPwd,
        {},
        {
          onSuccess: function(result) {
            resolve(result);
          },
          mfaRequired: function(result) {
            resolve({
              type: 'MFA',
              session: parent.cognitoUser.Session,
            });
          },
          onFailure: function(err) {
            reject(err);
          },
        }
      );
    });
  };
};
