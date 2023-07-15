"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
const aws_sdk_create_client_contructor_1 = require("../../../../utils/aws/cognito/aws-sdk-create-client-contructor");
const cognitoClient = (0, aws_sdk_create_client_contructor_1.createClientForDefaultRegion)(client_cognito_identity_provider_1.CognitoIdentityProviderClient);
exports.default = cognitoClient;
