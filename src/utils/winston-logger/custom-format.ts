import { format } from "winston";
// custom format
const customFormat = format.combine(
  format.timestamp(),
  format.errors({
    stack: true,
  }),
  format.printf(
    (info) =>
      `[ ${info.level.toUpperCase()} ] ${info.timestamp}: ${info.message}${
        info.stack ? "\n" : ""
      }${info.stack ? info.stack : ""}\n`
  )
);

export default customFormat;
