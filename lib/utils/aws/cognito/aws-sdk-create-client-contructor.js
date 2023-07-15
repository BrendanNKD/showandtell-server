"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orDefaultRegion = exports.createClientForRegion = exports.createClientForDefaultRegion = exports.DEFAULT_REGION = void 0;
const ramda_1 = require("ramda");
const config_1 = __importDefault(require("../../../config/config"));
const DEFAULT_REGION = config_1.default.aws.cognito.region;
exports.DEFAULT_REGION = DEFAULT_REGION;
const orDefaultRegion = (0, ramda_1.defaultTo)(DEFAULT_REGION);
exports.orDefaultRegion = orDefaultRegion;
const createClientForRegion = (0, ramda_1.curry)((region, ClientConstructor) => new ClientConstructor({ region: orDefaultRegion(region) }));
exports.createClientForRegion = createClientForRegion;
const createClientForDefaultRegion = createClientForRegion(null);
exports.createClientForDefaultRegion = createClientForDefaultRegion;
