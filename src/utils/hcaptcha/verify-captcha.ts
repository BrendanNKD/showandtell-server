import hcaptcha from "hcaptcha";
import config from "../../config/config";
const verifyCaptcha = async (token: string): Promise<boolean> => {
  const result = await hcaptcha.verify(
    config.hcaptcha.secret || "",
    token,
    undefined,
    config.hcaptcha.siteKey
  );
  return result.success;
};

export default verifyCaptcha;
