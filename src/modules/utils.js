function wrapRequest(func) {
  return async (...args) => {
    const res = await func(...args);
    if (res.status !== 200) {
      throw res;
    } else {
      return res;
    }
  };
}

export { wrapRequest };
