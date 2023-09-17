import express from "express";
import server from "./server";
import HealthRouter from "./presentation/routers/health-router";
import config from "./config/config";
import AuthRouter from "./presentation/routers/auth-router";
import ProfileRepositoryImpl from "./domain/repositories/profile";
import AuthUserUseCaseImp from "./domain/use-cases/auth";
import getMongodbClient from "./infrastructure/provider/mongodb";
import { jwtVerifier } from "./presentation/middleware/auth/auth";
import ProfileRouter from "./presentation/routers/profile-router";
import ProfileExecute from "./domain/use-cases/profile";
import cognitoErrorHandler from "./presentation/middleware/error-handling/aws/cognito-error-handling";
import errorLogger from "./presentation/middleware/error-handling/logger";
import GenerateRouter from "./presentation/routers/generate-router";
import GenerateUseCaseImp from "./domain/use-cases/generate";
import OpenAiRouter from "./presentation/routers/openAi-router";
import CompletionCaseImp from "./domain/use-cases/openAi";
import CollectionRepositoryImpl from "./domain/repositories/collection";
import CollectionRouter from "./presentation/routers/collection-router";
import CollectionUseCaseImp from "./domain/use-cases/collection";

(async () => {
  await getMongodbClient();

  const apiRouter = express();

  const v1Router = express();

  // Repositories
  const profileRepository = new ProfileRepositoryImpl();
  const collectionRepository = new CollectionRepositoryImpl();

  // Create route
  const authRouter = AuthRouter(
    new AuthUserUseCaseImp(profileRepository, collectionRepository)
  );

  const profileRouter = ProfileRouter(new ProfileExecute(profileRepository));

  const collectionRouter = CollectionRouter(
    new CollectionUseCaseImp(collectionRepository)
  );

  const generateRouter = GenerateRouter(new GenerateUseCaseImp());

  const chatRouter = OpenAiRouter(new CompletionCaseImp());

  // Base route
  server.use("/api", apiRouter);

  // Set as v1
  apiRouter.use("/v1", v1Router);

  // Function route
  v1Router.use("/", HealthRouter());
  v1Router.use("/auth", authRouter);
  v1Router.use("/profile", profileRouter);
  v1Router.use("/generate", generateRouter);
  v1Router.use("/openai", chatRouter);
  v1Router.use("/collection", collectionRouter);

  // error logger
  v1Router.use(errorLogger);

  // error response
  v1Router.use(cognitoErrorHandler);

  await jwtVerifier
    .hydrate()
    .catch((err) => {
      process.exit(1);
    })
    .then(() =>
      server.listen(config.server.port, () => {
        console.log(`Server running on http://localhost:${config.server.port}`);
      })
    );
})();
