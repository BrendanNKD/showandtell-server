import Replicate from "replicate";
import config from "../../config/config";

export const replicate = new Replicate({
  auth: String(config.replicate.token),
});
