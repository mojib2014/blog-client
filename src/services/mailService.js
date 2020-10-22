import http from "./httpService";

function sendEmail(user) {
  const body = { ...user };
  delete body._id;
  http.post("/subscribe", body);
}

export default {
  sendEmail,
};
