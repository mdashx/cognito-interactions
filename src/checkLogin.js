export default parent => {
  return () => {
    return new Promise((resolve, reject) => {
      parent.getAttributes().then(({ user, attrs, userData }) => {
        if (attrs === null) {
          resolve({ loggedIn: false, user, attrs, userData });
        } else {
          resolve({ loggedIn: true, user, attrs, userData });
        }
      });
    });
  };
};
