import http from "./httpService";

function getTopics() {
  return http.get("/topics");
}

function getTopicByAuthor(user) {
  return http.get("/topics/" + user._id);
}

function createTopic(topic) {
  return http.post("/topics", topic);
}

function uploadTopicPhoto(file) {
  return http.post("/topic/photo", file);
}

function updateTopic(topic) {
  if (topic._id) {
    const body = { ...topic };
    delete body._id;
    delete body.__v;

    http.put("/topics/" + topic._id, body);
  }
}

export default {
  getTopics,
  getTopicByAuthor,
  createTopic,
  uploadTopicPhoto,
  updateTopic,
};
