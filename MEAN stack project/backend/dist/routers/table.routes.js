"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const table_controller_1 = require("../controllers/table.controller");
const tableRouter = express_1.default.Router();
tableRouter.route('/getAllLocations').post((req, res) => new table_controller_1.TableController().getAllLocations(req, res));
tableRouter.route('/addLocation').post((req, res) => new table_controller_1.TableController().addLocation(req, res));
exports.default = tableRouter;
//# sourceMappingURL=table.routes.js.map