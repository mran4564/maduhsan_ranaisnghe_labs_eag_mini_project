const loadSession = () => {
  const userData = sessionStorage.getItem('userData');
  if (userData) {
    const { userId, userRole } = JSON.parse(userData);
    return { userId, userRole };
  } else {
    return {};
  }
};

export default loadSession;
