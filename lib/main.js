"use strict";
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
const generate_router_1 = __importDefault(require("./presentation/routers/generate-router"));
const generate_1 = __importDefault(require("./domain/use-cases/generate"));
const openAi_router_1 = __importDefault(require("./presentation/routers/openAi-router"));
const openAi_1 = __importDefault(require("./domain/use-cases/openAi"));
const collection_1 = __importDefault(require("./domain/repositories/collection"));
const collection_router_1 = __importDefault(require("./presentation/routers/collection-router"));
const collection_2 = __importDefault(require("./domain/use-cases/collection"));
const quest_router_1 = __importDefault(require("./presentation/routers/quest-router"));
const quest_1 = __importDefault(require("./domain/repositories/quest"));
const quest_2 = __importDefault(require("./domain/use-cases/quest"));
const generate_2 = __importDefault(require("./domain/repositories/generate"));
(async () => {
    await (0, mongodb_1.default)();
    const apiRouter = (0, express_1.default)();
    const v1Router = (0, express_1.default)();
    // Repositories
    const profileRepository = new profile_1.default();
    const collectionRepository = new collection_1.default();
    const questRepository = new quest_1.default();
    const generateRepository = new generate_2.default();
    // Create route
    const authRouter = (0, auth_router_1.default)(new auth_1.default(profileRepository, collectionRepository, questRepository));
    const profileRouter = (0, profile_router_1.default)(new profile_2.default(profileRepository, questRepository));
    const collectionRouter = (0, collection_router_1.default)(new collection_2.default(collectionRepository));
    const generateRouter = (0, generate_router_1.default)(new generate_1.default(generateRepository));
    const chatRouter = (0, openAi_router_1.default)(new openAi_1.default());
    const questRouter = (0, quest_router_1.default)(new quest_2.default(questRepository));
    // Base route
    server_1.default.use("/api", apiRouter);
    // Set as v1
    apiRouter.use("/v1", v1Router);
    // Function route
    v1Router.use("/", (0, health_router_1.default)());
    v1Router.use("/auth", authRouter);
    v1Router.use("/profile", profileRouter);
    v1Router.use("/generate", generateRouter);
    v1Router.use("/openai", chatRouter);
    v1Router.use("/collection", collectionRouter);
    v1Router.use("/quest", questRouter);
    // error logger
    v1Router.use(logger_1.default);
    // error response
    v1Router.use(cognito_error_handling_1.default);
    await auth_2.jwtVerifier
        .hydrate()
        .catch((err) => {
        process.exit(1);
    })
        .then(() => server_1.default.listen(config_1.default.server.port, () => {
        console.log(`Server running on http://localhost:${config_1.default.server.port}`);
    }));
})();
