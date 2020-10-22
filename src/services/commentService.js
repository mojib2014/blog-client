import http from "./httpService";

function getComments() {
  return http.get("/comments");
}

function createComment(comment) {
  return http.post("/comments/new", comment);
}

function upvote(comment) {
  const body = { ...comment };
  delete body._id;
  return http.put("/comments/upvote/" + comment._id, body);
}
function downvote(comment) {
  const body = { ...comment };
  delete body._id;
  return http.put("/comments/downvote/" + comment._id, body);
}

function deleteComment(comment) {
  return http.delete("/comments/delete/" + comment._id);
}

export default {
  getComments,
  createComment,
  upvote,
  downvote,
  deleteComment,
};
