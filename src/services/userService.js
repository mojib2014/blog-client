import http from "../services/httpService";

function registerUser(user) {
  return http.post("users", {
    name: user.name,
    email: user.username,
    password: user.password,
    imageUrl: user.imageUrl,
    facebookId: user.facebookId,
    googleId: user.googleId,
    createdAt: user.createdAt,
  });
}

function getUser(userId) {
  return http.get("/users/" + userId);
}

function getUsers() {
  return http.get("/users");
}

function uploadUserImage(file) {
  return http.post("/users/upload", file);
}

function updateUser(user) {
  const body = { ...user };
  delete body._id;

  return http.put("/users/" + user._id, body);
}

export default {
  registerUser,
  uploadUserImage,
  updateUser,
  getUser,
  getUsers,
};
