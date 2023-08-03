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
            const { username } = req.userInfo.username;
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
    router.put("/", async (req, res) => {
        try {
            const profile = await profileUseCase.executeGetAllProfile();
            res.status(200).json(profile);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error getting profile" });
        }
    });
    return router;
}
exports.default = ProfileRouter;
