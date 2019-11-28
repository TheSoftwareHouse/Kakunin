export const handlePromises = (hashedData, onSuccess, onReject) => resolvedPromises => {
  for (let i = 0; i < resolvedPromises.length; i += hashedData.length) {
    let allFieldsMatching = true;

    for (let j = i; j < i + hashedData.length; j++) {
      if (resolvedPromises[j] === false) {
        allFieldsMatching = false;
        break;
      }
    }

    if (allFieldsMatching) {
      return onSuccess();
    }
  }

  return onReject();
};
