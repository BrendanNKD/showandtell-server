"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const { AWS_COGNITO_USER_POOL_ID, AWS_COGNITO_CLIENT_ID, AWS_COGNITO_IDENTITY_POOL_ID, AWS_REGION, AWS_COGNITO_CLIENT_NAME, HCAPTCHA_SECRET_KEY, HCAPTCHA_SITE_KEY, ENVIRONMENT, WEBAPP_DOMAIN, LOG_PATH, LOG_INFO_FILE, LOG_ERROR_FILE, LOG_ALL_FILE, REPLICATE_API_TOKEN, ORGANIZATION_KEY, OPENAI_API_KEY, APIURl, CLOUD_NAME, API_KEY, API_SECRET, } = process.env;
const config = {
    environment: ENVIRONMENT,
    domain: WEBAPP_DOMAIN,
    server: {
        port: SERVER_PORT,
    },
    aws: {
        cognito: {
            region: AWS_REGION,
            userPoolId: AWS_COGNITO_USER_POOL_ID,
            clientId: AWS_COGNITO_CLIENT_ID,
            identityPool: AWS_COGNITO_IDENTITY_POOL_ID,
            clientName: AWS_COGNITO_CLIENT_NAME,
        },
    },
    hcaptcha: {
        secret: HCAPTCHA_SECRET_KEY,
        siteKey: HCAPTCHA_SITE_KEY,
    },
    winstonlogger: {
        logPath: LOG_PATH,
        errorFileName: LOG_ERROR_FILE,
        infoFileName: LOG_INFO_FILE,
        combinedFileName: LOG_ALL_FILE,
    },
    replicate: {
        token: REPLICATE_API_TOKEN,
    },
    openai: {
        organization: ORGANIZATION_KEY,
        apiKey: OPENAI_API_KEY,
        url: APIURl,
    },
    cloudinary: {
        cloud_name: CLOUD_NAME,
        api_key: API_KEY,
        secret: API_SECRET,
    },
};
exports.default = config;
