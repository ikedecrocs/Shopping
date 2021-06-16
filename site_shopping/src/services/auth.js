export const login = token => {
  localStorage.setItem("token", "Bearer " + token);
};
export const logout = () => {
  localStorage.removeItem("token");
};