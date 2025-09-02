import API from "./api";

export const sendMessage = async (message, threadId) => {
  const res = await API.post("/chat", { message, threadId });
  return res.data;
};
