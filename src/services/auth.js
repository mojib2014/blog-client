import http from "./httpService";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

async function login(email, password) {
  const { data: jwt } = await http.post("/auth", { email, password });

  localStorage.setItem("token", jwt);
}

function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

function logout() {
  localStorage.removeItem("token");
}

async function getCurrentUser() {
  try {
    const { data: users } = await http.get("/users");

    const jwt = localStorage.getItem("token");
    const decoded = jwtDecode(jwt);

    let user;
    for (let i = 0; i < users.length; i++) {
      if (decoded.user_id && decoded.user_id === users[i].facebookId) {
        user = users[i];
      } else if (decoded.sub && users[i].googleId === decoded.sub) {
        user = users[i];
      } else if (decoded._id && decoded._id === users[i]._id) {
        user = users[i];
      }
    }
    return user;
  } catch (err) {
    toast.error(err.response);
  }
}

function getJwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
