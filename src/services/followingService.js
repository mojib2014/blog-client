import http from "./httpService";

function follow(user, author) {
  const body = { ...author };
  delete body._id;
  return http.put("/users/follow/" + user._id, body);
}

function unfollow(user, author) {
  const body = { ...author };
  delete author._id;
  return http.put("/users/unfollow/" + user._id, body);
}

export default {
  follow,
  unfollow,
};
