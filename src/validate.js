export const validatePhone = phone => {
  let phoneEdited = phone.replace(/\D/g, '');

  if (phoneEdited.length === 10) {
    return `+1${phoneEdited}`;
  } else if (phoneEdited.length === 11) {
    return `+${phoneEdited}`;
  } else {
    return false;
  }
};

export const validatePassword = (pass1, pass2) => {
  if (pass1.length < 8) {
    return [undefined, undefined];
  }

  const hasLowerCase = () => {
    return pass1.toUpperCase() != pass1;
  };

  const hasUpperCase = () => {
    return pass1.toLowerCase() != pass1;
  };

  const hasNumbers = () => {
    return pass1.replace(/\D/g, '') != '';
  };

  const hasSpecialCharacters = () => {
    return (
      pass1.replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g, '') !=
      pass1
    );
  };

  const passwordsMatch = () => {
    if (pass2 === undefined) {
      return undefined;
    }
    if (pass2.length < 8) {
      return undefined;
    }
    return pass1 === pass2;
  };

  return [
    hasLowerCase() && hasUpperCase() && hasNumbers() && hasSpecialCharacters(),
    passwordsMatch(),
  ];
};
