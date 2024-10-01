import { getUsersChatWithHandler } from "../services/user.service.js";

export const getUsersChatWith = async (req, res) => {
  await getUsersChatWithHandler(req, res);
};
