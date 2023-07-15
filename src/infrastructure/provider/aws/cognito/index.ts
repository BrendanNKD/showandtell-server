import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { createClientForDefaultRegion } from "../../../../utils/aws/cognito/aws-sdk-create-client-contructor";

const cognitoClient = createClientForDefaultRegion(
  CognitoIdentityProviderClient
);

export default cognitoClient;
