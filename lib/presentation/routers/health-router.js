"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
function HealthRouter() {
    const router = express_1.default.Router();
    router.get("/", async (req, res) => {
        try {
            res.status(200).json({ status: "ok" });
        }
        catch (err) {
            res.status(500).json({ message: "Error checking health" });
        }
    });
    return router;
}
exports.default = HealthRouter;
