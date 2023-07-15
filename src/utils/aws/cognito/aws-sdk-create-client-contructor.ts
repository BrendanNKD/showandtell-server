import { curry, defaultTo } from "ramda";
import config from "../../../config/config";

const DEFAULT_REGION = config.aws.cognito.region;

const orDefaultRegion = defaultTo(DEFAULT_REGION);

const createClientForRegion = curry(
  (region: any, ClientConstructor: any) =>
    new ClientConstructor({ region: orDefaultRegion(region) })
);

const createClientForDefaultRegion = createClientForRegion(null);

export {
  DEFAULT_REGION,
  createClientForDefaultRegion,
  createClientForRegion,
  orDefaultRegion,
};
