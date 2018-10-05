export default parent => {
  return mfa => {
    return new Promise((resolve, reject) =>
      parent.cognitoUser.sendMFACode(mfa, {
        onSuccess: result => {
          resolve({
            accessToken: result.accessToken.jwtToken,
            idToken: result.idToken.jwtToken,
            refreshToken: result.refreshToken.token,
          });
        },
        onFailure: err => {
          parent.notifier(err.message);
          reject(err);
        },
      })
    );
  };
};
