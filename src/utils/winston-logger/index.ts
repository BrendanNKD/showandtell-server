import { createLogger, transports } from "winston";
import customFormat from "./custom-format";
import { errorlevel, infolevel } from "./levels";

export const infoLogger = createLogger({
  format: customFormat,
  transports: infolevel,
});

export const errLogger = createLogger({
  format: customFormat,
  transports: errorlevel,
});
