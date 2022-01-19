import { $host } from ".";

export const signUp = async (username, password) => {
  const { data } = await $host.post("api/auth/signup", { username, password });
  return data;
};

export const signIn = async (username, password) => {
  const { data } = await $host.post("api/auth/signin", { username, password });
  return data;
};

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const authVerify = () => {
  const token = localStorage.getItem("user");

  if (token) {
    const decodedJwt = parseJwt(token);

    if (decodedJwt.exp * 1000 < Date.now()) {
      return false;
    }

    return true;
  } else {
    return false;
  }
};
