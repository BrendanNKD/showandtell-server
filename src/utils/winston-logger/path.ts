import path from "path";
import config from "../../config/config";

// fall back if environment is missing
const LOG_PATH = config.winstonlogger.logPath
  ? config.winstonlogger.logPath
  : "/var/log";
const LOG_INFO_FILE = config.winstonlogger.infoFileName
  ? config.winstonlogger.infoFileName
  : "activity.log";
const LOG_ERROR_FILE = config.winstonlogger.errorFileName
  ? config.winstonlogger.errorFileName
  : "error.log";
const LOG_ALL_FILE = config.winstonlogger.combinedFileName
  ? config.winstonlogger.combinedFileName
  : "combined.log";

//define log paths
export const infoPath = path.join(LOG_PATH, LOG_INFO_FILE);
export const errorPath = path.join(LOG_PATH, LOG_ERROR_FILE);
export const combinedPath = path.join(LOG_PATH, LOG_ALL_FILE);
