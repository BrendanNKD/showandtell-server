"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../middleware/auth/auth");
const express_1 = __importDefault(require("express"));
function ProfileRouter(profileUseCase) {
    const router = express_1.default.Router();
    // public
    router.get("/current", auth_1.authMiddleware, async (req, res) => {
        try {
            const { username } = req.userInfo;
            console.log(username);
            const profile = await profileUseCase.executeGetOneProfile(username);
            if (profile == null) {
                res.status(404).json({ message: "No profiles found" });
            }
            res.status(200).json(profile);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error getting profile" });
        }
    });
    router.get("/getall", async (req, res) => {
        try {
            const profile = await profileUseCase.executeGetAllProfile();
            res.status(200).json(profile);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error getting profile" });
        }
    });
    // router.put("/", async (req: Request, res: Response) => {
    //   try {
    //     const profile = await profileUseCase.executeGetAllProfile();
    //     res.status(200).json(profile);
    //   } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ message: "Error getting profile" });
    //   }
    // });
    router.post("/add", auth_1.authMiddleware, async (req, res) => {
        try {
            const { username } = req.userInfo;
            console.log(req.body);
            const account = await profileUseCase.executeAddOneProfile({
                username: username,
                profile: req.body,
            });
            res.status(200).json(account);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error getting profile" });
        }
    });
    router.post("/update", auth_1.authMiddleware, async (req, res) => {
        try {
            const { username } = req.userInfo;
            const { index, profile } = req.body;
            const account = await profileUseCase.executeUpateOneProfile({
                username,
                index,
                profile,
            });
            console.log(account);
            res.status(200).json(account);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error getting profile" });
        }
    });
    router.get("/levelrules", async (req, res) => {
        try {
            const rules = await profileUseCase.executeGetLevelRules();
            res.status(200).json(rules);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error getting rules" });
        }
    });
    router.post("/awardStars", auth_1.authMiddleware, async (req, res) => {
        try {
            const { username } = req.userInfo;
            const { awardStars, profileId } = req.body;
            console.log(req.body);
            const result = await profileUseCase.executeAwardStars({
                awardStars,
                profileId,
                username,
            });
            res.status(200).json(result);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error creating quests" });
        }
    });
    router.post("/deleteOne", auth_1.authMiddleware, async (req, res) => {
        try {
            const { username } = req.userInfo;
            const { profileId } = req.body;
            const result = await profileUseCase.executeDeleteOneProfile(username, profileId);
            res.status(200).json(result);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error creating quests" });
        }
    });
    return router;
}
exports.default = ProfileRouter;
