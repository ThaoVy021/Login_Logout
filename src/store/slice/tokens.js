let authTokens = localStorage.getItem("token") || "";

let setTokens = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};
