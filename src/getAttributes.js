export default parent => {
  return () => {
    /* TODO: Check timestamp first and only refresh user data every X minutes or if missing (logged out) */

    const user = parent.getCognitoUser();

    if (user === null || user === undefined) {
      return new Promise((resolve, reject) => {
        resolve({ user: null, attrs: null });
      });
    } else {
      return new Promise((resolve, reject) => {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            const groups = session.getIdToken().payload['cognito:groups'];
            user.getUserAttributes((err, attrs) => {
              if (err) {
                reject(err);
              } else {
                const userData = {};
                attrs.forEach(attr => {
                  userData[attr.Name] = attr.Value;
                });

                userData.groups = groups;
                userData.loggedIn = new Date().getTime();
                parent.userData = userData;

                resolve({
                  user,
                  attrs,
                  userData,
                });
              }
            });
          }
        });
      });
    }
  };
};
