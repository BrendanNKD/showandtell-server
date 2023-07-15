"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./server"));
const health_router_1 = __importDefault(require("./presentation/routers/health-router"));
const config_1 = __importDefault(require("./config/config"));
const auth_router_1 = __importDefault(require("./presentation/routers/auth-router"));
const profile_1 = __importDefault(require("./domain/repositories/profile"));
const auth_1 = __importDefault(require("./domain/use-cases/auth"));
const mongodb_1 = __importDefault(require("./infrastructure/provider/mongodb"));
const auth_2 = require("./presentation/middleware/auth/auth");
const profile_router_1 = __importDefault(require("./presentation/routers/profile-router"));
const profile_2 = __importDefault(require("./domain/use-cases/profile"));
const cognito_error_handling_1 = __importDefault(require("./presentation/middleware/error-handling/aws/cognito-error-handling"));
const logger_1 = __importDefault(require("./presentation/middleware/error-handling/logger"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongodb_1.default)();
    const apiRouter = (0, express_1.default)();
    const v1Router = (0, express_1.default)();
    // Repositories
    const profileRepository = new profile_1.default();
    // Create route
    const authRouter = (0, auth_router_1.default)(new auth_1.default(profileRepository));
    const profileRouter = (0, profile_router_1.default)(new profile_2.default(profileRepository));
    // Base route
    server_1.default.use("/api", apiRouter);
    // Set as v1
    apiRouter.use("/v1", v1Router);
    // Function route
    v1Router.use("/", (0, health_router_1.default)());
    v1Router.use("/auth", authRouter);
    v1Router.use("/profile", profileRouter);
    // error logger
    v1Router.use(logger_1.default);
    // error response
    v1Router.use(cognito_error_handling_1.default);
    yield auth_2.jwtVerifier
        .hydrate()
        .catch((err) => {
        process.exit(1);
    })
        .then(() => server_1.default.listen(config_1.default.server.port, () => {
        console.log(`Server running on http://localhost:${config_1.default.server.port}`);
    }));
}))();
