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
const auth_1 = require("../middleware/auth/auth");
const express_1 = __importDefault(require("express"));
function ProfileRouter(profileUseCase) {
    const router = express_1.default.Router();
    // public
    router.get("/current", auth_1.authMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { username } = req.userInfo.username;
            const profile = yield profileUseCase.executeGetOneProfile(username);
            if (profile == null) {
                res.status(404).json({ message: "No profiles found" });
            }
            res.status(200).json(profile);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error getting profile" });
        }
    }));
    router.get("/getall", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const profile = yield profileUseCase.executeGetAllProfile();
            res.status(200).json(profile);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error getting profile" });
        }
    }));
    router.put("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const profile = yield profileUseCase.executeGetAllProfile();
            res.status(200).json(profile);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error getting profile" });
        }
    }));
    return router;
}
exports.default = ProfileRouter;
